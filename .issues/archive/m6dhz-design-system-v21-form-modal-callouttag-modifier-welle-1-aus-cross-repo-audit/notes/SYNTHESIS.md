# Cross-Repo DS-Audit — Synthese

**Datum:** 2026-05-23 · **Scope:** 5 Repos parallel analysiert (Code + Live-URL) gegen DS v2.0.
**Quellen:** `/tmp/ds-audit/{bildgenerator,Gemeindeordnung,gemeindefinanzen,personenwahl,vorlagen}.md`

## TL;DR

- **4 von 5 Repos sind DS-unverbunden** (bildgenerator, Gemeindeordnung, personenwahl, vorlagen) — kein `design-system.css`-Link, eigene Token-/Komponenten-Schicht, Marken-Drift praktisch garantiert.
- **gemeindefinanzen** ist heute morgen migriert worden und der einzige Konsument mit hoher DS-Anbindung. Was dort noch lokal ist, zeigt die naechsten echten DS-Luecken.
- Aus den 51 A-Befunden (DS-Aufnahme-Kandidaten) **konvergieren ~10 Patterns ueber mehrere Repos** — das sind die priorisierten DS-Erweiterungen fuer eine **v2.1 / v3.0 Welle**.
- **Drei harte Top-Luecken**: Form-Komponenten, Modal/Dialog, Banner/Callout-Varianten — von mindestens drei Repos jeweils gewuenscht.
- Vier Quick-Wins, die alle 4 unverbundenen Repos sofort umsetzen koennten (CSS-Link einbinden, Logo umstellen, Header `.gat-header` adoptieren, Skip-Link ergaenzen).

## DS-Anbindungs-Status (Stand 2026-05-23)

| Repo | DS-CSS | DS-Logo | gat-charts.js | `.gat-*` Klassen | `--gat-*` Tokens |
| :--- | :---: | :---: | :---: | :---: | :---: |
| bildgenerator | ✗ | ✗ | ✗ | 0 | 0 |
| Gemeindeordnung | ✗ | ✗ | n/a | 0 | 0 |
| **gemeindefinanzen** | **✓** | **✓** | **✓** | **20+** | **40+** |
| personenwahl | ✗ | ✗ | ✗ | 0 | 0 |
| vorlagen | ✗ | ✗ | n/a | 0 | 0 |

## Konvergenz-Matrix (DS-Lücken nach Häufigkeit)

A = explizit als DS-Kandidat genannt, C = Hybrid (DS-Baustein + App-Spezialisierung), · = nicht relevant für dieses Repo.

| Lücke | bildgen | Gemeindeo | gemeindef | personenw | vorlagen | Σ |
| :--- | :---: | :---: | :---: | :---: | :---: | ---: |
| **Form-Primitives** (`.gat-input`/`-select`/`-textarea`/`-checkbox`/`-radio`/`-range`) | A1 | A8 | A9/C2 | A10 | · | **4** |
| **Banner / Callout-Varianten** (`info`/`warn`/`error`/`success`/`legal`) | C3 | A4 | (vorhanden) | A8 | (Empfehlung C4) | **4** |
| **Modal / Dialog** (Backdrop, Fokus-Trap, Esc/Backdrop-close) | A5 | A2/C4 | A8 | · | A2 (Lightbox-Familie) | **4** |
| **Datentabelle** (`.gat-table` mit Sticky-Head, Zebra, Sort) | · | · | A5 | A11 | A7 (Vergleichstabelle, Sticky-Col) | **3** |
| **Status-Tag-Modifier** (`--ok`/`--warn`/`--err`) auf `.gat-tag` | · | A7 (Discovery-Chip) | A2 | A6 | A5 (Lozenges) | **4** |
| **Drop-Zone** (`.gat-dropzone` für Datei-Upload) | A8 | · | A4 | A2 | · | **3** |
| **Toast-Notification** | A4 | · | A1 | · | A8 | **3** |
| **Cmd-K / Search-Modal** mit `<mark>`-Highlight | (Combobox A2) | A2/A3 | (`.mark-*`) | · | · | **2.5** |
| **Sticky-Action-Footer** | C4 | · | C4 (Toolbar) | A12 | · | **3** |
| **Chip / interaktive Pill** | A6 (Segmented) | A7 | · | A7 | · | **3** |
| **Breadcrumb** (`.gat-breadcrumb`) | · | · | A6 | · | A1 | **2** |
| **Search-Result-Liste** mit Group-Header + Empty | (Combobox) | A3 | · | · | · | **1** |
| **Wizard / Step-Indicator** | A3 | · | · | (Step-Rail) A3 | · | **2** |
| **FAB** / Floating Action Button-Stack | · | A5 | · | · | · | **1** |
| **Tooltip / Popover-Primitiv** | · | C2 | · | · | · | **1** |
| **Skip-Link Adoption** (DS hat schon) | (fehlt) | A10 (fehlt) | ✓ | (fehlt) | (fehlt) | **4 fehlen** |
| **Form-Block-Layout mit Eyebrow** (`.gat-panel__eyebrow`) | · | · | · | C5 | · | **1** |
| **Prose-Wrapper** für Lese-Inhalt | · | (Law-Text) | C5 | A13 | · | **2** |
| **`.gat-footer`** (Marketing-Footer) | · | · | · | · | C2 | **1** |
| **Print-Page-Tokens** (DIN-A4/A3/A5) | · | · | · | · | A10 | **1** |
| **Anchor-Flash** (Highlight bei `#anchor`-Navigation) | · | A9 | · | · | · | **1** |
| **Audit-Footer** / Provenance-Block | · | (LLM-Disclaimer C1) | · | C1 | · | **2** |
| **Sortable-List** (Drag-Reorder-Skelett) | · | · | · | · | A9 | **1** |
| **Brand-Swatch-Komponente** | · | · | · | · | C5 | **1** |

