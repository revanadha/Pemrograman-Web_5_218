# Design Specification: FlipPlay Theme Overhaul (Warm Manga Aesthetic)

## 1. Executive Summary & Objective

This document defines the comprehensive user interface redesign for the **FlipPlay** (*Watch & Read*) web application.

* **Current Baseline:** Cyberpunk / dark-mode interface featuring high-contrast obsidian backgrounds (`#0B0E14`), deep navy blues, and electric purple/indigo accents (`#4F46E5`).
* **Target Redesign:** Inspired by the **NimeGami** warm manga visual style:
  * An inviting, energetic **Warm Cream & Vibrant Tangerine Orange** color palette.
  * Subtle layered **monochrome manga sketch / halftone backgrounds** with textured overlays.
  * Lightweight, milky **frosted glassmorphism** (`backdrop-blur`) replacing rigid opaque containers.
  * Dynamic, **diagonal split layouts** emphasizing anime character cutouts and hero typography.

---

## 2. Color Palette & Visual Token System

### 2.1. Primary, Secondary & Surface Tokens

| Token Name | Hex / RGBA Value | Semantic Usage |
| :--- | :--- | :--- |
| `--color-primary-orange` | `#E87A38` | Primary brand color, hero title highlight, primary action buttons (CTA). |
| `--color-primary-accent` | `#F39C5A` | Gradient highlights, pill badges, active tabs, rating indicators. |
| `--color-primary-soft` | `#FFF1E8` | Chip backgrounds, subtle active borders, secondary badge fills. |
| `--color-bg-base` | `#F6EFE9` | Primary canvas background (warm off-white / newsprint tone). |
| `--color-bg-contrast` | `#EDE4DC` | Section split backgrounds, footer, secondary layout panels. |
| `--color-card-glass` | `rgba(255, 255, 255, 0.65)` | Floating glass panels with `backdrop-filter: blur(16px)`. |
| `--color-text-title` | `#2D231E` | High-contrast headlines and brand identity (warm deep charcoal). |
| `--color-text-body` | `#5A4D45` | Primary body text, descriptions, and synopsis paragraphs. |
| `--color-text-muted` | `#7C6E66` | Secondary metadata, inactive navigation labels, timestamps. |
| `--color-border-subtle` | `rgba(255, 255, 255, 0.55)` | Translucent borders framing glass cards and segmented controls. |

### 2.2. Manga Background Layer Architecture

* **Watermark Layer:** Subtle monochrome manga panels and speedline halftone illustrations placed at `z-index: 0`.
* **Blend Mode & Transparency:** `mix-blend-mode: multiply` set at `12% - 18%` opacity to provide rich artistic texture without impeding typography legibility.
* **Diagonal Mask / Split Canvas:** A dynamic diagonal angle (approximately $-8^\circ$ to $-12^\circ$ or split geometric block) on the right hero partition, creating high-contrast framing for full-body anime character renders.

---

## 3. Layout & Component Design

### 3.1. Floating Glass Navigation Bar

* **Structure:** Sticky or floating glass header with rounded edges and soft border diffusion.
* **Brand Logo:** Distinct geometric wordmark with warm charcoal text (`#2D231E`) and an orange accent glyph or playmark (`#E87A38`).
* **Navigation Links:** Warm muted text (`#7C6E66`) with smooth hover transitions to `#E87A38`, marked with an active dot pill.
* **Right Call to Action (CTA):** Full-pill gradient button:
  ```css
  background: linear-gradient(135deg, #F39C5A 0%, #E87A38 100%);
  color: #FFFFFF;
  box-shadow: 0 4px 16px rgba(232, 122, 56, 0.28);
  border-radius: 9999px;
  ```

### 3.2. Hero Section (Watch & Read Dual Spotlight)

* **Left Column (Typography & Action):**
  * **Pill Category:** Compact badge in `--color-primary-soft` with uppercase bold text in `--color-primary-orange`.
  * **Headline:** Large display font (e.g., *Starlight Horizon: Gerbang Antarbintang*), blending solid warm charcoal with an orange keyword gradient.
  * **Metadata Row:** Rating pill with golden star, publication year, content tags, and resolution indicators.
  * **Interactive CTA Group:**
    * *Primary:* Orange gradient pill button ("Watch Now" / "Putar Sekarang").
    * *Secondary:* Milky frosted-glass pill button with subtle white stroke ("Add to Watchlist" / "+ Daftar Saya").
