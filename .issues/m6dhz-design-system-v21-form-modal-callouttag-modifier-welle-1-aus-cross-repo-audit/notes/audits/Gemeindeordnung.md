# Gemeindeordnung — DS-v2.0-Audit

## App-Zweck

Public-facing Webseite, die alle 9 oesterreichischen Gemeindeordnungen, die 14 Stadtrechte und Organisationsgesetze (NOe STROG) sowie LLM-generierte FAQs und ein Glossar volltext-durchsuchbar und tief-verlinkbar bereitstellt. Static Site auf Vite + TailwindCSS v4 + Pagefind, deployed auf GitHub Pages.

## Aktuelle DS-Anbindung

- **DS-CSS-Link:** nein. Eigenes `src/css/main.css` (1058 Zeilen) via Tailwind v4 `@theme` mit lokalen `--color-gruene-*` Tokens.
- **DS-Logo-Asset:** nein. Lokal gespiegelt unter `src/assets/gruene-logo.png` (gehashtes PNG, 32x32). Kein SVG-Wordmark.
- **gat-charts.js:** nein (nicht relevant — keine Diagramme).
- **Verwendet schon:** gar nichts aus dem DS. Komplett lokal gewachsenes Stylesheet, das parallel zu DS v2.0 dasselbe Branding nachbaut.
- **Verwendet noch lokale Alt-Klassen:** ALLES. Insbesondere die Header-Bar, der „Hinweis"-Banner, das Modal, die Card-Grid-Items, die Buttons, die Disclaimer-Pille, der Sticky-Header-Pattern, der Skiplink (fehlt sogar). Tailwind-Utilities werden roh inline benutzt (`text-gruene-dark`, `bg-gruene-light/50`, `rounded-lg`, `shadow-sm`).

Mismatch-Risiko: Die App hat eine eigene Farb-Token-Quelle (`--color-gruene-green: #6BA539`, `--color-gruene-dark: #005538`), die zwar wahrscheinlich nahe am DS liegt, aber nicht an `--gat-color-primary/-dunkelgruen` gekoppelt ist. Bei DS-Tweaks drifted die App lautlos.

---

## Befunde (kategorisiert)

### A. Kandidaten fuer DS-Aufnahme

**A1. Sticky-Header mit Such-Trigger + Nav + Brand**
Heute lokal: `<header class="sticky top-0 bg-white border-b border-gray-200 z-10">` mit Tailwind-Utilities, eigener `gemeindeordnung.gruene.at`-Wordmark + Inline-Logo + Nav-Links + Such-Such-Trigger (`.search-trigger-btn`) + Mobile-Search-Field (`.header-search-field`). Auf 4 Seitentypen identisch eingebaut.
DS heute: `.gat-header` existiert, kennt aber `--fixed` (oben festgenagelt), nicht „sticky + sucht-Eingabe inline". Auch der schwarz-graue Search-Trigger-Button mit Magnifier-SVG ist ein wiederkehrendes Datenwerkzeug-Pattern.
Vorschlag: `.gat-header` braucht einen Modifier `.gat-header__search` (oder ein neues `.gat-header__action`-Slot), in den App-Logos einen Such-Pill-Trigger einhaengen koennen. Plus generischer Helper `.gat-search-trigger` (Pill mit Magnifier + optionalem Shortcut-Badge `Ctrl+K`).
Wiederverwendbar von: jedem Datenwerkzeug mit Pagefind/Fuse-Suche (buergerinnenrat hat das ebenfalls). Aufwand: M.

**A2. Cmd-K-Search-Modal (Backdrop + zentriertes Panel + Tabs + Resultatslisten)**
Heute lokal: `.search-modal-backdrop`, `.search-modal`, `.search-modal-header`, `.search-modal-shortcut` (ESC-Pille), `.search-modal-close`, `.search-modal-body`, `.search-modal-results`, plus `.search-tabs` / `.search-tab-btn` / `.search-tab-active` (Tab-Bar im Modal). Komplette Tastatur-/Mobile-Choreografie in JS.
DS heute: hat `.gat-tabbar`/`.gat-tab` (Funktionsklasse `.is-active`), aber kein Modal/Overlay-Primitiv und kein Search-Dropdown-Primitiv.
Vorschlag: `.gat-modal` + `.gat-modal__backdrop`/`__header`/`__body`/`__close` + `.gat-shortcut-badge`. Das ist ein generisches Overlay-Pattern, das jedes Tool braucht (Confirm-Dialog, Filter-Drawer, Detailansicht). Tabs sind schon im DS, nur als Sub-Element des Modals dokumentieren.
Wiederverwendbar von: buergerinnenrat, Gemeindefinanzen (jedes Tool, das mal einen Dialog braucht). Aufwand: M-L.

