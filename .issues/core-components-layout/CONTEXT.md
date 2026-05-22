# Context — Kernkomponenten und Layout-System

Discuss-Phase, festgehalten 2026-05-22.

## Entschiedene Fragen

### D-1 — Klassen-Prefix `gat-`
Alle Komponenten-CSS-Klassen bekommen den Prefix **`gat-`**
(`.gat-header`, `.gat-btn`, `.gat-card`, …). Konsistent mit den `--gat-`-Tokens
und kollisionssicher, da das Stylesheet in fremde Tools eingebunden wird.

### D-2 — Logo-Asset geliefert
Der User hat das Grüne-Logo bereitgestellt (in `/workspace/`):
- `Grüne Logo Bund dunkelgrün RGB.svg` — valides Vektor-SVG (150×132,
  viewBox gesetzt) → **bevorzugte Web-Variante**
- `Grüne Logo Bund dunkel.png` — Raster-Fallback

Das SVG wird mit einem URL-sicheren Namen (ohne Umlaute/Leerzeichen) in einen
Asset-Ordner des Repos übernommen (z. B. `assets/gruene-logo.svg`) und vom
Header referenziert. Die Header-Komponente ist damit **nicht mehr blockiert**.

Offen für Research: Das gelieferte Logo ist **dunkelgrün** — auf einer
dunkelgrünen Fläche unsichtbar. Ob für grüne Header-Hintergründe eine helle/
weiße Logo-Variante nötig ist, klärt die Research-Phase (ggf. später nachzuliefern).

### D-3 — Schriften per `@import` in `design-system.css`
Die Google Fonts (Barlow Semi Condensed, Vollkorn) werden per **`@import` direkt
in `design-system.css`** geladen — Issue #3 hatte das hierher verschoben. Jedes
Tool, das die CSS verlinkt, erhält die Schriften automatisch (Muster wie beim
persönlichen System).

### D-4 — Logo: dunkles SVG + CSS-Umfärbung
Nur das dunkle Vektor-SVG kommt ins Repo. Für grüne Hintergründe (Header) wird
es per CSS zu Weiß umgefärbt (das SVG ist einfarbig → `mask`/`filter`-Recolor
funktioniert sauber). Ein Vektor-Asset, vektorscharf. Die gelieferten weißen
PNGs werden **nicht** verwendet; das CMYK-PNG ist ohnehin nur für Druck.

### D-5 — Header-Hintergrund: Dunkelgrün
Der Header hat einen **dunkelgrünen** Hintergrund (CD-Regel „Typografie immer
auf Grün"). Header-Text in Weiß (`--gat-color-on-primary`), Logo per D-4 weiß
umgefärbt.

### D-6 — Störer: Gelb und Magenta als Varianten
Die „Störer"-Komponente bekommt **Modifier-Klassen für beide** CD-Akzentfarben
(Gelb und Magenta). Das konsumierende Tool wählt je Kontext.

## Rahmen / Annahmen
- Reines CSS, **kein JavaScript** (ISSUE.md Acceptance: „ohne JavaScript
  nutzbar"). Navigation = einfache CSS-Navigation, kein Hamburger-Menü.
- Komponenten verwenden **ausschließlich `--gat-`-Tokens** aus Issue #3 — keine
  hartcodierten Farben/Größen.
- CD-Grundregel „Typografie steht immer auf Grün" wird in den Text-/Karten-
  Komponenten abgebildet (Text auf Dunkel- oder Hellgrün, passende `on-*`-Tokens).
- Komponenten kommen in `design-system.css` (erweitert die Datei aus Issue #3 —
  `:root`-Tokens bleiben, Komponenten-Selektoren darunter).
- Style-Guide-Anzeige der Komponenten ist Scope von Issue #5, nicht hier.

## Umfang dieses Issues (aus ISSUE.md)
Header/Navigation, Layout-Grid & Seitenstruktur, Typografie-Klassen
(Headline/Subline/Fließtext, CD-Zeilenabstände), Buttons (Primär/Sekundär),
Karten/Flächen, Gestaltungselemente (Unterstreichungen, Hervorhebungen, Störer).

## Offene Punkte für Research
- CSS-Grid- vs. Flexbox-Ansatz für Grid/Container.
- Umsetzung des „Störer" (rotiertes Badge) als reine CSS-Komponente.
- Responsives Verhalten ohne JS (Breakpoints, Container-Verhalten).
