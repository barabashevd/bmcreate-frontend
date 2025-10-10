<?php
/**
 * SMTP Contact Form Handler for BM Create
 * Uses direct SMTP connection to mail.bmcreate.cz
 */

// Set headers for CORS and JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

/**
 * Simple SMTP mail function
 */
function sendSMTPMail($to, $subject, $message, $fromEmail, $fromName = '') {
    $smtpHost = 'mail.bmcreate.cz';
    $smtpPort = 25;
    $timeout = 10;
    
    // Create socket connection
    $socket = fsockopen($smtpHost, $smtpPort, $errno, $errstr, $timeout);
    if (!$socket) {
        throw new Exception("SMTP connection failed: $errstr ($errno)");
    }
    
    // Read initial response
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '220') {
        fclose($socket);
        throw new Exception("SMTP server error: $response");
    }
    
    // Send EHLO command
    fputs($socket, "EHLO " . $_SERVER['HTTP_HOST'] . "\r\n");
    $response = fgets($socket, 512);
    
    // Send MAIL FROM command
    fputs($socket, "MAIL FROM:<$fromEmail>\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '250') {
        fclose($socket);
        throw new Exception("MAIL FROM failed: $response");
    }
    
    // Send RCPT TO command
    fputs($socket, "RCPT TO:<$to>\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '250') {
        fclose($socket);
        throw new Exception("RCPT TO failed: $response");
    }
    
    // Send DATA command
    fputs($socket, "DATA\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '354') {
        fclose($socket);
        throw new Exception("DATA command failed: $response");
    }
    
    // Send email headers and body
    $emailData = "From: " . ($fromName ? "$fromName <$fromEmail>" : $fromEmail) . "\r\n";
    $emailData .= "To: $to\r\n";
    $emailData .= "Subject: $subject\r\n";
    $emailData .= "Date: " . date('r') . "\r\n";
    $emailData .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $emailData .= "Content-Transfer-Encoding: 8bit\r\n";
    $emailData .= "\r\n";
    $emailData .= $message . "\r\n";
    $emailData .= ".\r\n";
    
    fputs($socket, $emailData);
    $response = fgets($socket, 512);
    
    // Send QUIT command
    fputs($socket, "QUIT\r\n");
    fclose($socket);
    
    if (substr($response, 0, 3) !== '250') {
        throw new Exception("Email sending failed: $response");
    }
    
    return true;
}

try {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        throw new Exception('Invalid JSON data');
    }
    
    // Extract form data
    $name = trim($input['name'] ?? '');
    $email = trim($input['email'] ?? '');
    $phone = trim($input['phone'] ?? '');
    $message = trim($input['message'] ?? '');
    
    // Validate required fields
    if (empty($name) || empty($email) || empty($message)) {
        throw new Exception('Prosím vyplňte všechna povinná pole.');
    }
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Prosím zadejte platnou e-mailovou adresu.');
    }
    
    // Sanitize inputs
    $name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
    $phone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
    
    // Email configuration
    $to = 'test@bmcreate.cz';
    $subject = 'Nový kontakt z webu BM Create - ' . $name;
    
    // Create email body
    $emailBody = "Nový kontakt z webových stránek BM Create\n\n";
    $emailBody .= "Jméno: " . $name . "\n";
    $emailBody .= "Email: " . $email . "\n";
    $emailBody .= "Telefon: " . ($phone ?: 'Nevyplněno') . "\n";
    $emailBody .= "Datum: " . date('d.m.Y H:i:s') . "\n\n";
    $emailBody .= "Zpráva:\n" . $message . "\n\n";
    $emailBody .= "---\n";
    $emailBody .= "Tento email byl odeslán z kontaktního formuláře na bmcreate.cz";
    
    // Send email using SMTP
    $mailSent = sendSMTPMail($to, $subject, $emailBody, $email, $name);
    
    if ($mailSent) {
        echo json_encode([
            'success' => true,
            'message' => 'Děkujeme za Vaši zprávu! Budeme Vás kontaktovat co nejdříve.'
        ]);
    } else {
        throw new Exception('Chyba při odesílání e-mailu.');
    }
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Chyba při odesílání zprávy: ' . $e->getMessage()
    ]);
}
?>