**Gesamt:** 51 A-Befunde + 27 C-Hybrid-Befunde + 33 B-app-spezifisch ueber alle 5 Repos.

## Priorisierte DS-Roadmap (Vorschlag für v2.1 / v3.0)

### **Welle 1 (v2.1) — High-Impact, vier-fach gewünscht**

1. **`.gat-input`-Familie (Form-Primitives)** — *grösste DS-Lücke heute*. 4 Repos brauchen identische Inputs/Selects/Textareas/Checkboxes/Radios/Ranges plus Field-Wrapper mit Label/Hint/Error. Tokens: `--gat-web-input-bg/-border/-border-focus/-radius`. Aufwand DS: ~1-2 Tage.
2. **`.gat-modal` / `.gat-dialog`** — Backdrop + Fokus-Trap + Esc/Backdrop-close als CSS-Primitive (JS minimal, native `<dialog>` als Basis). 4 Repos gewünscht (in unterschiedlicher Form). Aufwand DS: ~1 Tag.
3. **`.gat-callout` Modifier-Erweiterung** — heute liefert das DS `.gat-callout` als unmodifiziertes Hinweis-Panel. Bedarf: `--info` (blau), `--warn` (gelb), `--err`/`--danger` (rot/clay), `--success` (grün), `--legal` (grau-formal). Konsequente Token-Familie. Aufwand DS: ~0.5 Tage.
4. **`.gat-tag --ok/--warn/--err/--neutral`** — `.gat-tag` existiert in v2.0, aber ohne semantische Modifier. Alle 4 Repos haben Status-Pills heute lokal nachgebaut. Aufwand DS: ~0.5 Tage.

### **Welle 2 (v2.2) — Datenwerkzeug-Standard**

5. **`.gat-table`** — Datentabelle mit Sticky-Head, optionale Sort-Indikatoren, Zebra-Streifen, `--compact`/`--dense`-Varianten, scrollbarer Wrapper `.gat-table-scroll`. 3 Repos.
6. **`.gat-dropzone`** — Datei-Upload-Zone. Visueller Container + States (idle/hover/dragover/error). 3 Repos.
7. **`.gat-toast` / `.gat-toaster`** — Notification-Container + Einzel-Toast mit `--info/--success/--warn/--err`-Varianten. 3 Repos.
8. **`.gat-toolbar` / `.gat-actionbar`** — Sticky-Footer/Header für Massen-Aktionen. 3 Repos.

### **Welle 3 (v2.3) — Wiederkehrende Patterns**

9. **`.gat-chip` (interaktive Pill)** — Filter-Chip mit `aria-pressed` und `.is-active`-State. 3 Repos.
10. **`.gat-combobox`** — Searchable-Select mit Listbox + Search-Input. 1-2 Repos explizit, viele weitere im Hintergrund.
11. **`.gat-breadcrumb`** — 2 Repos.
12. **`.gat-prose`** — Lese-Wrapper mit `max-width: ~70rem`, vernünftiger Typografie für lange Texte. 2 Repos.
13. **`.gat-step-indicator`** — Wizard-Schrittanzeige. 2 Repos.

### **Welle 4 (v3.0 / Optional)**

- `.gat-cmdk-modal` mit Search-Result-Highlight (1 Repo + latentes Bedürfnis)
- `.gat-footer` (Marketing-Footer; vorlagen-spezifisch)
- Print-Page-Tokens (DIN-A4/A3/A5; vorlagen)
- `.gat-fab` / Floating Action Button
- `.gat-tooltip` (Popover-Primitiv)

## Quick-Wins für die 4 DS-unverbundenen Repos

Diese sind **vor** der Welle-1-DS-Arbeit machbar und marken-sichtbar:

