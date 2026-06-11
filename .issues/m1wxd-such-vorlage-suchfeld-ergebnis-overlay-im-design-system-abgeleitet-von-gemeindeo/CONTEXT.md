# CONTEXT — Such-Vorlage im Design System

Design-Entscheidungen aus dem Discuss-Schritt (vor Research/Plan). Quelle:
ISSUE.md (m1wxd, GitHub design-system#26). Abgeleitet von der Gemeindeordnung-
Suche.

## Entschiedene Graubereiche

### 1. JS-Umfang: `gat-search.js` mitliefern (ESM)

Das DS liefert die Such-Vorlage als **Markup + CSS + ein ES-Modul**
`gat-search.js`, ausgeliefert wie `gat-charts.js` von der DS-Pages-URL
(`https://grueneat.github.io/design-system/gat-search.js` bzw.
`https://design-system.gruene.at/gat-search.js`).

**Warum:** Es gibt Praezedenz (`gat-charts.js` wird bereits als ESM
ausgeliefert). Nur so bleibt das kritische Verhalten — kein Layout-Shift,
Tastatur-Navigation, Focus-Trap, ARIA — **zentral und konsistent** statt in
jeder App neu (und unterschiedlich) gebaut. Genau diese Drift ist das heutige
Problem.

**Verantwortung des Moduls:** Open/Close des Overlays/Modals, Pfeiltasten-
Navigation der Treffer, Enter/ESC, Focus-Trap im Modal, ARIA-Verdrahtung
(combobox/listbox/option), `Strg/Cmd+K`-Shortcut, `prefers-reduced-motion`.
**Nicht** im Modul: die konkrete Suchquelle (siehe Punkt 3).

### 2. Varianten in v1: Dropdown-Overlay **und** Modal (Strg+K)

Beide Varianten derselben Vorlage:

- **Inline-Suchfeld mit Overlay-Dropdown** — absolut positioniert, liegt ueber
  dem Content → **kein Layout-Shift** (behebt das werkzeuge-Symptom).
- **Modal-/`Strg+K`-Variante** — baut auf dem vorhandenen `.gat-modal`
  (`--blur/--narrow/--wide`) auf; Desktop zentriert, Mobile Full-Screen.

**Warum beide:** Der Gemeindeordnung-Rollout (design-system#... / Gemeindeordnung#15)
braucht das Modal + `Strg+K`; nur mit beiden Varianten ist die Vorlage fuer
beide Consumer adoptierbar. werkzeuge nutzt zunaechst nur die Dropdown-Variante.

### 3. Engine-Kopplung: agnostischer Kern + optionaler Pagefind-Adapter

- **Kern engine-neutral:** `gat-search.js` kennt keine Suchmaschine. Es bekommt
  eine **Such-Adapter-Funktion** `async (query) => results[]` und ein
  **Render-/Slot-Schema** fuer Ergebnis-Items (Titel, Snippet, Badges/Kategorien,
  URL). Das DS liefert Markup + CSS fuer Feld, Overlay/Modal und Ergebnis-Items.
- **Plus dokumentierter Pagefind-Adapter** als optionales Beispiel/Helfer, damit
  beide Consumer (die Pagefind nutzen) nicht die Bruecke neu bauen.

**Warum:** Haelt das DS neutral (wie `gat-charts.js` ein „Helfer", nicht an eine
Datenquelle gebunden), liefert aber trotzdem eine fertige Pagefind-Anbindung.

## Implikationen fuer Research/Plan

- Bestehende DS-Bausteine wiederverwenden: `.gat-input` (Feld), `.gat-modal`
  (Modal), `.gat-header` (Header-Such-Trigger). Net-new: `.gat-search*`
  (Feld-Wrapper, Overlay-Dropdown, Ergebnis-Item, Leer-/Lade-/Keine-Treffer-
  Zustand) + `gat-search.js`.
- CSS-Quelle ist `src/design-system.css` (Tailwind-Build → minified
  `design-system.css`); **nicht** die minifizierte Datei editieren.
- Showcase in `index.html` (und/oder `examples/`), CHANGELOG- + Versionseintrag.
- Referenz-Implementierung zum Ableiten: Gemeindeordnung `src/js/search.js`
  (Hero-Dropdown, Modal, `Strg+K`, FAB, Stemming-Filter, BL-Filter) und das
  Markup in `src/index.html`. App-spezifisches (BL-Filter, Content-Typ-
  Gruppierung, Stemming) gehoert NICHT in die DS-Vorlage, sondern bleibt
  App-Schicht.
- A11y und „kein Layout-Shift" sind harte Akzeptanzkriterien.
