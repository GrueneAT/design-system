---
id: pm5dd
title: DS v2.1.1 — Patch mit 8 Folgebefunden aus den Konsumenten-Migrationen
status: open
priority: high
labels:
- enhancement
- bug
remote:
- source: github
  id: '15'
  url: https://github.com/GrueneAT/design-system/issues/15
---

DS-Patch v2.1.1. Acht Folgebefunde aus den vier Konsumenten-Migrationen, die parallel mit v2.1 (#13/#14) liefen — siehe Iteration-Doku in gemeindefinanzen, Gemeindeordnung, personenwahl, bildgenerator, vorlagen.

**Strikt patch-kompatibel**: keine Breaking Changes, keine umbenannten Tokens/Klassen, bestehende Konsumenten ziehen das automatisch beim naechsten CDN-Refresh.

## Befunde im Detail

### 1. A11y: `--gat-color-dunkelgruen-strong` (Opacity-Stacking-Lueck)

**Befund (Gemeindeordnung Phase 0):** `--gat-color-dunkelgruen` (`#257639`) failt WCAG-AA bei `/80`-Opacity-Stacking (3.77:1 statt ≥4.5). axe-core hat das auf den Live-Seiten gefunden.

**Loesung:** Neuer Token `--gat-color-dunkelgruen-strong: #005538` fuer Use-Cases mit Transparenz-Stacking. Doku-Hinweis: „bei `color: var(--gat-color-dunkelgruen-strong); opacity: 0.8` bleibt AA-Kontrast erhalten — der Default-Wert ist fuer voll-opake Verwendung optimiert".

### 2. A11y: Touch-Target-Floor auf Form-Inputs

**Befund (personenwahl Phase 2):** `.gat-input`/`.gat-select`/`.gat-textarea` rendern auf Touch-Geraeten unter dem 44px-WCAG-Floor. personenwahl musste lokal `min-height: 44px` patchen.

**Loesung:** `min-height: var(--gat-web-input-min-h, 44px)` als Default auf den drei Klassen. Neuer Token `--gat-web-input-min-h: 44px` (override-bar). Aenderung ist abwaerts-kompatibel — Inputs koennen nur groesser werden, nicht kleiner; das gewuenschte v2.1-Padding bleibt erhalten.

### 3. Type-Scale-Tier `--gat-text-micro` (11px)

**Befund (Gemeindeordnung Phase 2):** 11px (`0.6875rem`) braucht es fuer Caption-Text in dichten Listen (Glossar-Term-Sub-Labels, Tabellenfusszeilen). DS hatte das nicht; Gemeindeordnung musste `--app-text-micro` lokal anlegen.

**Loesung:** `--gat-text-micro: 0.6875rem;` in den `@theme`-Block. Doku-Hinweis: „nur fuer dichten Caption-Kontext, nicht fuer Lese-Text".

### 4. `.gat-header--kompakt` Modifier

**Befund (Gemeindeordnung Phase 2):** `.gat-header` wrappt `.gat-header__inner` bei >5 Kindern in eine zweite Reihe — das macht `.gat-header` fuer search-first-Layouts mit Brandbar + Search-Trigger + Nav unbrauchbar.

**Loesung:** Neuer Modifier `.gat-header--kompakt`. Wirkung: `flex-wrap: nowrap`, reduziertes Padding, `min-width: 0` auf Sub-Elementen (truncate erlaubt). Bestehende `.gat-header`-Konsumenten unbetroffen.

### 5. `.gat-mark` Atom

**Befund (Gemeindeordnung Phase 2):** Pagefind-Excerpts und On-Page-Search markieren Treffer mit `<mark>`. Browser-Default ist gelber Highlighter, der mit der Marken-Palette beisst. Gemeindeordnung patcht das lokal als `.app-search-mark`.

**Loesung:** Neue Klasse `.gat-mark` (auch als `mark { … }`-Default-Resetter via `:where(mark)`) mit `--gat-color-gelb`-Hintergrund (entsaettigt fuer Lesbarkeit) und `--gat-color-text` Vordergrund. Padding `0 .15em`, `border-radius: .15em`. Optional als reines Atom (Klasse) statt Default — kann je nach Bedenken anders skaliert werden.

### 6. `.gat-callout__lead` Slot

**Befund (Gemeindeordnung Phase 2):** Die 92 migrierten Callouts brauchen oft einen kurzen Lead-Text vor dem Inhalt („Hinweis:", „Wichtig:", „Hinweise zum Rechtsstand:"). Heute manuelles `<strong>` davorgesetzt.

**Loesung:** Neues Subelement `.gat-callout__lead` — fett, leicht kleinerer Spacing zum Folgeabsatz. Optional, bestehende Callouts unbetroffen.

### 7. Border-Radius-Token-Luecke

**Befund (Gemeindeordnung Phase 2):** Zwischen `--gat-web-radius-control` (6px) und `--gat-web-radius-card` (10px) fehlt ein 4-5px-Tier fuer Lozenges / Mini-Chips / Inline-Tags. Gemeindeordnung patcht lokal.

**Loesung:** Neuer Token `--gat-web-radius-mini: 4px;`. Direkt auf `.gat-tag` aufnehmen, bestehende Klassen behalten den Wert ueber `--gat-web-radius-control`.

### 8. Body-Font-Default-Hinweis (Doku-only)

**Befund (Gemeindeordnung Phase 0):** Der DS setzt `body { font-family: Barlow Semi Condensed }`. In manchen Konsumenten-Stacks mit Tailwind-Layout-Metriken (z. B. Gemeindeordnung) bricht das Hero-Heading-Berechnungen (clippt bei 375px). Workaround dort: lokales `body { font-family }`-Override.

**Loesung:** **Kein Code-Change** — der Default fuer gruene.at-Stil-Konsumenten (gemeindefinanzen, bildgenerator) bleibt absichtlich Barlow. MIGRATION.md bekommt einen Abschnitt „Body-Font Override" mit dem genauen Override-Snippet und Hinweis, wann er noetig ist.

## Akzeptanzkriterien

- [ ] `src/design-system.css` enthaelt: `--gat-color-dunkelgruen-strong`, `--gat-text-micro`, `--gat-web-radius-mini`, `--gat-web-input-min-h`
- [ ] `.gat-input`/`.gat-select`/`.gat-textarea` haben `min-height: var(--gat-web-input-min-h, 44px)`
- [ ] `.gat-header--kompakt` Modifier definiert + im Style-Guide demonstriert
- [ ] `.gat-mark` Klasse definiert + Style-Guide-Eintrag
- [ ] `.gat-callout__lead` Subelement definiert + Style-Guide-Eintrag
- [ ] `.gat-tag` nutzt `--gat-web-radius-mini`
- [ ] HC-Variant fuer alle neuen Tokens/Klassen wo sinnvoll
- [ ] Build: `npm run build` produziert gebautes `design-system.css`; CI-Drift-Guard passt
- [ ] CHANGELOG.md: `[2.1.1]`-Eintrag mit allen 8 Befunden
- [ ] MIGRATION.md: Abschnitt „v2.1.0 → v2.1.1" — additiv, plus Body-Font-Override-Note (Befund 8)
- [ ] `index.html` Style-Guide um die neuen Bausteine erweitert
- [ ] `package.json` Version 2.1.0 → 2.1.1
- [ ] `v2.1.1` getagged, GitHub Pages deployt, Konsumenten-URL stabil

## Constraints

- **Strikt patch-kompatibel** — keine Breaking Changes, keine Token-/Klassen-Umbenennung, kein behaviour change fuer bestehende `.gat-*`-Konsumenten. Aenderungen, die existierende Klassen leicht erweitern (Punkt 2, Punkt 7 auf `.gat-tag`), muessen abwaerts-kompatibel sein.
- **Kein Vendoring.**
- **Keine Werkzeug-Attribution.**
- **Konsumenten-URL stabil:** `https://grueneat.github.io/design-system/design-system.css`.

## Quellen

Folgebefunde aus den vier Konsumenten-Migrations-Issues:
- gemeindefinanzen `#vyz9q` (v2.0-Migration; Pattern-Bedarf)
- Gemeindeordnung `#3` (Phase 0 + Phase 2: Befunde 1, 4, 5, 6, 8)
- personenwahl `#12` (Phase 2: Befund 2)
- bildgenerator `#26` (Phase 2: keine direkten Befunde, alles passte; nur impliziter Bedarf an Touch-Target-Floor)
- vorlagen `#126` (keine direkten Befunde)