* **Right Column (Interactive Preview & Character Cutout):**
  * **Layered Anime Cutout:** Transparent PNG character illustration overlapping the background manga collage.
  * **Interactive Interface Simulator:** A floating glass window showcasing the dual-mode player.

### 3.3. Dual-Mode Interface Window (Streaming + E-Reader Switcher)

* **Window Shell:** Soft frosted acrylic container (`rgba(255, 255, 255, 0.72)`) with rounded corners (`border-radius: 24px`) and light top-specular reflection.
* **Mode Switcher (Segmented Control):**
  * **Active Mode:** Solid orange pill fill (`#E87A38`) with white text.
  * **Inactive Mode:** Transparent fill with muted charcoal text.
* **Media Frame:** Rounded media container presenting either the video player timeline or dual manga page spread.
* **Floating Score Bubble:** Circular orange floating badge (`#E87A38`) displaying user scores (e.g., `8.45` or `★ 9.8`) anchored to the card corner.

### 3.4. Content Carousels & Grid Posters

* **Poster Cards:**
  * Corner radius: `rounded-2xl` ($16\text{px} - 20\text{px}$).
  * Shadow: Soft warm ambient drop-shadow (`box-shadow: 0 12px 28px -6px rgba(180, 140, 120, 0.2)`).
  * Hover Effect: Gentle vertical lift ($-6\text{px}$) accompanied by increased shadow depth.
* **Metadata Overlay:** Bottom gradient transitioning from transparent to dark warm umber, ensuring high text contrast for title labels and episode counters.
* **Quick Bookmark Action:** Translucent icon button positioned at the bottom right corner of each card.

---

## 4. Typography System

| Role | Font Family | Weight | Color Token |
| :--- | :--- | :--- | :--- |
| **Display / Hero Title** | *Plus Jakarta Sans* / *Outfit* | 800 (Extrabold) | `--color-text-title` + `--color-primary-orange` |
| **Section Headings** | *Plus Jakarta Sans* | 700 (Bold) | `--color-text-title` |
| **Body / Descriptions** | *Inter* / *Plus Jakarta Sans* | 400 (Regular) – 500 (Medium) | `--color-text-body` |
| **Badges, Buttons & Labels**| *Inter* | 600 (Semibold) | `#FFFFFF` / `--color-primary-orange` |

---

## 5. CSS Implementation Variables

```css
:root {
  /* Surface & Background Canvas */
  --bg-app: #F6EFE9;
  --bg-contrast: #EDE4DC;
  --bg-surface: #FFFFFF;
  --bg-glass: rgba(255, 255, 255, 0.65);
  --bg-glass-heavy: rgba(255, 255, 255, 0.85);

  /* Primary Brand Accents */
  --primary: #E87A38;
  --primary-light: #F39C5A;
  --primary-soft: #FFF1E8;
  --primary-gradient: linear-gradient(135deg, #F39C5A 0%, #E87A38 100%);

  /* Typography */
  --text-title: #2D231E;
  --text-body: #5A4D45;
  --text-muted: #7C6E66;

  /* Borders & Shadows */
  --border-glass: rgba(255, 255, 255, 0.55);
  --border-subtle: rgba(232, 122, 56, 0.18);
  --shadow-warm-card: 0 12px 32px rgba(190, 150, 130, 0.18);
  --shadow-primary-cta: 0 4px 16px rgba(232, 122, 56, 0.28);
}
```

---

## 6. Migration & Overhaul Checklist

1. [ ] **Canvas Overhaul:** Shift root theme variables from dark charcoal (`#0B0E14`) to warm cream paper tone (`#F6EFE9`).
2. [ ] **Manga Texture Implementation:** Add fixed/absolute background vector sketch pattern at $15\%$ opacity with `mix-blend-mode: multiply`.
3. [ ] **Palette Remapping:** Replace all electric purple/cyan accent tokens with `--primary-gradient` and warm orange tints.
4. [ ] **Glassmorphism Tuning:** Convert dark frosted cards to white-milky glass cards (`backdrop-blur: 16px`) with light specular borders.
5. [ ] **Cutout Composition:** Align character PNG cutouts with the angled split background for dynamic visual hierarchy.