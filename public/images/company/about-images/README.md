# 📸 About Section Background Images

## 🎯 Image Requirements

The "O nás" section now features a beautiful background slideshow. Add your images here:

```
public/images/company/about-images/
├── about-1.jpg          # First background image
├── about-2.jpg          # Second background image  
├── about-3.jpg          # Third background image
└── about-4.jpg          # Fourth background image
```

## 📐 **Image Specifications**

### **Size & Format:**
- **Resolution:** 1920x1080px or higher
- **Aspect Ratio:** 16:9 (landscape)
- **Format:** JPG or WebP (recommended)
- **File Size:** Under 800KB per image (for fast loading)

### **Content Suggestions:**
- **about-1.jpg** - Company team at work or construction site
- **about-2.jpg** - Completed house exterior or construction progress
- **about-3.jpg** - Interior of finished project or technical details
- **about-4.jpg** - Team meeting, planning, or another project view

## 🎨 **Image Guidelines**

### **Visual Quality:**
- ✅ High contrast and good lighting
- ✅ Professional appearance
- ✅ Clear, not overly busy backgrounds
- ✅ Horizontal orientation works best

### **Content Ideas:**
- 🏗️ **Construction scenes** - Workers, machinery, building progress
- 🏠 **Completed projects** - Exterior shots of your houses
- 👥 **Team photos** - Professional shots of your crew
- 🔧 **Technical work** - Close-ups of quality construction details
- 📋 **Planning phases** - Meetings, blueprints, consultations

## ⚡ **Performance Tips**

### **Image Optimization:**
```bash
# Compress images before adding
# Mac: Use Preview or online tools like tinypng.com
# Command line (if available):
cwebp about-1.jpg -o about-1.webp -q 80
```

### **Loading Performance:**
- Images are preloaded for smooth transitions
- Slideshow changes every 5 seconds
- Smooth fade transitions between images
- Users can click indicators to manually change images

## 🔄 **How the Slideshow Works**

1. **Auto-rotation:** Images change every 5 seconds
2. **Smooth transitions:** 1-second fade between images
3. **Manual control:** Click dots at bottom to select specific image
4. **Responsive:** Works on all screen sizes
5. **Overlay:** Semi-transparent white box ensures text readability

## 🎯 **Current Setup**

The component expects exactly **4 images** named:
- `about-1.jpg`
- `about-2.jpg` 
- `about-3.jpg`
- `about-4.jpg`

To add more or fewer images, edit the `backgroundImages` array in `src/components/AboutSection.tsx`.

## 📱 **Mobile Optimization**

Images are automatically optimized for mobile:
- Background images scale appropriately
- Text remains readable on all screen sizes
- Touch-friendly navigation indicators
- Maintains performance on slower connections

**Perfect for showcasing BM Create's work and team! 🚀**
