# Design Decisions — cjpfs

Captured before research/plan. Researcher and planner must follow.

## Decisions (locked)

### 1. Token-Strategie: parallele `--gat-web-*`-Schicht (additiv)

Bestehende `--gat-*`-Token bleiben **unveraendert**. Die web-tauglichen,
entsaettigten Werte aus der gemeindefinanzen-App ziehen unter dem Praefix
`--gat-web-*` ins DS ein — als eigene Schicht neben (nicht statt) der
heutigen Druck-/Plakat-Palette. Konsumenten waehlen, welche Schicht sie
binden.

Konkrete Umsetzung:
- gemeindefinanzen-lokale `--web-bg/--web-surface/--web-text/...` -> im DS
  als `--gat-web-bg/--gat-web-surface/--gat-web-text/...`.
- gemeindefinanzen-lokale 8-Ton-Chart-Palette -> im DS als
  `--gat-web-chart-1`/`-2`/... (mit Doku der semantischen Rollen).
- Keine Umbenennung der `--gat-color-primary`/`--gat-color-dunkelgruen`/...
  in dieser Welle.

### 2. Komponenten-Scope: vollstaendige Komponenten im DS-CSS

DS liefert die Komponenten mit. Naming-Schema folgt dem bestehenden
`.gat-*`-Namespace, nicht dem gemeindefinanzen-lokalen `.web-*`-Praefix:
- `.web-panel` -> `.gat-panel` (mit `__head`/`__head-row`/`__body`/
  `__body--table`/`__note`)
- `.metric-card` -> `.gat-metric-card` (mit semantischen Modifiern
  `--ertrag`/`--aufwand`/`--netto`/`--hero`)
- `.web-brandbar` -> bestehender `.gat-header` wird im weissen
  gruene.at-Muster ueberarbeitet (siehe Decision 3 zu Breaking-Politik)
- `.web-callout` -> `.gat-callout`
- `.web-section-head` -> `.gat-section-head`
- `.web-hero` -> `.gat-hero`

### 3. SemVer: 2.0-Release direkt aus diesem Issue

**Geaendert** (User-Entscheidung): die ganze Welle ist 2.0 — kein
Sammelvorgang. Dieses Issue endet mit einem `v2.0.0`-Tag und einem
veroeffentlichten Stylesheet.

Breaking Changes, die das 2.0-Release enthalten muss:
- Tailwind-Build statt statischem CSS (Build-Schritt vor GitHub-Pages-
  Deploy)
- Token in `@theme` statt `:root`-Block (Aufruf bleibt gleich, intern
  Migration)
- AA-Haertung bestehender `--gat-*`-Werte, die heute durchfallen
- Header-Umbau (`.gat-header` von Dunkelgruen-Block zu weisser Brandbar
  nach gruene.at-Vorbild)
- Headline-Skala (`--gat-text-h1`/-`h2`/-`h3`-Gewichte ruhiger setzen)

Migration fuer Konsumenten kommt in `CHANGELOG.md` und `MIGRATION.md`.
Bestehende `--gat-*`-Namen bleiben **wo immer moeglich** stabil; nur Werte
aendern sich.

### 4. Execute-Scope: Volles 2.0-Programm in einem Issue

**Geaendert gegenueber dem urspruenglichen Triage-Plan** (User-Entscheidung
zu Beginn von `/issue:work`):

Statt nur Folge-Issue-Drafts zu produzieren, **implementiert dieses Issue
direkt die komplette 2.0-Welle**:
- Tailwind-v4-Build-Setup im design-system-Repo (Kandidat K)
- Token-Migration der `--gat-*` in einen `@theme`-Block + ergaenzende
  `--gat-web-*`-Schicht (Kandidat A)
- Volle `.gat-*`-Komponenten-Suite (Kandidat B)
- A11y-Variant `.gat-mode-hc:` via Tailwind (Kandidat G)
- Skip-Link `.gat-skiplink` (Kandidat H)
- Fixed-Header-Konventionen (Kandidat I)
- `hyphens: auto` auf Headline-Klassen (Kandidat J)
- Headline-Skala beruhigen (Teil von C)
- Tableiste-/Umschalter-Mindestgroessen (Teil von C)
- WCAG-AA-Haertung der heutigen Token (Teil von A)
- `prefers-reduced-motion`-Block, `:focus-visible`-Ring, `@media print`-
  Stylesheet (Kandidat D)
