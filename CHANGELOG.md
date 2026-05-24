# Changelog

Alle nennenswerten Änderungen am Grüne AT Design System werden in dieser Datei
dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.1.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/lang/de/).

Konsumierende Tools binden immer die aktuelle gehostete `design-system.css` ein
(siehe README). Diese Datei zeigt, was sich zwischen den Ständen geändert hat —
insbesondere Breaking Changes (MAJOR-Versionssprünge).

## [Unreleased]

## [2.2.0] - 2026-05-24

**Minor Release — Datenwerkzeug-Standard.** Vier Komponenten-Familien,
die nach den vier Konsumenten-Migrationen auf v2.1.x als nächste
DS-Lücke übrig blieben — jeweils 3-fach Bedarf, heute in den App-Repos
als `.app-*` lokal nachgebaut. Strikt additiv: keine Breaking Changes,
keine Token-/Klassen-Umbenennung. Quelldokumentation:
`.issues/xuna6-…/ISSUE.md`.

### Added

- **`.gat-table` Familie** — Datentabelle mit Sticky-Head
  (`position: sticky; top: 0` auf `<thead> th`). Modifier:
  `--zebra` (alternierende Zeilen), `--compact` (reduziertes
  Zellpadding), `--dense` (Micro-Schrift via
  `--gat-text-micro`), `--sticky-col` (sticky erste Spalte für
  breite Vergleichstabellen). Subelemente: `__num` (rechtsbündig,
  `font-variant-numeric: tabular-nums`), `__sortable` (Helper für
  sortierbare Spaltenköpfe mit CSS-Pfeil-Indikator, `.is-active` /
  `.is-desc` als Funktionsklassen). Wrapper: `.gat-table-scroll`
  (horizontaler Scroll für breite Tabellen). Bedarf 3-fach:
  gemeindefinanzen (`.dtable`), personenwahl (`.app-table`),
  vorlagen (`.app-eval-table*`).
- **`.gat-dropzone` Familie** — Datei-Upload-Zone mit vier visuellen
  States: idle (gestrichelter Rand), `:hover`,
  `.is-dragover` (gefüllter Rand, Marken-Tint),
  `.is-error` (Magenta-Rand). Subelemente: `__icon` (SVG-Slot),
  `__label`, `__hint`, `__trigger` (Sekundär-Button für File-Picker-
  Fallback). Drag/Drop-Listener implementiert der Konsument; das DS
  liefert nur die Optik und die Funktionsklassen. Bedarf 3-fach:
  bildgenerator, gemeindefinanzen (`.dropzone`), personenwahl
  (CSV-Import).
- **`.gat-toast` / `.gat-toaster` Familie** — Notification-Container
  `.gat-toaster` (fix-positioniert, Default unten-rechts) mit
  einzelnen `.gat-toast`-Karten in vier Schwere-Varianten:
  `--info`, `--success`, `--warn`, `--error`. Subelemente:
  `__icon`, `__body`, `__close`. Slide-in-Animation
  (`gat-toast-in` Keyframe, 0.22s) mit
  `prefers-reduced-motion`-Fallback (reiner Opacity-Fade).
  Auto-Dismiss-Lifecycle ist Konsumenten-JS — das DS liefert keine
  Lifecycle-Logik. Bedarf 3-fach: bildgenerator,
  gemeindefinanzen (`.toast`), vorlagen.
- **`.gat-toolbar` Familie** — Sticky Action-Bar für Massen-Aktionen.
  Default: `.gat-toolbar` sticky am unteren Rand; Modifier
  `--top` kippt nach oben. Subelemente: `__count`
  (Selektions-Counter), `__actions` (Button-Container). Flex-Layout
  mit Wrap, subtle Shadow als Elevation. Bedarf 3-fach:
  bildgenerator, gemeindefinanzen, personenwahl.
- HC-Variant (`.gat-mode-hc`) für alle vier neuen Familien —
  Anthrazit + Gelb + Magenta-Akzent. Tabellen-Zebra in HC bewusst
  zurückgenommen (zu unruhig), bleibt aber definiert; Toast-Warn-/
  Error-Border wechselt in HC auf Magenta.
- Style-Guide (`index.html`): vier neue Sections „Datentabelle",
  „Drop-Zone", „Toast", „Toolbar" mit funktionierenden Demos
  inklusive aller Modifier und States.
- `examples/minimal.html`: Datentabelle (Förder-Topf) und Toast-Demo
  (Success-Toast via Button-Click) eingebaut.

### Token-Notes

- Neue Token-Familie `--gat-web-table-{head-bg,row-stripe,row-hover,
  border}` — vier Tokens. Stripe-Bg via `color-mix` aus
  `--gat-web-green-tint` und `--gat-web-surface`.
- Neue Token-Familie `--gat-web-dropzone-{border,border-hover,
  border-dragover,bg-idle,bg-dragover,bg-error}` — sechs Tokens.
- Neue Token-Familie `--gat-web-toast-{info,success,warn,error}-{bg,
  border,text}` — vier semantische Trios, eigenständig von Callout
  (Padding/Optik unabhängig). Plus
  `--gat-web-toaster-position-{bottom,right}` für override-bare
  Container-Positionierung.
- Neue Token-Familie `--gat-web-toolbar-{bg,border,shadow,padding-x,
  padding-y}` — fünf Tokens.
- Alle v2.0/v2.1/v2.1.1-Token bleiben werteweise unverändert.

### Migration

Strikt additiv. Konsumenten ziehen v2.2 automatisch beim nächsten
CDN-Refresh. Wer eine bisherige `.app-table` / `.app-dropzone` /
`.app-toast` / `.app-toolbar`-Lokalkopie hat, kann sie auf die
`.gat-*`-Familie umstellen — keine sichtbaren Pflicht-Anpassungen für
bestehende Konsumenten. Vollständige Migration: siehe `MIGRATION.md`
Abschnitt „v2.1.x → v2.2".

