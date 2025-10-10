<?php
/**
 * Debug script to test mail server configuration
 */

echo "=== Mail Server Debug ===\n\n";

// 1. Check if mail() function is available
echo "1. Mail function available: " . (function_exists('mail') ? 'YES' : 'NO') . "\n";

// 2. Check PHP mail configuration
echo "2. PHP Mail Configuration:\n";
echo "   sendmail_path: " . ini_get('sendmail_path') . "\n";
echo "   SMTP: " . ini_get('SMTP') . "\n";
echo "   smtp_port: " . ini_get('smtp_port') . "\n";
echo "   sendmail_from: " . ini_get('sendmail_from') . "\n\n";

// 3. Test basic mail function
echo "3. Testing basic mail function...\n";
$to = 'test@bmcreate.cz';
$subject = 'Test Email from PHP';
$message = 'This is a test email to verify mail server configuration.';
$headers = [
    'From: test@bmcreate.cz',
    'Reply-To: test@bmcreate.cz',
    'X-Mailer: PHP/' . phpversion()
];

$result = mail($to, $subject, $message, implode("\r\n", $headers));
echo "   Mail result: " . ($result ? 'SUCCESS' : 'FAILED') . "\n";

// 4. Check for errors
if (!$result) {
    echo "   Error: " . error_get_last()['message'] . "\n";
}

// 5. Test with verbose headers
echo "\n4. Testing with verbose headers...\n";
$verboseHeaders = [
    'From: test@bmcreate.cz',
    'Reply-To: test@bmcreate.cz',
    'X-Mailer: PHP/' . phpversion(),
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8'
];

$verboseResult = mail($to, $subject, $message, implode("\r\n", $verboseHeaders));
echo "   Verbose mail result: " . ($verboseResult ? 'SUCCESS' : 'FAILED') . "\n";

// 6. Check mail logs (if accessible)
echo "\n5. Checking for mail logs...\n";
$logFiles = [
    '/var/log/mail.log',
    '/var/log/maillog',
    '/var/log/mail.err',
    '/var/log/exim4/mainlog',
    '/var/log/postfix.log'
];

foreach ($logFiles as $logFile) {
    if (file_exists($logFile) && is_readable($logFile)) {
        echo "   Found log: $logFile\n";
        $lastLines = shell_exec("tail -5 $logFile 2>/dev/null");
        if ($lastLines) {
            echo "   Last 5 lines:\n";
            echo "   " . str_replace("\n", "\n   ", trim($lastLines)) . "\n";
        }
    }
}

// 7. Test SMTP connection (if possible)
echo "\n6. Testing SMTP connection...\n";
$smtpHost = 'mail.bmcreate.cz';
$smtpPort = 25;

$connection = @fsockopen($smtpHost, $smtpPort, $errno, $errstr, 5);
if ($connection) {
    echo "   SMTP connection to $smtpHost:$smtpPort: SUCCESS\n";
    fclose($connection);
} else {
    echo "   SMTP connection to $smtpHost:$smtpPort: FAILED\n";
    echo "   Error: $errstr ($errno)\n";
}

// 8. Check system mail queue
echo "\n7. Checking mail queue...\n";
$mailq = shell_exec('mailq 2>/dev/null');
if ($mailq) {
    echo "   Mail queue:\n";
    echo "   " . str_replace("\n", "\n   ", trim($mailq)) . "\n";
} else {
    echo "   Mail queue: Empty or not accessible\n";
}

echo "\n=== Debug Complete ===\n";
?>

