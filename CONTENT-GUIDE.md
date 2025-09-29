# 📝 Content Editing Guide

This guide shows you exactly where to edit your website content. All content has been organized into easy-to-edit configuration files.

## 🎯 Quick Start - Where to Edit Your Content

### 1. **Main Site Content** 
**File:** `src/content/siteContent.ts`

Edit this file to change:
- ✅ Company name, phone, email, address
- ✅ Hero section (main banner)
- ✅ About Us section 
- ✅ Services section
- ✅ Contact information

### 2. **Portfolio/Projects**
**File:** `src/content/portfolioContent.ts`

Edit this file to:
- ✅ Add your real projects
- ✅ Change project images
- ✅ Update project descriptions
- ✅ Modify project categories

---

## 📋 Step-by-Step Content Editing

### Step 1: Update Company Information

Open `src/content/siteContent.ts` and edit:

```typescript
company: {
  name: "Your Company Name",           // Replace with your company name
  tagline: "Your slogan here",         // Your company slogan
  phone: "+420 XXX XXX XXX",          // Your phone number
  email: "your@email.com",            // Your email
  address: "Your address here",        // Your full address
  whatsapp: "420XXXXXXXXX"            // WhatsApp number (numbers only)
}
```

### Step 2: Update Hero Section (Main Banner)

In the same file, edit:

```typescript
hero: {
  title: "Your Main Headline",
  subtitle: "Describe what you do and why customers should choose you. Make it compelling!",
  ctaText: "Contact Us",              // Button text
  backgroundImage: "your-image-url"   // Hero background image
}
```

### Step 3: Update About Us Section

```typescript
about: {
  title: "About Us",
  paragraphs: [
    "First paragraph - introduce your company, when it was founded, what you do.",
    "Second paragraph - your history, experience, and past projects.", 
    "Third paragraph - your values, goals, and what makes you different."
  ]
}
```

### Step 4: Update Services

```typescript
services: {
  title: "Our Services",
  subtitle: "Brief description of what services you offer to clients.",
  items: [
    {
      title: "Service 1",
      description: "Detailed description of your first service."
    },
    {
      title: "Service 2", 
      description: "Detailed description of your second service."
    },
    {
      title: "Service 3",
      description: "Detailed description of your third service."
    }
  ]
}
```

### Step 5: Add Your Portfolio Projects

Open `src/content/portfolioContent.ts` and replace the sample projects:

```typescript
{
  id: "1",                           // Unique ID
  title: "Project Name",
  description: "Brief project description",
  image: "https://your-image-url.jpg", // Project image URL
  category: "residential",            // residential, commercial, renovation, public
  features: [                        // Key features/highlights
    "Feature 1",
    "Feature 2", 
    "Feature 3"
  ],
  details: "Detailed description of the project - what was done, technologies used, what makes it special."
}
```

---

## 🖼️ How to Add Images

### Option 1: Use Unsplash (Easy)
- Go to [unsplash.com](https://unsplash.com)
- Find images you like
- Right-click → "Copy image address"
- Paste the URL in your content files

### Option 2: Use Your Own Images
- Upload images to your web server
- Use the full URL: `https://yourdomain.com/images/photo.jpg`

---

## 🚀 Testing Your Changes

After editing content:

1. Save your files
2. In terminal, run: `npm run dev`
3. Open `http://localhost:5173` 
4. Check your changes!

---

## 📱 Current Website Sections

Your website already has these sections set up:

✅ **Header Navigation**
- Company name
- Navigation menu (Služby, Portfolio, O nás, Kontakt)
- Phone number
- Contact button

✅ **Hero Section** 
- Main headline
- Subtitle description
- Call-to-action button
- Contact buttons

✅ **Services Section (Služby)**
- 3 service cards with icons
- Customizable titles and descriptions

✅ **About Section (O nás)**
- Company description
- Multi-paragraph content area

✅ **Portfolio Section**
- Project gallery with filtering
- Modal popups with project details
- Categories: Residential, Commercial, Renovation, Public

✅ **Contact Section (Kontakt)**
- Contact form
- Company information
- Map (currently showing Prague)

✅ **Footer**
- Company info
- Contact details
- Quick links
- Social media icons

---

## 🎨 Color Scheme

Your website uses these main colors:
- **Primary Green:** `#2c5f2d` (headers, main elements)
- **Accent Orange:** `#ff6b35` (buttons, highlights)
- **Background:** White and light gray sections

---

## 💡 Pro Tips

1. **Keep descriptions concise** - Users scan quickly
2. **Use high-quality images** - They make a big difference
3. **Test on mobile** - Many users browse on phones
4. **Update regularly** - Add new projects to portfolio
5. **Use real content** - Replace all placeholder text

---

## ❓ Need Help?

If you need to make changes beyond content (design, layout, new features), you'll need to edit the React components in the `src/components/` folder.

---

**Ready to customize? Start with `src/content/siteContent.ts`! 🚀**
