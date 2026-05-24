---
id: xuna6
title: DS v2.2 — Datenwerkzeug-Standard (Table, Dropzone, Toast, Toolbar)
status: open
priority: high
labels:
- enhancement
remote:
- source: github
  id: '17'
  url: https://github.com/GrueneAT/design-system/issues/17
---

DS-Welle 2 (v2.2). Vier Komponenten-Familien, die nach den vier Konsumenten-Migrationen als naechste DS-Luecke uebrig blieben — je 3-fach Bedarf, jeweils heute in den App-Repos als `.app-*` lokal nachgebaut.

Trigger: Cross-Repo-Audit `#13`-Folgewelle. Siehe Iterations-Abschluss-Notes in `gemeindefinanzen`, `Gemeindeordnung`, `personenwahl`, `vorlagen` — jeweils Abschnitt „warten auf v2.2".

**Strikt additiv** — keine Breaking Changes; bestehende v2.0/v2.1-Token/Klassen unveraendert.

## Vier Komponenten-Familien

### A. `.gat-table` — Datentabelle

**Bedarf 3-fach:** gemeindefinanzen (`.dtable` Audit-A5), personenwahl (`.app-table` A11), vorlagen (`.app-eval-table*` A7).

- Basis: `<table class="gat-table">` mit `<thead>`/`<tbody>`/`<tfoot>`
- Sticky-Head: Kopfzeile bleibt beim Scrollen sichtbar (`position: sticky; top: 0` auf `<thead> th`)
- Zebra-Optional: `.gat-table--zebra` Modifier (alternierende Zeilenhintergrund)
- Compact-Variante: `.gat-table--compact` (reduziertes Zellpadding)
- Dense-Variante: `.gat-table--dense` (noch kleinere Schrift fuer datenreiche Tabellen — nutzt `--gat-text-micro` aus v2.1.1)
- Numerische Spalten: `<td class="gat-table__num">` mit `text-align: right` und `font-variant-numeric: tabular-nums`
- Sticky-erste-Spalte-Optional: `.gat-table--sticky-col` (fuer breite Vergleichstabellen wie vorlagen-Schriften-Vergleich)
- Sort-Indikator-Klasse: `.gat-table__sortable` mit Hover-Pfeil-Icon, `.is-active`-State-Klasse (Funktionsklasse, kein JS im DS)
- Scrollbarer Wrapper: `.gat-table-scroll` (horizontaler Scroll fuer breite Tabellen, mit min-width auf die Tabelle innen)
- Tokens: `--gat-web-table-head-bg`, `-row-stripe`, `-row-hover`, `-border`

### B. `.gat-dropzone` — Datei-Upload-Zone

**Bedarf 3-fach:** bildgenerator (A8), gemeindefinanzen (`.dropzone` A4), personenwahl (Audit-A2 implizit ueber CSV-Import).

- Basis: `<div class="gat-dropzone">` mit Slot fuer Label + Icon + Hint-Text
- States: `.gat-dropzone` (idle), `:hover`, `.is-dragover` (waehrend Drag-over), `.is-error` (nach fehlgeschlagenem Upload)
- Subelemente: `.gat-dropzone__icon`, `.gat-dropzone__label`, `.gat-dropzone__hint`, `.gat-dropzone__trigger` (Sekundaer-Button fuer File-Picker-Fallback)
- Gestrichelter Rand als Default, gefuellter Rand im is-dragover-State
- Tokens: `--gat-web-dropzone-border`, `-border-hover`, `-border-dragover`, `-bg-idle`, `-bg-dragover`, `-bg-error`

### C. `.gat-toast` / `.gat-toaster` — Notifications

**Bedarf 3-fach:** bildgenerator (A4), gemeindefinanzen (A1 `.toast`), vorlagen (A8).

- Container: `<div class="gat-toaster">` fix-positioniert (typischerweise unten-rechts oder oben-rechts)
- Einzel-Toast: `<div class="gat-toast">` mit Modifier-Varianten `.gat-toast--info`/`--success`/`--warn`/`--error`
- Subelemente: `.gat-toast__icon` (Slot), `.gat-toast__body` (Text), `.gat-toast__close` (Schliessen-Button)
- Slide-in-Animation (`prefers-reduced-motion`-respektierend)
- Auto-dismiss: kein DS-JS, Konsument steuert die Lifecycle
- Tokens: `--gat-web-toast-{info,success,warn,error}-bg/-border/-text`, `--gat-web-toaster-position-bottom/-right` (override-bar)

### D. `.gat-toolbar` — Sticky Action-Bar

**Bedarf 3-fach:** bildgenerator (C4 Tool-Layout), gemeindefinanzen (C4), personenwahl (A12 Sticky-Action-Footer).

- Basis: `<div class="gat-toolbar">` mit Slot fuer Buttons + Labels + Counter-Texts
- Default: sticky am unteren Viewport-Rand fuer Massen-Aktionen
- Variante: `.gat-toolbar--top` (sticky am oberen Rand)
- Sub: `.gat-toolbar__count` (Selektions-Counter, z. B. „3 ausgewaehlt"), `.gat-toolbar__actions` (Buttons-Container, rechts)
- Flex-Layout mit Wrap bei schmaler Breite, Reduced-Motion-respektierend
- Tokens: `--gat-web-toolbar-bg` (= `--gat-web-surface`), `-border`, `-shadow` (subtle elevation), `-padding-x/-y`

## Akzeptanzkriterien

- [ ] `src/design-system.css` enthaelt alle vier Familien mit Subelementen + Modifiern + States
- [ ] HC-Variant fuer alle neuen Tokens/Klassen wo sinnvoll
- [ ] `prefers-reduced-motion` fuer Toast-Animation + Toolbar-Transition
- [ ] Build: `npm run build` produziert gebautes `design-system.css`; CI-Drift-Guard passt
- [ ] `index.html` Style-Guide um vier neue Sections erweitert (mit funktionierenden Demos)
- [ ] `examples/minimal.html`: ein Toast-Demo + ein Table-Demo eingebaut
- [ ] CHANGELOG.md: `[2.2.0]`-Eintrag, gruppiert nach Added / Token-Notes / Migration
- [ ] MIGRATION.md: Abschnitt „v2.1.x → v2.2"
- [ ] `package.json` Version `2.1.1` → `2.2.0`
- [ ] `v2.2.0` getagged, GitHub Pages deployt
- [ ] Konsumenten-URL `https://grueneat.github.io/design-system/design-system.css` stabil

## Constraints

- **Strikt additiv.** Keine Breaking Changes — alle v2.0/v2.1/v2.1.1-Token und -Klassen bleiben unveraendert.
- **Kein DS-JS-Modul** fuer Toast-Lifecycle, Drag/Drop-Handling, Sort-Click — Konsumenten implementieren Verhalten, Doku zeigt Patterns.
- **Kein Vendoring.**
- **Keine Werkzeug-Attribution.**
- **Konsumenten-URL stabil.**

## Folgewelle (v2.3 / v3.0)

Nach v2.2 noch offen:
- v2.3: `.gat-chip`, `.gat-combobox`, `.gat-breadcrumb`, `.gat-prose`, `.gat-step-indicator`
- v3.0 / optional: `.gat-cmdk-modal`, `.gat-footer`, Print-Page-Tokens (DIN-A4/A3/A5), FAB, Tooltip
