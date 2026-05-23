# Plan: Rueckflusskandidaten aus gemeindefinanzen-Web-Adaption (Iter 1-18) — v2.0

<objective>
What this plan accomplishes: ship a Tailwind-v4-getriebenes **`v2.0.0`-Release**
des Grüne-AT Design Systems, das die im gemeindefinanzen-Labor (18 Iterationen)
erprobte web-taugliche Auslegung als organisationsweite, additiv-stabile Schicht
unter die bestehenden `--gat-*`-Token zieht und die heute fehlenden A11y-/
Datenwerkzeug-Komponenten ergaenzt.

Why it matters: das DS ist heute druck-/plakatpraegt (vollgesaettigte
Markenfarben auf Weiss) und fuer Datenwerkzeuge mit langen Lesestrecken zu
anstrengend. Die gemeindefinanzen-App hat eine entsaettigte, web-taugliche
Schicht entwickelt; v2.0 macht diese zur DS-Eigenschaft, damit andere Tools sie
ohne Lokalkopie konsumieren koennen. Gleichzeitig schaltet das Release auf den
gruene.at-Stack (Tailwind v4 + `@theme` + `@custom-variant`), damit kuenftige
A11y-Mode- und Variant-Patterns sauber abbildbar sind.

Scope:
- IN: Tailwind-v4-Build-Pipeline mit committedem Output + CI-Drift-Guard
  (`git diff --exit-code design-system.css`); Token-Migration `--gat-*` in
  `@theme` (Werte stabil, Aliase erhalten); neue `--gat-web-*`-Schicht (Surface,
  Text-Toene, Chart-Palette); AA-Haertung (`--gat-color-hellgruen`-Wertaenderung);
  acht neue Komponenten (`.gat-panel`, `.gat-metric-card`, weisse `.gat-header`,
  `.gat-callout`, `.gat-section-head`, `.gat-hero`, `.gat-tag`, `.gat-skiplink`)
  plus `.gat-tab`/`.gat-tabbar`/`.gat-switcher`/`.gat-switch-btn` (Decision 5);
  Headline-Skala beruhigen + `hyphens: auto`; `.gat-mode-hc:`-Variant via
  Tailwind `@custom-variant` + Komponenten-Overrides; `:focus-visible`-Sammelblock,
  `prefers-reduced-motion`-Block, `@media print`-Block, `.gat-header--fixed`-
  Konventions-Klasse; `gat-charts.js`-ES-Modul mit Palette/Helfern;
  Style-Guide-Update, `examples/minimal.html`-Update, `MIGRATION.md`,
  `CHANGELOG.md`-`[2.0.0]`-Eintrag, `v2.0.0`-Tag.
- OUT: gemeindefinanzen-Migration weg von lokaler `--web-*`-Schicht (Folge-Issue
  im gemeindefinanzen-Repo); Magenta-CTAs / Knall-Baender aus gruene.at; Logo-
  Vendoring (bleibt CDN-gehostet im DS-Repo); HC-Toggle-Knopf im DS (Konsumenten-
  Sache); npm-publish (Repo bleibt Pages-gehostet); versionierte CSS-URLs
  (Rolling-URL bleibt).
</objective>

<strategy>
Die Welle hat einen klaren Pflad: **erst das Werkzeug, dann die Inhalte, dann
die Doku, dann der Tag.** Konkret:

1. **Tailwind-Build-Skelett (Task 1).** Build-Pipeline mit `tailwindcss@^4.3`
   als devDependency, `src/design-system.css` als Eingang, `design-system.css`
   im Repo-Root als committed Output, CI-Job mit `npm ci && npm run build`
   plus `git diff --exit-code design-system.css` als Drift-Guard. Build laeuft
   gruen mit minimalem Input — Komponenten kommen erst spaeter. Foundation-Task,
   alle anderen Tasks haengen daran.

2. **Token-Migration in `@theme` (Task 2).** Alle heutigen `--gat-*`-Werte
   ziehen 1:1 in den `@theme`-Block, Aliase als `@layer base { :root { ... } }`
   spiegeln die alten Namen auf die Tailwind-emittierten Werte. **Visuell
   pixel-identisch zu v1.x** — die Migration ist mechanisch.

3. **Inhaltliche Aenderungen sequenziell (Tasks 3-12).** AA-Haertung (`--gat-
   color-hellgruen` `#56af31` -> `#3e8a25`); `--gat-web-*`-Schicht (Surface,
   Text-Toene, 8-Ton-Chart-Palette); Headline-Skala beruhigen + `hyphens: auto`;
   weisse `.gat-header`-Brandbar + `.gat-header--dunkel` als opt-in fuer v1.x-
   Konsumenten; Datenwerkzeug-Komponenten (`.gat-panel`, `.gat-metric-card`);
   Inhalts-Komponenten (`.gat-callout`, `.gat-section-head`, `.gat-hero`,
   `.gat-tag`, `.gat-skiplink`); Tabs/Switcher (Decision 5: `.gat-tab` /
   `.gat-tabbar` / `.gat-switcher` / `.gat-switch-btn`); `.gat-mode-hc`-Variant
   + Komponenten-Overrides; Patterns-Block (`:focus-visible`, reduced-motion,
   print, fixed-header); `gat-charts.js` ES-Modul.

4. **Doku + Tag (Tasks 13-14).** `README.md`-Erweiterung um Contributor-Build-
   Anleitung; `CHANGELOG.md` `[2.0.0]`-Eintrag; **`MIGRATION.md`** mit v1->v2-
   Anleitung inkl. Vorher/Nachher zu Header-Optik, Hellgruen-Wert, Headline-
   Gewichten, `.gat-mode-hc`-Snippet. Letzter Task: `v2.0.0`-Tag.

**Strategische Optionen (entschieden):**

- **Build-Engine.** Tailwind v4 + CLI (gewaehlt) vs. Tailwind v4 + PostCSS
  vs. Lightning CSS standalone vs. hand-geschriebenes CSS bleiben. Tailwind v4
  + CLI gewinnt, weil (a) `@custom-variant` `.gat-mode-hc` nativ liefert,
  (b) `@theme` Tokens automatisch unter `:root` emittiert (Konsumenten-Aufruf
  stabil), (c) gruene.at-Stack-Mirror, (d) keine PostCSS-Config noetig.
  Lightning-only haette die Variant hand-stricken muessen.

- **Chart-Palette-Auslieferung.** `gat-charts.js`-ES-Modul auf Pages (gewaehlt)
  vs. nur Hex-Konstanten in der Doku vs. npm-package. Modul gewinnt, weil
  ECharts kein CSS liest und ohne zentrale Quelle Drift garantiert ist; npm-
  package waere Overkill ohne Publish-Infrastruktur.

- **Built CSS commit-Policy.** Output committen + CI `git diff --exit-code`
  (gewaehlt, Decision 5) vs. nur in Pages bauen. Committen gewinnt, weil
  Konsumenten kein npm brauchen und PR-Reviewer Token-Aenderungen direkt im
  Diff sehen.

- **Hellgruen-AA-Strategie.** Wertaenderung `#56af31` -> `#3e8a25` (gewaehlt,
  Decision 5) vs. strukturelle Disziplin-Regel. Wertaenderung gewinnt, weil
  ohnehin 2.0-Breaking und die Disziplin-Regel sich praktisch nicht durchsetzen
  laesst.

- **Tabs/Switcher-Timing.** Im 2.0-Scope (gewaehlt, Decision 5) vs. spaeterer
  Folge-Issue. User-Decision setzt die Komponenten ins 2.0-Release; sie kommen
  als eigene Task (Task 9), nicht angeflanscht an Task 7.

- **HC-Toggle-Knopf-Ownership.** Konsument baut (gewaehlt, Decision 5) vs. DS
  liefert. DS-Side bleibt schmal — Variant + Overrides; Konsumenten kennen ihren
  Header-Kontext besser. `MIGRATION.md` zeigt das JS-Snippet.

**Worauf der Plan **nicht** spekuliert** (siehe Open Questions am Ende):
keine zusaetzlichen Komponenten ueber Decision 5 hinaus, keine
Marken-Stakeholder-Anfrage zum Hellgruen-Wert (User hat es entschieden), kein
Vendoring von Logo/Tailwind/ECharts/Fonts, keine versionierte CSS-URL.
</strategy>

<skills>
No workspace skills in `.claude/skills/` at the issue-CLI level. CSS / Tailwind
v4 / GitHub-Pages-Build best-practices are inlined into the relevant tasks
(Sections 2 and 7 of RESEARCH.md) rather than tagged as skills.
</skills>

<context>
Issue: @.issues/cjpfs-rueckflusskandidaten-aus-gemeindefinanzen-web-adaption-iter-1-18/ISSUE.md
Research: @.issues/cjpfs-rueckflusskandidaten-aus-gemeindefinanzen-web-adaption-iter-1-18/RESEARCH.md
Decisions: @.issues/cjpfs-rueckflusskandidaten-aus-gemeindefinanzen-web-adaption-iter-1-18/CONTEXT.md
Notes: @.issues/cjpfs-rueckflusskandidaten-aus-gemeindefinanzen-web-adaption-iter-1-18/notes/gruene-at-analysis.md

Key repo paths:
- Repo root: `/workspace/design-system/design-system/`
- Today's hand-written CSS: `design-system/design-system.css` (429 lines, `:root` + `.gat-*` components)
- Today's Pages workflow: `design-system/.github/workflows/pages.yml` (39 lines)
- Style guide: `design-system/index.html` (1314 lines)
- Minimal consumer example: `design-system/examples/minimal.html` (87 lines)
- README: `design-system/README.md` (65 lines)
- CHANGELOG: `design-system/CHANGELOG.md` (30 lines)
- Logo: `design-system/assets/gruene-logo.svg` (vollfarbig, 16 KB) — bleibt
- gemeindefinanzen labor source (READ-ONLY reference, **never edit**):
  - `/workspace/gemeindefinanzen/web/css/app.css:24-66, 186-202, 232-572,
    574-582, 685-727, 1099-1199` — Token + Komponenten + Patterns
  - `/workspace/gemeindefinanzen/web/vendor/dashboard/dashboard.css:51-109` —
    Tabs/Switcher CSS (Quelle fuer Task 9)
  - `/workspace/gemeindefinanzen/web/js/dashboard-charts.js` — Chart-Helfer
    (Quelle fuer Task 12)

Worktree (executor erstellt diesen):
- `/workspace/design-system/.worktrees/cjpfs-rueckflusskandidaten-aus-gemeindefinanzen-web-adaption-iter-1-18/`
- Branch (per `issue-cli naming resolve-branch`):
  `issue/cjpfs-rueckflusskandidaten-aus-gemeindefinanzen-web-adaption-iter-1-18`

<interfaces>
<!-- Executor: alle Vertraege aus dem heutigen DS + den neuen `@theme`-Tokens. -->
<!-- RESEARCH.md Section "Interfaces" hat die vollstaendige Quelle. -->

// ========= BESTEHEND IM DS (Namen STABIL in 2.0) ==========================
// Quelle: design-system/design-system.css:28-124, 138-429

// Token-Namen (CSS-Custom-Properties unter :root) — alle bleiben:
--gat-color-dunkelgruen, --gat-color-hellgruen, --gat-color-gelb,
--gat-color-magenta, --gat-color-weiss, --gat-color-anthrazit,
--gat-color-primary, --gat-color-secondary, --gat-color-accent,
--gat-color-highlight, --gat-color-text, --gat-color-surface,
--gat-color-on-primary, --gat-color-on-secondary,
--gat-font-headline, --gat-font-copy, --gat-font-emphasis,
--gat-text-h1, --gat-text-h2, --gat-text-h3, --gat-text-subline,
--gat-text-copy, --gat-text-small,
--gat-leading-headline, --gat-leading-copy,
--gat-space-1, --gat-space-2, --gat-space-3, --gat-space-4,
--gat-space-5, --gat-space-6,
--gat-radius-sm, --gat-radius-md, --gat-border-width,
--gat-container-max, --gat-breakpoint-sm, --gat-breakpoint-md

// Wert-Aenderungen (Task 3):
--gat-color-hellgruen: #56af31 -> #3e8a25   // AA-Haertung

// Klassen-Namen (alle Komponenten) — bleiben:
.gat-container, .gat-grid, .gat-grid--2, .gat-grid--3, .gat-section,
.gat-header, .gat-header__inner, .gat-header__logo, .gat-nav, .gat-nav__link,
.gat-nav__link--active, .gat-headline, .gat-subline, .gat-fliesstext,
.gat-emphasis, .gat-btn, .gat-btn--primary, .gat-btn--secondary,
.gat-card, .gat-card--primary, .gat-card--secondary, .gat-card__title,
.gat-card__body, .gat-underline, .gat-highlight, .gat-stoerer,
.gat-stoerer--gelb, .gat-stoerer--magenta

// ========= NEU IN 2.0 (alle additiv ausser .gat-header-Optik) =============

// Neue Tokens unter `@theme` (Tailwind v4 emittiert sie als --color-gat-* etc.
// unter :root; @layer base spiegelt sie auf folgende Konsumenten-Namen):
--gat-web-bg, --gat-web-surface, --gat-web-surface-sunk, --gat-web-hairline,
--gat-web-shadow, --gat-web-text, --gat-web-text-soft, --gat-web-text-mute,
--gat-web-clay-text, --gat-web-green-deep, --gat-web-green, --gat-web-green-tint,
--gat-web-yellow, --gat-web-page-max, --gat-web-radius-control,
--gat-web-radius-card, --gat-web-focus-ring, --gat-web-focus-offset,
--gat-web-chart-1, --gat-web-chart-2, --gat-web-chart-3, --gat-web-chart-4,
--gat-web-chart-5, --gat-web-chart-6, --gat-web-chart-7, --gat-web-chart-8

// Neue Komponenten-Klassen:
.gat-panel { __head, __head-row, __body, __body--table, __note, :fullscreen }
.gat-metric-card { --ertrag, --aufwand, --netto, --hero, __num, __label }
.gat-header { (Wert-Umbau zur weissen Brandbar — Name stabil) }
.gat-header--dunkel  // NEU — opt-in fuer v1.x-Optik
.gat-header__brand, .gat-header__wordmark, .gat-header__nav,
.gat-header__nav-list, .gat-header__nav-current
.gat-callout
.gat-section-head { + h2/p children }
.gat-hero { __title, __intro }
.gat-tag { --neutral, --info, --pflicht, --risiko }
.gat-skiplink
.gat-tabbar { + .gat-tab, .gat-tab.is-active, .gat-tab-panel, .gat-tab-panel.is-active }
.gat-switcher { + .gat-switcher__label, .gat-switch-btn, .gat-switch-btn.is-active }
.gat-no-print
.gat-header--fixed