## [2.1.1] - 2026-05-24

**Patch Release.** Acht Folgebefunde aus den vier Konsumenten-Migrationen
auf v2.1 (Gemeindeordnung, personenwahl, bildgenerator, gemeindefinanzen,
vorlagen). Strikt patch-kompatibel: keine Breaking Changes, keine
Token-/Klassen-Umbenennung. Bestehende Konsumenten ziehen den Patch
automatisch beim nächsten CDN-Refresh. Quelldokumentation:
`.issues/pm5dd-…/ISSUE.md`.

### Added

- **Token `--gat-color-dunkelgruen-strong`** (`#005538`) — vertiefte
  Dunkelgrün-Variante für Opacity-Stacking-Use-Cases. Bei
  `color: var(--gat-color-dunkelgruen); opacity: 0.8` fällt der
  Default-Wert durch WCAG-AA; die `-strong`-Variante bleibt auch unter
  80 % Opacity AA-konform. Voll-opaker Marken-Default bleibt unverändert
  `--gat-color-dunkelgruen` (`#257639`). Befund: Gemeindeordnung Phase 0
  (axe-core auf Live-Seiten).
- **Token `--gat-text-micro`** (`0.6875rem`, ~11 px) — micro-Tier für
  dichten Caption-Kontext (Glossar-Sub-Labels, Tabellenfußzeilen,
  Meta-Tags). Nicht für Lese-Text. Befund: Gemeindeordnung Phase 2.
- **Token `--gat-web-radius-mini`** (`4px`) — Mini-Lozenge-Rundung
  zwischen `--gat-web-radius-control` (6 px) und nothing. Für Inline-
  Tags, Chips, schmale Indikatoren. Befund: Gemeindeordnung Phase 2.
- **Token `--gat-web-input-min-h`** (`44px`) — WCAG-Touch-Target-Floor,
  wird auf `.gat-input`/`.gat-select`/`.gat-textarea` als `min-height`
  angewandt. Konsumenten mit dichter Pointer-Optik überschreiben den
  Token nach unten. Befund: personenwahl Phase 2.
- **`.gat-header--kompakt` Modifier** — search-first-Layout-Variante des
  Headers: `flex-wrap: nowrap`, reduziertes Padding, `min-width: 0` mit
  Text-Truncation auf Wordmark und Nav. Bestehende `.gat-header`-
  Konsumenten unbetroffen. Befund: Gemeindeordnung Phase 2.
- **`.gat-mark` Atom** (plus `:where(mark)`-Reset) — Search-Highlight-
  Optik für Pagefind-Excerpts und On-Page-Search. Natives `<mark>` wird
  per Selektor mit Spezifität (0,0,0) auf DS-konforme Optik gebracht
  (entsättigtes Gelb + Text-Anthrazit, `padding 0 .15em`, `border-radius
  .15em`), ohne Konsumenten-Overrides zu blockieren. Klasse
  `.gat-mark` für explizites Span-Wrapping in JS-Render-Pipelines.
  Befund: Gemeindeordnung Phase 2.
- **`.gat-callout__lead` Subelement** — optionaler Lead-Slot für kurze
  Prefix-Labels („Hinweis:", „Wichtig:", „Hinweise zum Rechtsstand:").
  Fett, dezenter Bottom-Spacing zum Folgeabsatz. Ersetzt das manuelle
  `<strong>` am Absatzanfang. Befund: Gemeindeordnung Phase 2.
- HC-Variant (`.gat-mode-hc`) für `.gat-mark` — Gelb-auf-Anthrazit, der
  Treffer bleibt in der HC-Palette sichtbar.

### A11y

- **Touch-Target-Floor auf Form-Inputs**: `.gat-input`, `.gat-select`,
  `.gat-textarea` bekommen `min-height: var(--gat-web-input-min-h, 44px)`
  als Default. Das v2.1-Padding bleibt unverändert; `min-height` greift
  nur, wenn der gerenderte Wert sonst unter 44 px läge. Damit erfüllt
  das DS WCAG 2.5.5 (AAA) und 2.5.8 (AA) ohne lokale Patches in
  Konsumenten-Repos.

### Changed

- **`.gat-tag` Rundung**: wechselt von `border-radius: 999px` (Pill) auf
  `var(--gat-web-radius-mini)` (4 px). Passt besser zu Inline-Tags in
  dichten Tabellen und Listen. Konsumenten, die die Pill-Form behalten
  wollen, setzen lokal `.gat-tag { border-radius: 999px; }` — kein
  Behavior-Bruch, nur Mini-Visual-Drift innerhalb des
  Patch-Toleranz-Bereichs.

### Token-Notes

- Alle v2.0/v2.1-Token (`--gat-color-*`, `--gat-web-*`-Bestand) bleiben
  werteweise unverändert. v2.1.1 ergänzt vier neue Tokens und einen
  Modifier; nichts wird umbenannt, nichts entfernt.

### Migration

Strikt additiv. Konsumenten ziehen v2.1.1 automatisch beim nächsten
CDN-Refresh. Zwei sichtbare Änderungen sind im Patch-Toleranz-Bereich:
- `.gat-tag` ist jetzt eine Mini-Lozenge statt Pill (kosmetisch).
- Form-Inputs sind auf Touch-Geräten mind. 44 px hoch (A11y, abwärts-
  kompatibel: Inputs können nur größer werden).

Vollständige Migration und Body-Font-Override-Snippet (Befund 8 aus
Gemeindeordnung Phase 0): siehe `MIGRATION.md` Abschnitt
„v2.1.0 → v2.1.1".

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
