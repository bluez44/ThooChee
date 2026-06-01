# Smart Voice Expense Manager - Design System Specification
## Theme: Liquid Clarity

This document defines the comprehensive design system, color palette, typography, and visual guidelines for the **Smart Voice Expense Manager** application.

---

## 💎 Brand & Style: Financial Transparency

The "Liquid Clarity" design system centers on the core concept of **Financial Transparency**. It leverages a **Glassmorphic Minimalism** aesthetic to reduce the anxiety often associated with money management, providing a user interface that feels like a clean, organized, and open physical space.

The style draws heavily from modern mobile OS patterns, utilizing layered translucency, high-quality typography, and organic "liquid" motion. The interface should feel like a series of etched glass panes floating over a soft, ethereal background, creating depth and hierarchy without the clutter of heavy shadows or solid fills.

### Key Principles

*   **Clarity:** Every interaction must be highly legible, clean, and immediate.
*   **Ethereality:** Use backdrop blurs to maintain context while keeping focus on the foreground.
*   **Precision:** High-contrast text against soft, translucent glass containers ensures a professional, fintech-appropriate feel.

---

## 🎨 Color Palette

Liquid Clarity uses a "Clean White" foundation optimized for a light-mode-first experience that feels fresh and inviting.

### Brand & Accent Colors

| Token Name | Hex Code | Visual Preview | Description & Usage |
| :--- | :--- | :--- | :--- |
| `primary` | `#0058bc` | `█` (Blue) | Interactive states, primary accents, primary links. |
| `primary-container` | `#0070eb` | `█` (Vibrant Blue) | Primary button background, active segments. |
| `secondary` | `#006e28` | `█` (Green) | Income, deposits, positive balances, and growth indicators. |
| `secondary-container` | `#6ffb85` | `█` (Mint Green) | Positive balance highlights, success containers. |
| `tertiary` | `#bc000a` | `█` (Red) | Expenses, withdrawals, over-budget warnings, and alerts. |
| `tertiary-container` | `#e2241f` | `█` (Vibrant Red) | High-severity warnings, destructive actions. |
| `error` | `#ba1a1a` | `█` (Dark Red) | System error text, invalid input states. |
| `error-container` | `#ffdad6` | `█` (Light Pink) | Error message container background. |

### Surface & Neutral Colors

| Token Name | Hex Code | Visual Preview | Description & Usage |
| :--- | :--- | :--- | :--- |
| `background` | `#faf9fe` | `█` (Very Light Gray/Blue) | Main canvas background. |
| `on-background` | `#1a1b1f` | `█` (Dark Slate) | Text and icons on the main canvas. |
| `surface` | `#faf9fe` | `█` | Standard container background. |
| `surface-dim` | `#dad9df` | `█` | Dimmed surface background. |
| `surface-bright` | `#faf9fe` | `█` | High-contrast container surface. |
| `surface-container-lowest` | `#ffffff` | `█` (Pure White) | Lowest level surfaces (e.g., card highlights). |
| `surface-container-low` | `#f4f3f8` | `█` | Low contrast surface card background. |
| `surface-container` | `#eeedf3` | `█` | Standard translucent cards. |
| `surface-container-high` | `#e9e7ed` | `█` | Elevated surface containers. |
| `surface-container-highest` | `#e3e2e7` | `█` | Top-level interactive elements. |
| `on-surface` | `#1a1b1f` | `█` | Primary text and icons on cards. |
| `on-surface-variant` | `#414755` | `█` | Secondary labels, timestamps, metadata. |
| `outline` | `#717786` | `█` | Component borders and dividers. |
| `outline-variant` | `#c1c6d7` | `█` | Light dividers, inactive state borders. |

---

## 🔠 Typography: Legible & Bottom-Heavy

This design system utilizes **Inter** for its exceptional legibility and systematic feel. The type hierarchy is intentionally "bottom-heavy" to ensure that financial data (numbers, transactional labels) remains the hero of the interface.

*   **Primary Typeface:** `Inter` (Sans-Serif)
*   **Headline Typeface:** `Inter`
*   **Body & Label Typeface:** `Inter`

### Text Style Hierarchy