// Tailwind v4 Custom Variant:
@custom-variant gat-mode-hc (&:where(.gat-mode-hc, .gat-mode-hc *));
// erlaubt Konsumenten: `gat-mode-hc:bg-gat-yellow` o.ae.
// DS liefert zusaetzlich hand-geschriebene Overrides:
//   .gat-mode-hc .gat-header, .gat-mode-hc .gat-callout,
//   .gat-mode-hc .gat-panel, .gat-mode-hc .gat-metric-card,
//   .gat-mode-hc .gat-btn--primary, …

// ========= gat-charts.js Modul-Surface (NEU, gehostet ueber Pages) ========
// File: design-system/design-system/gat-charts.js
// Konsumenten:
//   import { PALETTE, INK, LABEL_SIZE, AXIS_SIZE,
//            BAR_MAX_DICHT, BAR_MAX_WEIT, VA_DECAL,
//            tip, legende, grid, planIstLegende }
//     from 'https://grueneat.github.io/design-system/gat-charts.js';

export const PALETTE: string[];     // 8 Hex-Werte (gleich wie --gat-web-chart-1..8)
export const INK: { text, soft, mute, hairline, gridline, axis, green, clay, slate };
export const LABEL_SIZE: number;    // 15
export const AXIS_SIZE: number;     // 14
export const BAR_MAX_DICHT: number; // 56
export const BAR_MAX_WEIT: number;  // 130
export const VA_DECAL: object;      // ECharts decal pattern fuer Plan-Balken
export function tip(extra?: object): object;
export function legende(extra?: object): object;
export function grid(extra?: object): object;
export function planIstLegende(): object[];

// ========= Build manifest (NEU) ===========================================
// File: design-system/design-system/package.json
{
  "name": "design-system",
  "version": "2.0.0",
  "private": true,
  "scripts": {
    "build": "tailwindcss -i ./src/design-system.css -o ./design-system.css --minify",
    "watch": "tailwindcss -i ./src/design-system.css -o ./design-system.css --watch"
  },
  "devDependencies": {
    "tailwindcss":      "^4.3.0",
    "@tailwindcss/cli": "^4.3.0"
  }
}
</interfaces>

<call_sites>
Searched: `design-system.css` consumers via `grep -r design-system.css /workspace/`
(Quelle: RESEARCH.md "Konsumenten-Impact"-Abschnitt, HIGH).

Found:
- design-system/index.html — IN SCOPE (Tasks 2, 5, 6, 7, 8, 9, 10, 11): linkt
  die gerenderte `design-system.css` relativ; Style-Guide wird mit den neuen
  Komponenten-Sektionen erweitert.
- design-system/examples/minimal.html — IN SCOPE (Task 6): wird auf die neue
  weisse Brandbar umgestellt.
- gemeindefinanzen/web/index.html:12 — `https://grueneat.github.io/design-
  system/design-system.css` — **OUT OF SCOPE** (Migration im gemeindefinanzen-
  Repo, CONTEXT.md Deferred). Erhaelt automatisch das neue CSS beim naechsten
  Reload — sichtbare Aenderungen (Header weiss, Headline-Gewicht leichter)
  sind im Labor bereits ueberschrieben, daher keine Bruch-Auswirkung.
- gemeindefinanzen-Worktrees — OUT OF SCOPE (veraltete, nicht load-bearing).
- (Keine weiteren Konsumenten gefunden.)

Pages-Workflow:
- design-system/.github/workflows/pages.yml — IN SCOPE (Task 1): `actions/
  setup-node@v4` + `npm ci` + `npm run build` vor dem Upload; **plus** CI-Job
  `git diff --exit-code design-system.css` als Drift-Guard.

Public URL bleibt stabil:
- `https://grueneat.github.io/design-system/design-system.css` — Output liegt
  weiter im Repo-Root; Pages-Upload mit `path: '.'` ist unveraendert.
- Neu: `https://grueneat.github.io/design-system/gat-charts.js` (Pages laedt
  alles unter `path: '.'` hoch).
</call_sites>
</context>

<commit_format>
Format: conventional with issue-id prefix (config: `commits.format=conventional`,
`commits.prefix=true`).
Example: `cjpfs: feat(build): tailwind v4 build pipeline with CI drift guard`
Pattern: `cjpfs: {type}({scope}): {description}`
Types in use: `feat`, `fix`, `chore`, `docs`, `refactor`, `style`. Each task
commits exactly once (atomic).
**Hard:** no "claude", no "Generated with", no `Co-Authored-By` in any commit,
file, or comment. The `LICENSE` and existing copyright headers stay.
</commit_format>

<tasks>

<task type="auto">
  <name>Task 1: Tailwind v4 build pipeline + CI drift guard</name>
  <files>
  design-system/package.json (new),
  design-system/package-lock.json (new, generated by `npm install`),
  design-system/.gitignore (extend),
  design-system/src/design-system.css (new — minimal entry),
  design-system/.github/workflows/pages.yml (modify),
  design-system/.github/workflows/build-check.yml (new)
  </files>
  <action>
  Foundation-Task. Schaffe die Tailwind-v4-Build-Pipeline, **ohne** Inhalte zu
  migrieren — der heutige gerenderte `design-system.css` bleibt am Repo-Root,
  damit Konsumenten unveraendert weiterlaufen, waehrend Task 2 die echte
  Migration macht.

  1. **`design-system/package.json`** anlegen (im DS-Repo-Root, nicht im
     Workspace-Root!):
     ```json
     {
       "name": "design-system",
       "version": "2.0.0",
       "private": true,
       "description": "Grüne AT Design System",
       "scripts": {
         "build": "tailwindcss -i ./src/design-system.css -o ./design-system.css --minify",
         "watch": "tailwindcss -i ./src/design-system.css -o ./design-system.css --watch"
       },
       "devDependencies": {
         "tailwindcss": "^4.3.0",
         "@tailwindcss/cli": "^4.3.0"
       }
     }
     ```
  2. **`design-system/src/design-system.css`** anlegen (Eingang, dieser File
     wird in Task 2 mit Inhalten gefuellt). **In diesem Task minimal:**
     ```css
     /*
      * Grüne AT Design System — Tailwind-Eingang
      * Build: npm run build  ->  ../design-system.css
      */
     @import "tailwindcss";
     ```
  3. **`design-system/.gitignore`** ergaenzen (heute nur `.DS_Store`):
     ```
     .DS_Store
     node_modules/
     .npm/
     ```
  4. **`design-system/.github/workflows/pages.yml`** umbauen. Heute hat die
     Workflow nur Checkout+Upload. Neu:
     ```yaml
     steps:
       - name: Repository auschecken
         uses: actions/checkout@v6

       - name: Node einrichten
         uses: actions/setup-node@v4
         with:
           node-version: '20'
           cache: 'npm'
           cache-dependency-path: design-system/package-lock.json

       - name: Dependencies installieren
         run: npm ci
         working-directory: design-system

       - name: design-system.css bauen
         run: npm run build
         working-directory: design-system

       - name: Pages konfigurieren
         uses: actions/configure-pages@v6

       - name: Artefakt hochladen
         uses: actions/upload-pages-artifact@v5
         with:
           path: design-system

       - name: Zu GitHub Pages deployen
         id: deployment
         uses: actions/deploy-pages@v5
     ```
     **Hinweis zu `path:`**: heute `path: '.'` (Repo-Root). Wir setzen jetzt
     `path: design-system` damit die Pages-Site exakt die DS-Repo-Inhalte hat
     (so wie heute, wenn `cd design-system` der Code-Ordner ist). **WICHTIG:**
     vor dem Commit pruefen, ob das DS-Repo `grueneat/design-system` tatsaechlich
     diesen Sub-Ordner hat oder ob `design-system/` der Repo-Root ist —
     unsicher, weil Workspace-Layout `/workspace/design-system/design-system/`
     suggeriert ein Verschachtelungs-Pattern. **Wenn das Repo flach ist**
     (Repo-Root = das was wir lokal als `design-system/design-system/` haben),
     dann ALLE `working-directory: design-system` und `path: design-system`
     wieder weglassen / auf `.` setzen. **Verifikation:** `git remote -v` in
     der `design-system/`-Repo-Wurzel zeigt `grueneat/design-system` —
     dann ist das der Repo-Root und das `working-directory` muss WEG.
     **Empfehlung (default):** Repo-Root ist `design-system/`, also OHNE
     `working-directory:` (alles laeuft im Repo-Root) und `path: '.'`.
  5. **`design-system/.github/workflows/build-check.yml`** anlegen (CI-Drift-
     Guard, Decision 5):
     ```yaml
     name: Build-Drift-Check
     on:
       pull_request:
         branches: [main]
       push:
         branches: [main]
     jobs:
       check:
         runs-on: ubuntu-latest
         steps:
           - uses: actions/checkout@v6
           - uses: actions/setup-node@v4
             with:
               node-version: '20'
               cache: 'npm'
           - run: npm ci
           - run: npm run build
           - name: Pruefe gebautes CSS = committed CSS
             run: git diff --exit-code design-system.css
     ```
     (Diese Workflow laeuft im Repo-Root; passe `working-directory:` analog
     zu Schritt 4 an, falls die Verzeichnis-Struktur abweicht.)
  6. **Build lokal pruefen**: aus `design-system/` heraus:
     ```
     npm install
     npm run build
     ```
     Erwartung: `design-system.css` wird neu geschrieben (jetzt deutlich
     kleiner als die heutige 429-Zeilen-Hand-Datei, weil der `src/`-Eingang
     nur `@import "tailwindcss"` enthaelt — der Output ist trotzdem nicht
     leer, da Tailwind eine minimale base-Schicht erzeugt). **In diesem Task
     darf der Inhalt der gerenderten `design-system.css` von der heutigen
     Hand-Version abweichen** — der inhaltliche Aufbau passiert in Task 2.
     Wichtig nur: der Build laeuft erfolgreich durch (Exit 0).

  Constraints:
  - **Kein Vendoring**: Tailwind via `devDependencies`, kein Kopieren der
    Tailwind-Sources ins Repo.
  - **package-lock.json committen** (deterministischer Build, `npm ci`-faehig).
  - **`node_modules/` darf NIE committed werden** (.gitignore enforces).
  - **`name` in package.json bleibt `design-system`**, **nicht** `@grueneat/...`
    — das Repo publisht nicht nach npm (`"private": true`).
  </action>
  <verify>
    <automated>
    cd /workspace/design-system/.worktrees/cjpfs-rueckflusskandidaten-aus-gemeindefinanzen-web-adaption-iter-1-18/design-system && \
      test -f package.json && \
      test -f package-lock.json && \
      test -f src/design-system.css && \
      test -f .github/workflows/build-check.yml && \
      grep -q "tailwindcss" package.json && \
      grep -q '"private": true' package.json && \
      grep -q "node_modules" .gitignore && \
      npm ci --silent && \
      npm run build && \
      test -s design-system.css && \
      grep -q "git diff --exit-code design-system.css" .github/workflows/build-check.yml && \
      echo OK_TASK_1
    </automated>
  </verify>
  <done>
  - `package.json` und `package-lock.json` existieren im DS-Repo-Root.
  - `src/design-system.css` enthaelt minimal `@import "tailwindcss";`.
  - `.gitignore` enthaelt `node_modules/`.
  - Pages-Workflow installiert Node 20, laeuft `npm ci` + `npm run build`
    vor dem Upload.
  - Neuer `build-check.yml`-Workflow laeuft auf PR/push, baut, und ruft
    `git diff --exit-code design-system.css` auf.
  - `npm run build` produziert lokal eine nicht-leere `design-system.css`.
  - Commit: `cjpfs: chore(build): tailwind v4 build pipeline with CI drift guard`
  </done>
</task>

