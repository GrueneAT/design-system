# Research: Sichtbarer Style Guide

**Researched:** 2026-05-22
**Issue:** style-guide-page (GrueneAT/design-system#5)
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-1 — Maschinenlesbare Spezifikation eingebettet in `index.html`.** Der
  maschinenlesbare Spezifikationsteil (geschlossenes Token-/Klassen-Vokabular +
  Nutzungsregeln) wird als **`<script type="application/json">`-Block in
  `index.html`** eingebettet. Eine Datei, alles beisammen — Muster wie der
  artifact-html-Contract. **Kein separates `design-system.json`.**
- **D-2 — Doc-spezifisches CSS als inline `<style>` in `index.html`.**
  Doc-Chrome, das keine echte Designsystem-Komponente ist (Farb-Swatches,
  Code-Blöcke, Do/Don't-Raster), kommt als **kleiner `<style>`-Block in die
  `index.html`**. `design-system.css` bleibt sauber auf Tokens + echte
  Komponenten beschränkt; die Seite *dogfooded* sie.

### Claude's Discretion (Rahmen / Annahmen)
- Genau **eine** Seite: die bestehende `index.html` wird zum vollständigen Style
  Guide ausgebaut.
- Die Seite bindet `design-system.css` ein und nutzt die echten
  Komponenten/Tokens selbst (Dogfooding) — gezeigte Beispiele sind real
  gerendert, nicht abgemalt.
- Deutschsprachig (konsistent mit dem Projekt).
- Reines HTML/CSS, **kein JavaScript** — Anchor-Link-TOC statt JS-Navigation.
- Inhalt: alle Farb-Tokens (HEX + Verwendungszweck), Typo-Skala mit
  Live-Beispielen, alle Kernkomponenten als gerenderte Beispiele,
  CD-Layout-Grundprinzipien (Schutzzone, Logo-Verhältnis, „Typografie auf Grün").

### Deferred Ideas (OUT OF SCOPE)
- Querverlinkung zum persönlichen System (`flomotlik.github.io/claude-code`)
  und der Integrations-Leitfaden sind **Issue #6** — hier nicht.
- `design-system.css` und `assets/` werden **nicht verändert** — Issue #5
  schreibt ausschließlich `index.html`.
</user_constraints>

## Summary

Issue #5 baut die heutige Skelett-`index.html` zu einem vollständigen,
sichtbaren Style Guide aus — eine einzige deutschsprachige HTML-Seite, ohne
JavaScript, die das gehostete `design-system.css` selbst einbindet und
*dogfooded*. Die gesamte Arbeitsfläche ist bereits bekannt: `design-system.css`
ist vollständig kommentiert und enthält **22 `--gat-*`-Tokens** (4 primitive
Farben, 2 Neutrals, 8 semantische Farb-Aliase, 3 Schrift-Tokens, 6 Typo-Größen,
2 Zeilenabstände, 6 Abstände, 4 Komponenten-Maße, 2 Breakpoints — siehe
Inventur unten) sowie **22 `.gat-*`-Klassen** (5 Layout, 6 Header/Nav, 4
Typografie, 3 Button, 4 Karte, 5 CD-Element). Der Style Guide muss jedes Token
und jede Klasse lückenlos abbilden — das ist das zentrale Akzeptanzkriterium.

Das persönliche System unter `flomotlik.github.io/claude-code/` dient als
strukturelles Vorbild: eine zweiteilige Gliederung **Grundlagen → Komponenten**,
nummerierte Abschnitte, Komponenten ausschließlich als live gerenderte
Beispiele mit kurzer Nutzungsnotiz. Es hat allerdings **keinen Anchor-TOC und
keinen JSON-Spec-Block** — der Grüne-AT-Guide geht hier per Issue-Auftrag
bewusst darüber hinaus (CONTEXT verlangt explizit einen No-JS-Anchor-TOC und D-1
einen eingebetteten JSON-Spec). Der Guide hat ferner seine **eigene visuelle
Identität** (grünes CD), nicht den Notizbuch-Look des persönlichen Systems.

Die saubere Trennung von **echten Komponenten** (mit `design-system.css`-Klassen
gerendert) und **Doc-Chrome** (Swatches, Code-Blöcke, Do/Don't-Raster — per D-2
in einem kleinen inline `<style>`) ist der wichtigste strukturelle Hebel: sie
hält das Stylesheet sauber und macht das Dogfooding ehrlich.

**Primary recommendation:** Eine einzelne `index.html` mit `<header
class="gat-header">`, einem Anchor-TOC in der Nav, sechs `<section
class="gat-section">`-Blöcken (Farben, Typografie, Layout, Komponenten,
CD-Layout-Prinzipien, Maschinenlesbare Spezifikation), Doc-Chrome in einem
inline `<style>` (D-2) und der Spec als `<script type="application/json">` (D-1).
Komponenten immer doppelt zeigen: links/oben das **live gerenderte** Beispiel,
darunter der **Markup-Quelltext** in einem Doc-Code-Block.

## Codebase Analysis

### Relevant Code

| File | Purpose | Last Modified | Relevance |
|------|---------|---------------|-----------|
| `/workspace/design-system/index.html` | Aktuelles Skelett (Issue #2) — wird ausgebaut | 2026-05-22 | DAS ZU ÄNDERNDE FILE — einziges Schreibziel |
| `/workspace/design-system/design-system.css` | Vollständiges Stylesheet: `:root`-Tokens + `.gat-`-Komponenten | 2026-05-22 | Read-only; liefert die komplette zu dokumentierende Fläche |
| `/workspace/design-system/assets/gruene-logo.svg` | Logo, monochrom dunkelgrün, `viewBox 0 0 150.32 132.07` | 2026-05-22 | Read-only; vom `.gat-header__logo-mark` per CSS-Maske referenziert |
| `/workspace/design-system/.github/workflows/pages.yml` | GitHub-Pages-Deploy (`path: '.'`, push auf `main`) | 2026-05-22 | Bestätigt: `index.html` im Repo-Root wird automatisch deployt — keine Build-Schritte nötig |
| `/workspace/design-system/README.md` | Repo-Überblick, kanonische URLs | 2026-05-22 | Kontext; nennt `grueneat.github.io/design-system/` als Live-URL |

**Hinweis:** Die in der Aufgabe genannten Archiv-Ordner
`/workspace/.issues/archive/design-tokens-from-cd/` und
`/workspace/.issues/archive/core-components-layout/` existieren in diesem
Checkout **nicht** (Issues #3/#4 sind auf GitHub geschlossen, ihre Artefakte
nicht lokal). Das ist unkritisch: `design-system.css` ist durchgehend mit der
Begründung jeder Entscheidung kommentiert und referenziert die CONTEXT-Decisions
D-1…D-6 der Vorgänger-Issues direkt im Code — das genügt als Rationale-Quelle.

### Vollständige Token-Inventur — `:root` in `design-system.css`

Der Style Guide muss **alle 22 Tokens** abbilden. Gruppiert wie im CSS:

**Farben — Primitive (1:1 aus dem CD-Quickguide), 4:**

| Token | Wert | Verwendungszweck |
|-------|------|------------------|
| `--gat-color-dunkelgruen` | `#257639` | Primäre Markenfarbe (Dunkelgrün) |
| `--gat-color-hellgruen` | `#56af31` | Sekundäre Markenfarbe (Hellgrün) |
| `--gat-color-gelb` | `#ffed00` | Highlight-Farbe (Gelb) |
| `--gat-color-magenta` | `#e6007e` | Akzentfarbe (Magenta); HEX maßgeblich, PDF-RGB inkonsistent |

**Farben — Neutrals (Web-Ergänzung, nicht im CD-Quickguide), 2:**

| Token | Wert | Verwendungszweck |
|-------|------|------------------|
| `--gat-color-weiss` | `#ffffff` | Flächen / Text auf Grün |
| `--gat-color-anthrazit` | `#1d1d1b` | Dunkler Textton |

**Farben — Semantische Aliase (verweisen auf Primitive), 8:**

| Token | Verweist auf | Verwendungszweck |
|-------|--------------|------------------|
| `--gat-color-primary` | dunkelgruen | Primärfläche |
| `--gat-color-secondary` | hellgruen | Sekundärfläche |
| `--gat-color-accent` | magenta | Akzent (Unterstreichung, Störer) |
| `--gat-color-highlight` | gelb | Hervorhebung / Nav-Unterstreichung |
| `--gat-color-text` | anthrazit | Standard-Textfarbe |
| `--gat-color-surface` | weiss | Standard-Hintergrund |
| `--gat-color-on-primary` | weiss | Text auf Dunkelgrün — Kontrast 5,63:1 |
| `--gat-color-on-secondary` | anthrazit | Text auf Hellgrün — Kontrast 6,09:1 |

**Schrift, 3:**

| Token | Wert | Verwendungszweck |
|-------|------|------------------|
| `--gat-font-headline` | `'Barlow Semi Condensed', sans-serif` | Headlines (CD: Gotham-Ultra-Ersatz) |
| `--gat-font-copy` | `'Barlow Semi Condensed', sans-serif` | Fließtext / UI |
| `--gat-font-emphasis` | `'Vollkorn', serif` | Hervorhebungen / Zitate |

**Typo-Größen (modulare Skala, Basis 1rem, Ratio 1,25), 6:**

| Token | Wert | Verwendungszweck |
|-------|------|------------------|
| `--gat-text-h1` | `2.441rem` | Headline (H1-Rolle) |
| `--gat-text-h2` | `1.953rem` | H2 |
| `--gat-text-h3` | `1.563rem` | H3 / Karten-Titel |
| `--gat-text-subline` | `1.25rem` | Subline |
| `--gat-text-copy` | `1rem` | Fließtext |
| `--gat-text-small` | `0.8rem` | Kleintext |

**Zeilenabstände (einheitslos, direkt aus dem CD-Quickguide), 2:**

| Token | Wert | Verwendungszweck |
|-------|------|------------------|
| `--gat-leading-headline` | `0.9` | Headline-/Subline-Zeilenabstand |
| `--gat-leading-copy` | `1.3` | Fließtext-Zeilenabstand |

**Abstände (Web-Ergänzung, Basis 0.25rem), 6:**

| Token | Wert |
|-------|------|
| `--gat-space-1` | `0.25rem` |
| `--gat-space-2` | `0.5rem` |
| `--gat-space-3` | `1rem` |
| `--gat-space-4` | `1.5rem` |
| `--gat-space-5` | `2rem` |
| `--gat-space-6` | `3rem` |

**Komponenten-Maße (Web-Ergänzung, Issue #4), 4:**

| Token | Wert | Verwendungszweck |
|-------|------|------------------|
| `--gat-radius-sm` | `0.25rem` | Kleine Rundung — Buttons, Badges |
| `--gat-radius-md` | `0.5rem` | Karten-Rundung |
| `--gat-border-width` | `2px` | Standard-Strichstärke |
| `--gat-container-max` | `72rem` | Maximale Inhaltsbreite |

**Breakpoints (NUR Dokumentation — `@media` kann kein `var()` lesen), 2:**

| Token | Wert |
|-------|------|
| `--gat-breakpoint-sm` | `36rem` |
| `--gat-breakpoint-md` | `48rem` |

> **Doku-Hinweis für den Guide:** Es gibt im CSS *keinen* tokenisierten Wert für
> die CD-Schutzzone M oder das Logo-Verhältnis — diese stehen nur als
> Kommentar (`Schutzzone M = 0,06 × kurze Kante`, `Logo 3×M Print / 2,5×M
> Digital`, `Textabstand = X × 2`). Der CD-Layout-Abschnitt dokumentiert sie als
> Prinzipien, nicht als Token-Tabelle.

### Vollständige Klassen-Inventur — `.gat-*` in `design-system.css`

Der Style Guide muss **alle 22 Klassen** als gerendertes Beispiel zeigen:

**Layout / Seitenstruktur, 5:**

| Klasse | Zweck |
|--------|-------|
| `.gat-container` | Zentrierter Inhalts-Container, `max-width` 72rem, seitliches Padding |
| `.gat-grid` | Responsives Raster, `auto-fit`/`minmax` — bricht ohne Media-Query um |
| `.gat-grid--2` | Feste 2-Spalten-Variante (bricht < 36rem auf 1 Spalte) |
| `.gat-grid--3` | Feste 3-Spalten-Variante (bricht < 36rem auf 1 Spalte) |
| `.gat-section` | Vertikaler Block mit CD-Abstandsrhythmus (`padding-block` space-6) |

**Header / Navigation, 6:**

| Klasse | Zweck |
|--------|-------|
| `.gat-header` | Seitenkopf auf Dunkelgrün, setzt Fläche + `on-primary`-Text |
| `.gat-header__inner` | Zentrierte Header-Zeile (Flexbox, umbrechend) |
| `.gat-header__logo` | Logo-Wrapper; Padding = CD-Schutzzone |
| `.gat-header__logo-mark` | Logo-Bildmarke; CSS-Maske färbt das SVG auf Weiß um |
| `.gat-nav` | Navigations-Container (Flexbox, umbrechend statt Hamburger) |
| `.gat-nav__link` | Navigationslink; `:hover/:focus` zeigt gelbe Unterstreichung |
| `.gat-nav__link--active` | Aktiver Link — dauerhafte gelbe Unterstreichung |

*(6 Klassen + 1 Modifier `--active`; siehe `<interfaces>`.)*

**Typografie, 4:**

| Klasse | Zweck |
|--------|-------|
| `.gat-headline` | Headline (H1-Rolle), Barlow Black 900 |
| `.gat-subline` | Subline, Barlow Semibold 600 |
| `.gat-fliesstext` | Fließtext, Barlow Regular 400, Zeilenabstand 1,3 |
| `.gat-emphasis` | Hervorhebung/Zitat, Vollkorn Black-Kursiv |

**Buttons, 3:**

| Klasse | Zweck |
|--------|-------|
| `.gat-btn` | Basis-Button (Layout, Padding, Rundung, Fokus-Outline) |
| `.gat-btn--primary` | Primär: dunkelgrüne Fläche, weißer Text |
| `.gat-btn--secondary` | Sekundär: Outline-Stil, grüner Rahmen, füllt bei Hover |

**Karten / Flächen, 4:**

| Klasse | Zweck |
|--------|-------|
| `.gat-card` | Basis-Karte (Layout, Padding, Rundung — stets über Variante genutzt) |
| `.gat-card--primary` | Primär-Karte: dunkelgrüne Fläche, weißer Text |
| `.gat-card--secondary` | Sekundär-Karte: hellgrüne Fläche, Anthrazit-Text |
| `.gat-card__title` | Karten-Titel (erbt `color` der Variante) |
| `.gat-card__body` | Karten-Fließtext (erbt `color` der Variante) |

*(4 Block-/Modifier-Klassen + 2 Element-Klassen `__title`/`__body`.)*

**CD-Gestaltungselemente, 5:**

| Klasse | Zweck |
|--------|-------|
| `.gat-underline` | CD-Unterstreichung in Magenta unter Inline-Text |
| `.gat-highlight` | Gelbe Marker-Fläche hinter Inline-Text |
| `.gat-stoerer` | „Störer" — leicht gedrehtes Badge (`rotate(-6deg)`) |
| `.gat-stoerer--gelb` | Störer-Variante: gelbe Fläche, Anthrazit-Text |
| `.gat-stoerer--magenta` | Störer-Variante: magenta Fläche, weißer Text |

### Interfaces

<interfaces>
/* ===================================================================== *
 * design-system.css — vollständiges öffentliches Vokabular (read-only).  *
 * Der Style Guide dokumentiert exakt diese Tokens + Klassen.             *
 * Issue #5 ändert diese Datei NICHT — sie wird nur eingebunden + gezeigt.*
 * ===================================================================== */

/* --- :root Custom Properties (22 Tokens) ---------------------------- */
/* Farb-Primitive */    --gat-color-dunkelgruen: #257639;
                        --gat-color-hellgruen:   #56af31;
                        --gat-color-gelb:        #ffed00;
                        --gat-color-magenta:     #e6007e;
/* Neutrals */          --gat-color-weiss:       #ffffff;
                        --gat-color-anthrazit:   #1d1d1b;
/* Semantische Aliase */--gat-color-primary      -> dunkelgruen;
                        --gat-color-secondary    -> hellgruen;
                        --gat-color-accent       -> magenta;
                        --gat-color-highlight    -> gelb;
                        --gat-color-text         -> anthrazit;
                        --gat-color-surface      -> weiss;
                        --gat-color-on-primary   -> weiss;     /* 5,63:1 */
                        --gat-color-on-secondary -> anthrazit; /* 6,09:1 */
/* Schrift */           --gat-font-headline: 'Barlow Semi Condensed', sans-serif;
                        --gat-font-copy:     'Barlow Semi Condensed', sans-serif;
                        --gat-font-emphasis: 'Vollkorn', serif;
/* Typo-Größen */       --gat-text-h1: 2.441rem;  --gat-text-h2: 1.953rem;
                        --gat-text-h3: 1.563rem;  --gat-text-subline: 1.25rem;
                        --gat-text-copy: 1rem;    --gat-text-small: 0.8rem;
/* Zeilenabstände */    --gat-leading-headline: 0.9; --gat-leading-copy: 1.3;
/* Abstände */          --gat-space-1: 0.25rem ... --gat-space-6: 3rem;
/* Komponenten-Maße */  --gat-radius-sm: 0.25rem; --gat-radius-md: 0.5rem;
                        --gat-border-width: 2px;  --gat-container-max: 72rem;
/* Breakpoints (Doku) */--gat-breakpoint-sm: 36rem; --gat-breakpoint-md: 48rem;

/* --- Komponenten-Klassen (22) — erwartetes Markup ------------------- */

/* Layout */
.gat-container        /* <div class="gat-container">...</div> */
.gat-grid             /* <div class="gat-grid">...N Kinder...</div> */
.gat-grid--2 / --3    /* feste Spaltenzahl; mit .gat-grid kombinieren */
.gat-section          /* <section class="gat-section">...</section> */

/* Header / Navigation — erwartete Struktur:
   <header class="gat-header">
     <div class="gat-header__inner">
       <a class="gat-header__logo"><span class="gat-header__logo-mark"></span></a>
       <nav class="gat-nav">
         <a class="gat-nav__link gat-nav__link--active" href="#...">...</a>
         <a class="gat-nav__link" href="#...">...</a>
       </nav>
     </div>
   </header>
   HINWEIS: .gat-header__logo-mark referenziert assets/gruene-logo.svg
   relativ — funktioniert, da index.html und assets/ im Repo-Root liegen. */

/* Typografie — reine Inline-/Block-Textklassen, setzen nur Schrift+color */
.gat-headline   /* <h_ class="gat-headline">...</h_> */
.gat-subline    /* <p class="gat-subline">...</p> */
.gat-fliesstext /* <p class="gat-fliesstext">...</p> */
.gat-emphasis   /* <em class="gat-emphasis">...</em> oder <blockquote> */

/* Buttons — Basis + Pflicht-Modifier */
.gat-btn .gat-btn--primary    /* <a|button class="gat-btn gat-btn--primary"> */
.gat-btn .gat-btn--secondary  /* <a|button class="gat-btn gat-btn--secondary"> */

/* Karten — Basis IMMER mit Variante; Titel/Body erben color
   <article class="gat-card gat-card--primary">
     <h3 class="gat-card__title">...</h3>
     <p  class="gat-card__body">...</p>
   </article>
   Variante --secondary analog. */

/* CD-Gestaltungselemente */
.gat-underline   /* <span class="gat-underline">...</span> */
.gat-highlight   /* <mark class="gat-highlight">...</mark> */
.gat-stoerer .gat-stoerer--gelb    /* <span class="gat-stoerer gat-stoerer--gelb"> */
.gat-stoerer .gat-stoerer--magenta /* <span class="gat-stoerer gat-stoerer--magenta"> */

/* --- Asset --------------------------------------------------------- */
/* assets/gruene-logo.svg : monochrom #2d793c, viewBox 0 0 150.32 132.07
   Aspect-Ratio 150.32/132.07. Vom Header per CSS mask auf Weiß umgefärbt. */

/* --- D-1: maschinenlesbarer Spec-Block — vorgeschlagene JSON-Form ---- *
 * <script type="application/json" id="gat-design-spec"> ... </script>   */
{
  "name": "Grüne AT Design System",
  "version": "1.0",
  "stylesheet": "https://grueneat.github.io/design-system/design-system.css",
  "license": "CC BY 4.0",
  "tokens": {
    "color": { "--gat-color-dunkelgruen": { "value": "#257639",
               "role": "primitive", "usage": "Primäre Markenfarbe" }, "...": {} },
    "font":  { "...": {} }, "text": { "...": {} }, "leading": { "...": {} },
    "space": { "...": {} }, "size": { "...": {} }
  },
  "components": {
    "gat-btn": {
      "purpose": "Basis-Button",
      "modifiers": ["gat-btn--primary", "gat-btn--secondary"],
      "requires": "ein Modifier ist Pflicht",
      "markup": "<a class=\"gat-btn gat-btn--primary\">...</a>"
    }
    /* ... je Klasse: purpose, modifiers, requires, markup ... */
  },
  "rules": [
    "Typografie steht immer auf grüner Fläche (CD-Grundregel).",
    "Komponenten-Selektoren sind flach, einklassig, .gat--präfixiert.",
    "Keine nackten Tag-Selektoren — fremdes Markup darf nicht umgestylt werden.",
    "Jeder Komponentenwert verweist auf ein --gat--Token.",
    ".gat-card wird nie ohne Varianten-Modifier verwendet.",
    "Weiß-Text wird nie auf Hellgrün/Gelb gepaart (Kontrast)."
  ]
}
</interfaces>

### Reusable Components

Der Style Guide baut **ausschließlich auf bereits vorhandenem Vokabular** auf:

- Seitenkopf, Navigation und der Anchor-TOC werden direkt aus
  `.gat-header` / `.gat-header__inner` / `.gat-header__logo` /
  `.gat-header__logo-mark` / `.gat-nav` / `.gat-nav__link` gebaut — der TOC ist
  damit selbst ein gerendertes Beispiel (Dogfooding der Navigation).
- Abschnittsrahmen aus `.gat-section` + `.gat-container`.
- Beispiel-Raster (z. B. Farb-Swatches in Reihen, Karten nebeneinander) aus
  `.gat-grid` / `.gat-grid--2` / `.gat-grid--3`.
- Die GitHub-Pages-Pipeline (`pages.yml`, `path: '.'`) existiert — kein
  Build-Schritt, kein neues Workflow-File nötig; ein Push auf `main` deployt.

### Potential Conflicts

- **Doc-Chrome vs. echte Komponenten (D-2).** Farb-Swatch-Kacheln, Code-Blöcke
  und Do/Don't-Raster sind *keine* `gat-`-Komponenten. Sie dürfen **nicht** als
  `gat-`-Klassen getarnt werden und gehören in den inline `<style>`-Block. Eigene
  Doc-Klassen klar präfixieren (Empfehlung: `doc-` statt `gat-`), damit die
  Trennung sichtbar bleibt.
- **Logo-Pfad.** `.gat-header__logo-mark` referenziert `assets/gruene-logo.svg`
  *relativ zur CSS-Datei*. Da `design-system.css`, `index.html` und `assets/`
  alle im Repo-Root liegen, löst der Pfad sowohl lokal als auch auf GitHub Pages
  korrekt auf — nicht „reparieren".
- **`.gat-card` ohne Variante.** Die Basis-Karte hat absichtlich keine eigene
  Fläche. Im Guide jede Karte mit `--primary` oder `--secondary` zeigen, sonst
  wirkt das Beispiel „kaputt" (unsichtbarer Text auf transparentem Grund).
- **Überschriebene Tag-Defaults.** `design-system.css` setzt bewusst *keine*
  nackten Tag-Selektoren. Der Style-Guide-Fließtext (`<p>`, `<h2>`, `<body>`)
  ist daher **ungestyled**, solange ihm keine `gat-`/`doc-`-Klasse zugewiesen
  wird. Body-Hintergrund, Standard-Textfarbe und Abschnitts-Überschriften der
  Doc-Seite müssen explizit gesetzt werden — entweder via `gat-`-Typoklassen
  (Dogfooding) oder via `doc-`-Klassen im inline `<style>`.

## Standard Stack

| Library | Version | Purpose | Why Standard | Confidence |
|---------|---------|---------|--------------|------------|
| (keine) | — | — | Reines HTML/CSS, kein JS, keine Build-Tools — CONTEXT-Vorgabe | HIGH |
| `design-system.css` | im Repo (`main`) | Tokens + Komponenten | Wird eingebunden + dogfooded; nicht verändert | HIGH |
| Barlow Semi Condensed / Vollkorn | Google Fonts | Schriften | Bereits per `@import` in `design-system.css` geladen — `index.html` muss nichts tun | HIGH |
| GitHub Pages (`pages.yml`) | actions v5/v6 | Hosting | Bereits konfiguriert; `path: '.'` deployt `index.html` direkt | HIGH |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Separate `design-system.json` | Eingebetteter `<script type="application/json">` | D-1 entscheidet: eingebettet. Eine Datei, kein Sync-Risiko, Muster wie artifact-html-Contract. |
| JS-gestützte Navigation / Smooth-Scroll | Native `<a href="#anchor">` + CSS `scroll-behavior: smooth` | CONTEXT verbietet JS. Native Anchor-Links funktionieren ohne JS vollständig. |
| Komponenten-CSS für Doc-Chrome in `design-system.css` | Inline `<style>` in `index.html` | D-2 entscheidet: inline. Hält das gehostete Stylesheet sauber. |

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Seitenkopf + Navigation | Eigenes Header-Markup mit Ad-hoc-CSS | `.gat-header*` / `.gat-nav*` | Dogfooding — die Seite muss das echte System nutzen |
| Responsives Beispiel-Raster | Eigene Flex/Grid-Regeln | `.gat-grid` / `--2` / `--3` | Schon vorhanden, bricht selbsttätig um |
| Smooth-Scroll zum Anker | JS-Scroll-Handler | CSS `scroll-behavior: smooth` (im `doc-`-`<style>`) | Kein JS erlaubt; CSS reicht |
| Schriften laden | Eigene `@font-face` / `<link>` zu Google Fonts | Nichts — `design-system.css` importiert sie bereits | Doppellader vermeiden |
| JSON-Spec serialisieren/escapen | Spec von Hand mit Sonderzeichen tippen | Saubere, valide JSON-Struktur; im `<script>` nur `</script` zu `<\/script` brechen falls nötig | Verhindert Markup-Korruption |

## Architecture Patterns

### Recommended Approach

Eine `index.html`, deklarativ aufgebaut. Die sechs Bau-Schritte entsprechen
exakt den sechs Abschnitten der fertigen Seite (Vorbild: zweiteilig Grundlagen
→ Komponenten des persönlichen Systems, hier um CD-Layout + Spec erweitert):

**Step 1 — Kopf + inline `<style>` + Anchor-TOC.** `<head>` mit `lang="de"`,
`<title>`, `<link rel="stylesheet" href="design-system.css">`, dann der inline
`<style>`-Block (D-2: ausschließlich `doc-`-Klassen, `html { scroll-behavior:
smooth }`, `scroll-margin-top` auf Ankern, Body-Grundlayout). Direkt darunter
`<header class="gat-header">` mit Logo und `.gat-nav` als **Anchor-TOC** — je
ein `.gat-nav__link` pro Abschnitt (`href="#farben"` usw.). Der TOC ist damit
gleichzeitig gerendertes Navigations-Beispiel.

**Step 2 — Abschnitt Farben (`#farben`).** Alle 14 Farb-Tokens (4 Primitive,
2 Neutrals, 8 Aliase) als Swatch-Kacheln mit Farbfläche, Token-Name, HEX und
Verwendungszweck; `on-primary`/`on-secondary` mit Kontrast-Notiz.

**Step 3 — Abschnitt Typografie (`#typografie`).** 3 Schrift-Tokens, 6 Größen,
2 Zeilenabstände; Live-Beispiele mit `.gat-headline` / `.gat-subline` /
`.gat-fliesstext` / `.gat-emphasis`; die Typo-Skala als Specimen-Reihe.

**Step 4 — Abschnitt Layout (`#layout`).** `.gat-container`, `.gat-grid`
(+ `--2`/`--3`), `.gat-section`; Abstands-Skala (6 `--gat-space-*`) als
Balken-Demo; Breakpoints als Doku-Notiz.

**Step 5 — Abschnitt Komponenten (`#komponenten`).** Header/Nav, Buttons
(primary/secondary, inkl. Hover/Fokus-Hinweis), Karten (primary/secondary),
CD-Elemente (`.gat-underline`, `.gat-highlight`, `.gat-stoerer--gelb/--magenta`).
Jede Komponente: **live gerendert + Markup-Code-Block** darunter.

**Step 6 — CD-Layout + Maschinenlesbare Spezifikation.** Abschnitt
`#cd-layout` — CD-Layout-Grundprinzipien: Schutzzone M = 0,06 × kurze Kante;
Logo = 3×M (Print) / 2,5×M (Digital); Textabstand Headline↔Subline =
Headline↔Copy = X × 2; „Typografie immer auf Grün". Als erklärter Text +
einfache CSS-Diagramme (kein Bild-Asset). Danach Abschnitt `#spezifikation` —
der D-1-`<script type="application/json">`-Block plus eine menschenlesbare
Einleitung, was er enthält und wofür LLMs ihn nutzen. Abschließend `<footer>`
mit Lizenz (CC BY 4.0) und kanonischer URL — keine Tool-Attribution, kein
„claude" o. ä. im Markup.

**Komponenten-Demo-Muster:** Pro Komponente ein `doc-`-Wrapper, der oben das
*echte* gerenderte Element zeigt und darunter das Markup in einem
`doc-code`-Block (mit HTML-escapeten `&lt;`/`&gt;`). So sieht der Mensch das
Ergebnis und den Quelltext nebeneinander.

**JSON-Spec-Form (D-1):** Ein Objekt mit `tokens` (gruppiert: color/font/text/
leading/space/size — je Token `value`, `role`, `usage`), `components` (je Klasse
`purpose`, `modifiers`, `requires`, `markup`) und `rules` (geschlossene Liste der
Nutzungsregeln). Vollständig — der Block IST die LLM-lesbare Spezifikation und
muss jedes Token + jede Klasse enthalten.

### Anti-Patterns to Avoid

- **Doc-Chrome als `gat-`-Klassen tarnen.** Swatch-Kacheln, Code-Blöcke,
  Do/Don't-Raster sind Doku-Möbel — `doc-`-präfixieren, in den inline `<style>`,
  nie in `design-system.css` (D-2).
- **Komponenten „abmalen".** Beispiele müssen mit den echten `gat-`-Klassen
  gerendert sein, nicht mit nachgebautem CSS — sonst kein Dogfooding.
- **JavaScript einschleichen.** Kein `<script>` außer dem
  `type="application/json"`-Datenblock. Smooth-Scroll, „aktiver" Nav-Zustand
  und TOC sind rein CSS/HTML.
- **JSON-Spec unvollständig lassen.** Eine Teilmenge der Tokens/Klassen
  verfehlt das Akzeptanzkriterium „geschlossenes Vokabular".
- **`<script type="application/json">` mit rohem `</script>` im String.** Falls
  ein Spec-Wert die Zeichenfolge enthält, `<\/script` schreiben.
- **Englische Texte.** Die Seite ist durchgängig deutsch (CONTEXT).
- **`design-system.css` oder `assets/` anfassen.** Issue #5 schreibt nur
  `index.html`.

## Common Pitfalls

### Ungestyltes Doc-Grundgerüst
**Was schiefgeht:** `design-system.css` setzt keine Tag-Selektoren; `<body>`,
`<p>`, `<h2>` der Doc-Seite bleiben browser-default (Times, kein Spacing).
**Warum:** Das Stylesheet ist bewusst als Fremd-einbindbares Komponenten-CSS
gebaut — es stylt kein nacktes Markup.
**Wie vermeiden:** Doc-Seitentext explizit klassifizieren — entweder mit
`gat-`-Typoklassen (bevorzugt, = Dogfooding) oder mit `doc-`-Klassen im inline
`<style>`. Body-Hintergrund/Standardfarbe im `doc-`-Block setzen.
**Warnzeichen:** Seite rendert in Serifenschrift, Abschnitte kleben aneinander.

### Logo unsichtbar oder 404
**Was schiefgeht:** Logo erscheint nicht im Header.
**Warum:** Das SVG ist monochrom dunkelgrün; auf der dunkelgrünen Headerfläche
unsichtbar — `design-system.css` löst das per CSS-Maske (Umfärben auf Weiß).
Oder: der relative Pfad `assets/gruene-logo.svg` bricht.
**Wie vermeiden:** `.gat-header__logo-mark` unverändert nutzen; `index.html`
und `assets/` im Repo-Root belassen. Nicht versuchen, das SVG inline einzufügen.
**Warnzeichen:** Leerer Logo-Slot oder dunkelgrüner Fleck auf Grün.

### Maschinenlesbarer Block bricht das Markup
**Was schiefgeht:** Ein roher `</script>` innerhalb des JSON-Strings schließt
den Block vorzeitig; der Rest der Seite landet im Datenblock.
**Warum:** Der HTML-Parser kennt im `<script>`-Inhalt nur die Zeichenfolge
`</script`.
**Wie vermeiden:** Valides JSON erzeugen; jede literale `</script`-Sequenz im
Inhalt zu `<\/script` brechen. Anführungszeichen im Markup-Beispiel als `\"`.
**Warnzeichen:** Seite endet abrupt; DevTools zeigen verschachteltes `<script>`.

### Kontrast-Fehlpaarung in Beispielen
**Was schiefgeht:** Weiß-Text auf Hellgrün oder Gelb im Beispiel.
**Warum:** Nur Dunkelgrün trägt Weiß-Text (5,63:1). Hellgrün/Gelb brauchen
Anthrazit (6,09:1 / hoch).
**Wie vermeiden:** Beispiele exakt mit den `on-*`-Aliasen paaren —
`--primary`+`on-primary`, `--secondary`+`on-secondary`; Gelb/Magenta-Störer wie
im CSS definiert. Im Guide die Kontrastwerte explizit nennen.
**Warnzeichen:** Blasser Text auf hellem Grund.

### Anchor-TOC ohne Scroll-Offset
**Was schiefgeht:** Ein Anker-Sprung versteckt die Abschnittsüberschrift hinter
dem (ggf. sticky) Header.
**Warum:** Der Sprung positioniert den Anker am Viewport-Rand.
**Wie vermeiden:** `scroll-margin-top` auf den Abschnitts-`id`-Elementen im
`doc-`-`<style>` setzen (CSS, kein JS).
**Warnzeichen:** Nach Klick ist die erste Zeile des Abschnitts abgeschnitten.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Web-Browser | Manuelle Sichtprüfung des Guides | Ja (lokal `file://`) | — | — |
| Python 3 (stdlib) | RESEARCH.html-Smoke-Check | Ja | 3.x | — |
| GitHub Pages | Live-Hosting | Ja, `pages.yml` aktiv | actions v5/v6 | — |
| Internet (Google Fonts, CSS-`@import`) | Schriftdarstellung | Nur zur Ansichtszeit | — | System-Sans/-Serif via Fallback in den Font-Tokens |
| Node/npm/Build-Tools | — | Nicht benötigt | — | — |

> Akzeptanzkriterium „über GitHub Pages erreichbar" ist bereits durch
> `pages.yml` (`path: '.'`, Trigger `push: main`) abgedeckt — ein Push der
> fertigen `index.html` auf `main` deployt automatisch. Kein neuer Workflow.

## Project Constraints (from CLAUDE.md)

Kein workspace-`CLAUDE.md` und kein `.claude/skills/`-Verzeichnis im Repo
gefunden. Aus dem persistenten Nutzerprofil dennoch verbindlich:

- **Keine Tool-Attribution.** Niemals „claude" o. ä. in Commits, Dateinamen
  oder Markup — der Nutzer legt seine Werkzeuge gegenüber Dritten nicht offen.
- **Einfacher Stack für Test/Demo/MVP.** Statische Site, GitHub Pages, reines
  HTML/CSS — kein Framework, kein Build. Deckt sich mit den CONTEXT-Vorgaben.
- **„Working" vor „theoretisch besser".** Vorhandene `gat-`-Komponenten
  unverändert nutzen statt neu erfinden.

## Sources

### HIGH confidence
- `/workspace/design-system/design-system.css` — vollständige, kommentierte
  Token- und Komponenten-Inventur (Codebase-Analyse).
- `/workspace/design-system/index.html` — aktuelles Skelett (Schreibziel).
- `/workspace/design-system/assets/gruene-logo.svg` — Logo-Maße/Form.
- `/workspace/design-system/.github/workflows/pages.yml` — GitHub-Pages-Setup.
- `/workspace/design-system/README.md` — kanonische URLs, Issue-Kontext.
- `/workspace/.issues/style-guide-page/{ISSUE,CONTEXT}.md` — Auftrag + Decisions.
- `/opt/claude-config/templates/artifact-html.md` — artifact-html-Contract.

### MEDIUM confidence
- `https://flomotlik.github.io/claude-code/` (WebFetch) — Struktur des
  persönlichen Systems: zweiteilige Gliederung Grundlagen → Komponenten,
  nummerierte Abschnitte, Komponenten als live gerenderte Beispiele. Bestätigt
  per WebFetch; einzelne Detailinterpretationen können vom tatsächlichen DOM
  abweichen.

### LOW confidence (needs validation)
- Artefakte der Issues #3/#4 (`design-tokens-from-cd`,
  `core-components-layout`) konnten nicht gelesen werden — Verzeichnisse
  existieren in diesem Checkout nicht. Rationale wurde stattdessen aus den
  Code-Kommentaren in `design-system.css` rekonstruiert (die D-1…D-6 direkt
  referenzieren) — als verlässlich eingeschätzt, aber nicht gegen die
  Original-CONTEXT-Dateien geprüft.

## Metadata

**Confidence breakdown:**
- Codebase / Token+Klassen-Inventur: HIGH — direkt aus dem vollständig
  kommentierten Stylesheet abgeleitet.
- Seitenstruktur / TOC: HIGH — CONTEXT-Vorgaben + vorhandene `gat-`-Bausteine.
- JSON-Spec-Form: MEDIUM-HIGH — D-1 legt das Format fest; die konkrete
  Objekt-Form ist eine begründete Empfehlung, vom Planner finalisierbar.
- Referenz-System-Struktur: MEDIUM — per WebFetch erhoben.
- Pitfalls / Environment: HIGH — aus Code + bestätigtem Pages-Workflow.

**Research date:** 2026-05-22
**Sub-agents used:** keine — Single-File-HTML-Doku-Issue mit gelockten
Decisions; die gesamte Fläche (ein CSS-File, ein HTML-File, ein Asset) ließ sich
direkt erschöpfend lesen.
**Raw research files:** keine — Inventur vollständig in dieser RESEARCH.md.
</content>