| Style Name | Font Family | Size | Weight | Line Height | Letter Spacing | Ideal Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `display-lg` | Inter | `40px` | `700` (Bold) | `48px` | `-1px` | Large hero values, main balance display |
| `headline-lg` | Inter | `32px` | `600` (SemiBold) | `40px` | `-0.5px` | Screen titles, summary cards header |
| `headline-md` | Inter | `24px` | `600` (SemiBold) | `32px` | `0px` | Section titles, list headers, major amounts |
| `body-lg` | Inter | `18px` | `400` (Regular) | `26px` | `0px` | Lead paragraphs, transaction descriptions |
| `body-md` | Inter | `16px` | `400` (Regular) | `24px` | `0px` | Standard body copy, list secondary text |
| `label-md` | Inter | `14px` | `500` (Medium) | `20px` | `0.2px` | Form labels, button text, categories |
| `label-sm` | Inter | `12px` | `600` (SemiBold) | `16px` | `0px` | Micro-metadata, tags, pill badges |

---

## 📐 Layout & Spacing

The layout philosophy follows a **Fluid Mobile-First** model. Content is organized into "Glass Modules" that span the width of the screen minus side margins.

*   **Grid:** Standard 4-column mobile grid.
*   **Outer Page Margin:** `20px` (container padding).
*   **Gutter Width:** `16px` (stack gap).
*   **Rhythm:** An `8px` linear scale is used for all internal padding and component spacing.

| Token | Value | Application |
| :--- | :--- | :--- |
| `unit` | `8px` | Core padding unit |
| `stack-gap` | `16px` | Vertical spacing between adjacent cards |
| `container-padding`| `20px` | Outer edge margins |
| `section-margin` | `32px` | Large vertical spacing between page sections |
| `touch-target-min` | `44px` | Minimum dimension for interactive items |

---

## ✨ Elevation, Depth & Shapes

Depth is achieved through **optical layers** and translucent elements rather than traditional drop shadows.

### Z-Index Logic & Layers
1.  **Level 0 (Canvas):** A soft gradient background (e.g., light blue to pale lavender) provides the "underlay" that makes the glass effect visible.
2.  **Level 1 (Glass Layers):** Primary content glass panes using white fill at `70%` opacity. Must feature a `1px` solid white border at `30%` opacity to simulate the "edge light" of a pane of glass.
3.  **Level 2 (Overlays & Floating Buttons):** Floating Action Buttons (FABs) and modal overlays (increased blur and very faint, wide ambient shadow).

### Shape Language
The shape language is organic and "liquid." Sharp corners are strictly avoided to maintain a friendly, modern user experience.

*   **Containers:** Use `rounded-xl` (24px) for all primary cards, bottom sheets, and modals.
*   **Buttons:** Large buttons use a fully rounded/pill-shaped profile (`32px+`) to maximize touch-friendliness.
*   **Inputs:** Text fields use a `16px` border radius to balance the softer cards.
*   **Micro-elements:** Chips, tags, and category labels should be fully pill-shaped.

---

## 🧩 Component Styling Guidelines

### 1. Glass Cards
The core container of the app. Every card must have:
*   `backdrop-filter: saturate(180%) blur(24px)`
*   `background: rgba(255, 255, 255, 0.7)`
*   `border: 1px solid rgba(255, 255, 255, 0.3)`
*   `padding: 20px`
*   `border-radius: 24px`

### 2. Buttons
*   **Primary Button:** Large (min-height: `56px`) with a solid blue fill or a high-contrast white glass effect. Press state uses a subtle scale-down (`0.98x`) for tactile responsiveness.
*   **Secondary Button:** Fully pill-shaped with light glass translucent background and high contrast text.

### 3. Transaction Lists
*   List items are separated by thin, 1px horizontal lines (`10%` opacity black) that do not extend to the outer edges of the card, creating a "floating list" feel.
*   Category icons are housed in circular, soft-colored containers.

### 4. Input Fields
*   Styled as "recessed" glass or simple underlined fields with `16px` bottom padding.
*   Focus states are indicated by increasing the border thickness or increasing the primary color's saturation.

### 5. Segmented Controls
*   Used for switching views (e.g., "Weekly", "Monthly", "Yearly").
*   The selected state should be a white glass pill that "slides" behind the text options, mimicking the iOS native system style.
