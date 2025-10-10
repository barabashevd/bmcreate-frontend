<?php
/**
 * Test script for SMTP contact handler
 */

echo "Testing SMTP Contact Handler...\n\n";

// Test data
$testData = [
    'name' => 'SMTP Test User',
    'email' => 'test@example.com',
    'phone' => '+420123456789',
    'message' => 'This is a test message using SMTP connection'
];

// Make request to SMTP contact handler
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://test.bmcreate.cz/contact-handler-smtp.php');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($testData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen(json_encode($testData))
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Code: " . $httpCode . "\n";
echo "Response: " . $response . "\n";

// Parse and display result
$result = json_decode($response, true);
if ($result) {
    echo "\nParsed Result:\n";
    echo "Success: " . ($result['success'] ? 'Yes' : 'No') . "\n";
    echo "Message: " . $result['message'] . "\n";
} else {
    echo "\nFailed to parse JSON response\n";
}
?>

