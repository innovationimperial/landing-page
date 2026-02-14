# Premium Portfolio Implementation Plan (Phase 2 - Updated)

Based on your request, the portfolio page will now directly adopt the "Cosmic/Innovation Imperial" aesthetic found on your local site. This creates a seamless brand experience.

## Design Language: "Cosmic Agency"

To match `localhost:8080`, we will use the following design system:

### Core Palette & Effects
- **Background**: Deep Cosmic Purple (`hsl(272 60% 5%)`) with radial "Cosmic" gradients.
- **Primary Accent**: Electric Violet (`hsl(270 60% 55%)`) with neon glows.
- **Secondary Accent**: Deep Teal (`hsl(180 30% 8%)`) for card depth.
- **Glassmorphism**: 
  - Containers will use `--gradient-glass` (low opacity white with 135deg slant).
  - High-quality backdrop-blur and thin white borders (`--glass-border`).
- **Typography**: Clean sans-serif with gradient-masked headings (White to Violet).

---

## Proposed Changes

### 1. Unified Project Grid (Bento Style)
- **Layout**: Adaptive Bento-box grid that mirrors the agency feel.
- **Interactivity**: 
  - Cards will use the extracted `--shadow-glass` and `--shadow-glow` on hover.
  - Smooth transitions using the `0.2, 0.9, 0.2, 1` cubic-bezier.

### 2. Remotion Video Showcase
- **Transition**: Programmatic pans across the project screenshots.
- **Styling**: Video overlays will use the same violet gradient text as the main site.

### 3. Navigation & State
- **Sticky Header**: Translucent "Cosmic" glass header.
- **Status Indicators**: Projects like `Suitsworld` will show a subtle "Maintenance" glow using the `--destructive` color tokens.

---

## Technical Stack
- **Framework**: Next.js 15 (App Router).
- **Styling**: Vanilla CSS (CSS Modules) using the exact tokens found in `:root`.
- **Animations**: Framer Motion for the grid entry and Remotion for the media.

## Verification Plan

### Automated
- **CSS Token Audit**: Ensure all `--cosmic` and `--glass` variables are accurately implemented.
- **Build Scan**: Verify site builds without errors and respects the 2026 performance principles.

### Manual
- Review the "Cosmic" grid layout and the hover effects to ensure they feel identical to the agency site.