| Repo | Quick-Win | Aufwand |
| :--- | :--- | :---: |
| bildgenerator | DS-CSS-Link einbinden + `tailwind.config.js`-Theme auf `var(--gat-color-primary)` etc. umpolen | < 30 Min |
| Gemeindeordnung | Lokale `--color-gruene-*` per CSS-Alias an `--gat-color-*` koppeln (Drift-Versicherung, kein Markup-Touch) | < 1 h |
| personenwahl | Layer-Tokens (`--gat-web-*`) übernehmen, Marken-Tokens **bewusst nicht** (civic-tech-Positionierung) | 1-2 h |
| vorlagen | DS-CSS einbinden + Header durch `.gat-header --dunkel` ersetzen + CSS-Vars find-replace | 1 h |
| **Alle 4** | DS-Logo statt eigener Asset-Kopien per CDN-Link | 30 Min je Repo |
| **Alle 4** | `.gat-skiplink` ergänzen (DS hat es schon, fehlt überall) | 5 Min je Repo |

## Strategische Klärungs-Punkte

### 1. personenwahl: Branding-Positionierung

`tailwind.config.cjs` enthält Kommentar, dass das Tool bewusst marken-neutral civic-tech sein soll. Implikation:
- **Adoption:** nur `--gat-web-*` Layer (Surfaces, Spacing, Fokus, Patterns)
- **Nicht adoptieren:** Marken-Token (`--gat-color-magenta/-gelb/-dunkelgruen`), DS-Logo, gruene.at-Brandbar-Stil
- **Klärung User:** Ist diese Trennung weiterhin gewünscht? Wenn ja, könnte das DS einen **`--gat-mode-neutral`-Modus** anbieten, der die Marken-Token zurückhält.

### 2. DS-Inventur-Diskrepanz (gemeindefinanzen-Audit-Folgefund)

Inventar listet `.gat-header__nav` / `__nav-list` / `__nav-link`, aber das ausgelieferte `design-system.css` enthält nur `__nav-current`. Entweder Inventur ist falsch, oder Components fehlen im Build. **→ DS-Maintainer-Aufgabe**, eigenes kleines Folge-Issue (`v2.0.1`-Patch).

### 3. personenwahl `CLAUDE.md` veraltet

Sagt „Kein Code, nur Planung" — tatsächlich existiert eine voll funktionierende Iteration 1 (`apps/web/src/`, ~50 TSX-Dateien, OkLCH-Token-System). **→ Doku-Folge-Issue im personenwahl-Repo.**

### 4. vorlagen: hartkodierte Grün-Drift

`--gruen-dunkel: #2a734f` ist **nicht** identisch mit DS `--gat-color-dunkelgruen: #2c6e40`. Drift ist nachweislich da, nicht nur „potentiell". → Beim Quick-Win sofort auf DS-Wert ziehen.

## Vorgeschlagene nächste Schritte

1. **DS-Repo: Welle-1-Issue anlegen** — sammelt `.gat-input`, `.gat-modal`, `.gat-callout`-Modifier, `.gat-tag`-Modifier als gebündeltes v2.1-Issue. Begründung: 4-fach Bedarf, jeweils kleine Aufwände, gemeinsam <1 Woche.
2. **Pro DS-unverbundenem Repo: Quick-Win-Issue** mit dem 4-Punkt-Plan oben (CSS-Link, Logo, Header, Skip-Link). Aufwand jeweils <2 Stunden, marken-sichtbar.
3. **Folge-Issues für strategische Klärung** (personenwahl-Branding, DS-`__nav`-Diskrepanz, `CLAUDE.md`-Update).
4. **Cross-Repo-Konvergenz-Tracking**: Nach Welle 1, die A-Befunde der jeweiligen Repos durch DS-Komponenten ersetzen — Kandidaten für Folge-Issues pro App-Repo.

## Anhang: Per-Repo Top-3 Aufnehmen-Empfehlungen

### bildgenerator
1. DS-CSS-Link + Theme-Umpolung (Quick-Win)
2. Form-Primitives als erstes Welle-1-Adoption (App ist Form-getrieben)
3. Lokales `.searchable-select` durch `.gat-combobox` ersetzen (sobald in DS)

### Gemeindeordnung
1. Token-Alias auf `--gat-*` (Quick-Win, ein File: `src/css/main.css` Z. ~1–60)
2. Skip-Link über `scripts/generate-pages.js` global ergänzen
3. Callout-Modifier-Migration (92 Banner heute, davon 33 in Tailwind-Amber)

### gemeindefinanzen
1. **`.dtable` → `.gat-table`** sobald in DS (Welle 2)
2. Modal-Vereinheitlichung (`.mj-overlay` und `.doc-einwohner-dialog` → `.gat-modal`)
3. Outline-Knopf-Konsolidierung (5 parallele Designs auf einen DS-Primitive ziehen)

### personenwahl
1. Strategische Klärung Branding (siehe oben)
2. Layer-Tokens (`--gat-web-*`) übernehmen — kein Marken-Touch
3. Form-Primitives + Data-Table Adoption sobald in DS

### vorlagen
1. DS-CSS-Link + `--gruen-*` find-replace auf `--gat-color-*`
2. Header durch `.gat-header --dunkel` ersetzen
3. 3-fach duplizierte Lightbox auf `.gat-modal` konsolidieren sobald in DS
