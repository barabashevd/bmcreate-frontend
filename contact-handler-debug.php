<?php
/**
 * Debug version of Contact Form Handler for BM Create
 * Includes detailed error reporting and logging
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

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

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
    
    // Email headers
    $headers = [
        'From: ' . $email,
        'Reply-To: ' . $email,
        'X-Mailer: PHP/' . phpversion(),
        'Content-Type: text/plain; charset=UTF-8'
    ];
    
    // Log the email attempt
    $logMessage = date('Y-m-d H:i:s') . " - Attempting to send email to: $to\n";
    $logMessage .= "Subject: $subject\n";
    $logMessage .= "From: $email\n";
    $logMessage .= "Headers: " . implode(' | ', $headers) . "\n";
    $logMessage .= "Body length: " . strlen($emailBody) . " characters\n\n";
    
    error_log($logMessage, 3, 'contact-form-debug.log');
    
    // Send email using server's mail() function
    $mailSent = mail($to, $subject, $emailBody, implode("\r\n", $headers));
    
    // Log the result
    $resultMessage = date('Y-m-d H:i:s') . " - Mail result: " . ($mailSent ? 'SUCCESS' : 'FAILED') . "\n";
    if (!$mailSent) {
        $error = error_get_last();
        $resultMessage .= "Error: " . ($error ? $error['message'] : 'Unknown error') . "\n";
    }
    $resultMessage .= "\n";
    
    error_log($resultMessage, 3, 'contact-form-debug.log');
    
    if ($mailSent) {
        echo json_encode([
            'success' => true,
            'message' => 'Děkujeme za Vaši zprávu! Budeme Vás kontaktovat co nejdříve.',
            'debug' => 'Email sent successfully'
        ]);
    } else {
        $error = error_get_last();
        throw new Exception('Chyba při odesílání e-mailu: ' . ($error ? $error['message'] : 'Unknown error'));
    }
    
} catch (Exception $e) {
    // Log error
    error_log(date('Y-m-d H:i:s') . " - Exception: " . $e->getMessage() . "\n", 3, 'contact-form-debug.log');
    
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'debug' => 'Exception caught'
    ]);
}
?>

