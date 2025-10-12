<?php
declare(strict_types=1);

// CORS headers are handled by .htaccess

// Handle preflight OPTIONS request for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

/**
 * contact-handler.php
 * Secure JSON endpoint for your React contact form.
 * Requires:
 *   - PHPMailer installed via Composer (vendor/ next to this file)
 *   - Config file outside webroot returning an array (see example below)
 *
 * Example /home/USER/secure-config/mail.php:
 * return [
 *   'SMTP_HOST' => 'smtp.websupport.cz',
 *   'SMTP_PORT' => 465,
 *   'SMTP_USER' => 'no-reply@bmcreate.cz',
 *   'SMTP_PASS' => 'YOUR_STRONG_PASSWORD',
 *   'FROM_EMAIL' => 'no-reply@bmcreate.cz',
 *   'TO_EMAIL'   => 'you@bmcreate.cz',
 *   'ALLOWED_ORIGINS' => [
 *     'https://bmcreate.cz',
 *     'https://www.bmcreate.cz',
 *     'https://test.bmcreate.cz'
 *   ],
 * ];
 */

// ------- Logging function -------
function logContactAttempt($message, $data = null) {
  $logDir = __DIR__ . '/contact-logs';
  if (!is_dir($logDir)) {
    mkdir($logDir, 0755, true);
  }
  
  $logFile = $logDir . '/contact-' . date('Y-m-d') . '.log';
  $timestamp = date('Y-m-d H:i:s');
  $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';
  $ip = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';
  
  $logEntry = "[$timestamp] IP: $ip | UA: $userAgent | $message";
  if ($data !== null) {
    $logEntry .= " | Data: " . json_encode($data, JSON_UNESCAPED_UNICODE);
  }
  $logEntry .= "\n";
  
  file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
}

// Start logging
logContactAttempt("Contact form request started");

// ------- Load config (adjust absolute path) -------
$configPath = '/data/2/a/2a971d3e-f11e-4a72-a5ae-450eb7c3099a/mail.php'; // <-- CHANGE USER
$config = require $configPath;

// ------- Security/response headers -------
header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

// ------- Method & content-type checks -------
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  logContactAttempt("ERROR: Invalid request method", ['method' => $_SERVER['REQUEST_METHOD']]);
  http_response_code(405);
  echo json_encode(['success' => false, 'message' => 'Method not allowed']);
  exit;
}
$ct = $_SERVER['CONTENT_TYPE'] ?? '';
if (stripos($ct, 'application/json') === false) {
  logContactAttempt("ERROR: Invalid content type", ['content_type' => $ct]);
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Invalid content type']);
  exit;
}

// ------- Same-origin guard -------
$allowed = $config['ALLOWED_ORIGINS'] ?? [];
$origin  = $_SERVER['HTTP_ORIGIN']  ?? '';
$referer = $_SERVER['HTTP_REFERER'] ?? '';
$okOrigin = $origin && in_array($origin, $allowed, true);
$okReferer = false;
foreach ($allowed as $o) {
  if ($referer && strpos($referer, $o) === 0) { $okReferer = true; break; }
}
if (!$okOrigin && !$okReferer) {
  logContactAttempt("ERROR: Origin/Referer not allowed", [
    'origin' => $origin, 
    'referer' => $referer, 
    'allowed' => $allowed
  ]);
  http_response_code(403);
  echo json_encode(['success' => false, 'message' => 'Forbidden']);
  exit;
}

// ------- Read body (cap size) -------
$raw = file_get_contents('php://input');
if ($raw === false || strlen($raw) > 10000) {
  logContactAttempt("ERROR: Request too large or failed to read", [
    'raw_length' => $raw ? strlen($raw) : 0,
    'raw_false' => $raw === false
  ]);
  http_response_code(413);
  echo json_encode(['success' => false, 'message' => 'Request too large']);
  exit;
}
$data = json_decode($raw, true);
if (!is_array($data)) {
  logContactAttempt("ERROR: Invalid JSON", [
    'raw_data' => substr($raw, 0, 500), // First 500 chars
    'json_error' => json_last_error_msg()
  ]);
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Invalid JSON']);
  exit;
}

logContactAttempt("Request data received", $data);

// ------- Anti-abuse: honeypot + min time -------
$honeypot  = trim((string)($data['website']   ?? '')); // hidden field must be empty
$elapsedMs = (int)($data['elapsedMs'] ?? 0);          // client-measured time
if ($honeypot !== '' || $elapsedMs < 3000) {
  logContactAttempt("BLOCKED: Anti-abuse check failed", [
    'honeypot' => $honeypot,
    'elapsed_ms' => $elapsedMs
  ]);
  // Pretend success to not tip off bots
  echo json_encode(['success' => true, 'message' => 'Děkujeme za zprávu.']);
  exit;
}

