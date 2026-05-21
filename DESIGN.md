---
name: Nurturing Growth
colors:
  surface: "#f4fafd"
  surface-dim: "#d4dbdd"
  surface-bright: "#f4fafd"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#eef5f7"
  surface-container: "#e8eff1"
  surface-container-high: "#e2e9ec"
  surface-container-highest: "#dde4e6"
  on-surface: "#161d1f"
  on-surface-variant: "#44483f"
  inverse-surface: "#2b3234"
  inverse-on-surface: "#ebf2f4"
  outline: "#74796e"
  outline-variant: "#c4c8bc"
  surface-tint: "#4c653c"
  primary: "#4a633a"
  on-primary: "#ffffff"
  primary-container: "#627c51"
  on-primary-container: "#f8ffed"
  inverse-primary: "#b2cf9d"
  secondary: "#5e5f5c"
  on-secondary: "#ffffff"
  secondary-container: "#e0e0dc"
  on-secondary-container: "#626360"
  tertiary: "#53604c"
  on-tertiary: "#ffffff"
  tertiary-container: "#6b7864"
  on-tertiary-container: "#f8ffef"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  primary-fixed: "#ceecb8"
  primary-fixed-dim: "#b2cf9d"
  on-primary-fixed: "#0b2002"
  on-primary-fixed-variant: "#354d27"
  secondary-fixed: "#e3e2df"
  secondary-fixed-dim: "#c7c7c3"
  on-secondary-fixed: "#1b1c1a"
  on-secondary-fixed-variant: "#464744"
  tertiary-fixed: "#d9e7ce"
  tertiary-fixed-dim: "#bdcbb3"
  on-tertiary-fixed: "#131e0f"
  on-tertiary-fixed-variant: "#3e4a38"
  background: "#f4fafd"
  on-background: "#161d1f"
  surface-variant: "#dde4e6"
typography:
  headline-xl:
    fontFamily: Newsreader
    fontSize: 48px
    fontWeight: "600"
    lineHeight: "1.1"
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 36px
    fontWeight: "500"
    lineHeight: "1.2"
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 28px
    fontWeight: "500"
    lineHeight: "1.2"
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.6"
  label-sm:
    fontFamily: Manrope
    fontSize: 13px
    fontWeight: "600"
    lineHeight: "1.4"
    letterSpacing: 0.05em
  nav-link:
    fontFamily: Manrope
    fontSize: 15px
    fontWeight: "500"
    lineHeight: "1.0"
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 80px
  container-max: 1200px
---

## Brand & Style

This design system is built on the philosophy of "Professional Nurturing." It targets parents, educators, and community partners, evoking an emotional response of security, growth, and sophistication.

The visual style is a blend of **Minimalism** and **Editorial Design**. It prioritizes high whitespace to create "breathing room" for users, reflecting a calm environment. The aesthetic is anchored by organic, hand-drawn botanical illustrations that soften the structured layout, ensuring the interface feels human and accessible rather than clinical or corporate. The overall mood is clean, airy, and grounded in nature.

## Colors

The palette is derived from natural landscapes to reinforce the theme of growth.

- **Primary (Sage Green):** Used for primary actions, active states, and brand-identifying flourishes like the botanical icons. It signifies life and stability.
- **Secondary (Cream):** The primary background surface. It is warmer and more inviting than pure white, reducing eye strain and feeling more "organic."
- **Tertiary (Muted Olive):** Used for secondary accents, decorative lines, and subtle background shapes.
- **Neutral (Deep Slate):** Used for all primary typography and iconography to ensure high legibility and a sense of professional authority.

## Typography

The typography system uses a traditional serif for storytelling and a modern sans-serif for utility.

- **Newsreader (Headings):** Chosen for its editorial, literary quality. It establishes a sense of history and trustworthiness. Use this for all hero sections and section titles.
- **Manrope (Body & UI):** A highly readable, modern sans-serif. It provides a clean contrast to the serif headings, ensuring that data-heavy sections and UI controls remain functional and clear.

Standardize on wide line-heights (1.6 for body) to maintain the airy, accessible feel of the brand.

## Layout & Spacing

The layout follows a **Fixed Grid** model for desktop to ensure a curated, editorial feel, while transitioning to a **Fluid Grid** for mobile devices.

- **Grid:** 12-column system for desktop, 4-column for mobile.
- **Rhythm:** An 8px base unit drives all padding and margin decisions.
- **Philosophy:** Use generous vertical padding between sections (80px to 120px) to prevent the UI from feeling cluttered. Content should be centered with significant side margins on larger screens to focus the user's attention.

## Elevation & Depth

This system avoids heavy shadows in favor of **Tonal Layers** and **Ambient Depth**.

- **Surface Depth:** Content containers (like cards) use the secondary cream color against slightly darker off-white backgrounds, or pure white against the cream.
- **Shadows:** When necessary, use "Low-Opacity Ambient Shadows." These should be highly diffused (24px-32px blur) with a low opacity (5-8%) and a slight tint of the primary green or neutral slate to keep the shadow "warm" rather than grey.
- **Depth through Illustration:** Depth is also suggested by overlapping botanical line art behind text or containers, creating a layered, organic stack.

## Shapes

The shape language is **Soft and Organic**.

- **Corners:** Standard UI elements like cards and input fields use a 0.5rem (8px) radius.
- **Interactive Elements:** Buttons and tags use a higher radius (1rem or "pill-shaped") to feel more friendly and tactile.
- **Decorative Shapes:** Incorporate imperfect, hand-drawn circles or "leaf" shapes as background containers for icons to reinforce the botanical narrative.

## Components

- **Buttons:** Primary buttons are solid Sage Green with Slate text or white text. Secondary buttons are outlined with a 1px Sage Green stroke. All buttons use the "pill" shape for a softer, more approachable feel.
- **Cards:** Use a white background with a 16px corner radius and an ultra-soft ambient shadow. Vertical stacking of icon-title-description is the preferred layout for service cards.
- **Iconography:** Icons should be thin-line style (1px to 1.5px stroke width). Use the primary green for icon colors. Surround icons with a circular background of the tertiary color at 10% opacity.
- **Input Fields:** Ghost-style inputs with a soft 1px border in Slate (at 20% opacity). On focus, the border transitions to the solid Primary Sage Green.
- **Chips/Tags:** Used for categories, these should be small, pill-shaped, and use the tertiary muted green background with slate text.
- **Dividers:** Use botanical "vine" line art for major section breaks, or simple 1px horizontal lines in the tertiary color at low opacity for minor separations.
