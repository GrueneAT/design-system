# DS v2.0 Inventory (Stand 2026-05-23, post-Release)

Referenz fuer die Audit-Agents. Was im DS v2.0 bereits **vorhanden** ist und damit **nicht** zu den Audit-Befunden gehoert (sondern „App nutzt schon" oder „App sollte nutzen").

## Tokens (Druck-/Marken-Schicht — `--gat-*`)
- Farben: `--gat-color-primary/-secondary/-dunkelgruen/-hellgruen/-magenta/-gelb/-anthrazit/-weiss/-accent/-highlight/-text/-surface/-on-primary/-on-secondary`
- Schrift: `--gat-font-headline/-copy/-emphasis`, `--gat-leading-headline/-copy`, `--gat-text-h1/-h2/-h3/-subline/-copy/-small`
- Layout: `--gat-space-1..6`, `--gat-radius-sm/-md`, `--gat-container-max`, `--gat-breakpoint-sm/-md`, `--gat-border-width`

## Tokens (Web-Layer — `--gat-web-*`)
- Flaechen/Text: `--gat-web-bg/-surface/-surface-sunk/-text/-text-soft/-text-mute/-hairline/-shadow/-clay-text/-page-max`
- Focus: `--gat-web-focus-ring/-focus-offset`
- Chart-Palette: `--gat-web-chart-1..8` plus semantische Aliasse `-chart-green/-leaf/-teal/-gold/-clay/-plum/-slate/-sage`
- Radius-Helfer: `--gat-web-radius-card/-pill/-input` etc.

## Komponenten (Druck-/Marken-Schicht)
- Header/Nav: `.gat-header` (weisse Brandbar by default; Modifier `--dunkel`, `--fixed`), Unterelemente `__inner`/`__brand`/`__logo`/`__wordmark`/`__nav`/`__nav-list`/`__nav-link`/`__a11y-toggle`. `.gat-nav` als Standalone.
- Layout: `.gat-section`, `.gat-container`, `.gat-grid`/`--2`/`--3`
- Typografie: `.gat-headline`, `.gat-subline`, `.gat-fliesstext`, `.gat-emphasis`
- Buttons: `.gat-btn`/`--primary` (vollrund, Magenta)/`--secondary` (Pill-Outline)
- Cards (Marketing): `.gat-card`/`--primary`/`--secondary` mit `__body`/`__title`
- Akzent: `.gat-highlight`, `.gat-underline`, `.gat-stoerer`/`--gelb`/`--magenta`
- Skip-Link: `.gat-skiplink`

## Komponenten (Web-Layer / Datenwerkzeuge)
- `.gat-panel` (mit `__head`/`__head-row`/`__body`/`__body--table`/`__note`)
- `.gat-metric-card` (Modifier `--ertrag`/`--aufwand`/`--netto`/`--hero`)
- `.gat-callout`
- `.gat-section-head` (Sektionskopf mit h2 + Intro)
- `.gat-hero` (Auftakt-Block `__title`/`__intro`)
- `.gat-tag` (Pill/Badge)
- `.gat-tabbar` / `.gat-tab` (mit `.is-active` Funktionsklasse)
- `.gat-switcher` / `.gat-switch-btn`

## Patterns
- `:focus-visible`-Ring (`--gat-web-focus-ring` + `--gat-web-focus-offset`)
- `prefers-reduced-motion` global reset
- `@media print` Stylesheet
- `scroll-padding-top` fuer fixierte Header
- `hyphens: auto` auf Headline-Klassen

## A11y-Mode
- Tailwind-Variant `.gat-mode-hc:` (Body-Klasse-Toggle, jede Farb-Utility hat HC-Pendant)
- Konsumenten implementieren den Toggle-Knopf selbst (z. B. `.gat-header__a11y-toggle`)

## JavaScript-Modul
- `gat-charts.js` via CDN (`https://grueneat.github.io/design-system/gat-charts.js`)
- Exports: `PALETTE`, `INK`, `LABEL_SIZE`, `AXIS_SIZE`, `BAR_MAX_DICHT`, `BAR_MAX_WEIT`, `VA_DECAL`, `tip()`, `legende()`, `grid()`, `planIstLegende()`

## URL
- Stylesheet: `https://grueneat.github.io/design-system/design-system.css`
- Logo: `https://grueneat.github.io/design-system/assets/gruene-logo.svg`
- Charts: `https://grueneat.github.io/design-system/gat-charts.js`

## Was das DS bewusst NICHT liefert
- Logo-Toggle / A11y-Toggle-JS (Konsumenten-Sache)
- Charts-Engine (ECharts u. ae. waehlen Konsumenten)
- App-spezifische Domain-Klassen (Dropzone, Doc-Manager, Toast, Mehrjahres-Overlay etc.)
- Print-Sankey, Print-Treemap etc. — nur generische Print-Defaults