**A3. Search-Result-Liste mit Treffer-Card + Highlight-`<mark>` + Badge + Counts**
Heute lokal: `.search-result-item`, `.search-result-title`, `.search-result-excerpt mark { background: rgba(250,204,21,0.4) }`, `.search-badge-stadtrecht` (Pill), `.search-count`, `.search-group-heading`, `.search-law-heading`, `.search-law-count`, `.search-sub-result`, `.search-empty-state`/`-title`/`-hint`/`-action`, `.search-hint`, `.search-show-all`. Auch `.pagefind-highlight` fuer On-Page-Hervorhebung in gelb.
DS heute: nichts dergleichen. `.gat-tag` ist da, aber kein Search-Card-Pattern und vor allem **kein offizielles Hervorhebungs-Token** (`<mark>` ist hier in #facc15-Gelb gemalt — knapp am DS-Gelb-Token vorbei).
Vorschlag: drei generische Bausteine im DS:
- `.gat-result-list` + `.gat-result-list__item` + `.gat-result-list__title` + `.gat-result-list__excerpt` (Listen-Card-Atom).
- Globales `mark`-Styling auf `--gat-color-gelb` (oder neu `--gat-color-highlight-bg`).
- `.gat-result-list__group` als Sektions-Header-Pille innerhalb der Liste.
Begruendung: jedes Konsumenten-Tool mit Such-/Filter-UI baut diese Liste neu. Aufwand: M.

**A4. „Hinweis: KI-Disclaimer"-Banner (Inline-Callout)**
Heute lokal: 59x `<div class="bg-gruene-light/50 border border-gruene-green/30 rounded-lg p-3 mb-6 text-sm text-gruene-dark">` und 33x als `bg-amber-50 border border-amber-200 …` (Bundeslaender-Variations-Warnung). Insgesamt 92 Banner — pro Seitentyp wiederholt.
DS heute: `.gat-callout` existiert. Was fehlt: semantische Modifier `--info`/`--warn`/`--legal` (oder farbtypisierte Varianten) **und** ein dokumentiertes Amber/Gelb-Pendant (die App benutzt Tailwind-amber statt `--gat-color-gelb`).
Vorschlag: `.gat-callout--info` (gruen-light, default-Variante), `.gat-callout--warn` (gelb/amber via DS-Token), `.gat-callout--legal` (Disclaimer-Kapsel mit fester Standard-Copy als Snippet im DS-Docs).
Wiederverwendbar: ueberall, wo LLM-Output gezeigt wird. Aufwand: S.

**A5. Floating-Action-Buttons unten rechts (Scroll-to-top + Search-FAB mobile)**
Heute lokal: `.fab-container` (fixed unten rechts), `.fab-btn` (48x48, gruen-dark, white-icon, Schatten), `.fab-search` (only-mobile), `.fab-scroll-top` (toggled). Werden auf allen Seiten gerendert.
DS heute: nichts dergleichen.
Vorschlag: `.gat-fab` + `.gat-fab-stack` (Container) sind generisch genug fuer DS. Mobile-First Tools brauchen das genauso (Karten, Listen, lange Dokumente).
Wiederverwendbar von: alle Lese-Tools mit langem Scroll (Gemeindeordnung, Buergerinnenrat, Gemeindefinanzen). Aufwand: S.

**A6. Brand-Card-Listen-Item (Index-Card mit Titel + Sub + Datum)**
Heute lokal: 23 mal generierte `<a class="block bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-4">` mit drei Text-Zeilen (`font-bold text-gruene-dark`, `text-sm text-gruene-dark/80`, `text-xs text-gray-500`). Identische Struktur auf FAQ-Index.
DS heute: `.gat-card`/`--primary`/`--secondary` ist „Marketing-Card" mit grossen farbigen Flaechen und `__title`/`__body`. **Nicht** das nuechterne weisse Listen-Card-Atom, das App-Toolings brauchen.
Vorschlag: `.gat-list-card` (oder `.gat-card--list`) — weiss, mit Hairline-Border, dezenter Schatten, Hover-Lift. Substruktur `__title`/`__sub`/`__meta`.
Wiederverwendbar: jede Index- oder Uebersichts-Seite. Aufwand: S.

**A7. Discovery-Chip (Outline-Pill als Link)**
Heute lokal: `.discovery-chip` (rounded-full, gruener Outline, fill on hover) + `.discovery-label` (Uppercase-Kicker davor). `.discovery-section-compact` als Flex-Wrap-Container.
DS heute: `.gat-tag` ist Pill/Badge, aber als **statisches** Lesezeichen — nicht als interaktiver Link-Pill mit Hover-Fill. Auch der Uppercase-Kicker davor fehlt.
Vorschlag: `.gat-chip` (interaktive Variante von `.gat-tag` mit Hover/Focus-States) + `.gat-chip-label` (Uppercase-Kicker). Oder `.gat-tag--link` als Modifier.
Wiederverwendbar von: jedes Tool mit „verwandte Themen"-Chips. Aufwand: S.

**A8. Inline-Search-Input (gross, Magnifier-Icon inline, Focus-Ring)**
Heute lokal: `.inline-search-input` (Padding-Left fuer SVG, 1.5px Border, Focus mit gruenem Ring), `.inline-search-dropdown`, `.inline-search-empty`, `.inline-search-show-all`. Mit Mobile-Fixed-Variante.
Auch `.topic-search-input` macht dasselbe nochmal als Variante mit Background-SVG. Doppelte Implementierung.
DS heute: gar keine Form-Inputs. Das ist eine **Luecke**, die ueber Gemeindeordnung hinausgeht.
Vorschlag: `.gat-input` (Basis: padding, radius, border, focus-ring auf `--gat-web-focus-ring`) + `.gat-input--search` (mit Magnifier-Slot links). Plus `.gat-combobox`/`.gat-combobox__dropdown` als Pattern fuer Listbox-darunter.
Wiederverwendbar: ueberall. Aufwand: M.

**A9. Sticky-Header `scroll-padding-top` + h2/h3 `scroll-margin-top` Anchor-Pattern**
Heute lokal: `h3[id] { scroll-margin-top: 5rem }` und `h2[id]` separat in main.css. Plus `.anchor-highlight` Keyframe-Animation (Gelb-fade beim Deeplink-Sprung).
DS heute: Inventur sagt `scroll-padding-top fuer fixierte Header` ist als Pattern dokumentiert — aber `.anchor-highlight` (Deeplink-Hervorhebung) ist nicht dabei.
Vorschlag: `.gat-anchor-flash` Utility + Keyframe `gat-anchor-flash` ins DS. Jede tief verlinkte Seite kann das gebrauchen.
Wiederverwendbar von: alle Lese-Tools. Aufwand: XS.

**A10. Skiplink fehlt komplett**
Heute lokal: kein `.skip-link`/`.gat-skiplink`-Element in irgendeiner Seite. A11y-Defizit.
DS heute: `.gat-skiplink` ist da.
Vorschlag: keine DS-Erweiterung — App sollte einfach das DS-Element einbauen. (Quick-Win.)

---

### B. App-spezifisch — bleibt lokal

**B1. Law-Text Lese-Typografie (`.law-text`, `.law-text article`, `.hauptstueck-heading`, `.abschnitt-heading`)**
17px/16px (mobile), max-width 65ch, Hauptstueck mit `border-top: 3px solid green`, Abschnitt mit `border-left: 3px solid green`. **App-spezifisch**, weil eine Gemeindeordnung eine spezielle Hierarchie hat (Hauptstueck > Abschnitt > Paragraph) — das ist kein generisches Lese-Tool-Muster.
Empfehlung: lokal lassen, aber unter `.app-law-*` Namespace umbenennen (`.app-law-text`, `.app-law-hauptstueck`, `.app-law-abschnitt`). Vermeidet Kollisionen mit potentiellem zukuenftigen `.gat-law-*`.

**B2. Absatz-Zeilen (`.absatz`, `.absatz-num`, `.absatz-text`, `.absaetze-container`)**
Flex-Layout mit nummerierter Spalte links und Text rechts, tabular-nums. **Hochspezifisch** fuer Gesetzestexte.
Empfehlung: lokal, Namespace `.app-absatz-*`.

**B3. Legal-Reference Inline-Marker (`.legal-ref`)**
`color: gruene-dark; font-weight: 500; white-space: nowrap` fuer „§ 5 Abs. 1" Verweise. Sehr spezifisch.
Empfehlung: lokal, Namespace `.app-legal-ref`.

**B4. Law-Summary Box (`.law-summary`)**
Gruen-light Box mit linkem Akzent-Border, eingeklebt unter dem Paragraph-Header, enthaelt LLM-Zusammenfassung. **Eigentlich** koennte das auch ein `.gat-callout` mit `--info`-Modifier sein (vgl. A4). Aber die spezifische Position direkt-unter-paragraph-header und die ueber 1500 Vorkommen lassen den App-eigenen Namen sinnvoller wirken.
Empfehlung: B-mit-Abhaengigkeit-zu-A4. Sobald A4 (`.gat-callout--info`) im DS, kann `.law-summary` zu einer Komposition aus `.gat-callout--info` + `.app-law-summary` (Position/Margin-Tweaks) werden.

**B5. Glossar-Tooltip (`.glossar-term`, `.glossar-tooltip`, `.glossar-tooltip-link`)**
Dotted-underline Term mit absolut positioniertem dunkelgruenem Tooltip on hover/tap. Sehr inhaltlich gepraegt (juristische Begriffe).
Empfehlung: lokal. Das DS sollte aber ein generisches `.gat-tooltip`/`.gat-popover` Primitiv anbieten (siehe C2 unten).

**B6. Bundesland-Switcher (`.bl-switcher`, `.bl-header-select`)**
Custom-gestyltes `<select>` mit Inline-SVG-Chevron als data-URI Background. App-spezifisch, weil die Bundeslaender-Liste mit Stadtrechten Eigen-Domaene ist.
Empfehlung: lokal. Aber das **gestylte Select-Element** als solches ist ein Pattern, das ins DS gehoert (siehe C3).

**B7. Table-of-Contents (Inhaltsverzeichnis als `<details>`-Baum)**
Native `<details>`/`<summary>` ohne eigene Klassen — Tailwind-only inline. **Genug generisch**, dass das DS ein `.gat-toc` anbieten koennte; aber heute braucht es nur Gemeindeordnung.
Empfehlung: lokal lassen, beobachten ob Buergerinnenrat / weiteres Tool denselben Patron baut.

**B8. Topic-Filter Multiselect (`.topic-search-input`, `.topic-dropdown`, `.topic-dropdown-item`, `.topic-selected-chips`, `.topic-selected-chip`, `.topic-chip-remove`, `.topic-reset-link`)**
Komplettes Multiselect-Combobox-Widget mit Checkboxen, ausgewaehlten-Chips unten, Counts pro Topic, Reset-Link. Sehr App-spezifisch (Themen-Filter auf Paragraph-Ebene).
Empfehlung: lokal — aber baut auf A8 (`.gat-combobox`) auf, sobald das DS das Basis-Primitiv hat.

---

### C. Hybrid: DS-konforme Loesung benoetigt

**C1. „LLM-generated content" Disclaimer-Pattern**
App hat den Hinweis 90x kopiert (gruen oder amber). Das ist ein **organisationsweites** Thema — jedes Grüne-Tool, das LLM-Output zeigt (Gemeindeordnung-FAQ, Gemeindefinanzen-Summary, Buergerinnenrat-Analysen), braucht denselben rechtssicheren Disclaimer.
DS muesste liefern: `.gat-callout--legal` (siehe A4) + im DS-Docs eine **kanonische Disclaimer-Copy** als HTML-Snippet (DE), die App-Teams einfach einbetten.
App-Spezialisierung: Position (`mb-6`), evtl. zusaetzliche „regionale Variation"-Variante.

**C2. Tooltip/Popover-Primitiv**
Die App hat `.glossar-tooltip` als CSS-only Tooltip. Andere Tools wuerden Tooltip eher mit Popper/Floating-UI in JS bauen — der CSS-only Ansatz kollidiert sonst (z-index, Overflow auf Mobile, Touch-Tap-Toggle).
DS muesste liefern: `.gat-tooltip` (CSS-only fuer Statisches) **und** `.gat-popover` (mit Hook fuer JS-Positionierung). Plus Token `--gat-web-popover-bg`/`-shadow`.
App-Spezialisierung: spezifischer Trigger-Style (`.app-glossar-term` mit dotted underline) bleibt.

**C3. Form-Controls als Familie (Input, Select, Combobox, Checkbox)**
Die App baut all das (search-input, BL-select, topic-multiselect, glossar-filter) lokal mit Tailwind-Utilities und data-URI SVG-Chevrons. Vier verschiedene Stilauspraegungen fuer dasselbe (`.bl-switcher-select`, `.bl-header-select`, `.inline-search-input`, `.topic-search-input`).
DS muesste liefern: **Form-Layer** mit `.gat-input`, `.gat-select`, `.gat-textarea`, `.gat-checkbox`, `.gat-radio` als minimal-aber-konsistente Familie, plus `.gat-field` (Label + Hint + Error-Wrapper).
App-Spezialisierung: Bundesland-Optgroup-Struktur, Topic-Filter-Domaenenlogik bleibt.
Aufwand: L — aber das schaerfste Defizit dieses Repos und mit Sicherheit auch der anderen Datentools.

**C4. Modal/Overlay-Primitiv**
Siehe A2. Hybrid, weil App eine sehr spezifische Search-Choreografie hat (Tab-Switch, ESC-Shortcut-Pill, prefill aus Hero-Input, Auto-Pre-Filter aus Page-Meta). Das DS liefert das **Overlay-Skelett** (`.gat-modal`/`__backdrop`/`__header`/`__body`/`__footer`/`__close`), die App fuellt es.

**C5. Highlight-Token (Search-Hit + Anchor-Flash)**
Die App benutzt `rgba(250, 204, 21, 0.4)` (Tailwind yellow-400 @ 40%) fuer `<mark>` und `.pagefind-highlight`, und `var(--color-gruene-light)` fuer `.anchor-highlight`. Zwei verschiedene Hervorhebungs-Farben fuer zwei verschiedene Bedeutungen, beide off-DS.
DS muesste liefern: `--gat-color-highlight-search` (gelb) und `--gat-color-highlight-anchor` (gruen-light), plus `mark { background: var(--gat-color-highlight-search) }` als Global.
App-Spezialisierung: Animation `.gat-anchor-flash` als Keyframe (siehe A9).

---

## Visuelle Anomalien

- **Tailwind-Amber** (`bg-amber-50` `border-amber-200`) wird 33x verwendet — komplett ausserhalb der DS-Palette. Sollte auf `--gat-color-gelb` umgestellt werden, sobald `.gat-callout--warn` da ist.
- **Tailwind-Gray-Skala** (`text-gray-500`, `border-gray-200`, `text-gray-400`, `text-gray-300`) wird durchgehend statt `--gat-web-text-soft/-text-mute/-hairline` benutzt. Inkonsistent zur DS-Web-Layer.
- **Eigene Farb-Tokens via `@theme {}`**: `--color-gruene-green: #6BA539`, `--color-gruene-dark: #005538`, `--color-gruene-light: #E8F5E9`, `--color-gruene-accent: #8AB414`, `--color-gruene-link-hover: #2D5016`. Werden mit hoher Wahrscheinlichkeit identisch oder eng-aehnlich zu DS-Tokens sein, aber die App pflegt sie autonom.
- **Hero-Gradient** `linear-gradient(135deg, #f0f7ed 0%, #e8f5e3 100%)` — zwei eigene Hex-Werte, kein Token-Bezug.
- **Search-Trigger-Button-Hintergrund** `rgba(107, 165, 57, 0.1)` und Focus-Ring `rgba(107, 165, 57, 0.15)` — hand-gemixte Transparenzen aus `#6BA539`. Sollten Token werden.
- **Schatten**: `0 4px 12px rgba(0,0,0,0.25)` (FAB), `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)` (Search-Dropdown), `0 25px 50px -12px rgba(0,0,0,0.25)` (Modal), `shadow-sm`/`shadow-md`/`shadow-lg` (Cards). Drei Eigen-Schatten plus Tailwind-Defaults — keine Bindung an `--gat-web-shadow`.
- **Border-Radien**: `9999px` (FAB, Chips, Pills), `0.75rem` (Modal), `0.5rem` (Cards/Inputs, Search-Dropdown), `0.375rem` (Hero-Tooltip), `0.125rem` (mark). Streut: das DS hat `--gat-radius-sm/-md` und `--gat-web-radius-card/-pill/-input` — keiner davon wird benutzt.
- **`bg-gruene-light/50`** wird benutzt, was Tailwind-Opacity-Suffix-Magic ist und nur funktioniert, weil `--color-gruene-light` als Tailwind-Theme-Color registriert ist. Bei einer DS-Migration zu `--gat-color-hellgruen` muss diese Opacity-Mechanik bewusst nachgebaut werden.
- **Schriftgroessen**: `0.6875rem` (11px) fuer Stadtrecht-Badge, Modal-Shortcut, BL-Switcher-Label — unterhalb `--gat-text-small`. Funktioniert mobile, ist aber nicht in der DS-Skala dokumentiert.
- **Keine `prefers-reduced-motion`-Beruecksichtigung** trotz `anchor-highlight`, `modal-slide-in`, `fade-in` Keyframes. DS bringt das global mit — wuerde Quick-Win bei DS-Adoption.
- **`scroll-padding-top` fehlt** trotz Sticky-Header: stattdessen wird `scroll-margin-top: 5rem` einzeln pro Heading-Selektor gesetzt. DS macht das einmal global.

---

## Quick-Wins (Migration low-effort)

1. **DS-CSS-Link einbinden** (5 min): `<link rel="stylesheet" href="https://grueneat.github.io/design-system/design-system.css" />` vor dem lokalen `main.css`. Loest sofort `:focus-visible`-Ring, `prefers-reduced-motion`, globale `mark`-Hervorhebung, A11y-Skiplink-Skelett aus.
2. **Skiplink hinzufuegen** (`.gat-skiplink`): bisher fehlt komplett, Pflicht-A11y. Eine Zeile pro Seitentemplate.
3. **Logo-Asset auf DS-SVG umstellen** (`https://grueneat.github.io/design-system/assets/gruene-logo.svg`): ersetzt 15kB PNG durch das Wordmark-faehige SVG, einheitliches Branding.
4. **`.gat-callout` adoptieren** fuer die 92 Hinweis-Banner — sobald `--info`/`--warn` Modifier im DS sind, ist das ein 5-Minuten-Search-and-Replace pro Seitengruppe (Templates in `scripts/generate-pages.js`, ein zentraler Punkt).
5. **`.gat-header` adoptieren**, sobald `__search`-Modifier verfuegbar ist. Heute ist der Header dreimal copy-paste-dupliziert (index, law, faq, glossar) — perfekter Migrationskandidat.
6. **Eigene `--color-gruene-*` Tokens an `--gat-color-dunkelgruen/-hellgruen/-primary` koppeln** (CSS-Variable-Alias): `--color-gruene-dark: var(--gat-color-dunkelgruen)` etc. Kein Markup-Touch noetig, killt Drift.
7. **Tailwind-Gray-Klassen** auf `text-[var(--gat-web-text-soft)]`-Style Utilities migrieren (oder Tailwind-Theme um DS-Tokens erweitern).
8. **Anchor-Highlight Keyframe** (`anchor-highlight` 2s ease-out) in DS verschieben, wenn das DS-Team A9 akzeptiert.
9. **FAB-Stack** (`.fab-container` + `.fab-btn`) als `.gat-fab`/`.gat-fab-stack` ins DS heben — 8 CSS-Regeln, hohe Wiederverwendbarkeit.
10. **Mehrfach-Implementierung des Search-Inputs** zusammenfuehren: `.inline-search-input` und `.topic-search-input` machen dasselbe (Input + Magnifier-SVG-Background, gruener Focus-Ring) — kann auf eine Klasse reduziert werden, sobald `.gat-input--search` im DS ist.