// ------- Validate inputs -------
function clean(string $s): string {
  $s = trim($s);
  $s = str_replace(["\r", "\n"], ' ', $s); // header injection guard
  return strip_tags($s);
}
$name    = mb_substr(clean((string)($data['name']    ?? '')), 0, 100);
$email   = mb_substr(clean((string)($data['email']   ?? '')), 0, 150);
$phone   = mb_substr(clean((string)($data['phone']   ?? '')), 0, 40);
$message = mb_substr(trim((string)($data['message'] ?? '')), 0, 4000);

if ($name === '' || $email === '' || $message === '') {
  logContactAttempt("ERROR: Required fields missing", [
    'name_empty' => $name === '',
    'email_empty' => $email === '',
    'message_empty' => $message === ''
  ]);
  http_response_code(422);
  echo json_encode(['success' => false, 'message' => 'Prosím vyplňte všechna povinná pole.']);
  exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  logContactAttempt("ERROR: Invalid email format", ['email' => $email]);
  http_response_code(422);
  echo json_encode(['success' => false, 'message' => 'Prosím zadejte platnou e-mailovou adresu.']);
  exit;
}
if ($phone !== '' && !preg_match('/^\+?[0-9 ()\-]{6,}$/', $phone)) {
  logContactAttempt("ERROR: Invalid phone format", ['phone' => $phone]);
  http_response_code(422);
  echo json_encode(['success' => false, 'message' => 'Neplatné telefonní číslo.']);
  exit;
}

// ------- Compose message -------
$ip = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';
$body =
  "Jméno: $name\n".
  "E-mail: $email\n".
  ($phone ? "Telefon: $phone\n" : "").
  "Zpráva:\n$message\n\n".
  "IP: $ip\n".
  "Čas: ".date('c')."\n";

logContactAttempt("Attempting to send email", [
  'name' => $name,
  'email' => $email,
  'phone' => $phone,
  'message_length' => strlen($message)
]);

// ------- Send via PHPMailer over SMTP -------
try {
  require __DIR__ . '/vendor/autoload.php'; // ensure vendor/ is next to this file
  $mail = new PHPMailer\PHPMailer\PHPMailer(true);

  $mail->isSMTP();
  $mail->Host       = (string)$config['SMTP_HOST'];
  $mail->SMTPAuth   = true;
  $mail->Username   = (string)$config['SMTP_USER'];
  $mail->Password   = (string)$config['SMTP_PASS'];
  $mail->CharSet    = 'UTF-8';

  // Choose TLS mode based on port
  $port = (int)($config['SMTP_PORT'] ?? 465);
  if ($port === 465) {
    $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS; // implicit TLS
  } else {
    $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS; // STARTTLS (e.g., 587)
  }
  $mail->Port = $port;

  logContactAttempt("SMTP configured", [
    'host' => $config['SMTP_HOST'],
    'port' => $port,
    'encryption' => $port === 465 ? 'SMTPS' : 'STARTTLS'
  ]);

  // Envelope + headers
  $from = (string)$config['FROM_EMAIL'];
  $to   = (string)$config['TO_EMAIL'];
  $mail->setFrom($from, 'Web');
  $mail->Sender = $from;                 // envelope sender/bounce address
  $mail->addAddress($to);
  
  // Add CC recipients if configured
  if (isset($config['CC_EMAILS']) && is_array($config['CC_EMAILS'])) {
    foreach ($config['CC_EMAILS'] as $ccEmail) {
      if (!empty($ccEmail)) {
        $mail->addCC($ccEmail);
      }
    }
  }
  
  $mail->addReplyTo($email, $name);

  $mail->Subject = 'Nová zpráva z kontaktního formuláře';
  $mail->Body    = $body;

  $mail->send();
  logContactAttempt("SUCCESS: Email sent successfully");
  echo json_encode(['success' => true, 'message' => 'Děkujeme! Vaše zpráva byla odeslána.']);
} catch (Throwable $e) {
  logContactAttempt("ERROR: Email sending failed", [
    'error_message' => $e->getMessage(),
    'error_code' => $e->getCode(),
    'error_file' => $e->getFile(),
    'error_line' => $e->getLine(),
    'smtp_host' => $config['SMTP_HOST'] ?? 'not_set',
    'smtp_port' => $config['SMTP_PORT'] ?? 'not_set'
  ]);
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Zprávu se nepodařilo odeslat. Zkuste to prosím později.']);
}
