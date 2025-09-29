# 📸 Local Images Guide

## 🎯 **Quick Summary**

✅ **Copy your images to:** `public/images/` folder  
✅ **Reference them as:** `"/images/your-image.jpg"`  
✅ **No import needed** - just use the path directly!

---

## 📁 **Where to Put Your Images**

I've created an organized folder structure for you:

```
public/images/
├── hero/           ← Hero section background images
├── portfolio/      ← Your project photos
├── services/       ← Service icons or images
├── company/        ← Logo, team photos, about section images
└── other/          ← Any other images you need
```

---

## 🔧 **How to Use Your Images**

### **Step 1: Copy Your Images**

Copy your image files to the appropriate folder:

```bash
# Example: Copy your images
cp ~/Desktop/my-hero-image.jpg public/images/hero/
cp ~/Desktop/project1.jpg public/images/portfolio/
cp ~/Desktop/project2.jpg public/images/portfolio/
cp ~/Desktop/logo.png public/images/company/
```

### **Step 2: Reference in Content Files**

#### **For Hero Background:**
Edit `src/content/siteContent.ts`:
```typescript
hero: {
  title: "Your Title",
  subtitle: "Your subtitle",
  ctaText: "Contact Us",
  backgroundImage: "/images/hero/my-hero-image.jpg"  // ← Your image here
}
```

#### **For Portfolio Projects:**
Edit `src/content/portfolioContent.ts`:
```typescript
{
  id: "1",
  title: "Your Project Name",
  description: "Project description",
  image: "/images/portfolio/project1.jpg",  // ← Your project image
  category: "residential",
  // ... rest of project data
}
```

#### **For Company Logo (if you want to add it):**
You can reference it anywhere as: `"/images/company/logo.png"`

---

## 💡 **Important Notes**

### **✅ Path Format:**
- **Correct:** `"/images/portfolio/photo.jpg"` (starts with `/`)
- **Wrong:** `"images/portfolio/photo.jpg"` (missing `/`)
- **Wrong:** `"./images/portfolio/photo.jpg"` (wrong format)

### **✅ File Names:**
- **Good:** `project1.jpg`, `hero-background.jpg`, `company-logo.png`
- **Avoid:** `Project 1.jpg` (spaces), `prójekt1.jpg` (special characters)

### **✅ Supported Formats:**
- `.jpg` / `.jpeg` ✅
- `.png` ✅  
- `.webp` ✅ (best for web)
- `.svg` ✅ (for logos/icons)
- `.gif` ✅

---

## 🎨 **Image Size Recommendations**

| Image Type | Recommended Size | Max File Size |
|------------|------------------|---------------|
| **Hero Background** | 1920x1080px+ | 800KB |
| **Portfolio Images** | 800x600px+ | 500KB |
| **Company Logo** | 300x100px | 50KB |
| **Service Icons** | 200x200px | 100KB |

---

## 🚀 **Step-by-Step Example**

Let's say you have these images on your computer:
- `hero-building.jpg` (for hero section)
- `project-house1.jpg` (portfolio project)
- `project-office.jpg` (portfolio project)

### **Step 1:** Copy to folders
```bash
# Copy hero image
cp ~/Desktop/hero-building.jpg public/images/hero/

# Copy portfolio images  
cp ~/Desktop/project-house1.jpg public/images/portfolio/
cp ~/Desktop/project-office.jpg public/images/portfolio/
```

### **Step 2:** Update content files

**In `src/content/siteContent.ts`:**
```typescript
hero: {
  title: "Your Company Name",
  subtitle: "What you do...",
  ctaText: "Contact Us",
  backgroundImage: "/images/hero/hero-building.jpg"  // ← Updated!
}
```

**In `src/content/portfolioContent.ts`:**
```typescript
export const portfolioItems = [
  {
    id: "1",
    title: "Modern House Project",
    description: "Beautiful family home",
    image: "/images/portfolio/project-house1.jpg",  // ← Updated!
    category: "residential",
    // ...
  },
  {
    id: "2", 
    title: "Office Building",
    description: "Commercial space",
    image: "/images/portfolio/project-office.jpg",  // ← Updated!
    category: "commercial",
    // ...
  }
];
```

### **Step 3:** Test
- Save files
- Refresh browser at `http://localhost:5174`
- Your images should appear!

---

## 🛠️ **Testing Your Images**

1. **Start dev server:** `npm run dev`
2. **Open:** `http://localhost:5174`
3. **Check browser console** for any image loading errors
4. **Test on different screen sizes**

### **If Images Don't Show:**
- ✅ Check file path spelling
- ✅ Make sure path starts with `/`
- ✅ Verify file actually exists in `public/images/`
- ✅ Check browser console for errors

---

## 📱 **Image Optimization Tips**

### **Before Adding Images:**
1. **Resize** large images (use Preview on Mac, or online tools)
2. **Compress** to reduce file size ([tinypng.com](https://tinypng.com))
3. **Use WebP** format when possible (better compression)

### **Quick Mac Commands:**
```bash
# Resize image to 1920px width (keeps aspect ratio)
sips -Z 1920 your-image.jpg

# Convert to WebP (if you have webp tools installed)
cwebp your-image.jpg -o your-image.webp
```

---

## 🔄 **Switching from Online to Local Images**

Your content files currently use online placeholder images. To switch:

1. **Find current image URLs** in your content files
2. **Download those images** (or use your own)
3. **Copy to appropriate folders**
4. **Update paths** in content files
5. **Test** the changes

---

**That's it! Your images will now load locally and work even when offline. Much faster and more reliable than online images! 🚀**
