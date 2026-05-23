# Changelog

Alle nennenswerten Änderungen am Grüne AT Design System werden in dieser Datei
dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.1.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/lang/de/).

Konsumierende Tools binden immer die aktuelle gehostete `design-system.css` ein
(siehe README). Diese Datei zeigt, was sich zwischen den Ständen geändert hat —
insbesondere Breaking Changes (MAJOR-Versionssprünge).

## [Unreleased]

## [2.0.0] - 2026-05-23

**Major Release.** Das DS ist nun Tailwind-v4-gebaut, mit additiver
`--gat-web-*`-Token-Schicht für datenwerkzeug-taugliche Web-Optik, einer
A11y-`gat-mode-hc`-Variant und neuen Komponenten. Schritt-für-Schritt-
Migration siehe [MIGRATION.md](MIGRATION.md).

### Added

- Tailwind-v4-Build-Pipeline (`npm run build`) — Tokens via `@theme`,
  Variants via `@custom-variant`.
- `--gat-web-*`-Schicht: Surfaces, entsättigte Text-Töne, 8-Ton-
  Chart-Palette, Web-Radien, Page-Max, Shadow- und Fokus-Ring-Helfer.
- Komponenten: `.gat-panel` (mit `__head`/`__head-row`/`__body`/
  `__body--table`/`__note`/`:fullscreen`), `.gat-metric-card`
  (`--ertrag`/`--aufwand`/`--netto`/`--hero` plus `__num`/`__label`),
  `.gat-callout`, `.gat-section-head`, `.gat-hero`, `.gat-tag`
  (`--neutral`/`--info`/`--pflicht`/`--risiko`), `.gat-skiplink`,
  `.gat-tabbar`/`.gat-tab`/`.gat-tab-panel`, `.gat-switcher`/
  `.gat-switch-btn`.
- `.gat-header--dunkel` opt-in-Modifier für die v1.x-Optik.
- `.gat-header--fixed` Konventions-Klasse für klebrige Header.
- `@custom-variant gat-mode-hc` (Tailwind v4) plus hand-geschriebene
  Komponenten-Overrides — High-Contrast-Modus per
  `body.gat-mode-hc`-Klasse.
- `:focus-visible`-Sammelblock auf allen DS-interaktiven Elementen.
- `prefers-reduced-motion`-Block reduziert Transitions/Animationen.
- `@media print`-Block mit Header-/Panel-/Metric-Card-Anpassungen,
  `break-inside`-Regeln und `.gat-no-print`-Hilfsklasse.
- `gat-charts.js`-ES-Modul mit Palette + ECharts-Helfern
  (`https://grueneat.github.io/design-system/gat-charts.js`).
- CI-Drift-Guard (`build-check.yml`): jeder Push/PR baut neu und prüft
  per `git diff --exit-code design-system.css`, dass committed Output
  und Source-Build übereinstimmen.
- `hyphens: auto` auf allen Headline-Klassen — wirkt sich vor allem auf
  deutsche Komposita aus.

### Changed (Breaking)

- **`.gat-header`** ist jetzt eine weiße Brandbar mit grüner
  Akzentlinie (statt dunkelgrünem Block). Konsumenten, die die
  Dunkelgrün-Optik beibehalten möchten, setzen
  `class="gat-header gat-header--dunkel"`. Markup wechselt von
  `.gat-header__logo`+`.gat-header__logo-mark` auf
  `.gat-header__brand`+`.gat-header__logo` (`<img>`)+
  `.gat-header__wordmark`+`.gat-header__nav-list`. Detail siehe
  MIGRATION.md.
- **`--gat-color-hellgruen`** wechselt von `#56af31` (Kontrast 2.77 auf
  Weiß, AA FAIL) auf `#3e8a25` (Kontrast 4.31 auf Weiß; AA für
  Großschrift, structural rule: Akzent-Fläche, nicht Textfarbe).
- **`.gat-headline`** ist `font-weight: 800` (war 900).
- **`.gat-card__title`** ist `font-weight: 700` (war 900).

### Deprecated

- `.gat-header__logo-mark` (CSS-Mask-Variante) entfällt aus dem
  Default-Header-Markup. Das Logo wird im neuen Header als echtes
  `<img>` referenziert (CDN-URL).

### Migration

Siehe `MIGRATION.md` für Schritt-für-Schritt-Anleitung inkl.
Vorher/Nachher-Snippets zu Header-Optik, Hellgrün-Wert, Headline-
Gewichten und `.gat-mode-hc`-Toggle.

## [1.0.0] - 2026-05-22

### Added

- Design-Tokens aus dem Corporate Design der Grünen Österreich: Farben,
  Typografie (Barlow Semi Condensed, Vollkorn), Abstände und Radien — als
  `--gat-*`-CSS-Custom-Properties.
- UI-Komponenten: `gat-header`/`gat-nav`, `gat-section`/`gat-container`,
  Typografie-Klassen (`gat-headline`, `gat-subline`, `gat-fliesstext`,
  `gat-emphasis`), `gat-btn` und `gat-card` (jeweils mit Pflicht-Modifier)
  sowie die CD-Layout-Elemente `gat-underline`, `gat-highlight` und
  `gat-stoerer`.
- Sichtbarer Style Guide unter `index.html` mit eingebetteter,
  maschinenlesbarer Spezifikation des gesamten Klassen- und Token-Vokabulars.
- Einbindungs-Anleitung in der `README.md` sowie ein vollständiges
  Minimal-Beispiel eines konsumierenden Tools unter `examples/minimal.html`.
