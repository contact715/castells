# WebP Image Optimization Guide

## Overview
This project includes support for WebP image format through the `OptimizedImage` component. WebP provides better compression (25-35% smaller file sizes) while maintaining image quality.

## How to Use

### 1. Convert Images to WebP

Use one of these tools to convert your images:

**Online Tools:**
- [Squoosh](https://squoosh.app/) - Google's image compression tool
- [CloudConvert](https://cloudconvert.com/png-to-webp)
- [Convertio](https://convertio.co/png-webp/)

**Command Line (using cwebp):**
```bash
# Install WebP tools
brew install webp  # macOS
# or
apt-get install webp  # Linux

# Convert single image
cwebp -q 85 input.png -o output.webp

# Convert all PNGs in a directory
for file in *.png; do
  cwebp -q 85 "$file" -o "${file%.png}.webp"
done
```

### 2. Use OptimizedImage Component

```tsx
import OptimizedImage from '../ui/OptimizedImage';

// With WebP support
<OptimizedImage
  src="/images/service.png"
  webpSrc="/images/service.webp"
  alt="Service description"
  className="w-full h-auto"
  loading="lazy"
/>

// Without WebP (fallback to regular img)
<OptimizedImage
  src="/images/service.png"
  alt="Service description"
  className="w-full h-auto"
  loading="lazy"
/>
```

### 3. Recommended Quality Settings

- **Photos/Complex images:** 80-85% quality
- **Simple graphics/Logos:** 90-95% quality
- **Screenshots:** 75-80% quality

### 4. Current Image Status

Images in `/public/images/` that need conversion:
- All PNG files (20+ images, ~700KB-1.1MB each)
- Recommended: Convert to WebP at 80-85% quality

### 5. Benefits

- **Smaller file sizes:** 25-35% reduction
- **Faster page loads:** Better Core Web Vitals
- **Better SEO:** Improved page speed scores
- **Automatic fallback:** Works in all browsers

### 6. Browser Support

WebP is supported in:
- Chrome 23+
- Firefox 65+
- Edge 18+
- Safari 14+
- Opera 12.1+

The component automatically falls back to the original format for older browsers.

## Migration Steps

1. Convert existing PNG/JPG images to WebP
2. Place WebP files alongside originals in `/public/images/`
3. Update components to use `OptimizedImage` with `webpSrc` prop
4. Test in different browsers
5. Monitor file size reductions

## Example Migration

**Before:**
```tsx
<img src="/images/service.png" alt="Service" />
```

**After:**
```tsx
<OptimizedImage
  src="/images/service.png"
  webpSrc="/images/service.webp"
  alt="Service"
  loading="lazy"
/>
```
