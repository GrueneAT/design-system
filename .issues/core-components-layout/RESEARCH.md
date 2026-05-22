# Research: Kernkomponenten und Layout-System

**Researched:** 2026-05-22
**Issue:** core-components-layout (GitHub GrueneAT/design-system#4)
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-1 — Klassen-Prefix `gat-`.** Alle Komponenten-CSS-Klassen bekommen den
  Prefix `gat-` (`.gat-header`, `.gat-btn`, `.gat-card`, …). Konsistent mit den
  `--gat-`-Tokens, kollisionssicher beim Einbinden in fremde Tools.
- **D-2 — Logo-Asset geliefert.** Der User hat das Grüne-Logo bereitgestellt
  (`Grüne Logo Bund dunkelgrün RGB.svg` — valides Vektor-SVG 150×132 mit
  viewBox, bevorzugte Web-Variante; `Grüne Logo Bund dunkel.png` als
  Raster-Fallback). Das SVG wird mit einem URL-sicheren Namen in einen
  Asset-Ordner übernommen (z. B. `assets/gruene-logo.svg`) und vom Header
  referenziert. Header ist nicht mehr blockiert.
- **D-3 — Schriften per `@import` in `design-system.css`.** Die Google Fonts
  (Barlow Semi Condensed, Vollkorn) werden per `@import` direkt in
  `design-system.css` geladen — jedes Tool, das die CSS verlinkt, erhält die
  Schriften automatisch.

### Claude's Discretion (Offene Punkte für Research)
- CSS-Grid- vs. Flexbox-Ansatz für Grid/Container.
- Umsetzung des „Störer" (rotiertes Badge) als reine CSS-Komponente.
- Responsives Verhalten ohne JS (Breakpoints, Container-Verhalten).
- Ob für grüne Header-Hintergründe eine helle/weiße Logo-Variante nötig ist
  (D-2 ausdrücklich an Research delegiert).
- Exakte, aktuelle Google-Fonts-`@import`-URL (zu D-3).

### Deferred Ideas (OUT OF SCOPE)
- Style-Guide-Anzeige der Komponenten — Scope von Issue #5.
- JavaScript jeglicher Art — ISSUE.md Acceptance: „ohne JavaScript nutzbar".
  Navigation = einfache CSS-Navigation, kein Hamburger-Menü.
</user_constraints>

## Summary

Dieses Issue baut die Komponenten-Schicht des Grüne-AT Design Systems auf eine
bereits vollständige, stabile Token-Basis. Die Recherche hat das gesamte
`:root`-Token-Set aus Issue #3 inventarisiert (31 `--gat-`-Properties: 14
Farben, 3 Schriften, 6 Typo-Größen, 2 Zeilenabstände, 6 Abstände) — die
Komponenten dürfen ausschließlich darauf aufbauen. Ein erkennbares Token-Loch:
es gibt **keine Radius-, Border-, Shadow- oder Breakpoint-Tokens** und kein
`container`-Maß. Diese sind Web-Ergänzungen, die das Komponenten-Issue
pragmatisch lokal lösen muss; idealerweise als kleiner, klar kommentierter
Block zusätzlicher `--gat-`-Tokens (Radius/Border/Container/Breakpoints) am
Ende des `:root`, damit die Komponenten weiterhin token-getrieben bleiben und
das Acceptance-Kriterium „keine hartcodierten Größen" erfüllt ist.

Die zentrale CD-Spannung ist das Logo: das gelieferte SVG ist **monochrom mit
einer einzigen Füllfarbe `#2d793c`** (ein dunkles Grün) — auf einem
dunkelgrünen Header damit praktisch unsichtbar. Gleichzeitig verlangt die
CD-Grundregel „Typografie steht immer auf Grün", dass Text auf einer grünen
Fläche sitzt. Auflösung: Der **Header bekommt eine dunkelgrüne Fläche** (CD-treu,
Text in `on-primary`/Weiß), und das **Logo wird per CSS auf Weiß invertiert** —
weil das SVG einfarbig ist, genügt dafür `filter: brightness(0) invert(1)` auf
einem `<img>` oder, sauberer, ein als `mask` eingebundenes SVG mit
`background-color: var(--gat-color-weiss)`. So braucht der User **keine zweite
Logo-Datei nachzuliefern**; eine echte helle SVG-Variante bleibt eine optionale
spätere Qualitätsverbesserung.

