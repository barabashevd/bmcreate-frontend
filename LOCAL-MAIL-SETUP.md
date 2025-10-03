# 📧 Local Mail Setup (Web + Mail on Same Server)

## 🎯 Your Situation
- **Web server:** Apache on your server
- **Mail server:** Roundcube/Postfix on the **same server**
- **Domain:** `bmcreate.cz` with mail at `mail.bmcreate.cz`

**Perfect! You can send emails locally without any passwords!** 🎉

---

## ✅ **Local Mail Sending (No Passwords Needed)**

### **Option 1: PHP mail() Function (Simplest)**

```php
<?php
// contact.php - Local mail without passwords
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $name = htmlspecialchars($data['name'] ?? '');
    $email = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);
    $phone = htmlspecialchars($data['phone'] ?? '');
    $message = htmlspecialchars($data['message'] ?? '');
    
    if (!$name || !$email || !$message) {
        http_response_code(400);
        echo json_encode(['error' => 'Chybí povinná pole']);
        exit;
    }
    
    // Prepare email content
    $to = 'barabashev@bmcreate.cz';
    $subject = 'Nová zpráva z webu - ' . $name;
    
    $body = "
Nová zpráva z kontaktního formuláře BM Create:

Jméno: $name
Email: $email
Telefon: $phone

Zpráva:
$message

---
Odesláno z: " . $_SERVER['HTTP_HOST'] . "
IP adresa: " . $_SERVER['REMOTE_ADDR'] . "
Čas: " . date('Y-m-d H:i:s');
    
    // Headers for proper email formatting
    $headers = "From: webform@bmcreate.cz\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Return-Path: webform@bmcreate.cz\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: BM Create Contact Form\r\n";
    
    // Send email using local mail server
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['success' => 'Zpráva byla úspěšně odeslána']);
    } else {
        error_log("Local mail sending failed");
        http_response_code(500);
        echo json_encode(['error' => 'Chyba při odesílání zprávy']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Nepovolená metoda']);
}
?>
```

### **Option 2: Local SMTP (No Authentication)**

```php
<?php
// contact.php - Local SMTP without password
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // ... [validation code same as above] ...
    
    $mail = new PHPMailer(true);
    
    try {
        // Local SMTP server settings (no password needed)
        $mail->isSMTP();
        $mail->Host = 'localhost';  // or '127.0.0.1'
        $mail->Port = 25;           // Local SMTP port
        $mail->SMTPAuth = false;    // No authentication needed!
        
        // Set sender and recipient
        $mail->setFrom('webform@bmcreate.cz', 'BM Create Web Form');
        $mail->addAddress('barabashev@bmcreate.cz', 'Pavel Barabashev');
        $mail->addReplyTo($email, $name);
        
        // Content
        $mail->isHTML(false);
        $mail->CharSet = 'UTF-8';
        $mail->Subject = 'Nová zpráva z webu - ' . $name;
        $mail->Body = "
Nová zpráva z kontaktního formuláře BM Create:

Jméno: $name
Email: $email
Telefon: $phone

Zpráva:
$message

---
Odesláno z: " . $_SERVER['HTTP_HOST'] . "
IP adresa: " . $_SERVER['REMOTE_ADDR'] . "
Čas: " . date('Y-m-d H:i:s');
        
        $mail->send();
        echo json_encode(['success' => 'Zpráva byla úspěšně odeslána']);
        
    } catch (Exception $e) {
        error_log("Local SMTP Error: " . $mail->ErrorInfo);
        http_response_code(500);
        echo json_encode(['error' => 'Chyba při odesílání zprávy']);
    }
}
?>
```

---

## 🔧 **Required Server Configuration**

### **1. Postfix Configuration** (Your Mail Server)

Check if Postfix accepts local mail:

```bash
# Check Postfix is running
systemctl status postfix

# Check configuration
postconf | grep inet_interfaces
# Should show: inet_interfaces = all (or localhost, $myhostname)

# Check if accepting local mail
postconf | grep mydestination
# Should include: bmcreate.cz, mail.bmcreate.cz, localhost
```

### **2. PHP Configuration**

Ensure PHP can send mail locally:

```bash
# Check PHP mail settings
php -i | grep mail

# In php.ini, ensure:
# sendmail_path = /usr/sbin/sendmail -t -i
# or
# sendmail_path = /usr/bin/msmtp -t
```