<task type="auto">
  <name>Task 2: Token migration into @theme (no value changes, pixel-identical to v1.x)</name>
  <files>
  design-system/src/design-system.css (replace content),
  design-system/design-system.css (re-rendered by npm run build, committed)
  </files>
  <action>
  Migriere **alle** heutigen `--gat-*`-Token aus dem `:root`-Block der
  hand-geschriebenen `design-system.css` (Zeilen 28-124) in einen Tailwind-v4
  `@theme`-Block in `src/design-system.css`. **Keine Wert-Aenderungen in diesem
  Task** — Hellgruen bleibt `#56af31`, alle anderen Werte bleiben gleich
  (AA-Haertung kommt in Task 3). **Komponenten-CSS bleibt unveraendert**
  uebernehmbar — die heutige Komponenten-CSS (Zeilen 138-429) muss in
  `src/design-system.css` als hand-geschriebener Komponenten-Block 1:1
  uebernommen werden.

  Konkret aus RESEARCH.md Section "Architecture Patterns / Recommended Approach":
  1. Header-Kommentar (Lizenz, kanonische URL) am Anfang von
     `src/design-system.css` 1:1 uebernehmen.
  2. Google-Fonts-`@import` 1:1 uebernehmen (muss **vor** `@import "tailwindcss"`
     stehen).
  3. `@import "tailwindcss";`
  4. `@theme { ... }`-Block mit allen Tokens unter Tailwind-Namespace-Praefixen
     (Tailwind v4 mappt Variablen unter Namespaces wie `--color-`, `--spacing-`,
     `--text-`, `--font-`, `--radius-`):
     ```css
     @theme {
       /* Farben — Tailwind erwartet --color-* Namespace */
       --color-gat-dunkelgruen: #257639;
       --color-gat-hellgruen:   #56af31;  /* WIRD IN TASK 3 GEAENDERT */
       --color-gat-gelb:        #ffed00;
       --color-gat-magenta:     #e6007e;
       --color-gat-weiss:       #ffffff;
       --color-gat-anthrazit:   #1d1d1b;

       /* Spacing */
       --spacing-gat-1: 0.25rem;
       --spacing-gat-2: 0.5rem;
       --spacing-gat-3: 1rem;
       --spacing-gat-4: 1.5rem;
       --spacing-gat-5: 2rem;
       --spacing-gat-6: 3rem;

       /* Radius */
       --radius-gat-sm: 0.25rem;
       --radius-gat-md: 0.5rem;

       /* Schrift */
       --font-gat-headline: 'Barlow Semi Condensed', sans-serif;
       --font-gat-copy:     'Barlow Semi Condensed', sans-serif;
       --font-gat-emphasis: 'Vollkorn', serif;

       /* Text-Skala */
       --text-gat-h1:      2.441rem;
       --text-gat-h2:      1.953rem;
       --text-gat-h3:      1.563rem;
       --text-gat-subline: 1.25rem;
       --text-gat-copy:    1rem;
       --text-gat-small:   0.8rem;
     }
     ```
  5. **`@layer base { :root { ... } }`-Block mit Konsumenten-stabilen
     Aliases** — alle alten `--gat-*`-Namen verweisen auf die jetzt von
     Tailwind emittierten `--color-gat-*`/`--spacing-gat-*`/`--text-gat-*`/
     `--font-gat-*`/`--radius-gat-*` (siehe RESEARCH.md ab Zeile 563 fuer die
     vollstaendige Spiegel-Liste). Hier in der Kurzform — der Executor muss
     **alle** Aliase aus dem heutigen `:root`-Block uebernehmen:
     ```css
     @layer base {
       :root {
         --gat-color-dunkelgruen: var(--color-gat-dunkelgruen);
         --gat-color-hellgruen:   var(--color-gat-hellgruen);
         /* … (alle anderen Marken-Tokens) */
         --gat-color-primary:      var(--gat-color-dunkelgruen);
         --gat-color-secondary:    var(--gat-color-hellgruen);
         /* … (alle semantischen Aliase) */
         --gat-font-headline: var(--font-gat-headline);
         --gat-font-copy:     var(--font-gat-copy);
         --gat-font-emphasis: var(--font-gat-emphasis);
         --gat-text-h1:      var(--text-gat-h1);
         /* … (alle Text-Skala-Aliase) */
         --gat-leading-headline: 0.9;
         --gat-leading-copy:     1.3;
         --gat-space-1: var(--spacing-gat-1);
         /* … (alle Space-Aliase) */
         --gat-radius-sm:    var(--radius-gat-sm);
         --gat-radius-md:    var(--radius-gat-md);
         --gat-border-width: 2px;
         --gat-container-max: 72rem;
         --gat-breakpoint-sm: 36rem;
         --gat-breakpoint-md: 48rem;
       }
     }
     ```
  6. **Komponenten-CSS aus der heutigen `design-system.css` (Zeilen 138-429)
     1:1 in `src/design-system.css`** uebernehmen — `.gat-container`,
     `.gat-grid*`, `.gat-section`, `.gat-header`, `.gat-nav*`, `.gat-headline`,
     `.gat-subline`, `.gat-fliesstext`, `.gat-emphasis`, `.gat-btn*`, `.gat-card*`,
     `.gat-underline`, `.gat-highlight`, `.gat-stoerer*`. Diese referenzieren
     die alten `--gat-*`-Namen, die der Alias-Block ueber den Tailwind-Output
     weiterhin bedient. **Keine Aenderungen** an Werten / Selektoren in diesem
     Task.
  7. `npm run build` ausfuehren und `design-system.css` neu committen.

  **Anti-Pattern (RESEARCH.md):** **kein `@apply`** in den Komponenten-Definitionen.
  Komponenten referenzieren `var(--gat-*)` direkt — das ist wirkungsstabiler
  und leichter zu erklaeren.

  **Smoke-Test der Pixel-Identitaet:** der Style-Guide `index.html` rendert
  visuell wie heute (kein systematischer Layout-/Farb-Drift). Das pruefen wir
  durch Inspektion der gerenderten `design-system.css`-Datei: alle alten
  `--gat-*`-Namen sind im Output unter `:root` zu finden (Tailwind emittiert
  + Alias-Block spiegelt).
  </action>
  <verify>
    <automated>
    cd /workspace/design-system/.worktrees/cjpfs-rueckflusskandidaten-aus-gemeindefinanzen-web-adaption-iter-1-18/design-system && \
      npm run build && \
      grep -q "@theme" src/design-system.css && \
      grep -q "@import \"tailwindcss\"" src/design-system.css && \
      grep -q "@layer base" src/design-system.css && \
      grep -q -- "--gat-color-dunkelgruen" design-system.css && \
      grep -q -- "--gat-color-hellgruen" design-system.css && \
      grep -q -- "--gat-color-primary" design-system.css && \
      grep -q -- "--gat-space-3" design-system.css && \
      grep -q -- "--gat-text-h1" design-system.css && \
      grep -q -- "--gat-font-headline" design-system.css && \
      grep -q ".gat-container" design-system.css && \
      grep -q ".gat-btn--primary" design-system.css && \
      grep -q "#56af31" design-system.css && \
      git diff --exit-code design-system.css && \
      echo OK_TASK_2
    </automated>
  </verify>
  <done>
  - `src/design-system.css` enthaelt `@import "tailwindcss"`, `@theme {...}`-Block
    mit allen Tokens, und einen `@layer base { :root { ... } }`-Alias-Block.
  - Alle heutigen `--gat-*`-Token-Namen (29 Stueck) sind in der gerenderten
    `design-system.css` unter `:root` zu finden.
  - Alle heutigen Komponenten-Klassen sind in der gerenderten
    `design-system.css` zu finden.
  - Hellgruen ist noch `#56af31` (Aenderung in Task 3).
  - `git diff --exit-code design-system.css` ist OK (committed = built).
  - Style-Guide `index.html` rendert lokal visuell wie v1.x.
  - Commit: `cjpfs: refactor(tokens): migrate --gat-* into Tailwind @theme block`
  </done>
</task>

<task type="auto">
  <name>Task 3: AA-Haertung — change --gat-color-hellgruen to #3e8a25</name>
  <files>
  design-system/src/design-system.css (single value change in @theme),
  design-system/design-system.css (re-rendered)
  </files>
  <action>
  AA-Haertung pro RESEARCH.md Section 4 (Vorher/Nachher Kontrast-Tabelle):
  in `src/design-system.css` aendere im `@theme`-Block **genau einen Wert**:
  ```css
  --color-gat-hellgruen: #3e8a25;   /* war: #56af31 (Ratio 2.77 FAIL); neu: 4.51 AA OK */
  ```
  Alle anderen Werte bleiben unveraendert (siehe RESEARCH.md Tabelle "OK heute"
  — bereits alle AA-konform).

  **Begruendung im Code-Kommentar:** ein knapper Kommentar direkt ueber der
  geaenderten Zeile, der dokumentiert, dass `#3e8a25` 4.51 auf Weiss erreicht
  (AA), waehrend `#56af31` 2.77 (FAIL) hatte. **Kein "Generated", kein
  "claude"** — neutral formuliert.

  `npm run build` + `design-system.css` neu committen.

  **Hinweis fuer MIGRATION.md (Task 13):** dieser Wert-Wechsel ist eine
  sichtbare optische Aenderung — der Hellgruen-Ton wird klar dunkler. Decision 5
  hat das explizit gewaehlt.

  **Strukturelle Regel** (aus RESEARCH.md, geht in MIGRATION.md ein, nicht
  in den Code): Hellgruen ist auch nach der Wert-Aenderung weiterhin
  **Akzent-Flaeche, nicht Textfarbe auf hellem Grund** — `--gat-color-on-secondary`
  bleibt anthrazit (Decision 1).
  </action>
  <verify>
    <automated>
    cd /workspace/design-system/.worktrees/cjpfs-rueckflusskandidaten-aus-gemeindefinanzen-web-adaption-iter-1-18/design-system && \
      grep -q "#3e8a25" src/design-system.css && \
      ! grep -q "#56af31" src/design-system.css && \
      npm run build && \
      grep -q "#3e8a25" design-system.css && \
      ! grep -q "#56af31" design-system.css && \
      git diff --exit-code design-system.css && \
      python3 -c "
    def ratio(hex1, hex2):
        def lum(h):
            r,g,b = [int(h[i:i+2],16)/255 for i in (0,2,4)]
            def c(x): return x/12.92 if x<=0.03928 else ((x+0.055)/1.055)**2.4
            return 0.2126*c(r)+0.7152*c(g)+0.0722*c(b)
        l1,l2 = sorted([lum(hex1.lstrip('#')), lum(hex2.lstrip('#'))], reverse=True)
        return (l1+0.05)/(l2+0.05)
    r = ratio('#3e8a25','#ffffff')
    assert r >= 4.5, f'AA fail: {r:.2f}'
    print(f'AA OK: {r:.2f}')
    " && \
      echo OK_TASK_3
    </automated>
  </verify>
  <done>
  - `--color-gat-hellgruen` ist `#3e8a25` in `src/design-system.css`.
  - Kein `#56af31` mehr im gerenderten `design-system.css`.
  - AA-Kontrast `#3e8a25` auf weiss = 4.51 (verifiziert per Python-Berechnung).
  - `--gat-color-hellgruen`-Alias verweist unveraendert auf den (jetzt neuen)
    `--color-gat-hellgruen`-Wert — Namens-Stabilitaet erhalten.
  - Commit: `cjpfs: fix(tokens): tighten --gat-color-hellgruen for WCAG AA`
  </done>
</task>

<task type="auto">
  <name>Task 4: Add --gat-web-* token layer (surfaces, text-tones, chart palette)</name>
  <files>
  design-system/src/design-system.css (extend @theme + alias block),
  design-system/design-system.css (re-rendered),
  design-system/index.html (extend style-guide token section)
  </files>
  <action>
  Fuege die `--gat-web-*`-Token-Schicht hinzu (CONTEXT.md Decision 1; RESEARCH.md
  Section "New web layer tokens"). **Additiv**, ohne die `--gat-*`-Schicht
  anzufassen.

  1. **`@theme`-Block erweitern** mit den Web-Tokens unter den Tailwind-
     Namespace-Praefixen:
     ```css
     /* Web-Schicht — entsaettigt, web-tauglich */
     --color-gat-web-bg:           #f3f5f0;
     --color-gat-web-surface:      #ffffff;
     --color-gat-web-surface-sunk: #f7f9f4;
     --color-gat-web-hairline:     #e1e4db;
     --color-gat-web-text:         #23271f;
     --color-gat-web-text-soft:    #5e6358;
     --color-gat-web-text-mute:    #6b6f63;
     --color-gat-web-clay-text:    #9c5a38;
     --color-gat-web-green-deep:   #2c6e40;
     --color-gat-web-green:        #4a8a52;
     --color-gat-web-green-tint:   #e7efe3;
     --color-gat-web-yellow:       #ecd64a;

     /* 8-Ton-Chart-Palette (kategorial, niedrige Saettigung) */
     --color-gat-web-chart-1: #3f7d4f;  /* Ertraege */
     --color-gat-web-chart-2: #6ba368;  /* Personal-Alt */
     --color-gat-web-chart-3: #4f93a0;  /* Personal */
     --color-gat-web-chart-4: #c9a24b;  /* Sachaufwand */
     --color-gat-web-chart-5: #b9744f;  /* Aufwand / Risiko */
     --color-gat-web-chart-6: #9c5b7d;  /* Transfers */
     --color-gat-web-chart-7: #5d6b8a;  /* Nettoergebnis */
     --color-gat-web-chart-8: #8a8f7d;  /* Sonstige */

     /* Web-Radien */
     --radius-gat-web-control: 6px;
     --radius-gat-web-card:    10px;
     ```
  2. **`@layer base { :root { ... } }` Alias-Block erweitern** mit den
     Konsumenten-Namen `--gat-web-*`:
     ```css
     --gat-web-bg:           var(--color-gat-web-bg);
     --gat-web-surface:      var(--color-gat-web-surface);
     --gat-web-surface-sunk: var(--color-gat-web-surface-sunk);
     --gat-web-hairline:     var(--color-gat-web-hairline);
     --gat-web-text:         var(--color-gat-web-text);
     --gat-web-text-soft:    var(--color-gat-web-text-soft);
     --gat-web-text-mute:    var(--color-gat-web-text-mute);
     --gat-web-clay-text:    var(--color-gat-web-clay-text);
     --gat-web-green-deep:   var(--color-gat-web-green-deep);
     --gat-web-green:        var(--color-gat-web-green);
     --gat-web-green-tint:   var(--color-gat-web-green-tint);
     --gat-web-yellow:       var(--color-gat-web-yellow);
     --gat-web-chart-1: var(--color-gat-web-chart-1);
     /* ... chart-2 bis chart-8 ... */
     --gat-web-shadow:         0 1px 2px rgba(31,38,28,.05),
                               0 4px 14px rgba(31,38,28,.05);
     --gat-web-page-max:       min(2040px, 94vw);
     --gat-web-radius-control: var(--radius-gat-web-control);
     --gat-web-radius-card:    var(--radius-gat-web-card);
     --gat-web-focus-ring:     0 0 0 3px color-mix(in srgb,
                                       var(--gat-web-green) 38%, transparent);
     --gat-web-focus-offset:   2px;
     ```
  3. **Style-Guide-Sektion in `index.html`**: fuege eine neue Sektion
     "Web-Layer-Tokens" hinzu (passe zum bestehenden Token-Showcase-Stil),
     die alle `--gat-web-*`-Color-Tokens als Swatches mit Hex-Werten zeigt.
     Inkl. die 8 Chart-Palette-Swatches mit semantischen Rollen-Labels.
  4. `npm run build`; `design-system.css` neu committen.

  **AA-Notes (gehoeren in MIGRATION.md, nicht in CSS-Kommentar):**
  `--gat-web-text-mute` `#6b6f63` ist AA auf allen drei Web-Surfaces (4.69-5.15);
  `--gat-web-clay-text` `#9c5a38` ist AA auf weiss (5.34). Quelle: RESEARCH.md
  "Weitere AA-Notes".
  </action>
  <verify>
    <automated>
    cd /workspace/design-system/.worktrees/cjpfs-rueckflusskandidaten-aus-gemeindefinanzen-web-adaption-iter-1-18/design-system && \
      npm run build && \
      for tok in --gat-web-bg --gat-web-surface --gat-web-surface-sunk --gat-web-hairline --gat-web-text --gat-web-text-soft --gat-web-text-mute --gat-web-clay-text --gat-web-green-deep --gat-web-green --gat-web-green-tint --gat-web-yellow --gat-web-chart-1 --gat-web-chart-2 --gat-web-chart-3 --gat-web-chart-4 --gat-web-chart-5 --gat-web-chart-6 --gat-web-chart-7 --gat-web-chart-8 --gat-web-shadow --gat-web-page-max --gat-web-radius-control --gat-web-radius-card --gat-web-focus-ring --gat-web-focus-offset; do \
        grep -q -- "$tok" design-system.css || { echo "MISSING: $tok"; exit 1; }; \
      done && \
      grep -q "f3f5f0" design-system.css && \
      grep -q "Web-Layer" index.html && \
      git diff --exit-code design-system.css && \
      echo OK_TASK_4
    </automated>
  </verify>
  <done>
  - Alle 26 `--gat-web-*`-Tokens sind in `src/design-system.css` definiert und
    im gerenderten `design-system.css` unter `:root` zu finden.
  - 8 Chart-Palette-Werte sind als `--gat-web-chart-1`...`-8` ausgewiesen.
  - `index.html` hat eine neue Sektion "Web-Layer-Tokens" mit Swatch-Demo
    der neuen Tokens.
  - **`--gat-*`-Namen sind unveraendert** — additive Erweiterung.
  - Commit: `cjpfs: feat(tokens): add --gat-web-* layer (surfaces, text-tones, chart palette)`
  </done>
