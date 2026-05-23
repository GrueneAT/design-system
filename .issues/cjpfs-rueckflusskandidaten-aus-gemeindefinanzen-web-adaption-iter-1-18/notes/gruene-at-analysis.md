# gruene.at — tiefe Analyse als DS-Feedback

Analyse-Datum: 2026-05-23. Quelle: Direkter HTML- und CSS-Abruf von
`https://gruene.at/` und ihrer Build-Assets unter `gruene.at/app/themes/sage/
public/build/assets/`.

Vorlaeufer: das gemeindefinanzen-Dokument hatte eine knappe Iter-15-Notiz
(`gruene.at-Referenzanalyse`) — wenige visuelle Beobachtungen. Diese Analyse
geht eine Stufe tiefer: Stack, Tokens, Klassennamen, A11y-Mechanik,
Block-System.

## TL;DR fuer den Triage-Researcher

gruene.at ist **WordPress + Sage-Theme + Tailwind v4** mit einem Gutenberg-
artigen `page-block`-System und einem fortgeschrittenen A11y-Toggle ueber
einen Tailwind-`high-contrast:`-Variant. Schrift: **Gotham** (proprietaer,
selbstgehostet). Marken-CTAs in **Magenta**, gruene Flaechen als Section-
Identitaet. Pill-Buttons sind durchgehend. Header ist `pointer-events-none`
mit selektiv interaktiven Kindern.

**Drei wirklich uebertragbare Ideen** (ueber das hinaus, was wir schon in
Iter 15 aufgeschrieben hatten):

1. **`high-contrast:`-Variant** (in Tailwind v4 als Modus-Toggle) — eine
   echte zweite Farbschicht pro Klasse, gesteuert ueber eine Body-Klasse.
   Das ist ein Pattern, das das Org-DS gut adaptieren kann (siehe
   Kandidat G unten).
2. **`page-block`-System** — jeder Seitenabschnitt ist eine eigenstaendige
   Block-Komponente mit konsistentem Container, Spalten-Grid, Farb-
   Hintergrund und h2-Auftakt. Das passt zu einem klassisch redaktionellen
   Tool — fuer Datenwerkzeuge weniger relevant, aber als Pattern fuer
   andere Konsumenten interessant.
3. **`pointer-events-none`-Header** mit selektiv interaktiven Kindern — UX-
   Detail, das bei fixed Headern viel Aerger spart (Klicks auf Hero-
   Content gehen durch leere Header-Bereiche).

## Stack & Tooling

| Komponente | Wahl |
| --- | --- |
| CMS | WordPress (Sage-Theme, `/app/themes/sage/`) |
| CSS-Framework | **Tailwind CSS v4.0.3** (`@layer theme`, OKLCH-Farbraum) |
| Build | **Vite** (gehashte Asset-Namen: `app-v2vUCRpB.css`, `init-vue-DpK1WxZ9.css`, ...) |
| Carousels | Swiper 11 (via CDN: `cdn.jsdelivr.net/npm/swiper@11`) |
| Animationen | GSAP 3.12.7 (via CDN: `cdn.jsdelivr.net/npm/gsap@3.12.7`) |
| Interaktion | Vue (`init-vue-DVrWiZEo.js`), jQuery (Legacy) |
| Cookie/Consent | Usercentrics CMP |
| CDN | Cloudflare (E-Mail-Obfuscation, Rocket Loader) |
| Stylesheets pro Seite | ~16 (per-Block-Splitting durch Vite) |

**Folgerung fuer das Org-DS:** Die Per-Block-CSS-Splittung ist nicht
notwendig fuer ein DS, das **eine** `design-system.css` ausliefert. Aber:
das gruene.at-Beispiel zeigt, dass Tailwind v4 produktionsreif ist und das
Org-DS spaeter optional auf Tailwind v4 setzen koennte — heute haendisch
ueber Custom-Properties. Kein Handlungsbedarf in der aktuellen Triage-Welle.

## Farb-Tokens (gruene.at)

Aus dem `@theme`-Block in `app-v2vUCRpB.css`:

