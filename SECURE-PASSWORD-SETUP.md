# 🔐 Secure Password Storage for Contact Form

## ❌ **INSECURE (Don't Do This)**
```php
// contact.php - NEVER store passwords like this!
$mail->Password = 'your-actual-password'; // Visible in source code!
```

---

## ✅ **SECURE Options**

### **Option 1: Environment Variables (Best Practice)**

#### **Step 1: Create .env file** (outside web directory)
```bash
# /var/www/.env (NOT in /var/www/html/)
SMTP_HOST=mail.bmcreate.cz
SMTP_USERNAME=webform@bmcreate.cz
SMTP_PASSWORD=your-strong-password-here
SMTP_PORT=587
SMTP_ENCRYPTION=tls
RECIPIENT_EMAIL=barabashev@bmcreate.cz
```

#### **Step 2: Secure the .env file**
```bash
# Set proper permissions
chmod 600 /var/www/.env
chown www-data:www-data /var/www/.env

# Ensure it's outside web-accessible directory
# /var/www/.env ✅ (not accessible via web)
# /var/www/html/.env ❌ (accessible via web!)
```

#### **Step 3: Load in PHP script**
```php
<?php
// contact.php - Load environment variables securely

// Method A: Using vlucas/phpdotenv (recommended)
require_once 'vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable('/var/www');
$dotenv->load();

$smtp_host = $_ENV['SMTP_HOST'];
$smtp_username = $_ENV['SMTP_USERNAME'];
$smtp_password = $_ENV['SMTP_PASSWORD'];

// Method B: Simple file parsing (if no composer)
function loadEnv($path) {
    if (!file_exists($path)) return;
    
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos($line, '=') !== false && strpos($line, '#') !== 0) {
            list($key, $value) = explode('=', $line, 2);
            $_ENV[trim($key)] = trim($value);
        }
    }
}

loadEnv('/var/www/.env');
$smtp_password = $_ENV['SMTP_PASSWORD'] ?? '';
?>
```

---

### **Option 2: Separate Config File**

#### **Step 1: Create config file** (outside web directory)
```php
<?php
// /var/www/mail-config.php (NOT in /var/www/html/)
return [
    'smtp_host' => 'mail.bmcreate.cz',
    'smtp_username' => 'webform@bmcreate.cz',
    'smtp_password' => 'your-strong-password',
    'smtp_port' => 587,
    'recipient' => 'barabashev@bmcreate.cz'
];
?>
```

#### **Step 2: Load in contact script**
```php
<?php
// contact.php
$config = require '/var/www/mail-config.php';

$mail->Host = $config['smtp_host'];
$mail->Username = $config['smtp_username'];
$mail->Password = $config['smtp_password'];
?>
```

#### **Step 3: Secure the config file**
```bash
chmod 600 /var/www/mail-config.php
chown www-data:www-data /var/www/mail-config.php
```

---

### **Option 3: Database Storage** (Advanced)

```php
<?php
// Store encrypted password in database
$encrypted_password = openssl_encrypt($password, 'AES-256-CBC', $key, 0, $iv);

// Retrieve and decrypt when needed
$decrypted_password = openssl_decrypt($encrypted_password, 'AES-256-CBC', $key, 0, $iv);
?>
```

---

## 🗂️ **Recommended File Structure**

```
/var/www/
├── .env                     # ✅ Environment variables (secure)
├── mail-config.php         # ✅ Config file (secure)
└── html/                   # Web-accessible directory
    ├── index.html          # Your website
    ├── contact.php         # Contact form handler
    └── assets/             # CSS, JS, images
```

**Key principle:** **Secrets outside web directory!**

---

## 🔒 **Additional Security Measures**

### **1. Strong Password Requirements**
```bash
# Generate strong password
openssl rand -base64 32

# Example strong password
WebForm_Bmcr3ate!2024#Secure$Pass
```

### **2. Limit Email Account Permissions**
- **Create dedicated account** (`webform@bmcreate.cz`)
- **Only SMTP permission** (no IMAP/POP3 if not needed)
- **No admin privileges**
- **Regular password rotation**

### **3. Rate Limiting**
```php
// In contact.php - prevent spam/brute force
session_start();

$max_attempts = 5;
$time_window = 300; // 5 minutes

if (!isset($_SESSION['form_attempts'])) {
    $_SESSION['form_attempts'] = [];
}

$now = time();
$attempts = array_filter($_SESSION['form_attempts'], function($time) use ($now, $time_window) {
    return ($now - $time) < $time_window;
});

if (count($attempts) >= $max_attempts) {
    http_response_code(429);
    echo json_encode(['error' => 'Příliš mnoho pokusů. Zkuste později.']);
    exit;
}

$_SESSION['form_attempts'][] = $now;
```

### **4. IP Filtering** (Optional)
```php
// Allow only from your domain
$allowed_origins = ['https://bmcreate.cz', 'https://www.bmcreate.cz'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (!in_array($origin, $allowed_origins)) {
    http_response_code(403);
    exit;
}
```

---

## 🚨 **Security Checklist**

### **File Permissions:**
- ✅ `.env` file: `600` (owner read/write only)
- ✅ `contact.php`: `644` (owner write, group/others read)
- ✅ Config files: Outside web directory
- ✅ No passwords in git repository

### **Password Security:**
- ✅ Strong, unique password for webform account
- ✅ Different from your main email password
- ✅ Regular rotation (every 3-6 months)
- ✅ Encrypted storage or environment variables

### **Access Control:**
- ✅ Dedicated email account with minimal permissions
- ✅ SMTP-only access if possible
- ✅ Rate limiting on contact form
- ✅ Input validation and sanitization

---

## 🔧 **Implementation for BM Create**

### **Quick Secure Setup:**

1. **Create environment file:**
```bash
sudo mkdir -p /var/www/config
sudo nano /var/www/config/.env
```

2. **Add your credentials:**
```env
SMTP_HOST=mail.bmcreate.cz
SMTP_USERNAME=webform@bmcreate.cz
SMTP_PASSWORD=your-generated-strong-password
SMTP_PORT=587
RECIPIENT_EMAIL=barabashev@bmcreate.cz
```

3. **Secure the file:**
```bash
sudo chmod 600 /var/www/config/.env
sudo chown www-data:www-data /var/www/config/.env
```

4. **Update contact.php:**
```php
// Load secure configuration
function loadEnv($path) {
    if (!file_exists($path)) return;
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos($line, '=') !== false && strpos($line, '#') !== 0) {
            list($key, $value) = explode('=', $line, 2);
            $_ENV[trim($key)] = trim($value);
        }
    }
}

loadEnv('/var/www/config/.env');

// Use environment variables
$mail->Host = $_ENV['SMTP_HOST'] ?? 'mail.bmcreate.cz';
$mail->Username = $_ENV['SMTP_USERNAME'] ?? '';
$mail->Password = $_ENV['SMTP_PASSWORD'] ?? '';
```

---

## ❗ **Common Mistakes to Avoid**

1. **❌ Storing passwords in PHP files**
2. **❌ Committing secrets to git**
3. **❌ Weak passwords**
4. **❌ Config files in web directory**
5. **❌ Same password for multiple services**
6. **❌ No rate limiting**
7. **❌ Overprivileged email accounts**

---

## 🎯 **Best Practice Summary**

1. **Environment variables** outside web directory
2. **Strong, unique passwords** with regular rotation
3. **Minimal permissions** for email accounts
4. **Rate limiting** and input validation
5. **Regular security reviews** and updates

This approach ensures your email credentials are secure while maintaining functionality! 🛡️