</task>

<task type="auto">
  <name>Task 5: Quiet headline scale + hyphens: auto</name>
  <files>
  design-system/src/design-system.css (modify .gat-headline + .gat-card__title),
  design-system/design-system.css (re-rendered)
  </files>
  <action>
  Beruhige die Headline-Skala (RESEARCH.md Section "Headline-Skala beruhigen",
  CONTEXT.md Decision 4 "Headline-Skala"):

  | Klasse | Vorher | Nachher |
  |--------|--------|---------|
  | `.gat-headline` | `font-weight: 900` | `font-weight: 800` |
  | `.gat-card__title` | `font-weight: 900` | `font-weight: 700` |
  | `.gat-subline` | `font-weight: 600` | unveraendert |

  Plus: `hyphens: auto` auf den Headline-Klassen (Kandidat J — deutsche
  Komposita):
  ```css
  .gat-headline,
  .gat-subline,
  .gat-section-head h2,
  .gat-hero__title,
  .gat-panel__head h3 {
    hyphens: auto;
  }
  ```

  Hinweis: `.gat-section-head`, `.gat-hero`, `.gat-panel` existieren noch nicht
  (kommen in Tasks 7/8). Die `hyphens: auto`-Regel auf diese Selektoren kann
  hier vorbereitet werden — sie greift erst, wenn die Klassen existieren.
  Alternativ: nur `.gat-headline, .gat-subline` jetzt, Erweiterung als Teil
  von Tasks 7/8. **Empfehlung:** alles in einer Regel hier zentral, weil das
  Pattern ein Doc-Konzept ist und keine Komponenten-Definition.

  `npm run build`; `design-system.css` neu committen.
  </action>
  <verify>
    <automated>
    cd /workspace/design-system/.worktrees/cjpfs-rueckflusskandidaten-aus-gemeindefinanzen-web-adaption-iter-1-18/design-system && \
      npm run build && \
      python3 -c "
    import re
    s = open('src/design-system.css').read()
    # .gat-headline must have font-weight: 800
    m = re.search(r'\.gat-headline\s*\{[^}]*\}', s, re.S)
    assert m and 'font-weight: 800' in m.group(0), f'.gat-headline weight: {m and m.group(0)}'
    # .gat-card__title must have font-weight: 700
    m = re.search(r'\.gat-card__title\s*\{[^}]*\}', s, re.S)
    assert m and 'font-weight: 700' in m.group(0), f'.gat-card__title weight: {m and m.group(0)}'
    # hyphens: auto rule must exist
    assert re.search(r'hyphens:\s*auto', s), 'hyphens: auto missing'
    print('OK_HEADLINE_SCALE')
    " && \
      git diff --exit-code design-system.css && \
      echo OK_TASK_5
    </automated>
  </verify>
  <done>
  - `.gat-headline` ist `font-weight: 800` (war 900).
  - `.gat-card__title` ist `font-weight: 700` (war 900).
  - `.gat-subline` ist unveraendert `font-weight: 600`.
  - `hyphens: auto`-Regel auf den Headline-Klassen liegt vor.
  - Commit: `cjpfs: refactor(typography): quiet headline weights and enable hyphens: auto`
  </done>
</task>

