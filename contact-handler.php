<?php
/**
 * Contact Form Handler for BM Create
 * Sends emails through mail.bmcreate.cz without storing credentials
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
    
    // Send email using server's mail() function
    $mailSent = mail($to, $subject, $emailBody, implode("\r\n", $headers));
    
    if ($mailSent) {
        // Log successful submission (optional)
        error_log("Contact form submitted successfully from: " . $email);
        
        echo json_encode([
            'success' => true,
            'message' => 'Děkujeme za Vaši zprávu! Budeme Vás kontaktovat co nejdříve.'
        ]);
    } else {
        throw new Exception('Chyba při odesílání e-mailu. Zkuste to prosím později.');
    }
    
} catch (Exception $e) {
    // Log error
    error_log("Contact form error: " . $e->getMessage());
    
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>
