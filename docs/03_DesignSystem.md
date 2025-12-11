# Design System: Castells

## 1. Colors

### Brand Colors
- **Ivory (Background):** `rgb(235, 236, 231)` / `#EBECE7` (Light Mode), `rgb(25, 25, 25)` / `#191919` (Dark Mode)
- **Surface:** `rgb(255, 255, 255)` / `#FFFFFF` (Light Mode), `rgb(42, 42, 42)` / `#2A2A2A` (Dark Mode)
- **Text Primary:** `rgb(0, 0, 0)` / `#000000` (Light Mode), `rgb(255, 255, 255)` / `#FFFFFF` (Dark Mode)
- **Text Secondary:** `rgb(85, 85, 85)` / `#555555` (Light Mode), `rgb(204, 204, 204)` / `#CCCCCC` (Dark Mode)
- **Coral (Accent):** `#E08576`
- **Coral Dark:** `#D67060`

### Gradients
- **Coral Gradient:** `linear-gradient(90deg, #E08576 0%, #D67060 100%)`

## 2. Typography

### Font Families
- **Headings (Display):** 'Playfair Display', serif
- **Body (Sans):** 'Satoshi', sans-serif

### Usage
- **H1/Hero:** Playfair Display, Large, Elegant.
- **Section Headers:** Playfair Display.
- **Body Text:** Satoshi, Clean, Readable.
- **UI Elements (Buttons, Nav):** Satoshi, Uppercase/Capitalized.

## 3. UI Components

### Buttons
- **Primary:** Rounded-xl, Coral background (or black/white depending on context), hover effects.
- **Secondary:** Outline or text-only with underline.
- **Ripple Button:** Interactive button with ripple effect on click.

### Cards
- **Service/Industry Cards:** White/Surface background, rounded-xl, soft shadow (`shadow-soft` or `shadow-medium`).
- **Hover Effects:** Scale up slightly (`scale-[0.98]` -> `1`), shadow increase.

### Effects
- **Noise Overlay:** Subtle grain texture over the background.
- **Aurora Background:** Fluid color mesh for hero sections.
- **Scroll Animations:** Elements fade in and move up on scroll.
- **Cursor:** Custom splash cursor effect (fluid simulation).

## 4. Layout
- **Container:** Standard container with `mx-auto px-6`.
- **Grid:** Bento-grid style layouts for services and features.
- **Spacing:** Generous whitespace to maintain the "premium" feel.
