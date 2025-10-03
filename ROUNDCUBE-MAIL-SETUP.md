# 📧 Roundcube Mail Server Setup for BM Create

## 🎯 Your Setup
- **Mail Server:** `mail.bmcreate.cz`
- **Webmail Interface:** Roundcube
- **Domain:** `bmcreate.cz`
- **Contact Email:** `barabashev@bmcreate.cz`

---

## 🔧 **PHP Contact Form Configuration**

Since you have your own mail server, you need to configure the PHP script to use your SMTP server instead of the local mail() function.

### **Updated contact.php Script:**

```php
<?php
// contact.php - Updated for your Roundcube mail server
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Include PHPMailer (you'll need to upload this)
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

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
    
    $mail = new PHPMailer(true);
    
    try {
        // Server settings for your mail.bmcreate.cz
        $mail->isSMTP();
        $mail->Host = 'mail.bmcreate.cz';
        $mail->SMTPAuth = true;
        $mail->Username = 'webform@bmcreate.cz'; // Create this email account
        $mail->Password = 'your-webform-password'; // Set strong password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // or ENCRYPTION_SMTPS
        $mail->Port = 587; // or 465 for SSL
        
        // Recipients
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
        error_log("Mail Error: " . $mail->ErrorInfo);
        http_response_code(500);
        echo json_encode(['error' => 'Chyba při odesílání zprávy']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Nepovolená metoda']);
}
?>
```

---

## 📋 **Required Setup Steps**

### **1. Create Email Account for Web Form**
In your Roundcube admin panel (or cPanel/hosting panel):
- **Create email:** `webform@bmcreate.cz`
- **Set strong password**
- **This account will send emails** from the contact form

### **2. Download PHPMailer**
```bash
# Download PHPMailer to your web server
cd /var/www/html  # or your web directory
wget https://github.com/PHPMailer/PHPMailer/archive/v6.8.0.zip
unzip v6.8.0.zip
mv PHPMailer-6.8.0/src PHPMailer
```

### **3. Upload Files to Your Web Server**
```
your-website/
├── dist/                    # Your built React app
│   ├── index.html
│   ├── assets/
│   └── images/
├── contact.php             # Contact form handler
└── PHPMailer/              # Email library
    ├── PHPMailer.php
    ├── SMTP.php
    └── Exception.php
```

### **4. Test Mail Server Connection**
Create `test-mail-server.php`:
```php
<?php
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'mail.bmcreate.cz';
    $mail->SMTPAuth = true;
    $mail->Username = 'webform@bmcreate.cz';
    $mail->Password = 'your-webform-password';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    
    $mail->setFrom('webform@bmcreate.cz', 'Test');
    $mail->addAddress('barabashev@bmcreate.cz');
    
    $mail->Subject = 'Test z webu';
    $mail->Body = 'Test email z PHP skriptu';
    
    $mail->send();
    echo 'Email úspěšně odeslán! ✅';
} catch (Exception $e) {
    echo "Chyba: {$mail->ErrorInfo}";
}
?>
```

---

## 🔍 **Mail Server Configuration Check**

### **Common SMTP Settings for Self-Hosted Mail:**

#### **Option 1: STARTTLS (Recommended)**
- **Host:** `mail.bmcreate.cz`
- **Port:** `587`
- **Encryption:** `STARTTLS`
- **Authentication:** `Yes`

#### **Option 2: SSL/TLS**
- **Host:** `mail.bmcreate.cz`
- **Port:** `465`
- **Encryption:** `SSL/TLS`
- **Authentication:** `Yes`

### **Check Your Mail Server Ports:**
```bash
# Test SMTP connection
telnet mail.bmcreate.cz 587
# or
telnet mail.bmcreate.cz 465

# Check if ports are open
nmap -p 25,465,587,993,995 mail.bmcreate.cz
```

---

## 🛡️ **Security Considerations**

### **1. Firewall Settings**
Ensure these ports are open on `mail.bmcreate.cz`:
- **25** - SMTP (if needed)
- **587** - SMTP with STARTTLS
- **465** - SMTP with SSL
- **993** - IMAP SSL (for Roundcube)
- **995** - POP3 SSL

### **2. SPF Record**
Add SPF record to your DNS:
```
TXT record for bmcreate.cz:
v=spf1 include:mail.bmcreate.cz ~all
```

### **3. DKIM (if configured)**
Ensure DKIM is set up for better email delivery.

### **4. Secure Passwords**
- Use strong password for `webform@bmcreate.cz`
- Consider using environment variables for credentials

---

## 🔧 **Environment Variables (Recommended)**

Create `.env` file (don't commit to git):
```bash
# .env
SMTP_HOST=mail.bmcreate.cz
SMTP_USERNAME=webform@bmcreate.cz
SMTP_PASSWORD=your-strong-password
SMTP_PORT=587
SMTP_ENCRYPTION=tls
RECIPIENT_EMAIL=barabashev@bmcreate.cz
```

Updated PHP script using environment variables:
```php
<?php
// Load environment variables
$smtp_host = $_ENV['SMTP_HOST'] ?? 'mail.bmcreate.cz';
$smtp_username = $_ENV['SMTP_USERNAME'] ?? 'webform@bmcreate.cz';
$smtp_password = $_ENV['SMTP_PASSWORD'] ?? '';
$smtp_port = $_ENV['SMTP_PORT'] ?? 587;
$recipient = $_ENV['RECIPIENT_EMAIL'] ?? 'barabashev@bmcreate.cz';

// Use variables in PHPMailer configuration
$mail->Host = $smtp_host;
$mail->Username = $smtp_username;
$mail->Password = $smtp_password;
$mail->Port = $smtp_port;
$mail->addAddress($recipient);
?>
```

---

## 📧 **Email Flow with Your Setup**

1. **User submits form** → React frontend
2. **Form sends JSON** → `contact.php` on your web server
3. **PHP script connects** → `mail.bmcreate.cz:587`
4. **Authenticates as** → `webform@bmcreate.cz`
5. **Sends email to** → `barabashev@bmcreate.cz`
6. **You receive email** → In your Roundcube inbox

---

## 🧪 **Testing Steps**

1. **Create `webform@bmcreate.cz` account**
2. **Upload PHPMailer and contact.php**
3. **Test with `test-mail-server.php`**
4. **Update React form** to use `/contact.php`
5. **Test full form submission**

---

## ❗ **Troubleshooting**

### **Common Issues:**
- **Connection refused:** Check firewall/port settings
- **Authentication failed:** Verify username/password
- **SSL/TLS errors:** Try different encryption/port combinations
- **Message not received:** Check spam folder, mail logs

### **Check Mail Server Logs:**
```bash
# On your mail server
tail -f /var/log/mail.log
# or
journalctl -f -u postfix
```

This setup gives you full control over email delivery and ensures emails are sent from your own mail server! 🚀