- Chart-Palette als `gat-charts.js`-ES-Modul via gehostetes JS auf
  GitHub Pages (Researcher-Entscheidung, Tendenz aus Discuss bestaetigt)
- Brandbar/Hero/Section-Head/Callout/Panel/Metric-Card als
  Komponenten-Klassen (Kandidat E + B)

Output ist ein **Tailwind-v4-getriebenes 2.0-Release** des DS samt
gerendertem `design-system.css`, aktualisiertem Style-Guide (`index.html`)
und Migrations-Doku (`CHANGELOG.md`).

**Befund F** (Pill-Blocker in gemeindefinanzen wegen `dashboard.js`) bleibt
ein Folge-Issue im gemeindefinanzen-Repo — DS liefert die `.gat-tag`-
Komponente, die Konsumenten-Anpassung passiert dort.

Die gemeindefinanzen-Migration weg von lokaler `--web-*`-Schicht bleibt
ebenfalls ein Folge-Issue im gemeindefinanzen-Repo (siehe Deferred).

### 5. Researcher-Folgefragen (vom User entschieden 2026-05-23)

- **Hellgruen-Wert:** `--gat-color-hellgruen` aendert sich von `#56af31`
  (Ratio 2.77, AA FAIL) auf **`#3e8a25`** (Ratio 4.51, AA OK). Teil der
  Token-AA-Haertung in 2.0.
- **Tableiste/Umschalter:** **im 2.0-Scope** — `.gat-tab` / `.gat-tabbar`
  und `.gat-switcher`/`.gat-switch-btn` werden als generische Komponenten
  ins DS aufgenommen (lesbare Mindestgroessen `1.08rem` / `0.98rem`,
  Folder-Tab-Optik, Fokus-Ring).
- **Built CSS commit:** **ja**, gebautes `design-system.css` wird ins Repo
  committed, **plus CI-Job** der prueft `npm run build && git diff
  --exit-code design-system.css` (commit-Stand = build-Output).
  Konsumenten brauchen kein npm.
- **HC-Toggle-Knopf:** **nicht im DS**. Das DS liefert die `.gat-mode-hc:`-
  Variant und Komponenten-Overrides. Konsumenten bauen eigenen Toggle
  (gemeindefinanzen-App z. B. eigener Knopf in Brandbar).

## Additional Inputs (must be consulted)

- **`notes/gruene-at-analysis.md`** — tiefe Live-Analyse von gruene.at
  (Stack, Tokens, Komponenten, A11y-Mechanik). Ergaenzt die knappe Iter-15-
  Notiz im gemeindefinanzen-Dokument und liefert vier weitere Triage-
  Kandidaten **G–J** plus einen langfristigen Spike **K** (Tailwind-v4-
  Adoption — explizit ausserhalb dieser Welle).

### Zusaetzliche Triage-Kandidaten (aus gruene.at-Analyse)

- **G. A11y-Mode-Token `--gat-*-hc`** — parallele High-Contrast-Farbschicht
  ueber `body.gat-mode-hc`-Toggle. Vorbild: gruene.at-Mechanik via Tailwind-
  Variant. Bei uns ueber Custom-Property-Inheritance ohne Tailwind-Dependency.
  Additiv, medium Prio.
- **H. Skip-Link** — `.gat-skiplink` mit `focus:top-0`. Trivial, additiv,
  medium Prio.
- **I. Fixed-Header-Konvention** — `pointer-events-none` am Header,
  `pointer-events-auto` an interaktiven Kindern; `scroll-padding-top` auf
  `html` passend zur Header-Hoehe. Additiv, low Prio (gemeindefinanzen hat
  heute keinen fixed Header).
- **J. `hyphens: auto`** auf Headline-Klassen — verbessert deutsche
  Komposita. Additiv, low Prio.