```css
--color-green:           #257639;
--color-magenta:         #e10078;
--color-magenta-dark:    #9f0055;
--color-error:           #df3333;
--color-error-light:     #fcebeb;
--color-grey-dark:       #767676;
--color-grey-mid:        #959595;
--color-grey-light:      #cdcdcd;
--color-grey-super-light: #e6e6e6;
/* sowie alle Tailwind-Default-Skalen rot/orange/.../slate/zinc/... */
```

Verglichen mit unserem Org-DS (`design-system.css`):

| Rolle | gruene.at | Org-DS (Druck-Auslegung) | gemeindefinanzen-`--web-*` |
| --- | --- | --- | --- |
| Marken-Gruen | `#257639` | `#2c6e40` (`--gat-color-dunkelgruen`) | `#2c6e40` (`--web-green-deep`) |
| Magenta | `#e10078` | `#e6007e` (`--gat-color-magenta`) | nicht uebernommen |
| Magenta dunkel | `#9f0055` | — | — |
| Fehlerrot | `#df3333` (mit `-light`) | — | `#9c5a38` (`--web-clay-text`, anders semantisch) |
| Grau-Skala | 4 Stufen (`super-light`/`light`/`mid`/`dark`) | `#252422` (`--gat-color-anthrazit`) plus Tints | Anthrazit + Soft-Text + Mute |

**Beobachtung:** gruene.at hat keinen ruhigen Grundton — Hintergrund ist
weiss oder vollflaechiges Marken-Gruen. Die `--web-bg: #f3f5f0`-Idee der
gemeindefinanzen-App **fehlt** dort komplett — gruene.at ist eine Plakat-
Site, kein Datenwerkzeug. Bestaetigt unsere These im ISSUE.md.

**Fehlende Tokens** fuer eine Datenanwendung, die wir in Welle 1 ergaenzen:
- ruhiger Grundton (`--gat-web-bg`)
- gesenkte Zonen (`--gat-web-surface-sunk`)
- weicher Text (`--gat-web-text-soft`, `--gat-web-text-mute`)
- Haarlinien-Token (`--gat-web-hairline`)
- 8-Ton entsaettigte Chart-Palette

## Schrift

```css
@font-face { font-family: Gotham; src: url(GothamNarrow-Book-...woff2);    font-weight: 350; }
@font-face { font-family: Gotham; src: url(GothamNarrow-Medium-...woff2);  font-weight: 500; }
@font-face { font-family: Gotham; src: url(GothamXNarrow-Ultra-...woff2);  font-weight: 700; font-style: italic; }
```

