# 📸 Images Directory

## How to Add Your Images

### 1. Copy your images to these folders:

```
public/images/
├── hero/           ← Hero section background images
├── portfolio/      ← Project photos
├── services/       ← Service icons/images  
├── company/        ← Logo, team photos, etc.
└── other/          ← Any other images
```

### 2. Reference them in your content files:

#### In `src/content/siteContent.ts`:
```typescript
hero: {
  backgroundImage: "/images/hero/main-building.jpg"  // ← Your hero image
}
```

#### In `src/content/portfolioContent.ts`:
```typescript
{
  image: "/images/portfolio/project1.jpg"  // ← Your project image
}
```

### 3. Supported Image Formats:
- ✅ .jpg / .jpeg
- ✅ .png  
- ✅ .webp (best for web)
- ✅ .svg (for icons/logos)

### 4. Image Size Recommendations:

**Hero Images:** 1920x1080px or larger
**Portfolio Images:** 800x600px minimum  
**Service Icons:** 200x200px
**Company Logo:** 300x100px (or SVG)

### 5. Image Optimization Tips:
- Keep file sizes under 500KB when possible
- Use WebP format for better compression
- Compress images before uploading