- **K. Tailwind-v4-Adoption** — explizit **im Scope** dieser Triage als
  strategischer 2.0-Treiber. gruene.at-Stack als Referenz: `@theme`-Token-
  Definition, Variant-System (`high-contrast:`), Utility-First. Koppelt mit
  G (Variant statt Custom-Property-Inheritance). Adoption ist Major-
  Breaking und beeinflusst die Reihenfolge aller anderen 2.0-Kandidaten:
  entweder zuerst Tailwind-Build aufsetzen und dann darauf alles
  refactoren, oder zuerst additive 1.x-Welle ohne Tailwind und 2.0 mit
  Tailwind. Diese Reihenfolge-Frage ist Teil der Triage-Entscheidung.

## Claude's Discretion (research/planner may decide)

- **Chart-Palette-Auslieferung.** ECharts liest kein CSS. Drei Optionen:
  (a) kleines ES-Modul `gat-charts.js` per CDN mit Konstanten und Helfern
  (`tip()`/`legende()`/`grid()`/`LABEL_SIZE`/`BAR_MAX_*`), (b) nur Hex-
  Werte und Helfer-Konventionen in der DS-Doku, jede App kopiert in ihren
  Code, (c) Chart-Thema komplett ausserhalb des DS-Scopes. Researcher
  bewertet (vorab-Tendenz: Option a, weil sonst Drift garantiert ist) und
  schlaegt vor.
- **Reihenfolge der Folge-Issues.** Welche Token-/Komponenten-Bausteine
  zuerst, welche spaeter — abhaengig davon, was die gemeindefinanzen-App
  sofort zurueckkonsumieren kann und welche Bausteine andere Konsumenten
  haben.
- **Naming-Detail Pill/`.gat-tag`.** Befund F (Pills blockiert in
  gemeindefinanzen wegen vendoriertem `dashboard.js`) — DS-Pill bleibt
  trotzdem ein sauberer Kandidat. Klassenname `.gat-tag` vs. `.gat-pill`,
  Modifier-System (`--pflicht`/`--neutral`/-`--info`/...): Researcher
  schlaegt vor.
- **Welche heutigen `--gat-*`-Token sind 2.0-Breaking-Kandidaten?**
  Vollstaendige Liste der AA-Durchfaller und der konflitkfreien
  Anpassungen, mit Diff/Vorher-Nachher pro Token.

## Deferred (out of scope for this issue / for follow-ups)

- **gemeindefinanzen-Migration weg von lokaler `--web-*`-Schicht.** Erst
  wenn das DS die `--gat-web-*`-Schicht ausliefert, wird ein separates
  Issue im `gemeindefinanzen`-Repo das lokale Token-Set ausbauen und auf
  die DS-Variante umstellen. **Nicht** Teil des DS-Triage.
- **Magenta-CTAs und Knall-Baender aus gruene.at.** Bewusst nicht
  uebernommen (siehe Doku-Abschnitt „Was wir bewusst NICHT uebernehmen").
  Wird in der Triage nicht erneut diskutiert.
- **Logo-Vendoring.** Logo bleibt unter
  `grueneat.github.io/design-system/assets/...` gehostet. Wird im DS-
  Issue zur Brandbar referenziert, **nicht** ins Konsumenten-Repo
  kopiert (siehe workspace `CLAUDE.md`).
- **Sub-Issues fuer multi-app-Migration.** Wer welches Tool wann auf 2.0
  hebt, ist Sache der jeweiligen App-Repos — nicht des DS-Repos.

## Constraints (recap aus ISSUE.md und Workspace-CLAUDE.md)

- **Kein Vendoring.** Logos, Schriften, ECharts, sonstige Assets bleiben
  gehostet/per CDN. Auch nicht voruebergehend.
- **Keine Werkzeug-Attribution** in Commits/Code/Doku.
- Bestehende `--gat-*`-Konsumenten duerfen nicht stillschweigend brechen
  — Breaking Changes nur in der gebuendelten 2.0-Welle mit Migrations-
  Doku.