### **3. Test Local Mail Delivery**

```bash
# Test from command line
echo "Test message" | mail -s "Test Subject" barabashev@bmcreate.cz

# Check mail queue
mailq

# Check mail logs
tail -f /var/log/mail.log
```

---

## 🎯 **Advantages of Local Mail**

### **✅ Security Benefits:**
- **No passwords stored** anywhere
- **No network authentication** required
- **No external dependencies**
- **Faster delivery** (no network latency)

### **✅ Reliability Benefits:**
- **No external service outages**
- **No rate limits** from SMTP providers
- **Complete control** over delivery
- **Simpler configuration**

### **✅ Performance Benefits:**
- **Instant delivery** to local mailbox
- **No network timeouts**
- **Lower server load**

---

## 🛠️ **Implementation Steps**

### **Step 1: Verify Mail Server Setup**

```bash
# Check if mail server accepts local delivery
telnet localhost 25
# Then type:
# HELO localhost
# MAIL FROM: webform@bmcreate.cz
# RCPT TO: barabashev@bmcreate.cz
# QUIT
```

### **Step 2: Create Simple Test Script**

```php
<?php
// test-local-mail.php
$to = 'barabashev@bmcreate.cz';
$subject = 'Test Local Mail';
$message = 'This is a test from local PHP mail()';
$headers = 'From: webform@bmcreate.cz';

if (mail($to, $subject, $message, $headers)) {
    echo "✅ Local mail sent successfully!";
} else {
    echo "❌ Local mail failed";
}
?>
```

### **Step 3: Upload and Test**

```bash
# Upload test script
scp test-local-mail.php user@yourserver:/var/www/html/

# Run test
curl https://bmcreate.cz/test-local-mail.php

# Check if email arrived in Roundcube
```

### **Step 4: Deploy Contact Form**

Use the simple `contact.php` script (Option 1) without any password configuration.

---

## 🚨 **Potential Issues & Solutions**

### **Issue 1: "From" Address Rejected**

```php
// Solution: Use valid local domain
$headers = "From: webform@bmcreate.cz\r\n";  // ✅ Valid
$headers = "From: webform@localhost\r\n";    // ❌ May be rejected
```

### **Issue 2: Mail Not Delivered**

```bash
# Check Postfix accepts your domain
postconf | grep mydestination

# Add your domain if missing
echo "mydestination = bmcreate.cz, mail.bmcreate.cz, localhost" >> /etc/postfix/main.cf
systemctl reload postfix
```

### **Issue 3: PHP mail() Not Working**

```bash
# Check sendmail path
which sendmail
# Update php.ini if needed
sendmail_path = /usr/sbin/sendmail -t -i
```

---

## 📧 **Email Flow (Local)**

1. **User submits form** → React frontend
2. **Form sends to** → `contact.php` on your server
3. **PHP calls** → `mail()` function (local)
4. **PHP hands off to** → Local Postfix (localhost:25)
5. **Postfix delivers** → Local mailbox for `barabashev@bmcreate.cz`
6. **You receive** → In Roundcube immediately

**No passwords, no external services, no security risks!** 🔐

---

## 🎯 **Recommended Approach for BM Create**

### **Use Option 1 (PHP mail() function):**
- ✅ **Simplest implementation**
- ✅ **No external libraries** needed
- ✅ **No passwords** required
- ✅ **Maximum security**
- ✅ **Fastest performance**

### **File Structure:**
```
/var/www/html/
├── index.html          # Your React app
├── contact.php         # Simple local mail script
└── assets/             # CSS, JS, images
```

**This is the most secure and simple solution for your setup!** 🚀

---

## 🧪 **Quick Test Script**

Save this as `test-contact.php` and upload it:

```php
<?php
// test-contact.php - Quick test of local mail
$test_mail = mail(
    'barabashev@bmcreate.cz',
    'Test z kontaktního formuláře', 
    'Toto je test zpráva z PHP na stejném serveru.',
    'From: webform@bmcreate.cz'
);

echo $test_mail ? "✅ Místní pošta funguje!" : "❌ Problém s místní poštou";

// Also test if mail function exists
echo "\n";
echo function_exists('mail') ? "✅ PHP mail() je dostupná" : "❌ PHP mail() není dostupná";
?>
```

Perfect solution - secure, simple, and no password management needed! 🎉