**Primary recommendation:** Komponenten als flacher, single-class CSS-Layer
unter dem `:root` ergänzen; **CSS Grid** für das Seiten-/Container-Raster und
**Flexbox** für eindimensionale Komponenten-interne Layouts (Header-Zeile,
Button-Gruppen); Responsivität rein über `max-width`-`@media`-Breakpoints plus
`clamp()`/`minmax()`; „Störer" als reines `transform: rotate()`-Badge; Header
dunkelgrün mit CSS-invertiertem Logo. Ein kleiner ergänzender Token-Block
(Radius/Border/Container/Breakpoint) schließt die Token-Lücke.

## Codebase Analysis

### Relevant Code

| File | Purpose | Last Modified | Relevance |
|------|---------|---------------|-----------|
| `/workspace/design-system/design-system.css` | Das kanonische Stylesheet. Enthält Datei-Header + vollständigen `:root`-Token-Block aus Issue #3. Komponenten werden hier ergänzt. | commit e29391c (Issue #3) | HOCH — direktes Editier-Ziel |
| `/workspace/design-system/index.html` | Seiten-Skelett, verlinkt `design-system.css`. Inhaltliche Style-Guide-Ausarbeitung ist Issue #5. | commit 0178ed9 | MITTEL — zeigt Einbindungsmuster; nicht zu erweitern (Issue #5) |
| `/workspace/Grüne Logo Bund dunkelgrün RGB.svg` | Geliefertes Logo-SVG. 150,32×132,07, viewBox gesetzt, 18 `<path>`, **eine einzige Füllfarbe `#2d793c`**. | geliefert 2026-05-13 | HOCH — Header-Asset; muss URL-sicher ins Repo kopiert werden |
| `/workspace/Grüne Logo Bund dunkel.png` | Raster-Fallback des Logos. | geliefert 2026-05-13 | NIEDRIG — SVG ist bevorzugt (D-2) |
| `/workspace/design-system/README.md` | Beschreibt Einbindung per gehostetem `<link>`, Issue-Roadmap. | commit 8bd9baa | NIEDRIG — Kontext |

**Hinweis Repo-Pfad:** Das aktive Design-System-Repo ist
`/workspace/design-system/` (eigener Git-Klon, eigenes `.issues/`). Die
Issue-Artefakte zu *diesem* Issue liegen jedoch unter
`/workspace/.issues/core-components-layout/`. Die Edits gehen in
`/workspace/design-system/design-system.css`.

### Interfaces

Der Token-Block aus Issue #3 ist der **Eingangs-Kontrakt** — die Komponenten
referenzieren ausschließlich diese Properties. Exakte Inventur:

<interfaces>
/* === EINGANGS-KONTRAKT: bestehende Tokens (Issue #3) ===================== */
/* Aus design-system.css :root — Komponenten dürfen NUR diese verwenden.     */

/* Farb-Primitive */
--gat-color-dunkelgruen: #257639;
--gat-color-hellgruen:   #56af31;
--gat-color-gelb:        #ffed00;
--gat-color-magenta:     #e6007e;
--gat-color-weiss:       #ffffff;
--gat-color-anthrazit:   #1d1d1b;

/* Farb-Semantik (Aliase auf Primitive) */
--gat-color-primary;       /* -> dunkelgruen */
--gat-color-secondary;     /* -> hellgruen   */
--gat-color-accent;        /* -> magenta     */
--gat-color-highlight;     /* -> gelb        */
--gat-color-text;          /* -> anthrazit   */
--gat-color-surface;       /* -> weiss       */
--gat-color-on-primary;    /* -> weiss   (Text auf Dunkelgrün, Kontrast 5,63:1) */
--gat-color-on-secondary;  /* -> anthrazit (Text auf Hellgrün, Kontrast 6,09:1) */

