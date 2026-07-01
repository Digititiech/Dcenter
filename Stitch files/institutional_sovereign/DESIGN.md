---
name: Institutional Sovereign
colors:
  surface: '#011230'
  surface-dim: '#011230'
  surface-bright: '#293958'
  surface-container-lowest: '#000d27'
  surface-container-low: '#091b39'
  surface-container: '#0e1f3d'
  surface-container-high: '#192a48'
  surface-container-highest: '#253453'
  on-surface: '#d8e2ff'
  on-surface-variant: '#c5c6cd'
  inverse-surface: '#d8e2ff'
  inverse-on-surface: '#20304f'
  outline: '#8f9097'
  outline-variant: '#44474d'
  surface-tint: '#b9c7e4'
  primary: '#b9c7e4'
  on-primary: '#233148'
  primary-container: '#0a192f'
  on-primary-container: '#74829d'
  inverse-primary: '#515f78'
  secondary: '#e9c176'
  on-secondary: '#412d00'
  secondary-container: '#604403'
  on-secondary-container: '#dab36a'
  tertiary: '#c1c7cf'
  on-tertiary: '#2b3137'
  tertiary-container: '#141a1f'
  on-tertiary-container: '#7c838a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b9c7e4'
  on-primary-fixed: '#0d1c32'
  on-primary-fixed-variant: '#39475f'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#dde3eb'
  tertiary-fixed-dim: '#c1c7cf'
  on-tertiary-fixed: '#161c22'
  on-tertiary-fixed-variant: '#41474e'
  background: '#011230'
  on-background: '#d8e2ff'
  surface-variant: '#253453'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 60px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
  data-tabular:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 120px
---

## Brand & Style
The design system is engineered for "Decision Center," a financial and economic consulting firm requiring a visual language that communicates absolute authority, stability, and elite expertise. The brand personality is **Bankable, Institutional, and Sovereign**.

The aesthetic direction is **Modern Corporate / High-Contrast**, blending the rigor of traditional financial institutions with the precision of contemporary data platforms. It utilizes strong structural boundaries and high-contrast typography to evoke the feeling of a premium physical report or a high-stakes trading terminal. The UI must feel grounded, immovable, and intellectually rigorous, utilizing sharp edges and structured grids to command trust from B2B stakeholders and sovereign entities.

## Colors
The color strategy utilizes a "Deep-Sea" dark mode foundation to emphasize premium exclusivity and reduce visual fatigue during complex data analysis.

- **Primary (#0A192F):** Used for the core background and deep surfaces. It represents the "Decision Center" foundation—stable and profound.
- **Secondary / Accent (#C5A059):** This Sand-Gold is reserved for high-value actions, success states, and primary brand markers. It signifies wealth, tradition, and the "golden" standard of consulting.
- **Tertiary / Structural (#E2E8F0):** A muted silver used for hairline borders, dividers, and secondary text to maintain legibility without competing with the gold accents.
- **Surface High (#112240):** A slightly lighter navy for cards and elevated containers to create subtle depth within the dark environment.
- **Pure White (#FFFFFF):** Reserved exclusively for headlines and primary body copy to ensure maximum contrast and "Crisp" readability.

## Typography
This design system employs a dual-typeface strategy to balance traditional authority with modern efficiency.

- **Headlines (Playfair Display):** Should be used for all page titles and section headers. The high-contrast serifs convey a "literary" and "consultancy" feel. Use optical kerning for large display sizes.
- **Body & Data (Inter):** A systematic sans-serif designed for high-density screens. It must be used for all financial tables, report text, and UI controls.
- **Bilingual Considerations:** For Arabic (AR) layouts, ensure line heights are increased by 20% to accommodate the script's ascenders and descenders while maintaining the same visual weight.
- **Numerical Data:** Always enable `tabular numbers` for financial tables to ensure vertical alignment of decimal points and digits.

## Layout & Spacing
The layout follows a **Fixed-Grid** philosophy for desktop to maintain the "report-like" structure, transitioning to a fluid model for mobile.

- **Grid:** A 12-column grid with generous 24px gutters. Content should be centered within a 1280px max-width container to preserve the feeling of an elite, curated experience rather than a sprawling dashboard.
- **Rhythm:** Use an 8px base unit. Section vertical spacing is intentionally wide (120px+) to allow the "Elite" brand to breathe, signaling that the content is high-value and not to be rushed.
- **Bilingual Mirroring:** The grid must be fully reversible for RTL (Arabic). Ensure that the visual "weight" of the gold accents is mirrored to maintain focal points in the right-to-left reading flow.

## Elevation & Depth
In this design system, depth is achieved through **Low-contrast Outlines** and **Tonal Layers** rather than heavy shadows.

- **Structural Boundaries:** Use 1px borders in Muted Silver (#E2E8F0) at 15-20% opacity. This creates "bank-grade" cells and compartments that feel architectural and secure.
- **Tonal Stepping:** The primary background is #0A192F. Secondary containers (Cards/Modals) use #112240. Active or hovered states use #1C2D4A.
- **Shadows:** Avoid soft, ambient shadows. If elevation is required for a floating element (like a dropdown), use a sharp, 1px gold border (#C5A059) to define its presence against the navy background.

## Shapes
The shape language is **Sharp (0px)**. 

To maintain an institutional and serious tone, rounded corners are avoided. Every button, card, and input field features 90-degree angles. This geometric rigidity reinforces the concepts of "structure," "precision," and "consulting rigor." The only exception is for circular avatars or specific status indicators.

## Components

- **Primary CTA:** Sharp-edged buttons with a solid Gold (#C5A059) background and Navy (#0A192F) text. On hover, the button should transition to a transparent background with a 1px gold border.
- **Service Cards:** Cards use a 1px Silver border. On hover, the border color shifts to Gold, and a micro-interaction triggers a subtle 4px vertical "lift" or a Gold top-accent line (2px).
- **Data Tables:** High density is encouraged. Rows are separated by 1px Silver borders at low opacity. Header cells use the `label-caps` typography style with a subtle Navy-High background.
- **Input Fields:** Sharp, dark backgrounds (#0A192F) with a persistent 1px Silver border. When focused, the border changes to Gold. Labels use `body-sm` in White.
- **Dividers:** Horizontal and vertical dividers are essential to the "Institutional" look. Use 1px Silver at 10% opacity for internal card dividers, and 1px Silver at 30% for major section breaks.
- **Bilingual Switcher:** A prominent, sharp-edged toggle or text link in the top-right navigation, using the Gold accent for the active language state.