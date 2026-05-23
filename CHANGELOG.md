# Changelog

Alle nennenswerten Änderungen am Grüne AT Design System werden in dieser Datei
dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.1.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/lang/de/).

Konsumierende Tools binden immer die aktuelle gehostete `design-system.css` ein
(siehe README). Diese Datei zeigt, was sich zwischen den Ständen geändert hat —
insbesondere Breaking Changes (MAJOR-Versionssprünge).

## [Unreleased]

## [2.1.0] - 2026-05-23

**Minor Release.** Strikt additiv — keine Breaking Changes. Ergänzt vier
Komponentenfamilien (Form-Primitives, Modal, Callout-Modifier,
Tag-Modifier) plus die zugehörige Web-Token-Familie. Alle v2.0-Token und
-Klassen bleiben werteweise unverändert; bestehende Konsumenten brauchen
nichts zu ändern. Hintergrund siehe Cross-Repo-Audit
(`.issues/m6dhz-…/notes/SYNTHESIS.md`).

### Added

- **Form-Primitives** (`.gat-input`, `.gat-select`, `.gat-textarea`,
  `.gat-checkbox`, `.gat-radio`, `.gat-range`) mit States default /
  hover / focus-visible / disabled / readonly / invalid
  (`aria-invalid="true"` oder `.is-invalid`).
- `.gat-field` mit Subelementen `__label`, `__hint`, `__error` —
  optionaler Wrapper für Label-Layout. `.gat-check` als Inline-Label
  für Checkbox/Radio; `.gat-radio-group` (`--inline` für horizontale
  Anordnung) als Group-Wrapper.
- **Modal**: opt-in-Klasse `.gat-modal` für das native
  `<dialog>`-Element, mit Subelementen `__head` / `__title` / `__close`
  / `__body` / `__actions` (Sticky-Footer). Modifier `--blur`
  (Backdrop-Blur), `--wide`, `--narrow`. Keine DS-JS-Logik —
  Konsumenten rufen `showModal()`/`close()` selbst auf; Esc und
  Backdrop-Klick schließen nativ.
- **Callout-Modifier** (semantische Familie): `.gat-callout--info`
  (Default-Stil, neu explizit), `--warn`, `--error` / `--danger`,
  `--success`, `--legal`. Optionales Subelement
  `.gat-callout__icon` als reiner Slot.
- **Tag-Modifier** (semantische Ergänzung): `.gat-tag--ok` /
  `--success`, `--warn`, `--error` / `--danger`. Die bestehenden
  `--neutral` / `--info` / `--pflicht` / `--risiko` bleiben
  unverändert.
- HC-Variant (`.gat-mode-hc`) für alle neuen Komponenten —
  Anthrazit + Gelb + Magenta-Fehlerfarbe.
- Print-Rules: `.gat-modal { display: none }`; `break-inside: avoid`
  auf allen Callout-Varianten.
- Style-Guide (`index.html`): neue Sections „Formulare" und „Modal";
  erweiterte „Callout"- und „Tag"-Sections mit allen Varianten.
- `examples/minimal.html`: zusätzlicher Form-Block, Callout-Variant
  und Modal-Demo.

### Token-Notes

- Neue Token-Familie `--gat-web-input-*` (bg, border, border-focus,
  border-invalid, text, placeholder, radius, padding-x, padding-y,
  disabled-bg, disabled-text).
- Neue Token-Familie `--gat-web-modal-*` (bg, backdrop, shadow,
  radius) plus globaler Helfer `--gat-web-shadow-elevated`.
- Neue Token-Familie `--gat-web-callout-{info,warn,error,success,
  legal}-{bg,border,text}` — fünfteilige semantische Trios.
- Neue Token-Familie `--gat-web-tag-{ok,warn,error,neutral,info}-{bg,
  text}` — eigenständig von Callout, weil Padding/Schrift abweichen
  können.
- Alle v2.0-Token (`--gat-color-*`, `--gat-web-*`-Bestand) bleiben
  werteweise unverändert.

### Migration

Strikt additiv. Konsumenten, die heute schon `.gat-callout` oder
`.gat-tag--neutral`/`.gat-tag--info` nutzen, sehen keinen Unterschied.
Wer die neuen Komponenten nutzen möchte, findet Schritt-für-Schritt-
Hinweise in [MIGRATION.md](MIGRATION.md) — Abschnitt „v2.0 → v2.1".

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
