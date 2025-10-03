# 📧 Contact Form Setup Guide

## 🎯 Current Status
Your contact form has **client-side validation** but **simulated submission**. To make it functional, you need a backend script.

---

## 🚀 **Setup Options**

### **Option 1: PHP Script (Recommended for Apache)**

#### **Step 1: Create PHP Script**
Create `contact.php` on your web server:

```php
<?php
// contact.php
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
    
    // Email content
    $to = 'barabashev@bmcreate.cz';
    $subject = 'Nová zpráva z webu - ' . $name;
    $body = "
    Nová zpráva z kontaktního formuláře:
    
    Jméno: $name
    Email: $email
    Telefon: $phone
    
    Zpráva:
    $message
    ";
    
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['success' => 'Zpráva byla odeslána']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Chyba při odesílání']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Nepovolená metoda']);
}
?>
```

#### **Step 2: Update React Form**
Replace the simulated submission in `ContactSection.tsx`:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Basic validation (keep existing code)
  if (!formState.name || !formState.email || !formState.message) {
    setFormStatus({
      type: "error",
      message: "Prosím vyplňte všechna povinná pole.",
    });
    return;
  }

  // Email validation (keep existing code)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formState.email)) {
    setFormStatus({
      type: "error",
      message: "Prosím zadejte platnou e-mailovou adresu.",
    });
    return;
  }

  // Send to backend
  try {
    const response = await fetch('/contact.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formState),
    });

    const result = await response.json();

    if (response.ok) {
      setFormStatus({
        type: "success",
        message: "Děkujeme za Vaši zprávu! Budeme Vás kontaktovat co nejdříve.",
      });
      setFormState({ name: "", email: "", phone: "", message: "" });
    } else {
      setFormStatus({
        type: "error",
        message: result.error || "Chyba při odesílání zprávy.",
      });
    }
  } catch (error) {
    setFormStatus({
      type: "error",
      message: "Chyba při odesílání zprávy. Zkuste to prosím později.",
    });
  }
};
```

---

### **Option 2: Third-Party Services (No Backend Required)**

#### **A. Formspree (Easiest)**
1. Go to [formspree.io](https://formspree.io)
2. Create account and get form endpoint
3. Update form action to use Formspree endpoint

#### **B. Netlify Forms (If using Netlify)**
Add `netlify` attribute to form tag

#### **C. EmailJS (Frontend Only)**
1. Setup EmailJS account
2. Configure email templates
3. Send emails directly from React

---

### **Option 3: Modern Backend API**

#### **Node.js + Express**
Create API endpoint with email service (Nodemailer, SendGrid, etc.)

#### **Serverless Functions**
Use Vercel Functions, Netlify Functions, or AWS Lambda

---

## 📋 **Deployment Steps**

### **For PHP Solution:**

1. **Upload files to web server:**
   ```bash
   # Upload built website
   cp -r dist/* /var/www/html/
   
   # Upload PHP script
   cp contact.php /var/www/html/
   ```

2. **Configure PHP mail:**
   - Ensure PHP `mail()` function works on your server
   - Or configure SMTP (recommended)

3. **Test the form:**
   - Submit test message
   - Check email delivery
   - Check server logs for errors

### **Server Requirements:**
- ✅ PHP enabled
- ✅ Mail function or SMTP configured
- ✅ Proper file permissions

---

## 📧 **How Email Sending Works**

### **🔍 Email Flow:**
1. **User fills form** → Frontend React app
2. **Form submits data** → PHP script on your Apache server  
3. **PHP script processes** → Validates and formats data
4. **PHP sends email** → Uses server's mail system
5. **Email delivered** → To your inbox (barabashev@bmcreate.cz)

### **📬 Server Mail Options:**

#### **Option A: Server's Built-in Mail (Simplest)**
```php
// Uses server's mail() function
mail($to, $subject, $body, $headers);
```

**Requirements:**
- Apache server with PHP enabled
- Server must have mail system (sendmail, postfix, etc.)
- **Note:** Apache just runs PHP - doesn't handle email directly

#### **Option B: SMTP Configuration (Recommended)**
```php
// Uses external SMTP service
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

$mail = new PHPMailer();
$mail->isSMTP();
$mail->Host = 'smtp.sendgrid.net';
$mail->SMTPAuth = true;
$mail->Username = 'apikey';
$mail->Password = 'your-sendgrid-api-key';
$mail->SMTPSecure = 'tls';
$mail->Port = 587;
```

### **🏢 Hosting Provider Scenarios:**

#### **🌟 Shared Hosting (Most Common):**
- ✅ PHP usually enabled
- ✅ Mail function usually works  
- ✅ No configuration needed
- ❓ Check with provider if mail() available

#### **🖥️ VPS/Dedicated Server:**
- ⚠️ You need to configure mail system
- ⚠️ Install sendmail/postfix
- ⚠️ Configure DNS (SPF, DKIM)
- 💡 Better to use SMTP service

#### **☁️ Cloud Hosting (AWS, DigitalOcean):**
- ❌ Often blocks outgoing mail (port 25)
- 🎯 Must use SMTP service
- 🔒 Security restrictions on email

### **📨 Recommended Email Services:**

#### **1. SMTP Services (Most Reliable):**
- **SendGrid** - 99% delivery rate, generous free tier
- **Mailgun** - Developer-friendly, good documentation
- **Amazon SES** - Cheap and reliable if using AWS
- **Gmail SMTP** - Simple but limited (use app passwords)

#### **2. Server Requirements Check:**
```php
<?php
// test-mail.php - Upload to test your server
if (function_exists('mail')) {
    echo "Mail function available ✅\n";
    
    $test = mail(
        'your-email@example.com',
        'Test from server', 
        'This is a test email',
        'From: webmaster@yourdomain.com'
    );
    
    echo $test ? "Email sent ✅" : "Email failed ❌";
} else {
    echo "Mail function not available ❌";
}
?>
```

### **⚙️ Apache Server Configuration:**

#### **Required Setup:**
```apache
# PHP enabled in httpd.conf or .htaccess
LoadModule php_module modules/libphp.so
AddType application/x-httpd-php .php
```

```ini
# PHP mail configuration in php.ini
[mail function]
SMTP = localhost
smtp_port = 25
sendmail_from = webmaster@yourdomain.com
sendmail_path = /usr/sbin/sendmail -t -i
```

---

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **CORS Errors:**
   - Add proper CORS headers in PHP
   - Serve from same domain

2. **Email Not Sending:**
   - Check server mail configuration
   - Use SMTP instead of mail() function
   - Check spam folders

3. **Form Not Submitting:**
   - Check browser console for errors
   - Verify PHP script path
   - Check server error logs

### **Email Debugging Commands:**
```bash
# Check server mail logs
tail -f /var/log/mail.log

# Test server mail command directly
echo "Test email" | mail -s "Test Subject" your-email@example.com

# Check if SMTP port is accessible
telnet smtp.gmail.com 587

# Test PHP script directly
curl -X POST https://yourdomain.com/contact.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
```

---

## 💡 **Recommendations**

### **For Production:**
1. **Use SMTP** instead of mail() function
2. **Add rate limiting** to prevent spam
3. **Add CAPTCHA** for additional security
4. **Log submissions** for tracking
5. **Set up email notifications**

### **Quick Start (Easiest):**
1. Use **Formspree** for immediate functionality
2. Migrate to PHP script later if needed
3. No server configuration required

---

## 🎯 **Specific Recommendations for BM Create**

### **🚀 For Quick Launch:**
1. **Use Formspree initially** (no server setup needed)
2. Test your website and get feedback from clients
3. Migrate to PHP + SMTP later if needed

### **🏗️ For Production Setup:**
1. **Check with your hosting provider** about mail capabilities
2. **Set up SMTP service** (SendGrid/Mailgun recommended)
3. **Use PHP script** with SMTP configuration  
4. **Test thoroughly** with real email addresses

### **📞 Remember - You Already Have Working Contact Options:**
- **Phone:** +420 777 811 508 (click to call)
- **Email:** barabashev@bmcreate.cz (opens email client)
- **WhatsApp:** Direct messaging link

**The contact form is an enhancement, not a requirement for launch!**

### **🔄 Migration Path:**
1. **Launch with current setup** (working phone/email/WhatsApp)
2. **Add Formspree** for web form (5 minutes setup)
3. **Later migrate to PHP** for full control
4. **Add features** like file uploads, CAPTCHA, etc.

---

## 📞 **Current Contact Methods**

Your website already has these working contact methods:
- ✅ **Phone links** - Direct calling
- ✅ **Email links** - Open email client  
- ✅ **WhatsApp links** - Direct messaging

The contact form adds a convenient web-based option for users who prefer not to use email clients directly.