/* Schrift-Familien */
--gat-font-headline;   /* 'Barlow Semi Condensed', sans-serif */
--gat-font-copy;       /* 'Barlow Semi Condensed', sans-serif */
--gat-font-emphasis;   /* 'Vollkorn', serif                    */

/* Typo-Größen (modulare Skala 1rem / Ratio 1,25) */
--gat-text-h1: 2.441rem;
--gat-text-h2: 1.953rem;
--gat-text-h3: 1.563rem;
--gat-text-subline: 1.25rem;
--gat-text-copy: 1rem;
--gat-text-small: 0.8rem;

/* Zeilenabstände (einheitslose Multiplikatoren, direkt aus dem CD) */
--gat-leading-headline: 0.9;
--gat-leading-copy: 1.3;

/* Abstände (Skala Basis 0,25rem) */
--gat-space-1: 0.25rem;
--gat-space-2: 0.5rem;
--gat-space-3: 1rem;
--gat-space-4: 1.5rem;
--gat-space-5: 2rem;
--gat-space-6: 3rem;


/* === AUSGANGS-KONTRAKT: öffentliche Komponenten-Klassen (Issue #4) ======= */
/* Diese gat-*-Klassen sind der Kontrakt, auf den Issue #5 (Style Guide)     */
/* und alle konsumierenden Grüne-AT-Tools zugreifen. Stabile Namen —         */
/* Umbenennungen wären Breaking Changes.                                     */

/* --- Ergänzende Tokens (Web-Ergänzung, neu in Issue #4, klar kommentiert) - */
--gat-radius-sm;          /* kleine Rundung (Buttons, Badges)        */
--gat-radius-md;          /* Karten-Rundung                          */
--gat-border-width;       /* Standard-Strichstärke (Sekundär-Button) */
--gat-container-max;      /* max. Inhaltsbreite, z. B. 72rem         */
--gat-breakpoint-sm;      /* dokumentierender Kommentar (CSS @media   */
--gat-breakpoint-md;      /*   kann keine var() im media-query lesen) */

/* --- Layout / Seitenstruktur --- */
.gat-container          /* zentrierter Inhalts-Container, max-width + Padding */
.gat-grid               /* CSS-Grid-Raster (display:grid)                     */
.gat-grid--2            /* 2-Spalten-Variante (responsive auf 1)              */
.gat-grid--3            /* 3-Spalten-Variante (responsive auf 1)              */
.gat-section            /* vertikaler Block mit CD-Abstandsrhythmus           */

/* --- Header / Navigation --- */
.gat-header             /* Seitenkopf, dunkelgrüne Fläche, on-primary-Text    */
.gat-header__inner      /* zentrierter Header-Inhalt (Flexbox-Zeile)          */
.gat-header__logo       /* Logo-Wrapper, hält die CD-Schutzzone als padding   */
.gat-header__logo img   /* invertiertes Logo (weiß auf Dunkelgrün)            */
.gat-nav                /* Navigations-Container (Flexbox, wrap)              */
.gat-nav__link          /* einzelner Navigationslink                          */
.gat-nav__link--active  /* aktiver Zustand (CD-Unterstreichung)               */

/* --- Typografie --- */
.gat-headline           /* H1-Rolle: font-headline, text-h1, leading 0,9      */
.gat-subline            /* Subline-Rolle: text-subline, leading 0,9           */
.gat-fliesstext         /* Copy: font-copy, text-copy, leading 1,3            */
.gat-emphasis           /* Hervorhebung/Zitat: font-emphasis (Vollkorn)       */

/* --- Buttons --- */
.gat-btn                /* Basis-Button (Layout, Padding, Radius)             */
.gat-btn--primary       /* Primär: Fläche dunkelgrün, Text on-primary         */
.gat-btn--secondary     /* Sekundär: Outline, transparent, grüner Rahmen      */

/* --- Karten / Flächen --- */
.gat-card               /* Karte auf grüner Fläche (CD: Text auf Grün)        */
.gat-card--primary      /* dunkelgrüne Fläche, on-primary-Text                */
.gat-card--secondary    /* hellgrüne Fläche, on-secondary-Text                */
.gat-card__title        /* Karten-Headline                                    */
.gat-card__body         /* Karten-Fließtext                                   */

