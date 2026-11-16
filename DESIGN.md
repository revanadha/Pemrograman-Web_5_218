# Design Specification: FlipPlay Theme (Kobalt & Kertas Koran)

## 1. Executive Summary & Objective

This document defines the visual direction for the **FlipPlay** (*Watch & Read*) web application.

* **Direction:** Newsprint editorial. A warm paper canvas, deep ink typography, cobalt for primary actions, and saffron for highlights.
* **Identity:** Manga zine meets streaming catalogue. Solid paper cards, visible rules, and hard offset shadows replace glass and glow. Cobalt marks the watch/action layer; muted forest green marks the read layer.
* **Scope:** Both light and dark themes. Light uses warm newsprint; dark uses a blue-black screening room, not a brown-black inversion.

---

## 2. Color Palette & Visual Token System

### 2.1. Primary, Secondary & Surface Tokens

| Token Name | Hex / RGBA Value | Semantic Usage |
| :--- | :--- | :--- |
| `--accent` | `#2E4A8C` | Primary action, links, CTA, active states. |
| `--accent-soft` | `#DCE4F4` | Active chips, soft callouts, tinted tags. |
| `--mark` | `#C98A1F` | Saffron highlight for badges, selection, decorative accents. |
| `--paper` | `#F4F0E6` | Page canvas, warm newsprint. |
| `--paper-2` | `#EAE4D7` | Alternate section tint and footer groundwork. |
| `--card` | `#FFFCF5` | Solid card and panel surface. |
| `--ink` | `#191C24` | Headlines and primary text. |
| `--ink-2` | `#454A57` | Body text and metadata. |
| `--muted` | `#626776` | Secondary metadata, captions, timestamps. |
| `--teal` | `#2F6156` | Reader/manga state and secondary semantic accent. |
| `--line` | `rgba(25, 28, 36, 0.16)` | Hairline rules and dividers. |
| `--hard-shadow` | `#191C24` | Offset print shadow on cards and controls. |

### 2.2. Surface & Contrast

* **Paper first:** the page is a flat newsprint canvas. Sections alternate between `--paper` and `--paper-2`; cards stay solid `--card`.
* **Ink lines:** dividers use `--line`, while borders and hard shadows use `--ink` at full strength.
* **No glass, no glow:** blur and colored glow are not part of the system. Depth comes from offset shadows and visible rules.
* **Color roles:** cobalt is reserved for action, saffron for highlight, forest green for the read state. Do not spread the accent across every element.

---

## 3. Layout & Component Design

### 3.1. Site Header

* **Structure:** Sticky paper header with a 1.5px ink hairline at the bottom. No blur, no floating glass.
* **Brand Logo:** Geometric playmark in cobalt (`--accent`) with an ink wordmark (`--ink`).
* **Navigation Links:** Muted ink (`--muted`) that shifts to cobalt on hover. The active destination gets a visible underline, not a glowing dot.
* **Right Call to Action (CTA):** Solid cobalt button with cream text and a hard ink shadow on hover.

### 3.2. Hero Section (Watch & Read Spotlight)

* **Left Column (Typography & Action):**
  * **Chapter label:** Small ink tab with a rule, not a pill badge.
  * **Headline:** Display type in `--ink`, with the key phrase in `--accent`.
  * **Metadata Row:** Rating, year, tags, and resolution set in `--ink-2` and `--muted`.
  * **Interactive CTA Group:** Primary cobalt button plus a secondary paper button with an ink border.
* **Right Column (Interactive Preview):**
  * **Media Frame:** Solid dark blue-black frame with a 1.5px ink border.
  * **Dual-Mode Switcher:** Tonton/Baca tabs inside the paper card. Active tab uses cobalt fill and cream text.
  * **Score Bubble:** Saffron badge (`--mark`) with ink text, anchored to the card corner.

### 3.3. Dual-Mode Interface Window (Watch + E-Reader Switcher)

* **Window Shell:** Solid `--card` container with a 1.5px ink border and `--radius-md` corners. No acrylic or specular reflection.
* **Mode Switcher (Segmented Control):**
  * **Active Mode:** Solid cobalt fill (`--accent`) with cream text.
  * **Inactive Mode:** Transparent fill with muted ink text.
* **Media Frame:** Dark frame presenting either the video player timeline or the manga page spread.

### 3.4. Content Carousels & Grid Posters

* **Poster Cards:** `--card` surface, 1.5px ink border, `--radius-md` corners.
* **Shadow:** Hard offset shadow (`4px 4px 0 var(--hard-shadow)`) only on hover. No soft ambient lift.
* **Metadata Overlay:** Bottom gradient from dark blue-black to transparent, keeping title and episode labels readable.
* **Quick Bookmark Action:** Cream icon button with an ink border.

---

## 4. Typography System

| Role | Font Family | Weight | Color Token |
| :--- | :--- | :--- | :--- |
| **Display / Hero Title** | *Bricolage Grotesque* | 700-800 | `--ink` + `--accent` |
| **Section Headings** | *Plus Jakarta Sans* | 700 | `--ink` |
| **Body / Descriptions** | *Plus Jakarta Sans* | 400-500 | `--ink-2` |
| **Badges, Buttons & Labels** | *Plus Jakarta Sans* | 600-700 | `--on-accent` / `--accent` |

---

## 5. CSS Implementation Variables

```css
:root {
  /* Paper & Surfaces */
  --paper: #F4F0E6;
  --paper-2: #EAE4D7;
  --paper-3: #DED7C7;
  --card: #FFFCF5;

  /* Ink & Typography */
  --ink: #191C24;
  --ink-2: #454A57;
  --muted: #626776;

  /* Cobalt Action */
  --accent: #2E4A8C;
  --accent-deep: #23396E;
  --on-accent: #F9F6EE;
  --accent-soft: #DCE4F4;

  /* Saffron Highlight */
  --mark: #C98A1F;
  --on-mark: #1A1C22;

  /* Reader State */
  --teal: #2F6156;
  --on-teal: #F4F0E6;
  --teal-soft: #D7E6DF;

  /* Lines & Shadows */
  --line: rgba(25, 28, 36, 0.16);
  --line-strong: rgba(25, 28, 36, 0.42);
  --hard-shadow: #191C24;
}
```

---

## 6. Migration & Overhaul Checklist

1. [x] **Canvas Overhaul:** Shift root theme variables to warm newsprint paper (`--paper`).
2. [x] **Palette Remapping:** Replace burnt orange accents with cobalt action and saffron highlights.
3. [x] **Solid Surfaces:** Use opaque paper cards with hard offset shadows; no glassmorphism or glow.
4. [x] **Theme Parity:** Verify light newsprint and dark blue-black modes.
5. [x] **Contrast Check:** Keep body text and actions above WCAG AA in both themes.
6. [x] **Narrative Trim:** Remove the Genre and Watch & Read sections so the remaining sections carry the story without repetition.