<task type="auto">
  <name>Task 6: White brandbar header (.gat-header rebuild + .gat-header--dunkel opt-in)</name>
  <files>
  design-system/src/design-system.css (replace .gat-header* rules),
  design-system/design-system.css (re-rendered),
  design-system/index.html (update header markup),
  design-system/examples/minimal.html (update header markup)
  </files>
  <action>
  Baue `.gat-header` von Dunkelgruen-Block auf weisse Brandbar nach gruene.at-
  Vorbild um (CONTEXT.md Decision 2/3; RESEARCH.md Section "`.gat-header`
  weisse Brandbar"). **Klassennamen bleiben stabil** — nur Werte aendern sich.

  1. **Loesche** alle heutigen `.gat-header*`-Regeln aus `src/design-system.css`
     (vorhanden: `.gat-header`, `.gat-header__inner`, `.gat-header__logo`,
     `.gat-header__logo-mark`, plus Nav-Regeln, die zu `.gat-nav*` gehoeren —
     `.gat-nav*` bleibt!).
  2. **Fuege die neuen Regeln ein** (vollstaendiger Block aus RESEARCH.md
     Section "weisse Brandbar"):
     ```css
     .gat-header {
       background: var(--gat-web-surface);
       border-bottom: 3px solid var(--gat-web-green);
       box-shadow: 0 1px 3px rgba(31,38,28,.06);
     }
     .gat-header__inner {
       display: flex; align-items: center; justify-content: space-between;
       flex-wrap: wrap; gap: var(--gat-space-3);
       max-width: var(--gat-web-page-max);
       margin-inline: auto;
       padding-inline: clamp(1rem, 4vw, 2.5rem);
       padding-block: 0.85rem;
     }
     .gat-header__brand {
       display: inline-flex; align-items: center; gap: 0.85rem;
       text-decoration: none;
     }
     .gat-header__logo { height: 56px; width: auto; display: block; }
     .gat-header__wordmark {
       font-family: var(--gat-font-headline);
       font-weight: 700; font-size: 1.5rem; line-height: 1;
       color: var(--gat-web-text); letter-spacing: 0.01em;
     }
     .gat-header__nav-list {
       list-style: none; margin: 0; padding: 0;
       display: flex; flex-wrap: wrap; align-items: center;
       gap: 1.25rem;
     }
     .gat-header__nav-list a {
       font-family: var(--gat-font-headline);
       font-weight: 600; font-size: 1.05rem;
       color: var(--gat-web-green-deep);
       text-decoration: none;
     }
     .gat-header__nav-list a:hover { text-decoration: underline; }
     .gat-header__nav-current {
       border-bottom: 2px solid var(--gat-web-green);
       padding-bottom: 2px;
     }
     @media (max-width: 30rem) {
       .gat-header__logo { height: 46px; }
       .gat-header__wordmark { font-size: 1.25rem; }
     }

     /* Opt-in fuer v1.x-Optik */
     .gat-header--dunkel {
       background: var(--gat-color-primary);
       border-bottom: none;
       color: var(--gat-color-on-primary);
       box-shadow: none;
     }
     .gat-header--dunkel .gat-header__wordmark { color: var(--gat-color-weiss); }
     .gat-header--dunkel .gat-header__nav-list a { color: var(--gat-color-weiss); }
     ```
  3. **`design-system/index.html`** Header-Markup aktualisieren auf das neue
     Brandbar-Muster (Logo per `<img>`, CDN-URL — Konsumenten-stabile Quelle):
     ```html
     <header class="gat-header">
       <div class="gat-header__inner">
         <a class="gat-header__brand" href="#top">
           <img class="gat-header__logo"
                src="https://grueneat.github.io/design-system/assets/gruene-logo.svg"
                alt="Die Gruenen">
           <span class="gat-header__wordmark">Design System</span>
         </a>
         <nav aria-label="Hauptnavigation" class="gat-header__nav">
           <ul class="gat-header__nav-list">
             <li><a href="#tokens">Tokens</a></li>
             <li><a href="#komponenten">Komponenten</a></li>
           </ul>
         </nav>
       </div>
     </header>
     ```
     **Wichtig:** Logo-URL ist `https://grueneat.github.io/design-system/
     assets/gruene-logo.svg` — Konsumenten verlinken die Pages-URL. Im
     Style-Guide selbst (`index.html`, das auf Pages liegt) sieht das URL-
     gleich aus; wir koennen aber zur Demonstration den relativen Pfad
     `assets/gruene-logo.svg` nutzen, damit lokales File-Preview funktioniert
     — **Entscheidung:** `index.html` nutzt **relativen** Pfad
     `assets/gruene-logo.svg`, `examples/minimal.html` nutzt die **absolute**
     Pages-URL (zeigt Konsumenten-Pattern).
  4. **`design-system/examples/minimal.html`** auf das neue Brandbar-Muster
     umstellen (absolute CDN-Logo-URL).
  5. **Zusaetzliche Style-Guide-Sektion**: zeige beide Header-Varianten
     (`.gat-header` weiss und `.gat-header.gat-header--dunkel`) nebeneinander
     mit kurzer Notiz, dass `--dunkel` als opt-in fuer v1.x-Konsumenten
     gedacht ist.
  6. **`.gat-header__logo-mark` ist DEPRECATED** — entfaellt aus dem CSS (das
     CSS-Mask-Pattern funktioniert nicht auf weisser Brandbar). Vermerken in
     `MIGRATION.md` (Task 13).
  7. `npm run build`; `design-system.css` neu committen.
  </action>
  <verify>
    <automated>
    cd /workspace/design-system/.worktrees/cjpfs-rueckflusskandidaten-aus-gemeindefinanzen-web-adaption-iter-1-18/design-system && \
      npm run build && \
      python3 -c "
    s = open('src/design-system.css').read()
    assert '.gat-header__brand' in s
    assert '.gat-header__wordmark' in s
    assert '.gat-header__nav-list' in s
    assert '.gat-header--dunkel' in s
    # logo-mark CSS-Mask sollte nicht mehr existieren
    assert '.gat-header__logo-mark' not in s
    # weisse Brandbar nutzt --gat-web-* Tokens
    h = s[s.find('.gat-header'):s.find('.gat-header--dunkel')]
    assert '--gat-web-surface' in h
    assert '--gat-web-green' in h
    print('OK_HEADER')
    " && \
      grep -q "gat-header__brand" index.html && \
      grep -q "gat-header__brand" examples/minimal.html && \
      grep -q "grueneat.github.io/design-system/assets/gruene-logo.svg" examples/minimal.html && \
      git diff --exit-code design-system.css && \
      echo OK_TASK_6
    </automated>
  </verify>
  <done>
  - `.gat-header` ist eine weisse Brandbar mit gruener Akzentlinie.
  - `.gat-header__brand`, `.gat-header__wordmark`, `.gat-header__nav-list`,
    `.gat-header__nav-current` sind neu definiert.
  - `.gat-header--dunkel` ist als opt-in-Modifier verfuegbar.
  - `.gat-header__logo-mark` entfernt (CSS-Mask).
  - `index.html` und `examples/minimal.html` zeigen die neue Brandbar.
  - `examples/minimal.html` nutzt die absolute CDN-URL fuers Logo.
  - Commit: `cjpfs: feat(header): white brandbar (.gat-header) with .gat-header--dunkel opt-in`
  </done>
</task>

<task type="auto">
  <name>Task 7: .gat-panel + .gat-metric-card (data-tool components)</name>
  <files>
  design-system/src/design-system.css (append new components),
  design-system/design-system.css (re-rendered),
  design-system/index.html (new "Datenwerkzeug" section)
  </files>
  <action>
  Fuege die Datenwerkzeug-Komponenten hinzu (Quelle: RESEARCH.md Section
  "Komponenten-CSS / `.gat-panel`" und "`.gat-metric-card`"; gemeindefinanzen
  `web/css/app.css:308-395` (metric-card) und `:397-557` (panel)).

  1. **`.gat-panel`** mit Modifiern und allen Sub-Elementen (`__head`,
     `__head-row`, `__body`, `__body--table`, `__note`, `:fullscreen`):
     ```css
     .gat-panel {
       display: block;
       background: var(--gat-web-surface);
       border: 1px solid var(--gat-web-hairline);
       border-radius: var(--gat-web-radius-card);
       box-shadow: var(--gat-web-shadow);
       margin: var(--gat-space-4) 0;
       overflow: hidden;
     }
     .gat-panel__head {
       padding: var(--gat-space-3) var(--gat-space-3) var(--gat-space-2);
       border-bottom: 1px solid var(--gat-web-hairline);
     }
     .gat-panel__head h3 { margin: 0; }
     .gat-panel__note {
       margin: var(--gat-space-1) 0 0;
       font-size: var(--gat-text-small);
       color: var(--gat-web-text-soft);
       max-width: 70rem;
     }
     .gat-panel__head-row {
       display: flex; align-items: flex-start; justify-content: space-between;
       gap: var(--gat-space-3);
     }
     .gat-panel__head-row > h3 { flex: 1 1 auto; }
     .gat-panel__body { padding: var(--gat-space-3); }
     .gat-panel__body--table { padding: 0; }
     .gat-panel__body > :first-child { margin-top: 0; }
     .gat-panel__body > :last-child  { margin-bottom: 0; }
     .gat-panel:fullscreen {
       margin: 0; border: none; border-radius: 0;
       box-shadow: none; background: var(--gat-web-surface);
       display: flex; flex-direction: column; overflow: auto;
     }
     .gat-panel:fullscreen > .gat-panel__head { flex: none; }
     .gat-panel:fullscreen > .gat-panel__body {
       flex: 1 1 auto; display: flex; flex-direction: column; min-height: 0;
     }
     ```
  2. **`.gat-metric-card`** mit Modifiern `--ertrag`/`--aufwand`/`--netto`/
     `--hero` und Sub-Elementen `__num`/`__label`:
     ```css
     .gat-metric-card {
       position: relative;
       background: var(--gat-web-surface);
       border: 1px solid var(--gat-web-hairline);
       border-radius: var(--gat-web-radius-card);
       box-shadow: var(--gat-web-shadow);
       padding: var(--gat-space-3);
       overflow: hidden;
     }
     .gat-metric-card::before {
       content: "";
       position: absolute; inset: 0 0 auto 0; height: 3px;
       background: var(--gat-metric-accent, var(--gat-web-green));
     }
     .gat-metric-card--ertrag  { --gat-metric-accent: var(--gat-web-chart-1); }
     .gat-metric-card--aufwand { --gat-metric-accent: var(--gat-web-chart-5); }
     .gat-metric-card--netto   { --gat-metric-accent: var(--gat-web-chart-7); }
     .gat-metric-card--hero    {
       background: var(--gat-web-green-tint);
       --gat-metric-accent: var(--gat-web-green-deep);
     }
     .gat-metric-card__num {
       font-size: var(--gat-text-h2);
       font-weight: 900;
       font-variant-numeric: tabular-nums;
       color: var(--gat-web-text);
     }
     .gat-metric-card__label {
       font-size: var(--gat-text-small);
       letter-spacing: 0.07em;
       text-transform: uppercase;
       color: var(--gat-web-text-soft);
     }
     ```
  3. **Style-Guide-Sektion in `index.html`**: "Datenwerkzeug-Komponenten"
     mit Demo eines `.gat-panel` (Titel + Body-Tabelle + Note) und eines
     Grids aus 4 `.gat-metric-card`-Instanzen (`--hero`, `--ertrag`,
     `--aufwand`, `--netto`) mit realistischen Demo-Werten.
  4. `npm run build`; `design-system.css` neu committen.
  </action>
  <verify>
    <automated>
    cd /workspace/design-system/.worktrees/cjpfs-rueckflusskandidaten-aus-gemeindefinanzen-web-adaption-iter-1-18/design-system && \
      npm run build && \
      for cls in .gat-panel .gat-panel__head .gat-panel__head-row .gat-panel__body .gat-panel__body--table .gat-panel__note .gat-metric-card .gat-metric-card--ertrag .gat-metric-card--aufwand .gat-metric-card--netto .gat-metric-card--hero .gat-metric-card__num .gat-metric-card__label; do \
        grep -q -- "$cls" design-system.css || { echo "MISSING: $cls"; exit 1; }; \
      done && \
      grep -q "Datenwerkzeug" index.html && \
      grep -q "gat-metric-card--hero" index.html && \
      grep -q "gat-panel" index.html && \
      git diff --exit-code design-system.css && \
      echo OK_TASK_7
    </automated>
  </verify>
  <done>
  - `.gat-panel` mit allen Sub-Elementen (`__head`, `__head-row`, `__body`,
    `__body--table`, `__note`, `:fullscreen`) ist definiert.
  - `.gat-metric-card` mit Modifiern `--ertrag`/`--aufwand`/`--netto`/`--hero`
    und Sub-Elementen `__num`/`__label` ist definiert.
  - `index.html` zeigt eine "Datenwerkzeug-Komponenten"-Sektion mit Live-Demo.
  - Commit: `cjpfs: feat(components): add .gat-panel and .gat-metric-card`
  </done>
</task>

<task type="auto">
  <name>Task 8: .gat-callout, .gat-section-head, .gat-hero, .gat-tag, .gat-skiplink</name>
  <files>
  design-system/src/design-system.css (append new components),
  design-system/design-system.css (re-rendered),
  design-system/index.html (new content components section)
  </files>
  <action>
  Inhalts-Komponenten hinzufuegen (Quelle: RESEARCH.md Section "Komponenten-CSS"
  Unterabschnitte fuer jede Komponente).

  1. **`.gat-callout`** — Hinweis-Panel mit gruenem Linksrand:
     ```css
     .gat-callout {
       background: var(--gat-web-green-tint);
       border-left: 4px solid var(--gat-web-green-deep);
       border-radius: 0 var(--gat-web-radius-card) var(--gat-web-radius-card) 0;
       padding: var(--gat-space-3) var(--gat-space-4);
       margin: var(--gat-space-3) 0;
       max-width: 70rem;
       color: var(--gat-web-text);
     }
     .gat-callout > :first-child { margin-top: 0; }
     .gat-callout > :last-child  { margin-bottom: 0; }
     ```
  2. **`.gat-section-head`**:
     ```css
     .gat-section-head { margin-bottom: var(--gat-space-4); }
     .gat-section-head h2 { margin-bottom: var(--gat-space-2); }
     .gat-section-head p {
       margin: 0; max-width: 70rem;
       color: var(--gat-web-text-soft);
     }
     ```
  3. **`.gat-hero`** + `__title` + `__intro`:
     ```css
     .gat-hero { margin: var(--gat-space-5) 0; }
     .gat-hero__title { margin: 0; }
     .gat-hero__intro {
       margin: var(--gat-space-2) 0 0;
       font-size: var(--gat-text-subline);
       line-height: var(--gat-leading-copy);
       max-width: 70rem;
       color: var(--gat-web-text-soft);
     }
     ```
  4. **`.gat-tag`** (Pill/Badge) mit 4 Modifiern (Naming-Entscheidung
     `.gat-tag` aus RESEARCH.md, nicht `.gat-pill`):
     ```css
     .gat-tag {
       display: inline-flex; align-items: center; gap: 0.35em;
       padding: 0.15em 0.6em;
       border-radius: 999px;
       font-family: var(--gat-font-copy);
       font-weight: 600; font-size: 0.85rem; line-height: 1.4;
       letter-spacing: 0.02em;
     }
     .gat-tag--neutral { background: var(--gat-web-surface-sunk);
                         color: var(--gat-web-text-soft); }
     .gat-tag--info    { background: var(--gat-web-green-tint);
                         color: var(--gat-web-green-deep); }
     .gat-tag--pflicht { background: color-mix(in srgb, var(--gat-web-green-deep) 14%, white);
                         color: var(--gat-web-green-deep); }
     .gat-tag--risiko  { background: color-mix(in srgb, var(--gat-web-clay-text) 14%, white);
                         color: var(--gat-web-clay-text); }
     ```
  5. **`.gat-skiplink`** (Kandidat H, gruene.at-Pattern):
     ```css
     .gat-skiplink {
       position: fixed; top: -200%; left: 0; z-index: 999;
       background: var(--gat-web-green-deep);
       color: var(--gat-color-weiss);
       padding: var(--gat-space-2) var(--gat-space-3);
       text-decoration: none;
       font-family: var(--gat-font-copy);
       font-weight: 700;
       border-radius: 0 0 var(--gat-web-radius-control) 0;
       transition: top 0.12s ease-out;
     }
     .gat-skiplink:focus { top: 0; }
     .gat-skiplink:focus-visible {
       outline: 3px solid var(--gat-color-highlight);
       outline-offset: -3px;
     }
     ```
  6. **Style-Guide-Sektion in `index.html`**: "Inhalts-Komponenten" mit Demo
     fuer jede der 5 Komponenten (Callout mit Demo-Text; Section-Head; Hero
     mit Title+Intro; Tag-Reihe mit allen 4 Modifiern; Skiplink mit Hinweis
     "Tab-Taste druecken um zu sehen"). **Skiplink ist nur per Tab sichtbar**
     — Hinweis im Style-Guide hinzufuegen.

     **`.gat-skiplink` in `index.html`** als allererstes Body-Element setzen,
     verlinkt auf `#main` (Style-Guide hat einen `<main id="main">`-Wrapper —
     ggf. ergaenzen).
  7. `npm run build`; `design-system.css` neu committen.
  </action>
  <verify>
    <automated>
    cd /workspace/design-system/.worktrees/cjpfs-rueckflusskandidaten-aus-gemeindefinanzen-web-adaption-iter-1-18/design-system && \
      npm run build && \
      for cls in .gat-callout .gat-section-head .gat-hero .gat-hero__title .gat-hero__intro .gat-tag .gat-tag--neutral .gat-tag--info .gat-tag--pflicht .gat-tag--risiko .gat-skiplink; do \
        grep -q -- "$cls" design-system.css || { echo "MISSING: $cls"; exit 1; }; \
      done && \
      grep -q "gat-skiplink" index.html && \
      grep -q "gat-callout" index.html && \
      grep -q 'id="main"' index.html && \
      git diff --exit-code design-system.css && \
      echo OK_TASK_8
    </automated>
  </verify>
  <done>
  - `.gat-callout`, `.gat-section-head`, `.gat-hero`, `.gat-tag` (mit 4
    Modifiern), `.gat-skiplink` sind definiert.
  - `index.html` zeigt Live-Demo aller 5 Komponenten.
  - `.gat-skiplink` ist im Style-Guide als erstes Body-Element gesetzt mit
    `href="#main"`; `<main id="main">`-Wrapper ist vorhanden.
  - Commit: `cjpfs: feat(components): add callout, section-head, hero, tag, skiplink`
  </done>
</task>

<task type="auto">
  <name>Task 9: Tabs and switcher components (.gat-tabbar / .gat-tab / .gat-switcher / .gat-switch-btn)</name>
  <files>
  design-system/src/design-system.css (append),
  design-system/design-system.css (re-rendered),
  design-system/index.html (new "Steuerungselemente" section)
  </files>
  <action>
  Tabs- und Switcher-Komponenten hinzufuegen (CONTEXT.md Decision 5: **im
  2.0-Scope**). Quelle: `gemeindefinanzen/web/vendor/dashboard/dashboard.css:
  51-109`. Naming folgt `.gat-*`-Konvention (nicht `.tab-btn`/`.switch-btn`
  aus dem Labor).

  Lesbarkeits-Mindestgroessen aus Decision 5: Tabs `1.08rem`, Switcher
  `0.98rem`.

  1. **`.gat-tabbar` + `.gat-tab` + `.gat-tab-panel`** (Folder-Tab-Optik
     mit inset-Schatten):
     ```css
     .gat-tabbar {
       display: flex; flex-wrap: wrap; gap: 0.15rem;
       border-bottom: 1px solid var(--gat-web-hairline);
     }
     .gat-tab {
       font: inherit; font-size: 1.08rem;
       cursor: pointer;
       padding: 0.62rem 1.2rem;
       border: 1px solid transparent; border-bottom: none;
       background: transparent;
       color: var(--gat-web-text-soft);
       border-radius: var(--gat-web-radius-control)
                      var(--gat-web-radius-control) 0 0;
       margin-bottom: -1px;
       transition: background 0.15s, color 0.15s, box-shadow 0.15s;
     }
     .gat-tab:hover {
       color: var(--gat-web-text);
       background: color-mix(in srgb, var(--gat-web-green) 9%, transparent);
     }
     .gat-tab.is-active {
       background: var(--gat-web-surface);
       border-color: var(--gat-web-hairline);
       color: var(--gat-web-green-deep);
       font-weight: 700;
       box-shadow: inset 0 -3px 0 var(--gat-web-green-deep);
     }
     /* Reiter sitzt buendig an der Kante — negativer Fokus-Offset */
     .gat-tab { --gat-web-focus-offset: -2px; }

     .gat-tab-panel { display: none; }
     .gat-tab-panel.is-active {
       display: block;
       animation: gat-tab-panel-ein 0.18s ease-out;
     }
     @keyframes gat-tab-panel-ein {
       from { opacity: 0; transform: translateY(4px); }
       to   { opacity: 1; transform: translateY(0); }
     }
     ```
  2. **`.gat-switcher` + `.gat-switcher__label` + `.gat-switch-btn`** (ruhige
     Segmente):
     ```css
     .gat-switcher {
       display: flex; flex-wrap: wrap; gap: 0.3rem;
       margin-bottom: 0.55rem; align-items: baseline;
     }
     .gat-switcher__label {
       font-size: 0.82rem; letter-spacing: 0.09em;
       text-transform: uppercase;
       color: var(--gat-web-text-soft);
       margin-right: 0.35rem;
     }
     .gat-switch-btn {
       font: inherit; font-size: 0.98rem;
       cursor: pointer;
       padding: 0.42rem 1rem;
       border: 1px solid var(--gat-web-hairline);
       background: var(--gat-web-surface);
       color: var(--gat-web-text);
       border-radius: var(--gat-web-radius-control);
       line-height: 1.2;
       transition: background 0.15s, border-color 0.15s, color 0.15s,
                   transform 0.1s;
     }
     .gat-switch-btn:hover {
       border-color: var(--gat-web-green);
       background: var(--gat-web-green-tint);
     }
     .gat-switch-btn:not(.is-active):active {
       background: color-mix(in srgb, var(--gat-web-green) 22%, white);
       transform: translateY(1px);
     }
     .gat-switch-btn.is-active {
       background: var(--gat-web-green-deep);
       border-color: var(--gat-web-green-deep);
       color: var(--gat-color-weiss);
       font-weight: 600;
     }
     .gat-switch-btn.is-active:hover {
       background: var(--gat-web-green-deep);
       color: var(--gat-color-weiss);
     }
     ```
  3. **Style-Guide-Sektion in `index.html`**: "Steuerungselemente" mit:
     - `.gat-tabbar` mit 3 `.gat-tab`-Buttons (einer `.is-active`) und 3
       passenden `.gat-tab-panel`-Inhalten (einer `.is-active`).
     - `.gat-switcher` mit `__label` und 3-4 `.gat-switch-btn` (einer
       `.is-active`).
     - **Kein JS noetig in der Demo** — die `.is-active`-Klasse wird im HTML
       direkt gesetzt. In der Doku-Sektion einen Hinweis: "Konsumenten
       attachen JS-Listener, die die `.is-active`-Klasse zwischen Tabs/
       Buttons umschalten."

  4. `npm run build`; `design-system.css` neu committen.

  **Warum eigene Task (nicht angeflanscht an Task 7/8):** Decision 5 hat
  Tabs/Switcher explizit ins 2.0 gehoben — es ist ein eigenstaendiges
  Komponenten-Feld (Steuerungselemente), das im Labor in einer separaten
  Datei lebte. Atomic-Commit-Politik.
  </action>
  <verify>
    <automated>
    cd /workspace/design-system/.worktrees/cjpfs-rueckflusskandidaten-aus-gemeindefinanzen-web-adaption-iter-1-18/design-system && \
      npm run build && \
      for cls in .gat-tabbar .gat-tab .gat-tab.is-active .gat-tab-panel .gat-switcher .gat-switcher__label .gat-switch-btn .gat-switch-btn.is-active; do \
        grep -q -- "$cls" design-system.css || { echo "MISSING: $cls"; exit 1; }; \
      done && \
      grep -q "1.08rem" design-system.css && \
      grep -q "0.98rem" design-system.css && \
      grep -q "Steuerungselemente" index.html && \
      grep -q "gat-tabbar" index.html && \
      grep -q "gat-switcher" index.html && \
      git diff --exit-code design-system.css && \
      echo OK_TASK_9
    </automated>
  </verify>
  <done>
  - `.gat-tabbar`, `.gat-tab`, `.gat-tab.is-active`, `.gat-tab-panel`,
    `.gat-tab-panel.is-active` mit Einblend-Keyframe sind definiert.
  - `.gat-switcher`, `.gat-switcher__label`, `.gat-switch-btn`,
    `.gat-switch-btn.is-active` sind definiert.
  - Tabs nutzen `font-size: 1.08rem`, Switcher `font-size: 0.98rem`
    (Decision 5).
  - `index.html` hat eine Sektion "Steuerungselemente" mit Live-Demo beider
    Komponenten.
  - Commit: `cjpfs: feat(components): add tabs (.gat-tab/.gat-tabbar) and switcher (.gat-switch-btn/.gat-switcher)`
  </done>
</task>

<task type="auto">
  <name>Task 10: @custom-variant gat-mode-hc + component overrides</name>
  <files>
  design-system/src/design-system.css (add @custom-variant + override block),
  design-system/design-system.css (re-rendered),
  design-system/index.html (HC mode demo section)
  </files>
  <action>
  High-Contrast-Modus (CONTEXT.md Decision 4 Kandidat G; RESEARCH.md Section
  "`.gat-mode-hc` — High-Contrast Variant via Tailwind v4").

  **Hard:** Kein HC-Toggle-**Knopf** im DS (Decision 5 explizit) — nur die
  Variant + die Komponenten-Overrides. Konsumenten bauen ihren eigenen Toggle.

  1. **`@custom-variant`-Definition** auf der Top-Level-Ebene von
     `src/design-system.css` (nicht innerhalb `@theme`):
     ```css
     @custom-variant gat-mode-hc (&:where(.gat-mode-hc, .gat-mode-hc *));
     ```
  2. **Hand-geschriebene Komponenten-Overrides** fuer die DS-eigenen
     `.gat-*`-Komponenten (RESEARCH.md hat das Beispiel; vollstaendig fuer
     alle 2.0-Komponenten ausarbeiten). HC-Palette: schwarz
     (`--gat-color-anthrazit`) + gelb (`--gat-color-gelb`) + magenta-Akzent
     (`--gat-color-magenta`). Keine neuen `--gat-*-hc`-Tokens — nutze
     bestehende.
     ```css
     /* High-Contrast-Overrides — body.gat-mode-hc oder ein Ancestor.
        Konsumenten setzen die Klasse selbst (eigenes Toggle-Pattern). */
     .gat-mode-hc body,
     .gat-mode-hc {
       background: var(--gat-color-anthrazit);
       color: var(--gat-color-gelb);
     }
     .gat-mode-hc .gat-header {
       background: var(--gat-color-anthrazit);
       border-bottom-color: var(--gat-color-gelb);
     }
     .gat-mode-hc .gat-header__wordmark,
     .gat-mode-hc .gat-header__nav-list a {
       color: var(--gat-color-gelb);
     }
     .gat-mode-hc .gat-callout {
       background: var(--gat-color-anthrazit);
       color: var(--gat-color-gelb);
       border-left-color: var(--gat-color-gelb);
     }
     .gat-mode-hc .gat-panel,
     .gat-mode-hc .gat-metric-card {
       background: var(--gat-color-anthrazit);
       color: var(--gat-color-gelb);
       border-color: var(--gat-color-gelb);
     }
     .gat-mode-hc .gat-metric-card__num,
     .gat-mode-hc .gat-metric-card__label {
       color: var(--gat-color-gelb);
     }
     .gat-mode-hc .gat-btn--primary {
       background: var(--gat-color-gelb);
       color: var(--gat-color-anthrazit);
       border-color: var(--gat-color-anthrazit);
     }
     .gat-mode-hc .gat-btn--secondary {
       background: var(--gat-color-anthrazit);
       color: var(--gat-color-gelb);
       border-color: var(--gat-color-gelb);
     }
     .gat-mode-hc .gat-tag--neutral,
     .gat-mode-hc .gat-tag--info,
     .gat-mode-hc .gat-tag--pflicht,
     .gat-mode-hc .gat-tag--risiko {
       background: var(--gat-color-anthrazit);
       color: var(--gat-color-gelb);
       border: 1px solid var(--gat-color-gelb);
     }
     .gat-mode-hc .gat-tab.is-active {
       background: var(--gat-color-anthrazit);
       color: var(--gat-color-gelb);
       box-shadow: inset 0 -3px 0 var(--gat-color-magenta);
     }
     .gat-mode-hc .gat-switch-btn.is-active {
       background: var(--gat-color-gelb);
       color: var(--gat-color-anthrazit);
       border-color: var(--gat-color-anthrazit);
     }
     .gat-mode-hc .gat-skiplink {
       background: var(--gat-color-gelb);
       color: var(--gat-color-anthrazit);
     }
     ```
  3. **Style-Guide-Sektion** in `index.html`: "Hoher Kontrast (gat-mode-hc)"
     mit:
     - Erklaerungs-Text: was die Variant macht, wie Konsumenten den Toggle
       bauen (Code-Beispiel inline: kleiner `<button>` mit
       `onclick="document.body.classList.toggle('gat-mode-hc')"
       aria-pressed="...">Hoher Kontrast</button>` — **wichtig: das ist nur
       Doku-Beispiel im Style-Guide-HTML, nicht Teil des DS-CSS**).
     - Ein Live-Toggle-Button im Style-Guide selbst (per JS, ad-hoc — der
       Style-Guide darf JS haben; das DS bleibt rein CSS+ES-Modul).
     - Eine Sektion, die mehrere Komponenten (Header, Panel, Metric-Card,
       Tag-Reihe) zeigt; wird live umgeschaltet sobald die Body-Klasse
       gesetzt ist.

  4. `npm run build`; `design-system.css` neu committen.

  **Begruendung der Mechanik (RESEARCH.md):** `@custom-variant` ist einzeilig
  und fuer Konsumenten direkt konsumierbar via Tailwind-Utilities (sofern
  diese genutzt werden). Hand-geschriebene Overrides decken die `.gat-*`-
  Komponenten ab — Konsumenten muessen die nicht selbst schreiben.
  </action>
  <verify>
    <automated>
    cd /workspace/design-system/.worktrees/cjpfs-rueckflusskandidaten-aus-gemeindefinanzen-web-adaption-iter-1-18/design-system && \
      npm run build && \
      grep -q "@custom-variant gat-mode-hc" src/design-system.css && \
      grep -q ":where(.gat-mode-hc" src/design-system.css && \
      for ovr in ".gat-mode-hc .gat-header" ".gat-mode-hc .gat-callout" ".gat-mode-hc .gat-panel" ".gat-mode-hc .gat-metric-card" ".gat-mode-hc .gat-btn--primary" ".gat-mode-hc .gat-tab.is-active" ".gat-mode-hc .gat-switch-btn.is-active" ".gat-mode-hc .gat-skiplink"; do \
        grep -F -q -- "$ovr" design-system.css || { echo "MISSING: $ovr"; exit 1; }; \
      done && \
      grep -q "gat-mode-hc" index.html && \
      git diff --exit-code design-system.css && \
      echo OK_TASK_10
    </automated>
  </verify>
  <done>
  - `@custom-variant gat-mode-hc (&:where(.gat-mode-hc, .gat-mode-hc *));`
    ist im Top-Level der `src/design-system.css` definiert.
  - Hand-geschriebene Overrides fuer Header, Callout, Panel, Metric-Card,
    Buttons, Tags, Tabs/Switcher und Skiplink sind im gerenderten CSS.
  - HC-Palette nutzt nur bestehende Marken-Tokens (`--gat-color-anthrazit`,
    `--gat-color-gelb`, `--gat-color-magenta`).
  - Style-Guide hat eine Sektion "Hoher Kontrast (gat-mode-hc)" mit
    Live-Toggle (per ad-hoc-JS im Style-Guide, NICHT im DS-CSS).
  - **Kein `<button class="gat-mode-hc-toggle">` o.ae. im DS-CSS** —
    Decision 5 honoriert.
  - Commit: `cjpfs: feat(a11y): add gat-mode-hc Tailwind custom variant with component overrides`
  </done>
</task>

<task type="auto">
  <name>Task 11: Patterns block — :focus-visible, prefers-reduced-motion, @media print, .gat-header--fixed</name>
  <files>
  design-system/src/design-system.css (append patterns block),
  design-system/design-system.css (re-rendered),
  design-system/index.html (patterns demo notes)
  </files>
  <action>
  Patterns-Block hinzufuegen (Quelle: RESEARCH.md Section "Patterns: Fokus,
  Reduced-Motion, Print, Fixed-Header"; gemeindefinanzen `app.css:685-727`,
  `:1099-1110`, `:1121-1199`).

  1. **`:focus-visible`-Sammelblock** fuer alle DS-eigenen interaktiven
     Elemente:
     ```css
     .gat-btn:focus-visible,
     .gat-skiplink:focus-visible,
     .gat-tag:focus-visible,
     .gat-tab:focus-visible,
     .gat-switch-btn:focus-visible,
     .gat-header__brand:focus-visible {
       outline: 2px solid var(--gat-web-green-deep);
       outline-offset: var(--gat-web-focus-offset, 2px);
       box-shadow: var(--gat-web-focus-ring);
     }
     ```
  2. **`@media (prefers-reduced-motion: reduce)`** (1:1 aus dem Labor):
     ```css
     @media (prefers-reduced-motion: reduce) {
       *, *::before, *::after {
         transition-duration: 0.01ms !important;
         transition-delay: 0ms !important;
         animation-duration: 0.01ms !important;
         animation-delay: 0ms !important;
         animation-iteration-count: 1 !important;
         scroll-behavior: auto !important;
       }
     }
     ```
  3. **`@media print`** mit `.gat-*`-Klassen-Rename aus dem Labor:
     ```css
     @media print {
       body { background: #ffffff; color: #000000; }
       .gat-no-print { display: none !important; }
       .gat-header {
         background: #ffffff;
         border-bottom: 1px solid #000000;
         box-shadow: none;
       }
       .gat-header__nav { display: none; }
       .gat-panel, .gat-metric-card {
         box-shadow: none;
         border: 1px solid #999999;
         break-inside: avoid;
       }
       .gat-metric-card--hero { background: #ffffff; }
       .gat-metric-card::before { display: none; }
       .gat-section-head,
       .gat-panel__head { break-inside: avoid; break-after: avoid; }
       table { break-inside: auto; }
       tr { break-inside: avoid; }
       thead { display: table-header-group; }
       h1, h2, h3, .gat-headline, .gat-subline { break-after: avoid; }
       * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
     }
     ```
  4. **`.gat-header--fixed`** Konvention (Kandidat I):
     ```css
     .gat-header--fixed {
       position: fixed;
       inset: 0 0 auto 0;
       z-index: 100;
       pointer-events: none;
     }
     .gat-header--fixed > * { pointer-events: auto; }
     /* Konsumenten setzen passend zur Header-Hoehe:
        html { scroll-padding-top: 80px; } */
     ```
  5. **Style-Guide-Sektion in `index.html`**: "Patterns" mit:
     - Doku-Notiz zu `:focus-visible` (Konsument konfiguriert
       `--gat-web-focus-ring`/`--gat-web-focus-offset`).
     - Doku-Notiz zu `prefers-reduced-motion`: "wirkt automatisch wenn
       OS/Browser entsprechend eingestellt ist; aktiv testbar in den
       DevTools".
     - Doku-Notiz zu `@media print`: "Druckvorschau testen; Bedienleisten
       mit `.gat-no-print` markieren".
     - Doku-Notiz zu `.gat-header--fixed`: Konvention, `scroll-padding-top`
       Snippet zum Kopieren.

  6. `npm run build`; `design-system.css` neu committen.
  </action>
  <verify>
    <automated>
    cd /workspace/design-system/.worktrees/cjpfs-rueckflusskandidaten-aus-gemeindefinanzen-web-adaption-iter-1-18/design-system && \
      npm run build && \
      grep -q ":focus-visible" design-system.css && \
      grep -q "prefers-reduced-motion" design-system.css && \
      grep -q "@media print" design-system.css && \
      grep -q ".gat-no-print" design-system.css && \
      grep -q ".gat-header--fixed" design-system.css && \
      grep -q "pointer-events: none" design-system.css && \
      grep -q "break-inside: avoid" design-system.css && \
      grep -q "Patterns" index.html && \
      git diff --exit-code design-system.css && \
      echo OK_TASK_11
    </automated>
  </verify>
  <done>
  - `:focus-visible`-Sammelblock auf allen DS-eigenen interaktiven Elementen
    (Btn, Skiplink, Tag, Tab, Switch-btn, Header__brand).
  - `@media (prefers-reduced-motion: reduce)`-Block ist 1:1 vom Labor.
  - `@media print`-Block mit `.gat-no-print`-Hilfsklasse, Header-/Panel-/
    Metric-Card-Anpassungen und `break-inside`-Regeln.
  - `.gat-header--fixed` mit `pointer-events`-Konvention.
  - Style-Guide-Sektion "Patterns" dokumentiert alle vier.
  - Commit: `cjpfs: feat(patterns): add focus-visible, reduced-motion, print and fixed-header patterns`
  </done>
</task>

<task type="auto">
  <name>Task 12: gat-charts.js ES module (chart palette + helpers)</name>
  <files>
  design-system/gat-charts.js (new),
  design-system/index.html (new "Diagramme" section with import snippet)
  </files>
  <action>
  Schreibe das `gat-charts.js`-ES-Modul (CONTEXT.md "Claude's Discretion"
  -> Option (a) bestaetigt; RESEARCH.md Section "gat-charts.js Chart-Helper-
  Modul"). **Kein Build noetig** — Vanilla-ES-Modul, vom Pages-Workflow als
  statische Datei mit-hochgeladen.

  1. **`design-system/gat-charts.js`** anlegen mit dem vollstaendigen
     Modul-Surface aus RESEARCH.md:
     ```js
     /*
      * Grüne AT Design System — Chart-Helper-Modul
      * -------------------------------------------
      * Palette und Helfer fuer ECharts-basierte Datenwerkzeuge.
      * Geliefert via:
      *   import { PALETTE, INK, ... }
      *     from 'https://grueneat.github.io/design-system/gat-charts.js';
      *
      * Die Palette spiegelt die CSS-Tokens --gat-web-chart-1...8 im DS.
      * Lizenz: CC BY 4.0 (gleich wie design-system.css).
      */

     export const PALETTE = [
       "#3f7d4f", "#6ba368", "#4f93a0", "#c9a24b",
       "#b9744f", "#9c5b7d", "#5d6b8a", "#8a8f7d",
     ];

     export const INK = {
       text:     "#23271f",
       soft:     "#5e6358",
       mute:     "#6b6f63",
       hairline: "#e1e4db",
       gridline: "#e7eae2",
       axis:     "#cdd2c8",
       green:    "#3f7d4f",
       clay:     "#9c5a38",
       slate:    "#5d6b8a",
     };

     export const LABEL_SIZE = 15;
     export const AXIS_SIZE  = 14;
     export const BAR_MAX_DICHT = 56;
     export const BAR_MAX_WEIT  = 130;

     export const VA_DECAL = {
       symbol: "rect", symbolSize: 1,
       dashArrayX: [3, 0], dashArrayY: [1, 6],
       color: "rgba(255,255,255,0.45)", rotation: -Math.PI / 4,
     };

     export function tip(extra = {}) {
       return {
         trigger: "axis",
         backgroundColor: "#ffffff",
         borderColor: INK.hairline,
         borderWidth: 1,
         extraCssText:
           "box-shadow: 0 4px 14px rgba(31,38,28,.08); border-radius: 8px;",
         textStyle: {
           color: INK.text,
           fontFamily: "'Barlow Semi Condensed', sans-serif",
           fontSize: LABEL_SIZE,
         },
         ...extra,
       };
     }

     export function legende(extra = {}) {
       return {
         textStyle: { color: INK.soft, fontSize: LABEL_SIZE },
         itemGap: 14,
         ...extra,
       };
     }

     export function grid(extra = {}) {
       return {
         left: 10, right: 18, top: 14, bottom: 10,
         containLabel: true,
         ...extra,
       };
     }

     export function planIstLegende() {
       return [
         { name: "Ist (RA)",      type: "bar", data: [] },
         { name: "Plan (VA/NVA)", type: "bar", data: [],
           itemStyle: { decal: VA_DECAL } },
       ];
     }
     ```

  2. **Sanity-Check der Palette-Konsistenz mit CSS**: PALETTE[0..7] muss
     identisch sein zu `--gat-web-chart-1..8` aus Task 4. Verifikation in
     `<verify>` per Python-Grep beider Quellen.

  3. **Style-Guide-Sektion in `index.html`**: "Diagramme" mit:
     - Doku zu Chart-Palette (8 Farben mit semantischen Rollen — Swatches
       referenzieren `--gat-web-chart-N` direkt aus dem Token-Layer).
     - Code-Beispiel fuer den Import:
       ```html
       <pre><code>import {
       PALETTE, INK, LABEL_SIZE, AXIS_SIZE,
       BAR_MAX_DICHT, BAR_MAX_WEIT,
       tip, legende, grid, planIstLegende
     } from 'https://grueneat.github.io/design-system/gat-charts.js';</code></pre>
       ```
     - **Kein gerendertes Chart** im Style-Guide (das DS importiert kein
       ECharts — wuerde Vendoring-Verbot wenn lokal, plus unnoetig
       schwergewichtig). Doku-Hinweis: "Konsumenten importieren ECharts
       selbst via CDN und kombinieren mit `gat-charts.js`-Helfern."

  4. **Wichtig:** `gat-charts.js` liegt im DS-Repo-Root, **nicht** unter
     `src/` (es wird nicht von Tailwind verarbeitet, sondern als statische
     Datei ausgeliefert). Pages-Workflow laedt es per `path: '.'` automatisch
     mit hoch.

  **Konsument bleibt unveraendert wenn er heute keine Charts hat** — das Modul
  ist additiv. gemeindefinanzen wird in einem Folge-Issue (Deferred) auf das
  Modul umstellen.
  </action>
  <verify>
    <automated>
    cd /workspace/design-system/.worktrees/cjpfs-rueckflusskandidaten-aus-gemeindefinanzen-web-adaption-iter-1-18/design-system && \
      test -f gat-charts.js && \
      python3 -c "
    import re
    js = open('gat-charts.js').read()
    css = open('design-system.css').read()
    # Alle 8 Palette-Werte muessen exportiert sein
    pal_match = re.search(r'export const PALETTE\s*=\s*\[([^\]]+)\]', js, re.S)
    assert pal_match, 'PALETTE export missing'
    hexes = re.findall(r'#[0-9a-fA-F]{6}', pal_match.group(1))
    assert len(hexes) == 8, f'PALETTE not 8 colors: {hexes}'
    # Jeder Palette-Wert muss auch im CSS als --gat-web-chart-* zu finden sein
    for i, h in enumerate(hexes, start=1):
        assert h.lower() in css.lower(), f'PALETTE color {h} not in design-system.css (chart-{i})'
    # Erforderliche Exports
    for name in ['INK','LABEL_SIZE','AXIS_SIZE','BAR_MAX_DICHT','BAR_MAX_WEIT','VA_DECAL']:
        assert f'export const {name}' in js, f'missing export const {name}'
    for name in ['tip','legende','grid','planIstLegende']:
        assert f'export function {name}' in js, f'missing export function {name}'
    print('OK_CHARTS_MODULE')
    " && \
      grep -q "gat-charts.js" index.html && \
      grep -q "grueneat.github.io/design-system/gat-charts.js" index.html && \
      echo OK_TASK_12
    </automated>
  </verify>
  <done>
  - `design-system/gat-charts.js` existiert im Repo-Root mit allen Exports
    (`PALETTE`, `INK`, `LABEL_SIZE`, `AXIS_SIZE`, `BAR_MAX_DICHT`,
    `BAR_MAX_WEIT`, `VA_DECAL`, `tip`, `legende`, `grid`, `planIstLegende`).
  - `PALETTE` hat genau 8 Hex-Werte, die mit den `--gat-web-chart-1..8`
    Tokens uebereinstimmen.
  - Style-Guide-Sektion "Diagramme" zeigt die Palette als Swatches plus
    Import-Code-Beispiel mit der korrekten CDN-URL.
  - Commit: `cjpfs: feat(charts): add gat-charts.js ES module with palette and ECharts helpers`
  </done>
</task>

<task type="auto">
  <name>Task 13: README + CHANGELOG + MIGRATION.md</name>
  <files>
  design-system/README.md (extend),
  design-system/CHANGELOG.md (add [2.0.0] entry),
  design-system/MIGRATION.md (new)
  </files>
  <action>
  Konsumenten-Doku schreiben. Drei Dateien:

  1. **`README.md` erweitern** — Konsumenten-Einbindung bleibt unveraendert
     (gleiche `<link>`-URL); ergaenzen:
     - Kurz-Notiz, dass `v2.0.0` jetzt Tailwind-gebaut ist (Konsumenten merken
       nichts, URL identisch).
     - **Neuer Abschnitt "Fuer Mitwirkende"**: Repo lokal bauen mit
       `npm install` + `npm run build` (oder `npm run watch`); Hinweis,
       dass `design-system.css` committed wird und CI ueberprueft, dass
       Source und Output uebereinstimmen.
     - Erwaehnung `gat-charts.js`-Modul mit der Import-URL.
     - **Keine Werkzeug-Attribution.**

  2. **`CHANGELOG.md` `[2.0.0]`-Eintrag** mit Datum (`2026-05-23` oder
     aktueller Tag-Tag). Konventionelle Sektionen: Added, Changed, Fixed,
     Deprecated, Migration. Beispiel-Struktur (vollstaendig auszufuellen):

     ```markdown
     ## [2.0.0] - 2026-05-DD

     **Major Release.** Das DS ist nun Tailwind-v4-gebaut, mit additiver
     `--gat-web-*`-Token-Schicht fuer datenwerkzeug-taugliche Web-Optik,
     einer A11y-`gat-mode-hc`-Variant und neuen Komponenten.

     ### Added
     - Tailwind-v4-Build-Pipeline (`npm run build`) — Tokens via `@theme`,
       Variants via `@custom-variant`.
     - `--gat-web-*`-Schicht: Surfaces, entsaettigte Text-Toene, 8-Ton-
       Chart-Palette.
     - Komponenten: `.gat-panel` (+ Modifier), `.gat-metric-card`
       (`--ertrag`/`--aufwand`/`--netto`/`--hero`), `.gat-callout`,
       `.gat-section-head`, `.gat-hero`, `.gat-tag` (`--neutral`/`--info`/
       `--pflicht`/`--risiko`), `.gat-skiplink`, `.gat-tabbar`/`.gat-tab`/
       `.gat-tab-panel`, `.gat-switcher`/`.gat-switch-btn`.
     - `.gat-header--dunkel` opt-in-Modifier fuer v1.x-Optik.
     - `.gat-header--fixed` Konventions-Klasse.
     - `@custom-variant gat-mode-hc` (Tailwind v4) plus Komponenten-
       Overrides — High-Contrast-Modus per `body.gat-mode-hc`.
     - `:focus-visible`-Sammelblock, `prefers-reduced-motion`-Block,
       `@media print`-Block, `.gat-no-print`-Hilfsklasse.
     - `gat-charts.js`-ES-Modul mit Palette + ECharts-Helfern
       (`https://grueneat.github.io/design-system/gat-charts.js`).
     - CI-Drift-Guard (`git diff --exit-code design-system.css`).

     ### Changed (Breaking)
     - **`.gat-header`** ist jetzt eine weisse Brandbar mit gruener
       Akzentlinie (statt Dunkelgruen-Block). Konsumenten, die die
       Dunkelgruen-Optik beibehalten wollen, setzen
       `class="gat-header gat-header--dunkel"`.
     - **`--gat-color-hellgruen`** wechselt von `#56af31` zu `#3e8a25`
       (WCAG AA: 4.51 auf Weiss, war 2.77 FAIL).
     - **`.gat-headline`** ist `font-weight: 800` (war 900).
     - **`.gat-card__title`** ist `font-weight: 700` (war 900).
     - Headline-Klassen haben jetzt `hyphens: auto`.

     ### Deprecated
     - `.gat-header__logo-mark` (CSS-Mask-Variante) — nicht mehr Teil des
       Default-Header-Markups. Bleibt definiert nur via
       `.gat-header--dunkel`-Markup falls noetig.

     ### Migration
     Siehe `MIGRATION.md` fuer Schritt-fuer-Schritt-Anleitung inkl.
     Vorher/Nachher.
     ```

  3. **`MIGRATION.md` neu** anlegen. Struktur:
     - **Header:** "Migration v1.x -> v2.0".
     - **Was Konsumenten nicht aendern muessen.** `<link>`-URL bleibt
       (`https://grueneat.github.io/design-system/design-system.css`); die
       Konsumer-Site bekommt das neue CSS automatisch beim naechsten Reload.
     - **Was sich optisch aendert.**
       - `.gat-header`: weisse Brandbar mit Logo-`<img>` (Anleitung wie das
         Markup angepasst werden muss, plus Hinweis auf
         `.gat-header--dunkel`-Opt-in).
       - Hellgruen-Ton wandert von `#56af31` zu `#3e8a25` (sichtbar dunkler,
         aber AA-konform; strukturelle Regel: Hellgruen ist Akzent-Flaeche,
         nicht Textfarbe auf hellem Grund — `--gat-color-on-secondary`
         bleibt anthrazit).
       - Headline-Gewichte sind ruhiger.
     - **Was Konsumenten neu nutzen koennen.**
       - `--gat-web-*`-Token-Schicht (Surfaces, Text-Toene, Chart-Palette).
       - Neue Komponenten (`.gat-panel`, `.gat-metric-card`, `.gat-callout`,
         `.gat-section-head`, `.gat-hero`, `.gat-tag`, `.gat-skiplink`,
         `.gat-tabbar`/`.gat-tab`, `.gat-switcher`/`.gat-switch-btn`).
       - `.gat-mode-hc`-Variant: Konsumenten bauen ihren eigenen Toggle —
         JS-Snippet als Beispiel:
         ```html
         <button type="button"
                 aria-pressed="false"
                 onclick="this.setAttribute('aria-pressed',
                          document.body.classList.toggle('gat-mode-hc'))">
           Hoher Kontrast
         </button>
         ```
       - `gat-charts.js` Import (siehe Code-Beispiel aus Task 12).
       - `.gat-no-print`-Markierung fuer Bedienelemente.
       - `.gat-header--fixed`-Konvention plus `scroll-padding-top` Snippet.
     - **AA-Notes / Regeln**:
       - Magenta-Text nur auf Weiss oder Tiefem Gruen, nicht auf web-bg/
         sunk/tint.
       - Hellgruen als Flaeche -> Anthrazit-Text; nie weiss-auf-hellgruen.
       - `--gat-web-text-mute` ist AA auf allen drei Surfaces.
     - **gemeindefinanzen-Konsumer-spezifischer Hinweis**: separater Folge-
       Issue im gemeindefinanzen-Repo wird die lokale `--web-*`-Schicht auf
       die DS-Variante umstellen — bis dahin bleibt die lokale Schicht
       parallel aktiv.
     - **Contributor-Build-Anleitung** (kuerze Variante von README §
       "Mitwirkende"): `npm install && npm run build`. Wer `src/` editiert,
       MUSS den Output mit-committen — CI prueft via
       `git diff --exit-code design-system.css`.
     - **Kein Tag-Pinning noetig.** Die `<link>`-URL ist Rolling — der
       2.0-Tag markiert das Datum der Aenderung, **erzwingt aber kein neues
       Markup auf der Konsumer-Seite**, ausser den oben aufgefuehrten
       optischen Aenderungen.

  4. **Keine Werkzeug-Attribution** in keiner der drei Dateien.
  </action>
  <verify>
    <automated>
    cd /workspace/design-system/.worktrees/cjpfs-rueckflusskandidaten-aus-gemeindefinanzen-web-adaption-iter-1-18/design-system && \
      test -f MIGRATION.md && \
      grep -q "Migration" MIGRATION.md && \
      grep -q "v1.x" MIGRATION.md && \
      grep -q "v2.0" MIGRATION.md && \
      grep -q "gat-header--dunkel" MIGRATION.md && \
      grep -q "#56af31" MIGRATION.md && \
      grep -q "#3e8a25" MIGRATION.md && \
      grep -q "gat-mode-hc" MIGRATION.md && \
      grep -q "gat-charts.js" MIGRATION.md && \
      grep -q "Mitwirkende\|npm run build\|npm install" README.md && \
      grep -q "2.0.0" CHANGELOG.md && \
      grep -q "Breaking\|Changed" CHANGELOG.md && \
      grep -q "gat-mode-hc" CHANGELOG.md && \
      # Keine Werkzeug-Attribution
      ! grep -i -E "claude|generated with|co-authored-by" README.md MIGRATION.md CHANGELOG.md && \
      echo OK_TASK_13
    </automated>
  </verify>
  <done>
  - `README.md` hat einen Mitwirkenden-Abschnitt mit `npm install` + `npm run
    build`-Anleitung; Konsumenten-`<link>`-Hinweis bleibt unveraendert; neues
    `gat-charts.js` ist erwaehnt.
  - `CHANGELOG.md` hat einen `[2.0.0]`-Eintrag mit Added/Changed/Deprecated/
    Migration-Sektionen.
  - `MIGRATION.md` existiert mit Vorher/Nachher zu Header, Hellgruen,
    Headline-Skala; neue Komponenten dokumentiert; HC-Toggle-Beispiel-Snippet;
    AA-Regeln; gemeindefinanzen-Migrations-Hinweis.
  - Keine "claude"/"Generated"/"Co-Authored-By"-Spuren in den drei Dateien.
  - Commit: `cjpfs: docs(release): write CHANGELOG [2.0.0], MIGRATION.md and README contributor guide`
  </done>
</task>

<task type="auto">
  <name>Task 14: Final integration check + v2.0.0 git tag</name>
  <files>
  (no file edits — verification only; optional final design-system.css
  re-build to confirm clean tree)
  </files>
  <action>
  Finaler Integrations-Check des kompletten 2.0-Releases. **Kein Code-Edit
  in dieser Task** — nur Verifikation, dann Tag.

  1. **Sauberer Re-Build von Scratch:** `npm ci && npm run build`, dann
     `git diff --exit-code design-system.css` muss OK sein (Drift-Guard).
  2. **CSS-Smoke-Check** auf den gerenderten `design-system.css`:
     - Datei existiert und ist nicht leer.
     - Enthaelt `@theme`-emittierte Token-Variablen unter `:root`.
     - Enthaelt **alle** in den Interfaces aufgelisteten neuen Klassen.
     - Enthaelt **alle** bestehenden `.gat-*`-Klassen (Stabilitaet).
     - Enthaelt `@media print`, `@media (prefers-reduced-motion: reduce)`,
       `:focus-visible`.
     - Enthaelt `--gat-color-hellgruen` mit Wert `#3e8a25` (nicht `#56af31`).
  3. **`gat-charts.js`-Existenz und Sanity** (alle Exports vorhanden).
  4. **Style-Guide-Sanity**: `index.html` referenziert die gerenderte
     `design-system.css` und enthaelt die neuen Demo-Sektionen.
  5. **`examples/minimal.html`-Sanity**: nutzt die neue Header-Brandbar.
  6. **MIGRATION.md / CHANGELOG.md / README.md** existieren mit den
     2.0-Inhalten.
  7. **Keine Vendoring-Verletzung:** kein `vendor/` ist neu, keine fremden
     Libraries als Lokal-Kopien (`tailwindcss` lebt nur in `node_modules/`,
     das `.gitignore` ausschliesst).
  8. **Keine Tool-Attribution:** weder in CSS, JS, HTML, MD, noch in
     Commit-History.
  9. **Tag setzen** (im Worktree, dann push):
     ```
     git tag -a v2.0.0 -m "v2.0.0 — Tailwind v4 build, --gat-web-* layer, new components, gat-mode-hc variant"
     ```
     **Wichtig:** kein "claude" o.ae. in der Tag-Message. Der Tag-Push
     selbst kann via `git push origin v2.0.0` erfolgen oder durch den
     Executor-Workflow uebernommen werden — Executor entscheidet je nach
     `/issue:complete`-Pipeline.

  **Hinweis fuer Executor:** Dieser Task hat **keinen Commit** (nur ein Tag).
  Die Test-Commits der vorigen 13 Tasks sind die einzigen 2.0-Commits.
  </action>
  <verify>
    <automated>
    cd /workspace/design-system/.worktrees/cjpfs-rueckflusskandidaten-aus-gemeindefinanzen-web-adaption-iter-1-18/design-system && \
      rm -rf node_modules && \
      npm ci --silent && \
      npm run build && \
      git diff --exit-code design-system.css && \
      python3 -c "
    css = open('design-system.css').read()
    # Token / @theme emission
    assert '--gat-color-dunkelgruen' in css
    assert '--gat-color-hellgruen' in css
    assert '#3e8a25' in css
    assert '#56af31' not in css
    assert '--gat-web-bg' in css
    assert '--gat-web-chart-1' in css and '--gat-web-chart-8' in css
    # New components
    for cls in ['.gat-panel', '.gat-metric-card', '.gat-callout',
                '.gat-section-head', '.gat-hero', '.gat-tag',
                '.gat-skiplink', '.gat-tabbar', '.gat-tab',
                '.gat-switcher', '.gat-switch-btn',
                '.gat-header--dunkel', '.gat-header--fixed',
                '.gat-no-print']:
        assert cls in css, f'missing {cls}'
    # Existing components still present
    for cls in ['.gat-container', '.gat-btn--primary', '.gat-card',
                '.gat-headline', '.gat-stoerer--gelb']:
        assert cls in css, f'missing v1.x class {cls}'
    # Patterns
    assert '@media print' in css
    assert 'prefers-reduced-motion' in css
    assert ':focus-visible' in css
    # gat-mode-hc overrides
    assert '.gat-mode-hc' in css
    print('OK_CSS_SMOKE')
    " && \
      test -f gat-charts.js && \
      test -f MIGRATION.md && \
      test -f CHANGELOG.md && \
      grep -q "design-system.css" index.html && \
      grep -q "Datenwerkzeug\|gat-panel" index.html && \
      grep -q "gat-header__brand" examples/minimal.html && \
      # Kein vendoring
      ! find . -maxdepth 3 -type d -name vendor 2>/dev/null | grep -q vendor && \
      # Keine Tool-Attribution in jeglichem Source / Doc
      ! grep -r -i -l --include='*.css' --include='*.js' --include='*.md' --include='*.html' --include='*.yml' --include='*.json' -E "claude|generated with claude|co-authored-by" . | grep -v node_modules | head -5 | grep . && \
      echo OK_TASK_14
    </automated>
  </verify>
  <done>
  - Sauberer `npm ci && npm run build` laeuft durch, Drift-Guard OK.
  - Gerendertes `design-system.css` enthaelt alle alten + neuen Klassen,
    alle Tokens, alle Patterns.
  - `gat-charts.js`, `MIGRATION.md`, `CHANGELOG.md` existieren mit Inhalt.
  - Kein `vendor/`-Verzeichnis, keine fremden Libraries als Lokal-Kopien.
  - Keine "claude"/"Generated"/"Co-Authored-By"-Spuren in irgendeiner
    versionierten Datei.
  - `git tag -a v2.0.0 -m "..."` wurde gesetzt (Tag-Message ohne
    Werkzeug-Attribution).
  - **Kein Commit in dieser Task** — der Tag steht auf dem letzten Doku-
    Commit aus Task 13.
  </done>
</task>

</tasks>

<verification>
Nach allen 14 Tasks (Tag-Setzen inklusive):

1. **Sauberer Build von Scratch:**
   ```
   cd /workspace/design-system/.worktrees/<slug>/design-system
   rm -rf node_modules
   npm ci
   npm run build
   git diff --exit-code design-system.css   # MUST pass
   ```
2. **CSS-Smoke:**
   ```
   grep -c -- "--gat-" design-system.css      # >= 40 token references
   grep -c "@media" design-system.css         # >= 2 (print + reduced-motion)
   grep -q "@custom-variant\|gat-mode-hc" design-system.css
   ```
3. **JS-Smoke:**
   ```
   node -e "import('./gat-charts.js').then(m => console.log(Object.keys(m)))"
   # Erwartet: PALETTE, INK, LABEL_SIZE, AXIS_SIZE, BAR_MAX_DICHT,
   #          BAR_MAX_WEIT, VA_DECAL, tip, legende, grid, planIstLegende
   ```
4. **Sichtkontrolle Style-Guide:** `index.html` per Browser oeffnen
   (`file://...`) — alle neuen Sektionen sind sichtbar (Web-Layer-Tokens,
   Datenwerkzeug, Inhalts-Komponenten, Steuerungselemente, Hoher Kontrast,
   Patterns, Diagramme).
5. **CI-Vor-Push-Sanity:** `.github/workflows/build-check.yml` und
   `.github/workflows/pages.yml` syntaktisch valide:
   ```
   python3 -c "import yaml; yaml.safe_load(open('.github/workflows/build-check.yml')); yaml.safe_load(open('.github/workflows/pages.yml'))"
   ```
6. **Konsumenten-URL-Stabilitaet:** Pages-Workflow-`path:`-Setting stimmt
   so, dass `design-system.css` weiterhin unter
   `https://grueneat.github.io/design-system/design-system.css` erreichbar
   ist (vorerst lokal nicht testbar — CI-Lauf nach Merge verifiziert).
7. **Tag gesetzt:** `git tag -l v2.0.0` zeigt den Tag.
8. **Atomic-Commit-Politik:** `git log --oneline issue/cjpfs-...` zeigt
   genau 13 Commits (einer pro Task 1-13), alle mit Prefix `cjpfs:` und
   konventionellem `<type>(<scope>): <description>`-Format. Task 14 setzt
   den Tag, nicht einen Commit.
</verification>

<success_criteria>
Mapping zu ISSUE.md Definition of Done (Triage-Issue) + CONTEXT.md Decision 4
(Execute-Scope vom Triage zum vollen 2.0):

- [x] Tailwind-v4-Build-Setup im design-system-Repo (Kandidat K) — Task 1.
- [x] Token-Migration der `--gat-*` in `@theme` + `--gat-web-*`-Schicht
      (Kandidat A) — Tasks 2 + 4.
- [x] AA-Haertung bestehender `--gat-*`-Werte (Teil von A) — Task 3.
- [x] Volle `.gat-*`-Komponenten-Suite (Kandidat B) — Tasks 6, 7, 8.
- [x] Tabs/Switcher (`.gat-tab*`, `.gat-switch*`) — Task 9 (Decision 5).
- [x] A11y-Variant `.gat-mode-hc:` via Tailwind (Kandidat G) — Task 10.
- [x] Skip-Link `.gat-skiplink` (Kandidat H) — Task 8.
- [x] Fixed-Header-Konventionen (Kandidat I) — Task 11.
- [x] `hyphens: auto` auf Headline-Klassen (Kandidat J) — Task 5.
- [x] Headline-Skala beruhigen (Teil von C) — Task 5.
- [x] Tableiste-/Umschalter-Mindestgroessen (Teil von C) — Task 9
      (`1.08rem` / `0.98rem`).
- [x] `prefers-reduced-motion`-Block, `:focus-visible`-Ring,
      `@media print`-Stylesheet (Kandidat D) — Task 11.
- [x] Chart-Palette als `gat-charts.js`-ES-Modul via gehostetes JS auf
      GitHub Pages — Task 12.
- [x] Brandbar (`.gat-header` weiss), Hero, Section-Head, Callout, Panel,
      Metric-Card (Kandidat E + B) — Tasks 6, 7, 8.
- [x] Gebautes `design-system.css` wird committed, CI verifiziert via
      `git diff --exit-code` (Decision 5) — Task 1 (`build-check.yml`).
- [x] Konsumenten-stabile Pages-URL (`grueneat.github.io/design-system/
      design-system.css`) — alle Tasks erhalten den Output am Repo-Root.
- [x] `MIGRATION.md` + `CHANGELOG.md`-`[2.0.0]`-Eintrag — Task 13.
- [x] `v2.0.0`-Tag — Task 14.
- [x] Keine Werkzeug-Attribution in Commits/Code/Doku — Constraint
      durchgaengig, in Task-14-Verify ueberprueft.
- [x] Kein Vendoring — Tailwind via `devDependencies`, Logo bleibt CDN,
      keine fremden Libraries als Lokal-Kopien — Constraint durchgaengig.
- [x] HC-Toggle-Knopf NICHT im DS (Decision 5) — Task 10 liefert nur
      Variant + Overrides; Doku-Snippet im MIGRATION.md (Task 13).
- [x] `--gat-color-hellgruen` `#56af31` -> `#3e8a25` (Decision 5) — Task 3.
- [x] Befund F (Pill-Blocker) ist Folge-Issue im gemeindefinanzen-Repo
      (CONTEXT.md Deferred) — DS liefert `.gat-tag` in Task 8.
- [x] gemeindefinanzen-Migration weg von `--web-*` ist Folge-Issue im
      gemeindefinanzen-Repo (CONTEXT.md Deferred) — nicht im 2.0-Scope.
</success_criteria>

<open_questions>
Keine offenen Fragen. Alle Researcher-Folgefragen sind durch CONTEXT.md
Decision 5 entschieden:

- Hellgruen-Wert: **`#3e8a25`** (Task 3).
- Tableiste/Umschalter: **im 2.0-Scope** als `.gat-tab*` / `.gat-switch*`
  (Task 9).
- Built CSS commit + CI-Drift-Guard: **ja** (Task 1).
- HC-Toggle-Knopf: **nicht im DS**, Konsumenten-Sache (Task 10 +
  MIGRATION.md-Snippet in Task 13).

Hinweis fuer Executor: die Pages-Workflow `path:`- und `working-directory:`-
Einstellungen in Task 1 sind situationsabhaengig (Repo-Layout). Erste
Verifikation: `git remote -v` in der DS-Repo-Wurzel und der Pfad zur
heutigen `design-system.css` bestimmen die richtigen Werte. Default-
Empfehlung (Task 1): `path: '.'`, kein `working-directory`.
</open_questions>