/* --- CD-Gestaltungselemente --- */
.gat-underline          /* CD-Unterstreichung (z. B. magenta/gelb Akzent)     */
.gat-highlight          /* Text-Hervorhebung (gelbe Marker-Fläche)            */
.gat-stoerer            /* rotiertes Badge/Sticker — transform: rotate()      */
</interfaces>

> Die `gat-*`-Klassennamen oben sind ein **Vorschlag** des Researchers — die
> verbindliche Festlegung trifft der Plan. BEM-artige `__`/`--`-Modifier sind
> empfohlen, weil sie kollisionssicher sind und ohne JS-Zustandslogik
> auskommen. Der Plan darf die Liste verfeinern, muss aber den `gat-`-Prefix
> (D-1) und die Token-only-Regel wahren.

### Reusable Components
- **Token-Set vollständig** — Farben, Schriften, Typo-Skala, Zeilenabstände,
  Abstände existieren und sind WCAG-kontrastgeprüft (`on-primary` 5,63:1,
  `on-secondary` 6,09:1). Komponenten nie eigene Farbwerte rechnen.
- **`on-primary` / `on-secondary`** bilden die CD-Regel „Text auf Grün" bereits
  ab: Dunkelgrün-Fläche → Weiß-Text, Hellgrün-Fläche → Anthrazit-Text. Die
  Karten-/Header-Komponenten paaren Fläche und `on-*`-Token konsequent.
- **Datei-Header** in `design-system.css` ist fertig und bleibt unverändert.

### Potential Conflicts
- **Token-Lücke:** kein Radius/Border/Shadow/Container/Breakpoint-Token. Die
  Komponenten brauchen mindestens Radius, Border-Width und eine Container-
  Maximalbreite. Lösung: kleiner zusätzlicher `--gat-`-Token-Block am Ende des
  `:root`, klar als „Web-Ergänzung, Issue #4" kommentiert — bewahrt das
  Acceptance-Kriterium „keine hartcodierten Größen".
- **`@media` kann keine `var()` lesen:** Breakpoint-Werte können als Token
  *dokumentiert*, aber im `@media`-Query nicht als `var()` referenziert werden.
  Die Pixel-/rem-Werte stehen in den Media-Queries direkt; das Token dient nur
  der Nachvollziehbarkeit. Im CSS so kommentieren.
- **`index.html`:** ist Skelett; die sichtbare Demonstration der Komponenten
  ist Issue #5 — `index.html` in diesem Issue NICHT mit Komponenten-Markup
  füllen (Scope-Grenze aus CONTEXT.md).
- **Logo-Datei-Name:** Quelldatei hat Umlaut + Leerzeichen
  (`Grüne Logo Bund dunkelgrün RGB.svg`). D-2 verlangt URL-sichere Kopie
  (`assets/gruene-logo.svg`). Die Originaldatei liegt unter `/workspace/`, das
  Repo unter `/workspace/design-system/` — Kopie ins Repo nötig.

## Standard Stack

| „Library" | Version | Purpose | Why Standard | Confidence |
|-----------|---------|---------|--------------|------------|
| Reines CSS3 | — | Komponenten, Layout, Responsivität | ISSUE.md/CONTEXT: kein JS, kein Build-Schritt | HIGH |
| CSS Grid | nativ | Seiten-/Container-Raster, mehrspaltige Layouts | Zweidimensionales Raster, `minmax()`/`auto-fit` löst Responsivität ohne Media-Queries | HIGH |
| Flexbox | nativ | Eindimensionale Layouts (Header-Zeile, Nav, Button-Gruppen) | Standard für lineare Achsen, `flex-wrap` für Umbruch ohne JS | HIGH |
| `@import` Google Fonts | CSS2-API | Barlow Semi Condensed + Vollkorn laden | D-3 locked; CSS2-`@import` ist die aktuelle, von Google empfohlene Form | HIGH |
| `clamp()` | nativ | flüssige Typo-/Abstands-Skalierung | reduziert Breakpoint-Bedarf, voll browserunterstützt | HIGH |

### Verifizierte Google-Fonts-`@import`-URL (zu D-3)