Body: `font-size: 16px; font-weight: 350`. HTML: `font-size: 62.5%` (=
1rem ist 10px — das bekannte „rem-Math vereinfachen"-Pattern).
`-webkit-font-smoothing: antialiased`. Display-Headline (`.h-display`)
`4.8rem` italic mit `letter-spacing: 0.02em` — der charakteristische
schraege gruene.at-Look.

**Folgerung:** Gotham ist **lizenzpflichtig**. Das Org-DS bleibt bei
Barlow Semi Condensed (frei). Was wir **uebernehmen koennen**:
- `font-weight: 350` (Light statt Normal 400) als ruhigerer Body-Default
  — Barlow hat Wght 100–900 zur Verfuegung, 350 liesse sich ueber
  Variable-Font realisieren
- `letter-spacing` auf Display-Headlines bewusst setzen
- Italic-Headlines als Akzent (heute im Org-DS nicht definiert)

## Komponenten-Pattern: `page-block`

Jeder Seitenabschnitt:
```html
<section class="page-block ${type}-block ${bg-modifier}">
  <div class="container ${spacing}">
    <div class="grid-page">
      <div class="col-span-8 lg:col-span-12">
        <!-- content -->
      </div>
    </div>
  </div>
</section>
```

Beobachtete `${type}-block`-Varianten auf der Home:
- `hero-start-block` (Swiper-Slider)
- `newsletter-block`
- `callout-block` (vollflaechiger CTA-Banner)
- `event-calendar-block`
- `free-input-slider-block`
- `instagram-block`

**Pattern-Insight fuer das Org-DS:** das gemeindefinanzen-`.web-panel`
ist im Kern dasselbe, aber **innerhalb** einer Seite (Karten in einem
Dashboard), nicht **als** Seite (Sections in einem Newsroom). Gleiche
Idee, andere Granularitaet. Das DS kann beides anbieten:
- `.gat-page-block` — vollbreiter Seitenabschnitt mit `--gat-color-*`-
  Hintergrundvarianten und `.container` innen (fuer Marketing-/Org-
  Seiten)
- `.gat-panel` — Inhalts-/Datenkarte mit Schatten und Haarlinie (fuer
  Datenanwendungen)

Beide teilen das gleiche Spacing- und Radius-Token-Set.

## Komponenten-Pattern: Buttons

Beobachtete Markup-Struktur (aus Home-Callout):
```html
<div class="btn primary mx-auto xl" data-url="...">
  <a href="..." class="flex items-center">Mehr dazu</a>
</div>
```

CSS-Regeln:
```css
.btn.primary   { background-color: var(--color-magenta); color: var(--color-white); border-radius: 9999px; }
.btn.primary:hover { background-color: var(--color-magenta-dark); }
.btn.secondary { border: 0.3rem solid var(--color-magenta); color: var(--color-magenta); background: var(--color-white); border-radius: 9999px; }
.btn button    { padding-block: 12px; padding-inline: 30px; }
```

**Observations:**
- **Pill (`border-radius: 9999px`) durchgehend** — bestaetigt unsere
  Iter-15-Idee, dieses Pattern ins DS zu uebernehmen.
- Magenta ist **die** Primary-CTA-Farbe. Gruen ist Section-Hintergrund
  (z. B. Newsletter, Callout), nicht Button-Farbe — uebernehmen wir **nicht**
  fuer Datenwerkzeuge (siehe Leitsatz: Magenta ist zu unruhig).
- Border-Width `.3rem` (= 3px bei html-62.5%) — die typische gruene-
  Outline-Staerke. Bemerkenswert dick.
- Markup ist `<div class="btn ...">` mit `<a>` innen statt nativem
  `<button>`/`<a class="btn">` — vermutlich CMS-getrieben. Wir bleiben
  bei semantischem `<button>`/`<a class="gat-btn">`.

## Komponenten-Pattern: Typografie-Klassen

```css
.h1, .h2, .h3, .h4 { hyphens: auto; padding-top: 10px; }
.h-display          { font-size: 4.8rem; line-height: 1; letter-spacing: 0.02em; font-style: italic; }
.h3.h3-news         { font-size: 3.2rem; line-height: 2.88rem; }
.h5.small           { font-size: 1.6rem; font-weight: 350; }
```

**Pattern:** semantische Headline-Klassen `.h1`/`.h2`/.../`.h-display`
unabhaengig vom HTML-Tag — eine `<h2>` kann optisch `.h-display` sein.
**Unser DS macht das schon richtig** (`.gat-headline`, `.gat-subline`) —
keine Aenderung noetig.

**Detail uebernehmen:** `hyphens: auto` auf allen Headline-Klassen. Bei
deutscher UI mit langen Komposita („Aufgabenbereichsuebersicht") ist das
ein gratis Verbesserung. Heute fehlt im Org-DS.

## Komponenten-Pattern: Header & Skip-Link

```html
<header class="main-header fixed w-full z-80 pt-17 pb-24 xl:py-24
               pointer-events-none bg-white
               high-contrast:bg-black top-0">

  <a class="fixed z-10 -top-full focus:top-0 ..."
     href="#main">Skip to main content</a>

  <div class="container">
    <nav aria-label="Global" class="main-header__navigation">
      <div class="main-header__navigation__desktop hidden 1xl:flex">
        <a class="main-header__logo pointer-events-auto w-[104px] h-[104px]">
          <img src="...gruene.png" alt="Die Grünen">
        </a>
        <ul role="menubar" class="main-header__navigation__state-select pointer-events-auto">
          ...
        </ul>
      </div>
    </nav>
  </div>
</header>
```

**Drei Patterns lohnen sich:**

1. **Skip-Link** (`<a href="#main">`) erscheint nur bei Tastatur-Fokus
   (`focus:top-0`). Standard-A11y-Pattern, das im Org-DS heute fehlt.
   Trivial nachzuziehen.

2. **`pointer-events-none` am Header, `pointer-events-auto` an
   interaktiven Kindern**. Klicks ausserhalb von Logo/Nav-Buttons gehen
   durch den fixierten Header durch. Loest das fiese „Ich kann mein
   Hero nicht klicken, weil der Header drueber liegt"-Problem.

3. **`scroll-padding-top: 150px`** auf `html`, damit Anchor-Links nicht
   unter dem fixed Header verschwinden. Auch das fehlt im Org-DS.

4. **Logo: 104px Quadrat** (in CSS `w-[104px] h-[104px]`) — das ist ein
   sehr grosses Logo. Unser `.web-brandbar` im gemeindefinanzen-Labor
   nutzt 56px — fuer Datenwerkzeuge sinnvoller (weniger Hoehe weg).
   Org-DS kann beides anbieten ueber Modifier.

5. **BEM-Namensschema** (`main-header__navigation__desktop`) — passt zu
   unserem `.gat-header__inner`/`.gat-header__logo-mark`-Stil.

## A11y-Mechanik: `high-contrast:`-Variant

Das herausragende Pattern bei gruene.at: **jede Tailwind-Farbutility hat
ihren `high-contrast:`-Variant.** Das Markup zeigt:

```html
<header class="bg-white high-contrast:bg-black ...">
<a    class="text-white high-contrast:text-black bg-green high-contrast:bg-yellow ...">
<section class="bg-green high-contrast:bg-yellow ...">
<h2   class="text-white high-contrast:text-black ...">
```

CSS-seitig:
```css
.high-contrast * { border-color: var(--color-black); }
.high-contrast * { background-color: var(--color-black); }
.high-contrast *::placeholder { color: var(--color-yellow); }
```

In Tailwind v4 ist `high-contrast:` als **Variant** registriert, der greift,
wenn der Body die Klasse `.high-contrast` traegt (toggle ueber das
A11y-Widget oben-rechts: „Hoher Kontrast"-Button). Das ergibt eine echte
zweite, vollstaendig durchdesignte Farbschicht.

Die `.grayscale`-Klasse ist eine Standard-Tailwind-Filter-Utility, die das
A11y-Widget per JS auf `<body>` setzt — desaturiert dann die gesamte Seite.

**Fuer das Org-DS:** das ist eine ernsthafte Erweiterungsidee. Drei
Realisierungswege:

(a) **Dual-Token-Schicht** im DS: jede `--gat-color-*` hat ein Pendant
    `--gat-color-*-hc`. Body-Klasse `.gat-mode-hc` schaltet ueber CSS
    Custom-Property-Inheritance um. Konsumenten muessen nichts wissen.

(b) **Variant-System** wie gruene.at: erfordert Tailwind (nicht unser
    aktueller Build). Wir muessten Tailwind erst einfuehren — out of
    scope dieser Welle.

(c) **Body-Klasse + handgeschriebene Overrides** wie es gruene.at
    eigentlich macht, aber ohne den Tailwind-Variant-Syntactic-Sugar.
    Einfach umsetzbar im heutigen Stack.

**Empfehlung:** Option (a) — als parallele `--gat-color-*-hc`-Tokens. Das
DS kann es ausliefern, Konsumenten setzen die `.gat-mode-hc`-Klasse am
`<body>` und alle Komponenten schalten um. Saubere Trennung, keine
Build-Abhaengigkeit, vorwaertskompatibel mit Tailwind v4 (falls wir
spaeter wechseln). **Neuer Folge-Issue-Kandidat G** (siehe unten).

## Skalierung: `font-size: 62.5%`-Pattern

`html { font-size: 62.5%; }` macht aus 1rem 10px. Body dann
`font-size: 1.6rem` = 16px. Vorteil: rem-Math ist trivial. Nachteil:
**bricht Nutzer-Default-Font-Size** (User-Praeferenz auf 18px wird zu
11.25px Body) und ist heute als Accessibility-Antipattern eingestuft.

gruene.at akzeptiert das, weil sie das A11y-Widget mit „Text groesser"-
Knopf haben, der den root-`font-size` per JS hochsetzt. **Wir uebernehmen
das nicht** — Org-DS bleibt bei `font-size: 100%` und respektiert User-
Default.

## Inline-Variablen / Custom Properties am Markup

Stichprobe: **keine** inline-`style="--var-name: ..."`-Pattern auf der
Home gefunden. Alle Werte stehen im Stylesheet (statisches Theme-Design).

## Footer

```html
<footer class="bg-green ... content-info lg:pt-56 pt-26">
```

- Hintergrund: vollflaechiges Marken-Gruen
- Klassen: `content-info` (vermutlich aus WordPress-Sage-Convention)
- Spalten-Layout: 3 Spalten (Brand+Kontakt | Social-Icons | Footer-Nav)

Fuer das Org-DS heute nicht prioritaer (kein expliziter `.gat-footer` im
heutigen Bestand) — aber als zukuenftige Komponente notiert.

## Was wir bewusst NICHT uebernehmen

(Bestaetigung der gemeindefinanzen-Iter-15-Entscheidung)

- **Magenta-CTAs** — als Primary-CTA-Farbe fuer Datenwerkzeuge zu unruhig
  und politisch konnotiert. Bleibt nur Akzent-Farbe in `--gat-color-magenta`.
- **Vollflaechige gruene Section-Baender** mit weisser Riesenschrift — zu
  laut fuer Lese-/Analyseanwendungen.
- **`font-size: 62.5%`-Hack** auf `html` — A11y-Antipattern.
- **Logo-Groesse 104×104px** als Default — zu wuchtig fuer Datenwerkzeuge
  (56px Brandbar bleibt der Web-Default), aber als Modifier denkbar.
- **`<div class="btn">`-Wrapper mit `<a>` innen** — wir bleiben bei
  semantischem `<button>` bzw. `<a class="gat-btn">`.

## Konkrete Ergaenzungs-Vorschlaege fuer die Triage

**Neue Kandidaten** (zusaetzlich zu A–F im ISSUE.md):

### G. A11y-Mode-Token `--gat-*-hc` (high-contrast Modus-Toggle)
Eine zweite Farbschicht, die ueber `body.gat-mode-hc` aktiviert wird. Im
gruene.at-Stil: schwarz + magenta + gelb statt der normalen Palette.
Optionaler Modus, keine Default-Aenderung fuer Konsumenten. Vermutlich
**additiv**, **medium Prio**. Folgt der gruene.at-Konvention, schafft
echte A11y-Differenzierung.

### H. Skip-Link-Pattern
Standardisierter Skip-to-Main-Link mit `focus:top-0`-Verhalten als
`.gat-skiplink`-Komponente im DS. Trivial, **additiv**, **medium Prio**.

### I. `pointer-events-none`-Header + `scroll-padding-top`
Konvention fuer Fixed-Header-Tools: Header ist `pointer-events-none`,
interaktive Kinder `pointer-events-auto`; `html { scroll-padding-top:
${header-height}; }`. **Additiv**, **low Prio** — nur relevant fuer
Konsumenten mit fixiertem Header (die gemeindefinanzen-App hat heute
keinen fixed-Header).

### J. `hyphens: auto` auf Headline-Klassen
Trivial, **additiv**, **low Prio**. Verbessert deutsche Komposita-
Lesbarkeit.

### K. (Optional, gross) Tailwind-v4-Adoption als langfristige Option
Heute nicht akut, aber notiert. Wuerde das DS deutlich modernisieren und
das `:variant`-Pattern erlauben (siehe G). Eigener Researcher-Spike, falls
das DS spaeter neu gebaut werden soll. **Nicht Teil dieser Triage-Welle.**

## Quellen

- `https://gruene.at/` — Home-HTML (2026-05-23)
- `https://gruene.at/app/themes/sage/public/build/assets/app-v2vUCRpB.css`
  (Haupt-Theme-CSS, Tailwind v4)
- `https://gruene.at/app/themes/sage/public/build/assets/hero_start-Dk340uzc.css`
  (Hero-Block-CSS)
- Per-Block-CSS unter
  `https://gruene.at/app/themes/sage/public/build/assets/${block}-*.css`

Hash-Suffixe der Asset-Namen aendern sich mit jedem Build — die Doku-
Links sind ein Zeit-Snapshot. Fuer Folge-Issues immer frisch nachholen.