Gegen die Google-Fonts-CSS2-API verifiziert (2026-05-22, Antwort enthält
gültige `@font-face`-Regeln). **Als erste Zeile von `design-system.css`**
(`@import` muss vor allen anderen Regeln stehen, also vor dem Datei-Header-
Kommentar ist nicht nötig, aber vor `:root`):

```css
@import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400;1,900&family=Vollkorn:ital,wght@0,400;0,600;0,700;1,400;1,900&display=swap');
```

- **Barlow Semi Condensed:** Gewichte 400/500/600/700/**900** (900 = „Black",
  deckt die „Ultra"-Headlinerolle), normal + kursiv.
- **Vollkorn:** Gewichte 400/600/700/**900**, normal + kursiv — **900 Italic =
  „Black Italic"**, die im CD genannte Hervorhebungsrolle.
- `display=swap` vermeidet unsichtbaren Text während des Font-Ladens.

Der Plan kann die Gewichtsliste straffen, falls eine Rolle ein Gewicht nicht
braucht — verwendet werden voraussichtlich Barlow 400 (Copy), 600/700
(Subline/UI), 900 (Headline) und Vollkorn 400 + 900i (Emphasis).

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS Grid fürs Raster | nur Flexbox | Flexbox ist eindimensional; echtes Spalten-Raster mit gleichen Zeilenhöhen braucht Grid. Grid für 2D, Flexbox für 1D ist der Konsens. |
| `@import` Fonts | `<link>` im HTML jeder Seite | D-3 schließt das aus — `@import` zentralisiert die Schriften in der CSS. `@import` hat einen kleinen Ladenachteil, ist hier aber bewusst gewählt. |
| Self-hosted Fonts | Google-Fonts-CDN | Self-hosting wäre datenschutzfreundlicher, aber CONTEXT/Issue #3 hat Google Fonts festgelegt; out of scope. |
| `transform: rotate()` für Störer | SVG-Grafik als Bild | Pure-CSS-Badge bleibt token-getrieben, skaliert mit Schrift, kein Asset. |

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Responsives Mehrspalten-Raster | eigene Float-/`width`-Prozent-Logik | CSS Grid `repeat(auto-fit, minmax(…, 1fr))` | Bricht ohne Media-Query automatisch um |
| Flüssige Schriftgröße | viele Breakpoint-Stufen | `clamp(min, vw, max)` | Eine Regel statt vieler Media-Queries |
| Farb-/Kontrastwerte | neue HEX-Werte | bestehende `--gat-color-*`-Tokens | Acceptance: keine hartcodierten Farben; Kontrast schon geprüft |
| Helle Logo-Variante | User um zweite Datei bitten (Blocker) | CSS-Invertierung des einfarbigen SVG | Logo ist monochrom — `filter`/`mask` reicht, kein Asset nötig |
| Navigations-Zustand (aktiv/hover) | JS | CSS `:hover`/`:focus-visible` + `--active`-Modifier-Klasse | kein JS erlaubt |
| Akkordeon/Mobile-Menü | JS-Hamburger | einfache umbrechende CSS-Nav (`flex-wrap`) | CONTEXT: „kein Hamburger-Menü" |

## Architecture Patterns

### Recommended Approach

1. **Datei-Reihenfolge in `design-system.css`:** `@import` (ganz oben) →
   Datei-Header-Kommentar → `:root` (bestehende Tokens + neuer kleiner
   Ergänzungs-Token-Block) → Komponenten-Selektoren, gruppiert nach
   Abschnitten mit Kommentar-Bannern (Layout → Header/Nav → Typografie →
   Buttons → Karten → CD-Elemente).
2. **Flacher, single-class Komponenten-Layer.** Eine Klasse = eine Komponente,
   BEM-artige `__`-Elemente und `--`-Modifier. Keine tiefe Selektor-
   Verschachtelung, keine Element-Selektoren auf `body`/`h1` (das Stylesheet
   wird in fremde Tools eingebunden — `gat-`-Prefix schützt nur Klassen, nicht
   nackte Tag-Selektoren). Komponenten greifen nur auf `.gat-*`-Klassen.
3. **Grid fürs Seitenraster, Flexbox für Komponenten-interne Achsen.**
   `.gat-container` = `max-width` + zentriert + seitliches Padding.
   `.gat-grid` = `display: grid` mit `repeat(auto-fit, minmax())` →
   responsiv ohne Media-Query. Header-Zeile und Nav = Flexbox mit
   `flex-wrap: wrap`.
4. **Typografie token-treu.** `.gat-headline` nutzt `--gat-font-headline`,
   `--gat-text-h1`, `line-height: var(--gat-leading-headline)` (0,9).
   `.gat-fliesstext` nutzt `--gat-text-copy` + `--gat-leading-copy` (1,3).
   Die CD-Zeilenabstandsfaktoren sind genau die `--gat-leading-*`-Tokens —
   direkt als `line-height` setzen.
5. **CD-Regel „Text auf Grün" strukturell erzwingen.** `.gat-card` und
   `.gat-header` setzen immer Fläche + passendes `on-*`-Token gemeinsam:
   `--primary`-Variante = `background: var(--gat-color-primary)` +
   `color: var(--gat-color-on-primary)`; `--secondary` analog mit Hellgrün +
   `on-secondary`. So kann eine Text-/Karten-Komponente gar nicht ohne grüne
   Fläche existieren.
6. **Header dunkelgrün + invertiertes Logo.** `.gat-header` =
   dunkelgrüne Fläche, `on-primary`-Text. Das einfarbige Logo-SVG wird auf
   Weiß gebracht — empfohlen via CSS-`mask`:
   `.gat-header__logo` mit
   `background-color: var(--gat-color-weiss)`,
   `-webkit-mask`/`mask: url(assets/gruene-logo.svg) no-repeat center / contain`.
   Einfachere Alternative: `<img>` + `filter: brightness(0) invert(1)`. Beide
   funktionieren, weil das SVG monochrom ist. Die Logo-`padding` der
   `.gat-header__logo` bildet die CD-Schutzzone ab (M = 0,06 × kurze Kante;
   im Web als proportionales `padding` relativ zur Logo-Höhe lösen).
7. **„Störer" als Pure-CSS-Badge.** `.gat-stoerer` = `display: inline-block`,
   Fläche (Gelb oder Magenta), `padding`, `--gat-radius-sm`,
   `transform: rotate(-6deg)`, `font-headline` fett. Optional leichte
   `box-shadow`. Keine Pseudo-Elemente nötig; falls eine Sprechblasen-Ecke
   gewünscht ist, ginge ein `::after`-Dreieck — der Plan entscheidet.
8. **CD-Gestaltungselemente:** `.gat-underline` als
   `border-bottom`/`text-decoration` in Akzentfarbe; `.gat-highlight` als
   `background: var(--gat-color-highlight)` (gelbe Marker-Fläche) auf einem
   Inline-Span — Achtung Kontrast: Anthrazit-Text auf Gelb.

### Anti-Patterns to Avoid
- **Nackte Tag-Selektoren** (`h1 {}`, `body {}`) — das Stylesheet wird in
  fremde Tools eingebunden und würde deren Markup umstylen. Nur `.gat-*`.
- **Hartcodierte Farben/Größen** — Acceptance-Verstoß. Jeder Wert kommt aus
  einem Token; fehlt ein Token (Radius/Container), zuerst Token ergänzen.
- **Weiß-Text auf Hellgrün** — fällt durch den Kontrast (Issue #3 hat
  `on-secondary` bewusst auf Anthrazit gelegt). Hellgrün-Flächen nie mit
  Weiß-Text paaren.
- **JS für Navigation/Interaktion** — verboten. Hover/Focus via CSS,
  „aktiv" via Modifier-Klasse, die das konsumierende Tool setzt.
- **`var()` in `@media`-Bedingungen** — funktioniert nicht. Breakpoint-Werte
  direkt in die Media-Query schreiben, Token nur als Doku-Kommentar.
- **Tiefe Verschachtelung / hohe Spezifität** — erschwert das Überschreiben in
  konsumierenden Tools. Flache single-class Selektoren.

## Common Pitfalls

### Logo unsichtbar auf grünem Header
**Was schiefgeht:** Das gelieferte SVG ist einfarbig `#2d793c` (dunkles Grün).
Auf einer dunkelgrünen `.gat-header`-Fläche verschwindet es nahezu vollständig.
**Warum:** Es gibt nur die dunkle Logo-Variante (D-2), keine helle.
**Vermeidung:** Logo per CSS auf Weiß bringen — `mask` + `background-color`
(sauberste Lösung) oder `filter: brightness(0) invert(1)` auf `<img>`. Funktion
ist garantiert, weil das SVG monochrom ist (eine einzige `fill`-Farbe).
**Warnzeichen:** Logo „fehlt" im Header-Screenshot; niedriger Kontrast.

### Token-Lücke (Radius/Border/Container) führt zu Hardcoding
**Was schiefgeht:** Beim Bau von Buttons/Karten greift man reflexhaft zu
`border-radius: 4px` — Acceptance-Verstoß „keine hartcodierten Größen".
**Warum:** Issue #3 hat bewusst nur das CD-Vokabular getokenisiert; Radius etc.
sind reine Web-Ergänzungen und fehlen.
**Vermeidung:** Zuerst einen kleinen, klar als „Web-Ergänzung, Issue #4"
kommentierten `--gat-radius-*`/`--gat-border-width`/`--gat-container-max`-Block
am Ende des `:root` ergänzen, dann Komponenten darauf aufbauen.
**Warnzeichen:** nackte `px`/`rem`-Literale in Komponenten-Regeln.

### `@import`-Position
**Was schiefgeht:** `@import` irgendwo in der Datei → der Browser ignoriert es.
**Warum:** CSS verlangt, dass `@import` vor jeder anderen Regel (außer
`@charset` / `@layer`) steht.
**Vermeidung:** Die Google-Fonts-`@import`-Zeile als allererste CSS-Anweisung,
oberhalb von `:root`. Der Datei-Header-Kommentar darf darüber stehen
(Kommentare zählen nicht).
**Warnzeichen:** Schriften fallen auf `sans-serif`/`serif` zurück.

### CD-Zeilenabstand falsch interpretiert
**Was schiefgeht:** Den CD-Faktor ×0,9 als zusätzliche Multiplikation auf eine
schon gesetzte `line-height` anwenden.
**Warum:** `--gat-leading-headline` *ist* schon der Faktor 0,9.
**Vermeidung:** `line-height: var(--gat-leading-headline)` direkt setzen —
einheitslos, CSS multipliziert mit der Schriftgröße. Nicht nochmal rechnen.
**Warnzeichen:** sehr enge oder sehr weite Headlines.

### Responsivität ohne JS
**Was schiefgeht:** Versuch, Layout-Umbrüche per JS zu steuern (verboten).
**Vermeidung:** `grid-template-columns: repeat(auto-fit, minmax(min, 1fr))`
bricht selbst um; `flex-wrap: wrap` für Nav/Header; `clamp()` für flüssige
Größen; nur wenige `max-width`-Media-Queries für echte Layout-Wechsel.
**Warnzeichen:** überlaufender Inhalt auf schmalen Viewports.

### Stylesheet-Bleed in konsumierende Tools
**Was schiefgeht:** Das Design-System-CSS stylt das Markup fremder Tools um.
**Warum:** nackte Tag-Selektoren / hohe Spezifität.
**Vermeidung:** ausschließlich `.gat-*`-Klassenselektoren, flach, niedrige
Spezifität. Keine Resets, kein `* {}`.
**Warnzeichen:** Beschwerden konsumierender Repos über veränderte Darstellung.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Browser CSS3 (Grid, Flexbox, `clamp()`, `mask`, custom props) | alle Komponenten | Ja — alle aktuellen Browser | — | `mask` braucht `-webkit-`-Prefix; `filter`-Variante als Logo-Fallback |
| Google-Fonts-CSS2-API | `@import` der Schriften | Ja — URL 2026-05-22 verifiziert | CSS2 | Font-Stack-Fallback `sans-serif`/`serif` in den Tokens |
| Build-/Tooling | — | nicht nötig | — | reines CSS, kein Build (CONTEXT) |

Kein Environment-Probing nötig: das Issue liefert eine statische CSS-Datei,
keine Laufzeitabhängigkeiten.

## Project Constraints (from CLAUDE.md)
Kein workspace-`CLAUDE.md` und kein `.claude/skills/`-Verzeichnis im Repo
gefunden. Aus dem persistenten Memory relevant:
- **Keine KI-/Tool-Attribution** in Commits, Code, Dateinamen oder Kommentaren.
- Alle CSS-Kommentare auf **Deutsch** (Konvention aus Issue #3, EXECUTION.md
  Self-Check).
- Bestehende Issue-Artefakte nie löschen — archivieren.

## Sources

### HIGH confidence
- `/workspace/design-system/design-system.css` — vollständige Token-Inventur
  (Codebase-Analyse).
- `/workspace/design-system/.issues/archive/design-tokens-from-cd/`
  (RESEARCH/CONTEXT/EXECUTION.md) — Token-Rationale, WCAG-Kontrastprüfung.
- `/workspace/Grüne Logo Bund dunkelgrün RGB.svg` — direkte Inspektion:
  150,32×132,07, viewBox gesetzt, 18 Pfade, eine einzige Füllfarbe `#2d793c`.
- Google-Fonts-CSS2-API — `@import`-URL am 2026-05-22 abgerufen, liefert
  gültige `@font-face`-Regeln für Barlow Semi Condensed (400–900, i) und
  Vollkorn (400–900, i).
- `/workspace/.issues/core-components-layout/{ISSUE,CONTEXT}.md` — Scope und
  Locked Decisions.

### MEDIUM confidence
- CSS-Grid-vs-Flexbox-Empfehlung — etablierter Branchenkonsens (Grid = 2D,
  Flexbox = 1D); nicht über eine einzelne aktuelle Quelle verifiziert, aber
  unstrittig.

### LOW confidence (needs validation)
- Genaue benötigte Font-Gewichtsliste — der Plan/die Umsetzung kann die
  `@import`-URL straffen, sobald die Komponenten-Rollen festliegen.
- Ob eine echte helle Logo-SVG-Variante später gewünscht ist — Empfehlung:
  CSS-Invertierung reicht; eine native helle Datei ist optionale spätere
  Qualitätsverbesserung (Entscheidung beim User).

## Metadata
**Confidence breakdown:**
- Codebase / Token-Inventur: HIGH — vollständige Datei gelesen.
- Logo-Analyse: HIGH — SVG direkt inspiziert, monochrom bestätigt.
- Google-Fonts-URL: HIGH — live verifiziert.
- Grid/Flexbox-Entscheidung: MEDIUM-HIGH — Konsens, kein Streitpunkt.
- Komponenten-Klassenliste: MEDIUM — Vorschlag, Plan finalisiert.

**Research date:** 2026-05-22
**Sub-agents used:** keine — Issue ist klein und gut abgegrenzt (eine statische
CSS-Datei, vollständig gelesene Codebase); direkte fokussierte Recherche statt
paralleler Spezialisten.
**Raw research files:** keine separaten Rohdateien — Befunde direkt
synthetisiert.

## Open Questions (Entscheidungen für den User)
1. **Helle Logo-Variante** — Research empfiehlt CSS-Invertierung des
   einfarbigen SVG; eine native helle SVG-Datei ist nicht erforderlich, wäre
   aber eine Qualitätsverbesserung. Soll der User eine helle Variante
   nachliefern oder genügt die CSS-Lösung? (Empfehlung: CSS-Lösung, keine
   Blockade.)
2. **Header-Hintergrundfarbe** — Empfehlung Dunkelgrün (CD „Text auf Grün",
   Logo invertiert). Ein weißer Header (Logo unverändert dunkelgrün) wäre
   CD-konform nur, wenn der Header-*Text* dann nicht auf Weiß sitzt — was die
   CD-Regel verletzt. Daher Dunkelgrün empfohlen; bestätigen.
3. **Störer-Akzentfarbe** — Gelb (`highlight`) oder Magenta (`accent`)? Beide
   CD-konform; der Plan kann beide Modifier anbieten (`.gat-stoerer--gelb` /
   `--magenta`).
