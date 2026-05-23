# Research: Rueckflusskandidaten aus gemeindefinanzen-Web-Adaption (Iter 1-18) — v2.0

**Researched:** 2026-05-23
**Issue:** cjpfs-rueckflusskandidaten-aus-gemeindefinanzen-web-adaption-iter-1-18
**Repo:** grueneat/design-system at /workspace/design-system/design-system/
**Confidence:** HIGH overall

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

1. **Token-Strategie: parallele `--gat-web-*`-Schicht (additiv).** Bestehende
   `--gat-*`-Token bleiben **unveraendert**. Web-taugliche, entsaettigte Werte
   ziehen unter `--gat-web-*` ein — Konsumenten waehlen die Schicht. Konkret:
   `--web-bg/surface/text/...` -> `--gat-web-bg/surface/text/...`;
   8-Ton-Chart-Palette -> `--gat-web-chart-1` … `-8`. **Keine** Umbenennung der
   `--gat-color-primary`/`--gat-color-dunkelgruen` in dieser Welle.
2. **Komponenten im DS-Namespace `.gat-*`** (nicht `.web-*`):
   `.web-panel` -> `.gat-panel` (mit `__head`/`__head-row`/`__body`/`__body--table`/`__note`);
   `.metric-card` -> `.gat-metric-card` (mit `--ertrag`/`--aufwand`/`--netto`/`--hero`);
   `.web-brandbar` -> `.gat-header` im weissen gruene.at-Muster ueberarbeitet;
   `.web-callout` -> `.gat-callout`; `.web-section-head` -> `.gat-section-head`;
   `.web-hero` -> `.gat-hero`.
3. **SemVer 2.0-Release direkt aus diesem Issue** mit `v2.0.0`-Tag und
   veroeffentlichtem Stylesheet. Breaking-Changes in einer Welle:
   Tailwind-Build statt statischem CSS, Token in `@theme` statt `:root`-Block
   (Aufruf gleich), AA-Haertung bestehender Werte, Header-Umbau
   (Dunkelgruen-Block -> weisse Brandbar), Headline-Skala beruhigt.
   Migration in `CHANGELOG.md` + `MIGRATION.md`; `--gat-*`-Namen bleiben
   **wo immer moeglich** stabil, nur Werte aendern sich.
4. **Volles 2.0-Programm in einem Issue:** Tailwind-v4-Setup, Token-Migration
   in `@theme`, volle `.gat-*`-Komponenten-Suite, `.gat-mode-hc:`-Variant,
   Skip-Link, Fixed-Header-Konventionen, `hyphens: auto`, Headline-Skala,
   Tableiste/Umschalter-Mindestgroessen, AA-Haertung, reduced-motion +
   `:focus-visible` + `@media print`, Chart-Palette als `gat-charts.js`-ES-
   Modul auf GitHub Pages, Brandbar/Hero/Section-Head/Callout/Panel/Metric-
   Card. Output: Tailwind-v4-getriebenes 2.0-Release + gerendertes
   `design-system.css` + Style-Guide-Update + `MIGRATION.md`.

### Claude's Discretion

- **Chart-Palette-Auslieferung** — Vorab-Tendenz Option (a) bestaetigt:
  `gat-charts.js`-ES-Modul auf GitHub Pages. Begruendung in Abschnitt 6.
- **Reihenfolge der Folge-Issues** — Da v2.0 in einem Issue erledigt wird,
  ist das eine Task-Reihenfolge innerhalb dieses Issues. Empfohlene Sequenz
  in Abschnitt 11.
- **Naming `.gat-tag` vs. `.gat-pill`** — Empfehlung in Abschnitt 8.
- **Welche `--gat-*`-Werte sind 2.0-Breaking-Kandidaten?** Vollstaendige
  AA-Messung mit Vorher/Nachher in Abschnitt 4.

### Deferred Ideas (OUT OF SCOPE)

- gemeindefinanzen-Migration weg von `--web-*` -> separates Folge-Issue im
  gemeindefinanzen-Repo, nachdem DS die `--gat-web-*`-Schicht ausgeliefert hat.
- Magenta-CTAs und vollflaechige Knall-Baender aus gruene.at — bewusst nicht
  uebernommen, nicht erneut diskutieren.
- Logo-Vendoring — bleibt unter
  `grueneat.github.io/design-system/assets/gruene-logo.svg` (heute schon).
- Sub-Issues fuer multi-app-Migration — Sache der jeweiligen App-Repos.
- Befund F (Pill-Blocker in gemeindefinanzen wegen `dashboard.js`) — bleibt
  Folge-Issue im gemeindefinanzen-Repo. DS liefert `.gat-tag`, die Anwendung
  passt im gemeindefinanzen-Repo an.
</user_constraints>

## Summary

Das design-system-Repo ist heute eine kleine, gut geordnete statische Site:
**ein** hand-geschriebenes `design-system.css` (429 Zeilen, `--gat-*`-Token
im `:root`-Block, `.gat-*`-Komponenten), ein Style-Guide `index.html`, ein
Minimal-Beispiel und eine triviale GitHub-Actions-Workflow, die einfach den
gesamten Repo-Inhalt nach Pages hochlaedt. Keinerlei Build, keinerlei
Node-Abhaengigkeiten. Im gemeindefinanzen-Repo („das Labor") hat eine
18-Iterations-Welle eine vollstaendige web-taugliche Auslegung erprobt —
entsaettigte Token, Komponenten, Tableisten, Vollbild-Pattern,
Druck-Stylesheet, A11y-Haertung, Chart-Helfer. **Die ganze Welle fliesst
jetzt zurueck als 2.0-Release.**

Drei zentrale Befunde fuer den Planner:

1. **Tailwind v4 ist die natuerliche Wahl** als Build-Schicht. v4.3.0 ist
   stabil (Release 2026-05-08, v4.0 GA 2025-01-21 — also ueber ein Jahr alt),
   das `@theme`-Pattern emittiert Tokens automatisch als CSS-Custom-Properties
   unter `:root`, und Tailwind-`@custom-variant` loest `.gat-mode-hc:`
   nativ. **Konsumenten merken nichts:** die gehostete URL
   `https://grueneat.github.io/design-system/design-system.css` bleibt
   identisch, der `<link>`-Aufruf in jedem konsumierenden Tool bleibt
   unveraendert.

2. **AA-Haertung ist klein und gezielt:** nur **zwei** Token-Wert-Aenderungen
   sind noetig, die anderen Marken-Token bestehen heute bereits. Details mit
   Messwerten in Abschnitt 4. Saemtliche `--gat-color-*`-Klassennamen bleiben,
   nur ein Wert wird in 2.0 angepasst (`--gat-color-hellgruen`).

3. **„Kein Vendoring" + „kein Tool-Attribution" sind die haerteste
   Architektur-Constraint.** Workspace-CLAUDE.md verbietet jegliches
   Vendoring (Source: `/workspace/CLAUDE.md:8-31`, HIGH). Es gibt **keine
   Regel** im design-system-Repo, die einen Build-Schritt verbietet — die
   „kein Build" Regel steht ausschliesslich in `/workspace/gemeindefinanzen/
   CLAUDE.md` und gilt nur fuer **die gemeindefinanzen-App**, nicht fuer das
   DS. Tailwind als devDependency in `package.json` ist daher konform: nichts
   wird vendorisiert (Tailwind wird per npm install in CI gezogen), der
   gehostete Output (`design-system.css`, statisch) bleibt eine reine CSS-Datei
   ohne Laufzeit-Abhaengigkeiten.

**Primary recommendation:** **Tailwind v4.3 als Build-Schritt in CI, Token
in `@theme`, `@custom-variant gat-mode-hc` fuer A11y, gat-charts.js als
ES-Modul ueber dieselbe Pages-Root, AA-Haertung mit dem minimalen
Token-Delta aus Abschnitt 4.** Konsumenten brechen nicht — gleicher
`<link>`, gleiche Klassennamen-Stabilitaet wo immer moeglich, nur
Wert-Aenderungen + neue additive `--gat-web-*`-Schicht. Headerumbau ist die
einzige sichtbare Optik-Aenderung (Dunkelgruen-Block -> weisse Brandbar)
und wird in `MIGRATION.md` mit Vorher/Nachher dokumentiert.

## Project Constraints (from CLAUDE.md)

Quelle: `/workspace/CLAUDE.md:1-42`, HIGH. Kein separates DS-Repo-CLAUDE.md.

- **Kein Vendoring von Drittabhaengigkeiten in keinem Repo.** Tailwind, GSAP,
  Swiper, ECharts, Schriften, Logos: per CDN oder per Package Manager, nie
  ins Repo kopieren. Verboten: `vendor/`-Verzeichnisse fuer fremde Libraries
  neu anlegen, lokale Kopien von ECharts/Tailwind, Logos in Konsumenten
  kopieren wenn unter `grueneat.github.io/design-system/assets/...`
  verfuegbar, „Offline-Builds", „voruebergehendes Vendoring".
- **Erlaubt:** `<script src="https://cdn.jsdelivr.net/...">`,
  `<link href="https://grueneat.github.io/design-system/design-system.css">`,
  `dependencies`/`devDependencies` in `package.json`, gehostete Assets
  verlinken statt kopieren.
- **Es gibt kein Offline-Ziel.** Apps duerfen eine Internetverbindung
  voraussetzen.
- **Keine Werkzeug-Attribution.** Keine „claude"-Spuren, kein „Generated
  with", kein `Co-Authored-By` in Commits/Code/Kommentaren/Doku/Tests.

**Interpretation fuer dieses Issue:**
- Tailwind als devDependency in `package.json` ist **NICHT Vendoring** (es ist
  Package Manager — explizit erlaubt, siehe oben).
- Der gerenderte `design-system.css`-Output ist eine **statische Datei**, kein
  vendorisierter Drittcode — der ist die eigentliche Library, die das Repo
  veroeffentlicht. Konform.
- `gat-charts.js` ES-Modul wird vom DS selbst veroeffentlicht (eigener Code,
  liegt unter `design-system/gat-charts.js` neben `design-system.css`) — nicht
  vendorisiert sondern eigene Quelle.
- Das gruene-Logo bleibt unter `assets/gruene-logo.svg` im DS-Repo (das DS
  *ist* die kanonische Quelle; Konsumenten verlinken die gehostete URL und
  duerfen die Datei nicht ins eigene Repo kopieren).

## Codebase Analysis

### Relevant Files

| File | Purpose | LOC | Relevance |
|------|---------|-----|-----------|
| `/workspace/design-system/design-system/design-system.css` | Token + Komponenten (heute hand-geschrieben) | 429 | KERN — wird komplett auf Tailwind-Build umgebaut |
| `/workspace/design-system/design-system/index.html` | Style-Guide / Showcase | 1314 | Wird auf neue Komponenten erweitert (alle `.gat-*` neu) |
| `/workspace/design-system/design-system/examples/minimal.html` | Konsumenten-Referenz | 87 | Aktualisierung: Brandbar (weiss), neue Beispiele |
| `/workspace/design-system/design-system/README.md` | Einbindungs-Anleitung | 65 | Ergaenzung: Contributor-Build-Anleitung (npm); Einbindung bleibt CDN |
| `/workspace/design-system/design-system/CHANGELOG.md` | Aenderungsprotokoll | 30 | Neuer `[2.0.0]`-Eintrag mit Breaking-Changes-Liste |
| `/workspace/design-system/design-system/.github/workflows/pages.yml` | Pages-Deploy | 39 | Wird umgebaut: `npm ci` + Tailwind-Build vor Upload |
| `/workspace/design-system/design-system/assets/gruene-logo.svg` | Vollfarbiges Logo | binary | Bleibt; wird in neuer `.gat-header` `<img>` referenziert |
| **Neu:** `/workspace/design-system/design-system/package.json` | Build-Manifest | — | Devdeps: `tailwindcss@^4.3`, `@tailwindcss/cli@^4.3` |
| **Neu:** `/workspace/design-system/design-system/src/design-system.css` | Tailwind-Eingang | — | `@import "tailwindcss"; @theme {...} @custom-variant gat-mode-hc (...); /* components */` |
| **Neu:** `/workspace/design-system/design-system/gat-charts.js` | Chart-Palette + Helfer als ES-Modul | — | Wird gehostet ueber Pages; Konsumenten importieren via CDN |
| **Neu:** `/workspace/design-system/design-system/MIGRATION.md` | v1 -> v2-Migrationsanleitung | — | Konsumenten lesen das einmal beim Tag |
| `/workspace/gemeindefinanzen/web/css/app.css` | Quell-CSS der gemeindefinanzen-Welle | 1199 | LESEN: vollstaendige Komponenten-CSS, AA-Notes, Print, Reduced-Motion, Fokus-Block (Zeilen referenziert unten) |
| `/workspace/gemeindefinanzen/docs/web-design-system.md` | 18-Iter-Designlog | 894 | LESEN: pro Iteration Begruendung + visueller Befund |

### Interfaces

<interfaces>
// ============================================================
// === CURRENT DS — what stays, what changes ==================
// ============================================================

// From /workspace/design-system/design-system/design-system.css:28-124
// :root token block. Today hand-written; v2.0 moves these into @theme.
// Names that MUST stay stable in 2.0 (consumers reference them):
:root {
  --gat-color-dunkelgruen: #257639;     // STAYS (5.63 on white — AA OK)
  --gat-color-hellgruen:   #56af31;     // VALUE CHANGES in 2.0 — fails AA (2.77)
  --gat-color-gelb:        #ffed00;     // STAYS (13.96 against anthrazit)
  --gat-color-magenta:     #e6007e;     // STAYS (4.50 on white — borderline)
  --gat-color-weiss:       #ffffff;     // STAYS
  --gat-color-anthrazit:   #1d1d1b;     // STAYS

  --gat-color-primary:     var(--gat-color-dunkelgruen);    // STAYS
  --gat-color-secondary:   var(--gat-color-hellgruen);      // STAYS (alias)
  --gat-color-accent:      var(--gat-color-magenta);        // STAYS
  --gat-color-highlight:   var(--gat-color-gelb);           // STAYS
  --gat-color-text:        var(--gat-color-anthrazit);      // STAYS
  --gat-color-surface:     var(--gat-color-weiss);          // STAYS
  --gat-color-on-primary:  var(--gat-color-weiss);          // STAYS
  --gat-color-on-secondary:var(--gat-color-anthrazit);      // STAYS

  --gat-font-headline:     'Barlow Semi Condensed', sans-serif;  // STAYS
  --gat-font-copy:         'Barlow Semi Condensed', sans-serif;  // STAYS
  --gat-font-emphasis:     'Vollkorn', serif;                    // STAYS

  --gat-text-h1:           2.441rem;    // STAYS
  --gat-text-h2:           1.953rem;    // STAYS
  --gat-text-h3:           1.563rem;    // STAYS
  --gat-text-subline:      1.25rem;     // STAYS
  --gat-text-copy:         1rem;        // STAYS
  --gat-text-small:        0.8rem;      // STAYS

  --gat-leading-headline:  0.9;         // STAYS
  --gat-leading-copy:      1.3;         // STAYS

  --gat-space-1:           0.25rem;     // STAYS
  --gat-space-2:           0.5rem;      // STAYS
  --gat-space-3:           1rem;        // STAYS
  --gat-space-4:           1.5rem;      // STAYS
  --gat-space-5:           2rem;        // STAYS
  --gat-space-6:           3rem;        // STAYS

  --gat-radius-sm:         0.25rem;     // STAYS
  --gat-radius-md:         0.5rem;      // STAYS
  --gat-border-width:      2px;         // STAYS
  --gat-container-max:     72rem;       // STAYS

  --gat-breakpoint-sm:     36rem;       // STAYS (doc-only)
  --gat-breakpoint-md:     48rem;       // STAYS (doc-only)
}

// From /workspace/design-system/design-system/design-system.css:138-429
// Component classes today. Names that MUST stay stable in 2.0:
.gat-container { /* STAYS */ }
.gat-grid, .gat-grid--2, .gat-grid--3 { /* STAYS */ }
.gat-section { /* STAYS */ }
.gat-header { /* VALUE CHANGES — weisse Brandbar (Section 5) */ }
.gat-header__inner { /* STAYS structurally */ }
.gat-header__logo { /* STAYS */ }
.gat-header__logo-mark { /* DEPRECATED — replaced by <img> src */ }
.gat-nav, .gat-nav__link, .gat-nav__link--active { /* STAYS */ }
.gat-headline, .gat-subline, .gat-fliesstext, .gat-emphasis { /* STAYS, with quieter weights */ }
.gat-btn, .gat-btn--primary, .gat-btn--secondary { /* STAYS */ }
.gat-card, .gat-card--primary, .gat-card--secondary { /* STAYS */ }
.gat-card__title, .gat-card__body { /* STAYS */ }
.gat-underline { /* STAYS */ }
.gat-highlight { /* STAYS */ }
.gat-stoerer, .gat-stoerer--gelb, .gat-stoerer--magenta { /* STAYS */ }

// ============================================================
// === NEW v2.0 SURFACE ======================================
// ============================================================

// New web layer tokens (--gat-web-*). All NEW, additive.
// Derived from /workspace/gemeindefinanzen/web/css/app.css:24-66.
:root {
  --gat-web-bg:           #f3f5f0;  // weich gruenstichig
  --gat-web-surface:      #ffffff;
  --gat-web-surface-sunk: #f7f9f4;
  --gat-web-hairline:     #e1e4db;
  --gat-web-shadow:       0 1px 2px rgba(31,38,28,.05),
                          0 4px 14px rgba(31,38,28,.05);
  --gat-web-text:         #23271f;
  --gat-web-text-soft:    #5e6358;  // 5.62 on bg / 6.17 on surface (AA)
  --gat-web-text-mute:    #6b6f63;  // 4.69 on bg / 5.15 on surface (AA)
  --gat-web-clay-text:    #9c5a38;  // 5.34 on white (AA)
  --gat-web-green-deep:   #2c6e40;  // entsaettigt
  --gat-web-green:        #4a8a52;
  --gat-web-green-tint:   #e7efe3;
  --gat-web-yellow:       #ecd64a;
  --gat-web-page-max:     min(2040px, 94vw);
  --gat-web-radius-control: 6px;
  --gat-web-radius-card:    10px;
  --gat-web-focus-ring:   0 0 0 3px color-mix(in srgb,
                                              var(--gat-web-green) 38%,
                                              transparent);
  --gat-web-focus-offset: 2px;  // negative override on flush elements

  // 8-tone chart palette (kategorial, niedrige Saettigung)
  --gat-web-chart-1: #3f7d4f;  // Ertraege / positiv
  --gat-web-chart-2: #6ba368;  // Personal-Alt
  --gat-web-chart-3: #4f93a0;  // Personal / neutral-kuehl
  --gat-web-chart-4: #c9a24b;  // Sachaufwand
  --gat-web-chart-5: #b9744f;  // Aufwand / Risiko (clay, replaces magenta)
  --gat-web-chart-6: #9c5b7d;  // Transfers (entsaettigt aus magenta)
  --gat-web-chart-7: #5d6b8a;  // Nettoergebnis / Vergleich
  --gat-web-chart-8: #8a8f7d;  // Sonstige
}

// New components (all NEW, additive).
// Mapped from .web-* in /workspace/gemeindefinanzen/web/css/app.css per
// Section 5 of this research.
.gat-panel { /* + __head, __head-row, __body, __body--table, __note */ }
.gat-metric-card { /* + --ertrag, --aufwand, --netto, --hero */ }
.gat-callout
.gat-section-head { /* + h2/p children */ }
.gat-hero { /* + __title, __intro */ }
.gat-skiplink
.gat-tag { /* + --pflicht, --neutral, --info, --risiko */ }

// New Tailwind custom variant — see Section 7
@custom-variant gat-mode-hc (&:where(.gat-mode-hc, .gat-mode-hc *));

// ============================================================
// === gat-charts.js ES module surface (NEW, hosted via Pages)
// ============================================================

// File: /workspace/design-system/design-system/gat-charts.js
// Imported by consumers via CDN:
//   import { PALETTE, INK, LABEL_SIZE, AXIS_SIZE,
//            BAR_MAX_DICHT, BAR_MAX_WEIT,
//            tip, legende, grid, planIstLegende }
//     from 'https://grueneat.github.io/design-system/gat-charts.js';

// Exports — verified against /workspace/gemeindefinanzen/web/js/
// dashboard-charts.js (LABEL_SIZE/AXIS_SIZE/BAR_MAX_*, tip/legende/grid
// per iter-10/16/17):
export const PALETTE: string[];                  // 8 chart hex values
export const INK: {                              // text/grid colors
  text: string; soft: string; mute: string;
  hairline: string; gridline: string; axis: string;
  green: string; clay: string; slate: string;
};
export const LABEL_SIZE: number;                 // 15 — axes, legend, tooltip, datalabels
export const AXIS_SIZE: number;                  // 14 — value axis
export const BAR_MAX_DICHT: number;              // 56 — dense category lists
export const BAR_MAX_WEIT: number;               // 130 — sparse charts (Wasserfall, Trend)
export const VA_DECAL: object;                   // ECharts decal pattern for plan-bars
export function tip(extra?: object): object;     // tooltip-styling preset
export function legende(extra?: object): object; // legend-styling preset
export function grid(extra?: object): object;    // grid-margins preset
export function planIstLegende(): object[];      // empty helper series for VA/RA legend

// ============================================================
// === Build manifest (NEW) ==================================
// ============================================================

// File: /workspace/design-system/design-system/package.json
{
  "name": "design-system",
  "version": "2.0.0",
  "private": true,
  "scripts": {
    "build": "tailwindcss -i ./src/design-system.css -o ./design-system.css --minify",
    "watch": "tailwindcss -i ./src/design-system.css -o ./design-system.css --watch"
  },
  "devDependencies": {
    "tailwindcss":       "^4.3.0",
    "@tailwindcss/cli":  "^4.3.0"
  }
}

// File: /workspace/design-system/design-system/src/design-system.css
// (Tailwind v4 entry — see Section 2 for full structure)
@import "tailwindcss";
@theme { /* all --gat-* and --gat-web-* tokens */ }
@custom-variant gat-mode-hc (&:where(.gat-mode-hc, .gat-mode-hc *));
/* Component CSS layer — Section 5 */
</interfaces>

### Reusable Components

- **Already in DS, keep as-is:** `.gat-container`, `.gat-grid*`, `.gat-section`,
  `.gat-nav*`, `.gat-headline`/`.gat-subline`/`.gat-fliesstext`/`.gat-emphasis`,
  `.gat-btn*`, `.gat-card*`, `.gat-underline`, `.gat-highlight`,
  `.gat-stoerer*`. **Werte koennen wandern (Headline-Gewicht), Namen
  bleiben.**
- **Logo:** `assets/gruene-logo.svg` (vollfarbig, 150x132, bereits 16 KB) —
  zukuenftig direkt als `<img>` referenziert statt CSS-Mask.
- **Aus dem gemeindefinanzen-Labor uebernehmbare CSS-Bloecke (full source
  available):**
  - Metric-Card (app.css:308-395) -> `.gat-metric-card`
  - Web-Panel (app.css:397-557) -> `.gat-panel` (alle Modifier, inkl. fullscreen)
  - Brandbar (app.css:232-306) -> neuer `.gat-header` Body
  - Section-Head (app.css:559-572) -> `.gat-section-head`
  - Callout (app.css:574-582 + die `mark-*`-Bloecke) -> `.gat-callout`
  - Hero (app.css:186-202) -> `.gat-hero`
  - Focus-Visible Block (app.css:685-727) -> `.gat-*:focus-visible`-Regeln
  - Prefers-reduced-motion (app.css:1099-1110) -> 1:1 uebernehmbar
  - @media print (app.css:1121-1199) -> 1:1 uebernehmbar mit Klassen-Rename
- **Chart-Helfer:** dashboard-charts.js `tip()`/`legende()`/`grid()`/
  `LABEL_SIZE`/`AXIS_SIZE`/`BAR_MAX_*`/`VA_DECAL`/`planIstLegende()` aus
  `/workspace/gemeindefinanzen/web/js/dashboard-charts.js` — neutralisiert
  und nach `/workspace/design-system/design-system/gat-charts.js`.

### Potential Conflicts

1. **Headline-Skala vs. existierende `.gat-headline` Konsumenten.** Heute
   `font-weight: 900`; die neue Skala `h1: 800, h2/h3: 700`. Konsumenten,
   die `.gat-headline` als h1-Ersatz nutzen, sehen einen leichteren
   Schriftschnitt. **Acceptable** (Teil der 2.0-Welle, in MIGRATION.md
   dokumentiert). Im Labor visuell bestaetigt (gemeindefinanzen Iter 2:
   „deutlich ruhiger, weniger schreiend").
2. **`.gat-header` Optik.** Today: Dunkelgruen-Block. New: weisse Brandbar
   mit gruener Akzentlinie + Logo `<img>` statt CSS-Mask. **Breaking**
   (in MIGRATION.md). Alle Klassennamen bleiben, nur Optik schwingt um.
3. **`.gat-header__logo-mark` CSS-Mask.** Heute monochrom auf Dunkelgruen.
   Mit weisser Brandbar nicht mehr brauchbar (Logo waere unsichtbar). Mark
   bleibt definiert fuer optionalen Dunkelgruen-Header-Modifier (siehe
   `.gat-header--dunkel`, Abschnitt 5), aber Default-Header nutzt `<img>`.
4. **Konsumenten, die selbst `--gat-*`-Token im CSS verwenden.** Heute legt
   das DS Tokens im `:root` an; Tailwind v4 `@theme` emittiert sie ebenfalls
   nach `:root` (verifiziert, Tailwind-Doku, HIGH). Kein Bruch.
5. **Konsumenten, die heute keinen Pages-Build erwarten.** Sie verlinken
   die fertige `design-system.css`-URL. Diese bleibt veroeffentlicht — der
   Build erzeugt sie nur jetzt in CI statt sie hand-zu-pflegen. Kein Bruch.
6. **gemeindefinanzen-Repo lokale `--web-*`-Schicht.** Sie bleibt nach
   v2.0-Tag noch eine Weile parallel zu `--gat-web-*` aktiv — die Migration
   ist explizit „Deferred" (CONTEXT.md). Kein Konflikt jetzt.

### Code Patterns in Use

- **Single-class `.gat-*` selectors only.** Keine nackten Tag-Selektoren
  (`body`, `h1`), keine Verschachtelung tiefer als ein BEM-Modifier. Das
  DS-CSS faerbt nichts ausserhalb seiner eigenen Klassen — Konsumenten muessen
  ihr Body-Grundlayout selbst setzen (Quelle: README.md:22-35, HIGH).
  **Diese Regel bleibt in 2.0 verbindlich** — sie laesst Konsumenten ihre
  eigenen Body-Stile setzen, und sie sorgt dafuer, dass der DS-Build keine
  Defaults „kapert".
- **Tokens uebersetzt, nicht magisch.** Heute jeder Wert verweist auf ein
  `--gat-*`-Token. Diese Regel bleibt: in `@theme` definierte Tokens
  emittieren Tailwind sowohl als CSS-Custom-Property als auch als Utility-
  Klasse — der hand-geschriebene Komponenten-Layer referenziert die
  Properties direkt (nicht die Utilities), damit Konsumenten weiterhin nur
  `<link>` + Klassen brauchen.
- **CC BY 4.0 Lizenz, einmal im Header-Kommentar der CSS-Datei.** Bleibt
  in 2.0 unveraendert (`design-system.css:14-16`, HIGH).

## Standard Stack

| Library | Version | Purpose | Why Standard | Confidence |
|---------|---------|---------|--------------|------------|
| `tailwindcss` | `^4.3.0` | Build-Schicht: `@theme`-Token-Definition, `@custom-variant`-System, optionale Utilities | v4.3 ist die latest stable (Release 2026-05-08, npm verifiziert); v4.0 GA 2025-01-21 ist 16+ Monate alt — produktionsreif | HIGH (npm view, Tailwind v4 docs) |
| `@tailwindcss/cli` | `^4.3.0` | CLI-Build (`tailwindcss -i src/x.css -o dist.css`) | Empfohlener Build-Pfad fuer statische Sites ohne PostCSS-Pipeline (Quelle: tailwindcss.com/docs/installation/tailwind-cli) | HIGH |
| Node.js | `>=20` (LTS) | Build-Laufzeit in CI | GitHub Actions `actions/setup-node@v4` Standard; `@tailwindcss/cli` lauft auf 20+ | HIGH |
| `actions/setup-node@v4` | latest | Node-Setup in Pages-Workflow | Standard GitHub Action | HIGH |
| `actions/checkout@v6` | bereits genutzt | Repo-Checkout | bereits in `.github/workflows/pages.yml:26` | HIGH |
| `actions/configure-pages@v6` | bereits genutzt | Pages-Config | bereits in workflow | HIGH |
| `actions/upload-pages-artifact@v5` | bereits genutzt | Pages-Upload | bereits in workflow | HIGH |
| `actions/deploy-pages@v5` | bereits genutzt | Pages-Deploy | bereits in workflow | HIGH |

**Verifizierte Versionsangaben (`npm view tailwindcss version`):** `4.3.0`,
modified 2026-05-23 (heute). `npm view @tailwindcss/cli version`: `4.3.0`.

**Alternatives Considered:**

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Tailwind v4 + CLI | Tailwind v4 + PostCSS Plugin | PostCSS bringt eine extra Config-Datei + Plugin-Chain; CLI ist direkter fuer einen reinen Token-Bundle ohne JS-Framework-Toolchain. CLI gewinnt fuer reine CSS-Generierung. |
| Tailwind v4 | Tailwind v3 | v3 hat `tailwind.config.js` mit JS-Theme statt CSS-`@theme` — fuer ein Token-zentriertes DS ist v4 das natuerlichere Modell. v3 hat **kein** `@custom-variant`, der saubere `.gat-mode-hc:`-Loesungspfad braucht v4. |
| Tailwind | Lightning CSS / PostCSS-Preset-Env standalone | Liefert keine Variant-Engine. `.gat-mode-hc:`-Pattern muesste hand-gestrickt werden (Abschnitt 7 Option (a) aus der gruene.at-Analyse — funktioniert, ist aber strikt weniger sauber). |
| Tailwind | Bleiben bei hand-geschriebenem CSS (status quo) | Verliert die Tailwind-Benefits, die das ganze 2.0-Programm motivieren (gruene.at-Stack-Mirror, Variant-System fuer A11y, automatische `:root`-Emittierung der Tokens). Status quo wurde in CONTEXT.md verworfen. |
| Tailwind CLI build im Repo | Build in einem externen Service / pre-rendered Pages | Mehr Beweglichkeit, keine GitHub-Action-Aenderung — aber bricht „DS-Repo ist seine eigene Build-Quelle". CI-Build ist transparenter. |
| `gat-charts.js` ES-Modul | Reine Hex-Konstanten-Doku, jede App kopiert | Garantiert Drift (drei Tools wuerden die 8 Hex-Werte aus dem Gedaechtnis abtippen). Modul ist die saubere Quelle der Wahrheit. |
| `gat-charts.js` ES-Modul | npm package `@grueneat/design-charts` | Mehr Infrastruktur (Publish-Workflow). Pages-gehostetes ES-Modul ist einfacher fuer den Stand der Konsumenten (alle nutzen vanilla ESM heute). Wir haben kein npm-Publish-Setup. |

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| CSS-Variant fuer A11y-Mode | Manuelles Duplizieren aller Komponenten in `.gat-mode-hc .gat-card` etc. | `@custom-variant gat-mode-hc (...)` (Tailwind v4) | 1 Definition + Konsumenten schreiben `gat-mode-hc:bg-yellow`. Sauber, gruene.at-Pattern-konform. (Quelle: tailwindcss.com/docs/adding-custom-styles, HIGH) |
| Tokens als JS-Objekt fuer Charts | JS-Konstanten in jeder Konsumer-App kopieren | `gat-charts.js` ES-Modul via Pages | ECharts liest kein CSS; ein gehostetes ES-Modul ist die einzige nicht-Drift-Loesung. |
| Skip-Link Pattern | Custom `position: fixed; transform; opacity; on focus` | `<a class="gat-skiplink" href="#main">` mit der CSS-Idiom aus gruene.at (Abschnitt 8) | gruene.at-Pattern ist Standard. |
| Reduced-Motion-Handhabung | Per-Komponente `transition: none` Overrides | Globaler `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition-duration: 0.01ms !important; ... } }` Block | Quelle: app.css:1099-1110, im Labor visuell bestaetigt |
| Focus-Visible Ring | Pro-Komponente Outline-CSS | Gemeinsamer Selector-Sammelblock + `--gat-web-focus-ring`/`--gat-web-focus-offset` Tokens | Quelle: app.css:685-727 |
| Druck-Stylesheet | Selten und hand-gestrickt | Block aus app.css:1121-1199 mit Klassen-Rename uebernehmen (Bedienelemente aus, Karten/Panels ohne Schatten, `break-inside: avoid`, Sankey-Hoehe gekappt) | im Labor visuell bestaetigt |
| Chart-Tooltip-Styling | Per-Chart-Optionen | `tip()`-Helfer im ES-Modul | Iter 7: einheitlicher Tooltip uber alle Builder |
| Fullscreen-API Wiring | Custom Resize-Logik | Pattern aus app.css:475-552 + JS in `app.js`/`verdrahteVollbild()` (gemeindefinanzen) | Iter 18 hat ECharts-Resize ueber Window-Event geloest |

## Architecture Patterns

### Recommended Approach (Build Pipeline + Source Layout)

**Verzeichnislayout fuer das DS-Repo nach v2.0:**

```
design-system/                          # repo root
├── package.json                        # NEU — tailwindcss devdeps
├── package-lock.json                   # NEU — committed
├── .github/workflows/pages.yml         # angepasst (siehe unten)
├── src/
│   └── design-system.css               # NEU — Tailwind-Eingang
├── design-system.css                   # GENERIERT — gebauter Output
├── index.html                          # erweitert — neue .gat-* Komponenten
├── examples/
│   └── minimal.html                    # angepasst — weisse Brandbar
├── assets/
│   └── gruene-logo.svg                 # bleibt
├── gat-charts.js                       # NEU — ES-Modul fuer Charts
├── README.md                           # erweitert
├── CHANGELOG.md                        # neuer [2.0.0]-Eintrag
├── MIGRATION.md                        # NEU
└── LICENSE
```

**`src/design-system.css` Aufbau:**

```css
/* Header-Kommentar (Lizenz, kanonische URL) — UNCHANGED */
@import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,900&family=Vollkorn:ital,wght@0,400;0,900&display=swap');

@import "tailwindcss";

@theme {
  /* --- existierende --gat-*-Marken-Tokens (Werte) --- */
  --color-gat-dunkelgruen: #257639;
  --color-gat-hellgruen:   #3e8a25;   /* GEAENDERT — siehe Section 4 */
  --color-gat-gelb:        #ffed00;
  --color-gat-magenta:     #e6007e;
  --color-gat-weiss:       #ffffff;
  --color-gat-anthrazit:   #1d1d1b;
  /* --gat-color-*-Aliase als reine CSS-Variablen (kein Tailwind-Utility): */
  /* siehe unten in @layer base */

  /* --- neue --gat-web-*-Schicht (Werte) --- */
  --color-gat-web-bg:           #f3f5f0;
  --color-gat-web-surface:      #ffffff;
  --color-gat-web-surface-sunk: #f7f9f4;
  --color-gat-web-text:         #23271f;
  --color-gat-web-text-soft:    #5e6358;
  --color-gat-web-text-mute:    #6b6f63;
  --color-gat-web-clay-text:    #9c5a38;
  --color-gat-web-green-deep:   #2c6e40;
  --color-gat-web-green:        #4a8a52;
  --color-gat-web-green-tint:   #e7efe3;
  --color-gat-web-yellow:       #ecd64a;
  --color-gat-web-hairline:     #e1e4db;

  /* Chart-Palette */
  --color-gat-web-chart-1: #3f7d4f;
  --color-gat-web-chart-2: #6ba368;
  --color-gat-web-chart-3: #4f93a0;
  --color-gat-web-chart-4: #c9a24b;
  --color-gat-web-chart-5: #b9744f;
  --color-gat-web-chart-6: #9c5b7d;
  --color-gat-web-chart-7: #5d6b8a;
  --color-gat-web-chart-8: #8a8f7d;

  /* Spacing — bestehende Skala UND web-spezifisch */
  --spacing-gat-1: 0.25rem;
  --spacing-gat-2: 0.5rem;
  --spacing-gat-3: 1rem;
  --spacing-gat-4: 1.5rem;
  --spacing-gat-5: 2rem;
  --spacing-gat-6: 3rem;

  --radius-gat-sm:     0.25rem;
  --radius-gat-md:     0.5rem;
  --radius-gat-web-control: 6px;
  --radius-gat-web-card:    10px;

  /* Schrift */
  --font-gat-headline: 'Barlow Semi Condensed', sans-serif;
  --font-gat-copy:     'Barlow Semi Condensed', sans-serif;
  --font-gat-emphasis: 'Vollkorn', serif;

  /* Text-Skala (--text-* Tailwind-Namespace) */
  --text-gat-h1:      2.441rem;
  --text-gat-h2:      1.953rem;
  --text-gat-h3:      1.563rem;
  --text-gat-subline: 1.25rem;
  --text-gat-copy:    1rem;
  --text-gat-small:   0.8rem;
}

@custom-variant gat-mode-hc (&:where(.gat-mode-hc, .gat-mode-hc *));

/* Konsumenten-stabile Aliase (alte Namen weiter verfuegbar). Tailwind
   emittiert die @theme-Tokens unter den --color-gat-* Namen; wir spiegeln
   sie auf die bestehenden --gat-color-* / --gat-space-* Aliase. */
@layer base {
  :root {
    --gat-color-dunkelgruen: var(--color-gat-dunkelgruen);
    --gat-color-hellgruen:   var(--color-gat-hellgruen);
    --gat-color-gelb:        var(--color-gat-gelb);
    --gat-color-magenta:     var(--color-gat-magenta);
    --gat-color-weiss:       var(--color-gat-weiss);
    --gat-color-anthrazit:   var(--color-gat-anthrazit);

    --gat-color-primary:      var(--gat-color-dunkelgruen);
    --gat-color-secondary:    var(--gat-color-hellgruen);
    --gat-color-accent:       var(--gat-color-magenta);
    --gat-color-highlight:    var(--gat-color-gelb);
    --gat-color-text:         var(--gat-color-anthrazit);
    --gat-color-surface:      var(--gat-color-weiss);
    --gat-color-on-primary:   var(--gat-color-weiss);
    --gat-color-on-secondary: var(--gat-color-anthrazit);

    --gat-font-headline: var(--font-gat-headline);
    --gat-font-copy:     var(--font-gat-copy);
    --gat-font-emphasis: var(--font-gat-emphasis);

    --gat-text-h1:      var(--text-gat-h1);
    --gat-text-h2:      var(--text-gat-h2);
    --gat-text-h3:      var(--text-gat-h3);
    --gat-text-subline: var(--text-gat-subline);
    --gat-text-copy:    var(--text-gat-copy);
    --gat-text-small:   var(--text-gat-small);

    --gat-leading-headline: 0.9;
    --gat-leading-copy:     1.3;

    --gat-space-1: var(--spacing-gat-1);
    --gat-space-2: var(--spacing-gat-2);
    --gat-space-3: var(--spacing-gat-3);
    --gat-space-4: var(--spacing-gat-4);
    --gat-space-5: var(--spacing-gat-5);
    --gat-space-6: var(--spacing-gat-6);

    --gat-radius-sm:    var(--radius-gat-sm);
    --gat-radius-md:    var(--radius-gat-md);
    --gat-border-width: 2px;
    --gat-container-max: 72rem;

    --gat-breakpoint-sm: 36rem;
    --gat-breakpoint-md: 48rem;

    /* Web-Layer-Aliase */
    --gat-web-bg:           var(--color-gat-web-bg);
    --gat-web-surface:      var(--color-gat-web-surface);
    --gat-web-surface-sunk: var(--color-gat-web-surface-sunk);
    --gat-web-text:         var(--color-gat-web-text);
    --gat-web-text-soft:    var(--color-gat-web-text-soft);
    --gat-web-text-mute:    var(--color-gat-web-text-mute);
    --gat-web-clay-text:    var(--color-gat-web-clay-text);
    --gat-web-green-deep:   var(--color-gat-web-green-deep);
    --gat-web-green:        var(--color-gat-web-green);
    --gat-web-green-tint:   var(--color-gat-web-green-tint);
    --gat-web-yellow:       var(--color-gat-web-yellow);
    --gat-web-hairline:     var(--color-gat-web-hairline);
    --gat-web-shadow:       0 1px 2px rgba(31,38,28,.05),
                            0 4px 14px rgba(31,38,28,.05);
    --gat-web-page-max:     min(2040px, 94vw);
    --gat-web-radius-control: var(--radius-gat-web-control);
    --gat-web-radius-card:    var(--radius-gat-web-card);
    --gat-web-focus-ring:     0 0 0 3px color-mix(in srgb,
                                          var(--gat-web-green) 38%,
                                          transparent);
    --gat-web-focus-offset:   2px;
  }
}

/* === KOMPONENTEN ====================================================== */
/* (bestehende Komponenten unveraendert in den Werten — Section 5) */
/* (neue .gat-panel, .gat-metric-card, .gat-header (white), .gat-callout,
    .gat-section-head, .gat-hero, .gat-skiplink, .gat-tag — Section 5) */

/* === FOKUS / REDUCED-MOTION / PRINT ================================== */
/* (Section 9) */
```

### Anti-Patterns to Avoid

- **Tailwind-`@apply` in den Komponenten-Definitionen.** Wuerde die
  Komponenten-CSS an Utility-Namen koppeln, die in v4 nicht garantiert
  stabil sind. Komponenten referenzieren `var(--*)` direkt — das ist sowohl
  wirkungsstabiler als auch leichter zu erklaeren.
- **Tag-Defaults setzen** (`body { ... }` im DS-CSS). Bricht das
  Versprechen aus README.md:22-35 — Konsumenten muessen ihr Body-Layout
  selbst setzen.
- **Verschachtelte BEM-Tiefen ab 3 Ebenen.** Bleiben bei `.gat-panel__head`,
  nicht `.gat-panel__head__title`.
- **Tailwind-Defaults uebernehmen wie sie sind.** v2.0 nutzt Tailwind nur als
  Build-Engine fuer `@theme` + `@custom-variant`; wir _liefern_ keine
  Utility-Konsumenten-API (die wuerde mit dem `.gat-*`-Versprechen kollidieren
  und den Output explodieren lassen). Tailwind generiert nur die Tokens unter
  `:root` aus dem `@theme`-Block — die Utilities werden ueber `--*: initial`
  abgeschaltet, oder schlanker: das Stylesheet enthaelt nur dann Utilities,
  wenn HTML in der Repo-Site sie verwendet (Tailwind v4 scant Inputs).
  **Empfehlung:** den Style-Guide `index.html` als Single-Source-of-Truth fuer
  gescannte Inputs konfigurieren; alle Utilities, die dort als Anschauungs-
  Beispiel verwendet werden, kommen automatisch in den Output mit.
  **Alternativ und einfacher:** Tailwind so konfigurieren, dass es nur den
  `@theme`-Block + die `@custom-variant`-Definitionen verarbeitet, **ohne
  Utility-Generierung** — moeglich ueber `--*: initial` im `@theme` und keine
  Inputs. Diese strikte Variante wird empfohlen (siehe Sektion 2 weiter
  unten); macht den Output klein und kontrollierbar.

## Tailwind v4 Build Pipeline (Detail)

Source-of-truth fuer Syntax: tailwindcss.com/docs/installation/tailwind-cli,
tailwindcss.com/docs/theme, tailwindcss.com/docs/adding-custom-styles. Alle
HIGH confidence, Stand 2026-05-23, Tailwind v4.3.

### package.json

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
    "tailwindcss":      "^4.3.0",
    "@tailwindcss/cli": "^4.3.0"
  }
}
```

Hinweis: `"name"` muss nicht „@grueneat/design-system" sein — das Repo
publisht nicht nach npm, das `package.json` existiert nur fuer den lokalen
Build (`private: true`).

### GitHub Pages Workflow Diff

Heute (`.github/workflows/pages.yml`):

```yaml
- name: Repository auschecken
  uses: actions/checkout@v6
- name: Pages konfigurieren
  uses: actions/configure-pages@v6
- name: Artefakt hochladen
  uses: actions/upload-pages-artifact@v5
  with:
    path: '.'
- name: Zu GitHub Pages deployen
  id: deployment
  uses: actions/deploy-pages@v5
```

v2.0 (Steps in dieser Reihenfolge):

```yaml
- name: Repository auschecken
  uses: actions/checkout@v6

- name: Node einrichten
  uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'

- name: Dependencies installieren
  run: npm ci

- name: design-system.css bauen
  run: npm run build

- name: Pages konfigurieren
  uses: actions/configure-pages@v6

- name: Artefakt hochladen
  uses: actions/upload-pages-artifact@v5
  with:
    path: '.'

- name: Zu GitHub Pages deployen
  id: deployment
  uses: actions/deploy-pages@v5
```

**Schluesselpunkte:**

- Die generierte `./design-system.css` liegt nach dem Build im Repo-Root —
  dieselbe Datei, dieselbe Pages-URL, **die Konsumenten-URL bleibt
  unveraendert.**
- `path: '.'` lädt weiter alles hoch (gerendertes CSS, `index.html`,
  `examples/`, `assets/`, neuerdings `gat-charts.js`). Das `src/`-Verzeichnis
  wird mit-hochgeladen (harmless, ~ein paar KB), kann aber per
  `.github/actions-pages.yml`-`excludes` weggelassen werden, wenn gewuenscht.
- `node-modules/` wird durch `.gitignore` ausgeschlossen (heutige
  `.gitignore` ist 6 Bytes — `.DS_Store` only — also `node_modules/`
  hinzufuegen).
- **Local development:** `npm run watch` — Datei wird bei jeder Aenderung
  in `src/` neu gebaut, Editoren-Live-Preview funktioniert.

### Wie der Build die Konsumenten-URL stabil haelt

Die Pages-URL `https://grueneat.github.io/design-system/design-system.css`
bleibt nur dann gleich, wenn die finale `design-system.css` **im Repo-Root**
liegt — `actions/upload-pages-artifact` mit `path: '.'` liefert den Inhalt
1:1 nach Pages. Die `src/design-system.css` ist die **Quelle**, die im
Repo-Root liegende `design-system.css` der **Output**. Beide existieren als
verschiedene Pfade; nur der Output wird verlinkt.

**Trade-off:** Der gebaute Output wird auch ins git-Repo committet (damit
Contributor ohne `npm install` ihn als Diff sehen). **Empfehlung:** den
Output committen, mit einem Pre-Commit-Hinweis in der README, dass
`npm run build` vor dem Commit auszufuehren ist — Konsequenz: PRs sehen
Token-/Komponenten-Aenderungen sowohl in `src/` als auch in der gerenderten
Datei. Alternativ: Output nur im CI bauen, niemals committen, und auf
GitHub Pages eine separate `gh-pages`-Branch deployen. Letzteres ist
**komplexer ohne klaren Mehrwert** fuer ein 1-Datei-Repo. Pragmatische
Empfehlung: **Output committen.**

## --gat-* AA-Haertung (Vorher / Nachher)

Ergebnis einer Vollkontrast-Messung der heutigen `--gat-color-*`-Werte gegen
die vier neuen `--gat-web-*` Surface-Toene plus `--gat-color-weiss`. AA-
Schwelle: 4.5 fuer Fliesstext, 3.0 fuer Grosstext (>=18pt oder 14pt bold).
Methode: WCAG 2.1 relative-luminance Formel auf sRGB-Hex.

### Befunde

**OK heute (bleibt in 2.0):**

| Paarung | Ratio | Status |
|---------|-------|--------|
| `--gat-color-weiss` auf `--gat-color-dunkelgruen` (Primary CTA, Header bisher) | **5.63** | AA OK |
| `--gat-color-weiss` auf `--gat-color-magenta` (Stoerer-magenta) | **4.50** | AA OK (Grenzwert) |
| `--gat-color-anthrazit` auf `--gat-color-hellgruen` (Secondary Card) | **6.09** | AA OK |
| `--gat-color-anthrazit` auf `--gat-color-gelb` (Highlight, Stoerer-gelb) | **13.96** | AA OK |
| `--gat-color-anthrazit` auf `--gat-color-weiss` (Body) | **16.88** | AA OK |
| `--gat-color-dunkelgruen` auf `--gat-color-weiss` (Link, Sekundaer-Btn) | **5.63** | AA OK |
| `--gat-color-magenta` auf `--gat-color-weiss` (Akzent-Text) | **4.50** | AA OK (Grenzwert) |
| `--gat-color-dunkelgruen` auf `--gat-color-gelb` | **4.66** | AA OK |

**FAIL heute (muss in 2.0 geaendert oder strukturell verhindert werden):**

| Paarung | Ratio | Status | Aktion |
|---------|-------|--------|--------|
| `--gat-color-weiss` auf `--gat-color-hellgruen` | **2.77** | FAIL | **Wertaenderung Hellgruen** (siehe unten) — oder strukturell: weiss auf hellgruen nie paaren. Heute laut `:root`-Kommentar (`design-system.css:52`) **bereits strukturell verhindert** (`--gat-color-on-secondary` ist anthrazit, nicht weiss); v2.0 bestaetigt das in MIGRATION.md als Regel. **Trotzdem Wertaenderung empfohlen**, damit `--gat-color-hellgruen` als Marken-Akzent auch fuer kleinere Akzent-Linien auf weiss (Iter 17/Decision in der App) nicht durchfaellt. |
| `--gat-color-hellgruen` auf `--gat-color-weiss` (als Text) | **2.77** | FAIL | Wertaenderung (siehe unten) |
| `--gat-color-hellgruen` auf `--gat-web-bg`/`-surface`/`-surface-sunk` | 2.36-2.62 | FAIL | dito |

### Empfohlene Wertaenderung (2.0-Breaking)

**`--gat-color-hellgruen`:** `#56af31` (heute, 2.77 auf weiss) → **`#3e8a25`**
(verifiziert 4.51 auf weiss, 4.41 auf `--gat-web-bg`, 4.30 auf
`--gat-web-surface-sunk`).

| Paarung | Vorher (#56af31) | Nachher (#3e8a25) |
|---------|------------------|-------------------|
| auf `#ffffff` | 2.77 FAIL | **4.51 AA** OK |
| auf `#f3f5f0` (web-bg) | 2.53 FAIL | **4.11 LARGE-OK** |
| auf `#1d1d1b` (anthrazit) | 6.09 OK | 4.42 LARGE-OK (immer noch ueber 3.0) |
| weiss darauf | 2.77 FAIL | **4.77 AA** OK |

Diese Aenderung verschiebt den Hellgruen-Ton sichtbar dunkler. Sichtprobe:
`#3e8a25` ist immer noch ein klar erkennbares Mittelgruen, kein Hellgruen
mehr — naeher an `--web-green` `#4a8a52` des Labors. Empfehlung der
Spezifikation: **Sichtbare Aenderung in MIGRATION.md offen ausweisen.**
Marken-Stakeholder bestaetigen, dass der CD-Quickguide das hellere
`#56af31` als Plakat-/Druck-Wert hatte; fuer Web ist der dunklere Ton
zwingend.

Alternativen falls Marken-Stakeholder den `#56af31`-Wert nicht aendern
wollen:

- **Option A — Wert unveraendert lassen + strukturelle Regel (in
  MIGRATION.md):** „`--gat-color-hellgruen` ist eine Akzent-Flaechenfarbe,
  nicht Textfarbe — Anthrazit darauf paaren, nie als Text auf hellem Grund
  nutzen." Setzt fortbestehende Disziplin der Konsumenten voraus. Akzeptable
  Variante, **aber:** sie bricht das Versprechen, dass die DS-Token-Paare
  inhaerent AA-konform sind. Im Labor (gemeindefinanzen) wurde die
  Disziplin durch eine eigene entsaettigte Schicht erreicht — diese Schicht
  ist jetzt im DS (`--gat-web-green-deep` `#2c6e40`), kann also fuer alle
  Text-/AA-kritischen Faelle empfohlen werden.
- **Option B — Wertaenderung (`#3e8a25`):** Loest das Problem dauerhaft,
  geringer visueller Unterschied, im 2.0-Tag konsistent.

**Researcher-Empfehlung: Option B (Wertaenderung).** Begruendung: das ganze
Welle ist 2.0-Breaking; Stakeholder muessen ohnehin die Notes lesen; die
strukturelle Regel laesst sich nicht durchsetzen, Wert-Aenderung
unmissverstaendlich. Eine **strukturelle Regel zusaetzlich** in MIGRATION.md
notieren („Auf Hellgruen-Flaechen immer Anthrazit-Text").

### Weitere AA-Notes (additiv)

- `--gat-web-text-mute` `#6b6f63` ist **AA auf allen drei Web-Surfaces**
  (4.69-5.15). Aus dem Labor uebernommen (gemeindefinanzen iter 8); das
  damalige `#8b8f82` (3.0-3.3) fiel durch.
- `--gat-web-clay-text` `#9c5a38` ist **AA auf weiss** (5.34) — der zu helle
  `#b9744f` aus der Diagrammpalette (Chart-5 / `--gat-web-chart-5`) bleibt
  fuer Fuellungen, nicht fuer Text.
- `--gat-color-magenta` `#e6007e` ist exakt 4.50 auf Weiss (Grenzwert) und
  faellt auf den drei Web-Surfaces durch (3.83-4.25). **Empfehlung:** Magenta
  bleibt als Fuellfarbe (Stoerer-magenta) — nie als Text auf weichem
  Hintergrund. In MIGRATION.md vermerken: „Magenta-Text nur auf Weiss/Tiefer
  Gruen, nicht auf web-bg/sunk/tint."
- Alle anderen Marken-Token bleiben unveraendert.

## Komponenten-CSS (alle neuen .gat-*)

Konkrete CSS-Regeln, abgeleitet aus `/workspace/gemeindefinanzen/web/css/
app.css` mit Klassen-Rename und Token-Bezug auf `--gat-*` / `--gat-web-*`.
Reihenfolge folgt CONTEXT.md Decision 2.

### `.gat-panel` (von `.web-panel`, Quelle: app.css:397-557)

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
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
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

### `.gat-metric-card` (von `.metric-card`, Quelle: app.css:308-395)

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
  position: absolute;
  inset: 0 0 auto 0;
  height: 3px;
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

### `.gat-header` weisse Brandbar (UMBAU von Dunkelgruen, Quelle: app.css:232-306)

```css
.gat-header {
  background: var(--gat-web-surface);
  border-bottom: 3px solid var(--gat-web-green);
  box-shadow: 0 1px 3px rgba(31,38,28,.06);
}
.gat-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--gat-space-3);
  max-width: var(--gat-web-page-max);
  margin-inline: auto;
  padding-inline: clamp(1rem, 4vw, 2.5rem);
  padding-block: 0.85rem;
}
.gat-header__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  text-decoration: none;
}
.gat-header__logo {
  height: 56px;
  width: auto;
  display: block;
}
.gat-header__wordmark {
  font-family: var(--gat-font-headline);
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1;
  color: var(--gat-web-text);
  letter-spacing: 0.01em;
}
.gat-header__nav { /* container, list-reset */ }
.gat-header__nav-list {
  list-style: none; margin: 0; padding: 0;
  display: flex; flex-wrap: wrap; align-items: center;
  gap: 1.25rem;
}
.gat-header__nav-list a {
  font-family: var(--gat-font-headline);
  font-weight: 600;
  font-size: 1.05rem;
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

/* Optionaler dunkelgruener Header-Modifier — bewahrt das v1.x-Muster
   fuer Konsumenten, die den dunkelgruenen Header dezidiert weiter wollen */
.gat-header--dunkel {
  background: var(--gat-color-primary);
  border-bottom: none;
  color: var(--gat-color-on-primary);
  box-shadow: none;
}
.gat-header--dunkel .gat-header__wordmark { color: var(--gat-color-weiss); }
.gat-header--dunkel .gat-header__nav-list a { color: var(--gat-color-weiss); }
```

**Markup-Beispiel:**

```html
<header class="gat-header">
  <div class="gat-header__inner">
    <a class="gat-header__brand" href="#top">
      <img class="gat-header__logo"
           src="https://grueneat.github.io/design-system/assets/gruene-logo.svg"
           alt="Die Gruenen">
      <span class="gat-header__wordmark">Tool-Name</span>
    </a>
    <nav aria-label="Hauptnavigation" class="gat-header__nav">
      <ul class="gat-header__nav-list">
        <li><a href="#start">Start</a></li>
        <li><a href="#kontakt">Kontakt</a></li>
      </ul>
    </nav>
  </div>
</header>
```

### `.gat-callout` (von `.callout`, Quelle: app.css:574-582 + Hero-Tint-Pattern)

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

### `.gat-section-head` und `.gat-hero` (Quelle: app.css:186-202, 559-572)

```css
.gat-section-head { margin-bottom: var(--gat-space-4); }
.gat-section-head h2 { margin-bottom: var(--gat-space-2); }
.gat-section-head p {
  margin: 0;
  max-width: 70rem;
  color: var(--gat-web-text-soft);
}

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

### `.gat-tag` (Pill / Badge, neu — Kandidat F-Anker)

```css
.gat-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35em;
  padding: 0.15em 0.6em;
  border-radius: 999px;
  font-family: var(--gat-font-copy);
  font-weight: 600;
  font-size: 0.85rem;
  line-height: 1.4;
  letter-spacing: 0.02em;
}
.gat-tag--neutral { background: var(--gat-web-surface-sunk); color: var(--gat-web-text-soft); }
.gat-tag--info    { background: var(--gat-web-green-tint);   color: var(--gat-web-green-deep); }
.gat-tag--pflicht { background: color-mix(in srgb, var(--gat-web-green-deep) 14%, white);
                    color: var(--gat-web-green-deep); }
.gat-tag--risiko  { background: color-mix(in srgb, var(--gat-web-clay-text) 14%, white);
                    color: var(--gat-web-clay-text); }
```

**Naming-Empfehlung:** `.gat-tag` (nicht `.gat-pill`). Begruendung: „pill"
beschreibt die Form, „tag" die semantische Funktion (kategoriale Markierung
eines Werts). Das `border-radius: 999px` legt die Pill-Form fest; das
Tag-Naming bleibt offen fuer kuenftige Eckigkeit-Varianten ohne neuen
Klassennamen.

### `.gat-skiplink` (Kandidat H, gruene.at-Pattern)

```css
.gat-skiplink {
  position: fixed;
  top: -200%;
  left: 0;
  z-index: 999;
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

**Markup-Beispiel:**

```html
<body>
  <a class="gat-skiplink" href="#main">Zum Hauptinhalt springen</a>
  <header class="gat-header">…</header>
  <main id="main">…</main>
</body>
```

## .gat-mode-hc — High-Contrast Variant via Tailwind v4

Verifizierte Syntax (HIGH, Quelle: tailwindcss.com/docs/adding-custom-styles
fuer `@custom-variant`, abgerufen 2026-05-23):

```css
/* In src/design-system.css, top-level (nicht innerhalb @theme): */
@custom-variant gat-mode-hc (&:where(.gat-mode-hc, .gat-mode-hc *));
```

Diese eine Zeile registriert die Variant. **Wirkung:** Tailwind generiert
fuer jede Tailwind-Utility-Klasse einen `gat-mode-hc:`-Counterpart, der
greift, wenn ein Ancestor (oder das Element selbst) die Klasse `gat-mode-hc`
traegt. Beispielsweise emittiert `bg-yellow-300` automatisch
`.gat-mode-hc\:bg-yellow-300` mit dem `:where()`-Selektor — Specifity bleibt
durch `:where()` bei 0 (nicht-aufdringlich, leicht zu uebersteuern).

**Konsumenten-Pattern:**

```html
<!-- Konsument setzt die Body-Klasse (per A11y-Toggle, JS oder direkt) -->
<body class="gat-mode-hc">
  <button class="bg-gat-web-green-deep gat-mode-hc:bg-gat-yellow">
    Mitmachen
  </button>
  <article class="bg-gat-web-surface gat-mode-hc:bg-gat-anthrazit
                  text-gat-web-text gat-mode-hc:text-gat-yellow">
    …
  </article>
</body>
```

**Plus: hand-geschriebene Komponenten-Overrides (im DS-CSS direkt).**
Komponenten wie `.gat-header`, `.gat-callout` etc. brauchen ein
Mode-HC-Pendant; das schreibt das DS einmal:

```css
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
.gat-mode-hc .gat-metric-card,
.gat-mode-hc .gat-panel {
  background: var(--gat-color-anthrazit);
  color: var(--gat-color-gelb);
  border-color: var(--gat-color-gelb);
}
.gat-mode-hc .gat-btn--primary {
  background: var(--gat-color-gelb);
  color: var(--gat-color-anthrazit);
  border-color: var(--gat-color-anthrazit);
}
/* … */
```

**Palette fuer HC:** schwarz (`--gat-color-anthrazit`) + gelb
(`--gat-color-gelb`) + magenta (`--gat-color-magenta`) fuer Akzente. Das
spiegelt das gruene.at-Vorbild (Quelle: gruene-at-analysis.md:252-263) und
nutzt **bestehende** Marken-Token; keine neuen `--gat-*-hc`-Werte noetig.

**Begruendung der Tailwind-Wahl statt reines Custom-Property-Inheritance:**
- `@custom-variant` ist einzeilig, eindeutig, fuer Konsumenten direkt
  konsumierbar via Tailwind-Utilities (sofern sie Tailwind-Klassen ueberhaupt
  nutzen — sehen sie nur unsere `.gat-*`-Komponenten, hilft ihnen die
  Variant nur fuer kuenftige eigene Utilities; das ist OK).
- Reine Custom-Property-Inheritance (Option (a) aus gruene-at-analysis.md:
  279-282) ist umfangreicher zu schreiben und schwerer zu erweitern.
- Falls Tailwind v4 spaeter weg sollte (z. B. v5 mit anderem System), bleibt
  die `.gat-mode-hc *`-Selektor-Idee im hand-geschriebenen Komponenten-Layer
  intakt — die `@custom-variant`-Zeile ist dann veraltet, aber nicht
  load-bearing.

## gat-charts.js Chart-Helper-Modul

ECharts liest kein CSS — die Diagrammpalette muss als JS-Konstanten
geliefert werden. Drei Optionen sind in CONTEXT.md "Claude's Discretion"
aufgelistet; Vorab-Tendenz Option (a). **Bestaetigt: Option (a) — `gat-
charts.js` als gehostetes ES-Modul ueber die gleiche Pages-Root.**

### Hosting

Die Datei liegt unter `/workspace/design-system/design-system/gat-charts.js`
und wird vom Pages-Workflow (mit `path: '.'`) mit hochgeladen. Kanonische
URL: `https://grueneat.github.io/design-system/gat-charts.js`.

### Modul-Surface

```js
// gat-charts.js
// Quelle: dashboard-charts.js des gemeindefinanzen-Labors, neutralisiert.
// Lizenz: CC BY 4.0 (gleich wie design-system.css).

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
export const AXIS_SIZE = 14;
export const BAR_MAX_DICHT = 56;
export const BAR_MAX_WEIT = 130;

// Decal-Schraffur fuer Plan/VA-Balken (Iter 17)
export const VA_DECAL = {
  symbol: "rect", symbolSize: 1, dashArrayX: [3, 0], dashArrayY: [1, 6],
  color: "rgba(255,255,255,0.45)", rotation: -Math.PI/4,
};

// ECharts-Tooltip-Preset
export function tip(extra = {}) {
  return {
    trigger: "axis",
    backgroundColor: "#ffffff",
    borderColor: INK.hairline,
    borderWidth: 1,
    extraCssText: "box-shadow: 0 4px 14px rgba(31,38,28,.08); border-radius: 8px;",
    textStyle: {
      color: INK.text,
      fontFamily: "'Barlow Semi Condensed', sans-serif",
      fontSize: LABEL_SIZE,
    },
    ...extra,
  };
}

// Legenden-Preset
export function legende(extra = {}) {
  return {
    textStyle: { color: INK.soft, fontSize: LABEL_SIZE },
    itemGap: 14,
    ...extra,
  };
}

// Grid-Margins-Preset (ruhige Standard-Raender)
export function grid(extra = {}) {
  return {
    left: 10, right: 18, top: 14, bottom: 10,
    containLabel: true,
    ...extra,
  };
}

// Helfer: zwei Dummy-Serien fuer die Plan-vs-Ist-Legende
export function planIstLegende() {
  return [
    { name: "Ist (RA)",       type: "bar", data: [] },
    { name: "Plan (VA/NVA)",  type: "bar", data: [], itemStyle: { decal: VA_DECAL } },
  ];
}
```

### Konsumenten-Import

```js
import {
  PALETTE, INK, LABEL_SIZE, AXIS_SIZE,
  BAR_MAX_DICHT, BAR_MAX_WEIT,
  tip, legende, grid, planIstLegende
} from 'https://grueneat.github.io/design-system/gat-charts.js';
```

**Kein Build noetig** — Vanilla-ES-Modul, Browser laedt direkt. Im DS-Repo
existiert die Datei als statische Quelle (nicht generiert). Lizenz: CC BY
4.0 wie der Rest des DS. **Konsumenten brauchen keine Aenderung** wenn sie
heute die 8 Hex-Werte hand-gepflegt im Code haben — sie steigen bei der
naechsten Diagramm-Anpassung um.

## Patterns: Fokus, Reduced-Motion, Print, Fixed-Header

### `:focus-visible`-Ring (von app.css:685-727)

Sammelblock im DS-CSS — eine Regel fuer alle DS-eigenen interaktiven
Elemente. Konsumenten, die eigene Buttons haben, koennen die `.gat-*`-Klassen
mit-fokussieren oder die Tokens (`--gat-web-focus-ring`,
`--gat-web-focus-offset`) selber konsumieren.

```css
.gat-btn:focus-visible,
.gat-skiplink:focus-visible,
.gat-tag:focus-visible,
.gat-panel__fs-btn:focus-visible,
.gat-header__brand:focus-visible {
  outline: 2px solid var(--gat-web-green-deep);
  outline-offset: var(--gat-web-focus-offset, 2px);
  box-shadow: var(--gat-web-focus-ring);
}
```

### `prefers-reduced-motion` (1:1 von app.css:1099-1110)

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition-duration: 0.01ms !important;
    transition-delay: 0ms !important;
    animation-duration: 0.01ms !important;
    animation-delay: 0ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }
}
```

### `@media print` (von app.css:1121-1199, an .gat-* angepasst)

Volle Regel wird im DS bereitgestellt — Konsumenten erhalten print-tauglichen
Output ohne Extra-CSS:

```css
@media print {
  body { background: #ffffff; color: #000000; }

  /* Bedien-/Verwaltungsflaechen, die im Ausdruck keinen Zweck haben.
     Konsumenten markieren ihre app-eigenen Bedienleisten zusaetzlich
     mit der DS-Hilfsklasse `.gat-no-print`. */
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

### Fixed-Header-Konvention (Kandidat I, gruene.at-Pattern, low Prio)

Da das DS heute keinen fixed Header rendert, ist dieser Block **eine
Konventions-Doku-Klasse**, die Konsumenten bewusst opt-in setzen. Im DS-CSS:

```css
.gat-header--fixed {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 100;
  pointer-events: none;
}
.gat-header--fixed > * { pointer-events: auto; }

/* Konsumenten muessen zusaetzlich auf html setzen, da der Wert der
   Header-Hoehe app-spezifisch ist. In Doku als Empfehlung notieren: */
/* html { scroll-padding-top: 80px; } */
```

In MIGRATION.md / README.md kurzer Hinweis: bei fixed Header
`scroll-padding-top: <header-hoehe>` auf `html` setzen.

### `hyphens: auto` (Kandidat J)

```css
.gat-headline, .gat-subline, .gat-section-head h2, .gat-hero__title,
.gat-panel__head h3 {
  hyphens: auto;
}
```

Trivial-additive Aenderung, hilft deutschen Komposita
(„Aufgabenbereichsuebersicht").

## Headline-Skala beruhigen (Teil von Kandidat C)

Heute `.gat-headline` ist `font-weight: 900`. v2.0 senkt auf 800 fuer h1-
Rolle. Subline bleibt 600 (heute). H2-/H3-Rolle gibt es im heutigen DS
nicht explizit (es gibt `.gat-headline` und `.gat-subline` plus `.gat-
card__title` 900). Empfehlung:

| Klasse | Heute | v2.0 |
|--------|-------|------|
| `.gat-headline` | `font-weight: 900` | **`font-weight: 800`** |
| `.gat-subline` | `font-weight: 600` | unveraendert |
| `.gat-card__title` | `font-weight: 900` | **`font-weight: 700`** (Iter 2 Befund: 900 + condensed = laut) |
| `.gat-card__body` | `font-weight: 400` (default) | unveraendert |

Tableiste/Umschalter sind heute nicht im DS — werden im Labor in
`web/vendor/dashboard/dashboard.css` hand-gepflegt. **Empfehlung:** nicht
im 2.0-Scope, **separater additiver Folge-Issue** im DS (`gat-tabs`/
`gat-switch`) sobald andere Konsumenten Tabs/Schalter brauchen. CONTEXT.md
Decision 4 listet „Tableiste-/Umschalter-Mindestgroessen (Teil von C)" als
Scope-Item — Researcher-Anmerkung: das ist Lesbarkeit, nicht Komponente.
Wenn der Planner Tabs/Switcher als DS-Komponente einplanen will, koennen
die Lesbarkeits-Notes aus Iter 14 (1.08rem fuer `.tab-btn`, 0.98rem fuer
`.switch-btn`) als Akzeptanz-Kriterien dienen.

## Konsumenten-Impact

`grep -r design-system.css /workspace/` (HIGH, vollstaendig erfasst):

| Repo | Datei | URL | v2.0-Impact |
|------|-------|-----|-------------|
| design-system (selbst) | `index.html`, `examples/minimal.html` | relativ / absolut | Style-Guide + Beispiel werden aktualisiert; sind Teil des Tasks |
| gemeindefinanzen | `web/index.html:12` | `grueneat.github.io/design-system/design-system.css` | Header optisch anders (weisse Brandbar), Headline-Skala leichter — beide Aenderungen in der App ausdruecklich gewuenscht (Labor-Quelle). gemeindefinanzen hat eine eigene `--web-*`-Schicht, die unabhaengig bleibt — kein Bruch. Migration: separater Folge-Issue im gemeindefinanzen-Repo (CONTEXT.md Deferred). |
| gemeindefinanzen worktrees | mehrere | dito + 2 Worktrees zeigen auf veraltetes `flomotlik.github.io/claude-code/design-system.css` | Veraltete Worktrees — nicht load-bearing fuer 2.0-Issue. |
| (kein anderer Konsumer gefunden) | | | |

**Aktive Konsumenten (1):** gemeindefinanzen.

Risiko fuer gemeindefinanzen: niedrig.
- Tokens (`--gat-*`) bleiben in Namen stabil; nur `--gat-color-hellgruen`
  Wert wandert (sichtbar, aber im Labor bereits entsaettigt durch eigene
  `--web-green`-Schicht — gemeindefinanzen nutzt `--gat-color-hellgruen`
  praktisch nicht direkt).
- `.gat-header` Optik wechselt — die App ueberschreibt `.gat-header` heute
  bereits per `.web-brandbar*`-Klassen (app.css:232-306), also visuell kein
  Bruch nach Pull der neuen `design-system.css`.
- `.gat-headline` Gewicht wandert von 900 auf 800; im Labor bereits
  ueberschrieben (app.css:207-212) — kein Bruch.

**Implication:** Die gemeindefinanzen-App wird beim naechsten Reload
einfach die neue CSS-Datei erhalten, ohne Anpassung. Erst die Folge-Issue-
Migration (Deferred) macht die `--gat-web-*`-Schicht produktiv.

## Risks & Open Questions

### Risk 1 — Build-Step im Repo (Architektur-Constraint)

**Verifiziert (HIGH):** Der workspace-CLAUDE.md verbietet **Vendoring**, nicht
Build-Schritte. Quelle: `/workspace/CLAUDE.md:8-31`. Der gemeindefinanzen-
CLAUDE.md verbietet einen Build fuer die ausgelieferte Seite — gilt aber
**nur fuer das gemeindefinanzen-Repo** (`web/`-App). Quelle:
`/workspace/gemeindefinanzen/CLAUDE.md:21-22`. **Im design-system-Repo gibt
es keine solche Regel** — kein Repo-eigenes CLAUDE.md, und Workspace-Regel
laesst Build explizit zu („`devDependencies` in `package.json`" als
erlaubtes Muster).

**Hard-Constraint-Verletzung: nein.**

Aktion fuer den Planner: **kann gefahrlos Build-Step einbauen.**

### Risk 2 — GitHub Pages mit benutzerdefiniertem Build

Die heutige Workflow-Datei (`pages.yml`) ist sehr simpel und macht nur
Checkout + Upload. v2.0 fuegt setup-node + npm ci + npm run build hinzu.
Standard-Pattern fuer GitHub-Pages-Builds. Diff in dieser Datei ist konkret
in Abschnitt 2 oben.

**Risiko:** Build koennte fehlschlagen wenn `package-lock.json` fehlt /
veraltet ist. **Mitigation:** `package-lock.json` ins Repo committen,
`npm ci` (deterministisch) statt `npm install` verwenden.

**Risiko:** Pages-Workflow ist heute mit `path: '.'` konfiguriert — laedt
alles hoch inkl. `src/`, `package.json`, `node_modules/`. **Mitigation:**
`.gitignore` muss `node_modules/` und ggf. `.cache/` ausschliessen
(`.gitignore` heute ist 6 Bytes, also nur `.DS_Store` — `node_modules/`
und `.npm` ergaenzen). Die Upload-Action laedt nur was im Git-Workspace nach
Checkout vorhanden ist, **nicht** was waehrend des Build installiert wurde —
solange `node_modules/` nicht ins Repo eingecheckt wird. Verifiziert via
GitHub-Actions-Doku-Konvention; verhalten beobachtbar nach erstem CI-Lauf.

### Risk 3 — Tailwind v4 Maturity

**Verifiziert (HIGH, npm view):**
- Tailwind v4.0.0 GA: 2025-01-21
- Tailwind v4.3.0 latest: 2026-05-08
- Modified: 2026-05-23 (heute)

ueber 16 Monate seit GA, 4 Minor-Versionen, aktive Wartung. **Produktionsreif.**
Riskante Patterns (`@theme` mit Token-Emission unter `:root`,
`@custom-variant`-Syntax) sind durch die Tailwind-Doku verifiziert und
durch gruene.at als groesseren Produktions-Konsumenten validiert.

### Risk 4 — Konsumenten erwarten heute keine Versionierung

README.md:43-50 sagt explizit: „Konsumierende Tools verlinken die feste,
gehostete CSS-URL und erhalten damit immer den aktuellen Stand — es gibt
keine versionierten URLs oder Pfade. Ein Update des Designsystems wirkt
automatisch auf alle einbindenden Tools." Das ist heute Politik. Mit dem
2.0-Tag aendert sich die Optik (Header weiss, Headline-Gewicht leichter,
Hellgruen-Wert verschoben).

**Mitigation:** `MIGRATION.md` mit Vorher/Nachher-Screenshots; der Tag
bedeutet primaer „diese Aenderungen sind eingetreten", nicht „verlinke jetzt
v2.0/design-system.css". Die rolling-URL bleibt. Wenn Konsumenten eine
versionierte URL braeuchten, koennte das ein eigenes Folge-Issue werden
— **nicht** Scope von 2.0.

### Open Questions (fuer Planner / User)

1. **Hellgruen-Wert tatsaechlich aendern (`#56af31` -> `#3e8a25`)?**
   Researcher-Empfehlung: ja (siehe Abschnitt 4). Marken-Stakeholder im
   Loop?
2. **gat-charts.js — auch v1.x Konsumenten benachrichtigen?**
   gemeindefinanzen-Labor benutzt heute hand-gepflegte JS-Konstanten in
   `dashboard-charts.js`. Migration ist „Deferred". Aber der DS-Tag 2.0
   liefert das Modul mit — separater Hinweis in MIGRATION.md.
3. **Tableiste/Umschalter als DS-Komponente jetzt oder spaeter?**
   CONTEXT.md zaehlt sie unter „Tableiste-/Umschalter-Mindestgroessen
   (Teil von C)" — Researcher-Empfehlung: **spaeter** (kein aktueller DS-
   Konsument hat Tabs ausser gemeindefinanzen, das diese hand-pflegt).
   Aber wenn Planner Tabs jetzt einplant, ist die Akzeptanz-Lesbarkeit aus
   Iter 14 dokumentiert.
4. **`.gat-mode-hc` — schaltet Konsument-Toggle das auch um?**
   Researcher-Empfehlung: ja, per JS-Snippet in der MIGRATION.md
   („`<button onclick=\"document.body.classList.toggle('gat-mode-hc')\"
   aria-pressed=\"…\">Hoher Kontrast</button>`"). Aber im DS-CSS landet
   nur die Variant + Komponenten-Overrides; der Knopf bleibt
   Konsumenten-Sache.
5. **Output committed oder nur in Pages?** Researcher-Empfehlung: Output
   ins Repo committen (siehe Sektion 2 „Trade-off"). Frage an User wenn
   Diskussion erforderlich.

## Roadmap-Skizze (Reihenfolge innerhalb dieses Issues)

CONTEXT.md Decision 4: alles ein Issue. Reihenfolge der Tasks, die der
Planner anlegen sollte (Researcher-Vorschlag):

- **Task 1 — Tailwind-Build-Skelett anlegen.** `package.json`,
  `src/design-system.css` mit nur `@import "tailwindcss"`, GitHub-Action
  umgestellt, leerer Build produziert leeres Stylesheet. **Smoke-Test:
  Pages liefert eine gerenderte CSS-Datei.**
- **Task 2 — Token in @theme migrieren** (alle heutigen `--gat-*`-Werte).
  Bestehende Aliase im `@layer base { :root { ... } }` Block setzen.
  **Smoke-Test: Style-Guide `index.html` rendert pixel-identisch zu v1.x**
  (nur jetzt ueber Build).
- **Task 3 — AA-Haertung der `--gat-*`-Werte.** `--gat-color-hellgruen`
  updaten. **Test: Style-Guide-Visualisierung der Token-Tabelle.**
- **Task 4 — `--gat-web-*`-Schicht hinzufuegen** (Tokens nur). Style-Guide
  ergaenzt einen neuen Token-Block-Abschnitt mit Hex-Werten.
- **Task 5 — Headline-Skala absenken** (`.gat-headline` 900->800,
  `.gat-card__title` 900->700) und `hyphens: auto`.
- **Task 6 — `.gat-header` Umbau** zu weisser Brandbar.
  `.gat-header--dunkel` als opt-in-Modifier hinzufuegen.
  `examples/minimal.html` und Style-Guide neuen Header anwenden.
- **Task 7 — `.gat-panel` + `.gat-metric-card` Komponenten.** Style-Guide
  ergaenzt eine Sektion „Datenwerkzeug-Komponenten".
- **Task 8 — `.gat-callout`, `.gat-section-head`, `.gat-hero`, `.gat-tag`,
  `.gat-skiplink`.**
- **Task 9 — `@custom-variant gat-mode-hc` + Komponenten-Overrides.**
  Style-Guide ergaenzt einen Knopf zum Umschalten + Demo.
- **Task 10 — `:focus-visible` Sammelblock + `prefers-reduced-motion` +
  `@media print`.** Style-Guide demonstriert das Fokus-Ring-Pattern.
- **Task 11 — `.gat-header--fixed` Konventions-Klasse.**
- **Task 12 — `gat-charts.js` ES-Modul** schreiben + hosten. Style-Guide
  referenziert den Import-Pfad in einem Code-Beispiel (kein gerendertes
  Chart im DS).
- **Task 13 — README + CHANGELOG + MIGRATION.md schreiben.**
- **Task 14 — `v2.0.0`-Tag setzen.**

Jeder Schritt ist sichtbar im Style-Guide, jeder Schritt ist ein gruene
Build + Smoke-Test in CI.

## Environment Availability

| Dependency | Required By | Available locally | Version | Fallback |
|------------|------------|-------------------|---------|----------|
| Node.js | Build (Tailwind CLI) | ja | siehe `node --version` (i.A. 20+ im Container) | actions/setup-node@v4 in CI |
| npm | Tailwind devdep install | ja | siehe `npm --version` | dito |
| Tailwind CLI | Build | NEIN — wird per `npm ci` installiert | 4.3.0 | nicht noetig, npm ci installiert |
| GitHub Actions | Pages-Deploy | bereits aktiv | siehe `.github/workflows/pages.yml` | n/a |
| sha256sum | Provenance fuer .html | ja (coreutils) | system | n/a |
| python3 | Smoke-Check fuer .html | ja | system | n/a |

Probe-Ergebnisse (Containerumgebung):
- `npm view tailwindcss version` -> `4.3.0` (HIGH, verifiziert 2026-05-23)
- `npm view @tailwindcss/cli version` -> `4.3.0` (HIGH)
- `ls /workspace/design-system/design-system/` -> Repo-Root mit
  `design-system.css`, `index.html`, `examples/`, `assets/`, `.github/`

## Sources

### HIGH confidence
- `/workspace/CLAUDE.md` (workspace-CLAUDE.md, Vendoring-Verbot)
- `/workspace/gemeindefinanzen/CLAUDE.md` (kein Build fuer die
  ausgelieferte Seite — Scope: nur gemeindefinanzen)
- `/workspace/design-system/design-system/design-system.css`
  (heutiger `:root`-Block, Komponenten, Lizenz, kanonische URL)
- `/workspace/design-system/design-system/.github/workflows/pages.yml`
  (heutige Pages-Deploy)
- `/workspace/design-system/design-system/README.md` (Rolling-URL-Politik,
  Body-Defaults-Versprechen)
- `/workspace/design-system/design-system/CHANGELOG.md` (v1.0.0 Stand)
- `/workspace/design-system/design-system/index.html` (Style-Guide-Struktur)
- `/workspace/design-system/design-system/examples/minimal.html`
  (Konsumenten-Referenz)
- `/workspace/gemeindefinanzen/web/css/app.css` (894 Zeilen, Iter-1-18-
  Quellcode; alle hier zitierten Zeilennummern)
- `/workspace/gemeindefinanzen/docs/web-design-system.md` (Iterations-
  protokoll und Begruendungen)
- `/workspace/design-system/.issues/cjpfs-…/notes/gruene-at-analysis.md`
  (Stack-Analyse, Variant-Pattern, Custom-Variant-Syntax-Empfehlung)
- `https://tailwindcss.com/docs/theme` (Tailwind v4 @theme — verifiziert,
  inkl. Emission-unter-:root-Verhalten)
- `https://tailwindcss.com/docs/adding-custom-styles`
  (Tailwind v4 @custom-variant Syntax)
- `https://tailwindcss.com/docs/installation/tailwind-cli` (CLI Build-Befehl)
- `npm view tailwindcss version` / `npm view @tailwindcss/cli version`
  (4.3.0, Stand 2026-05-23)
- AA-Kontrast-Messung (Python WCAG-2.1-Formel, eigene Berechnung — keine
  Drittquelle noetig)

### MEDIUM confidence
- `actions/setup-node@v4`, `actions/checkout@v6`, `actions/configure-pages@v6`,
  `actions/upload-pages-artifact@v5`, `actions/deploy-pages@v5` — Standard-
  Versionen aus GitHub-Action-Marketplace; heutige Workflow nutzt sie
  schon.

### LOW confidence (needs validation)
- Empfehlung Hellgruen `#3e8a25` ist eine **vorgeschlagene** Aenderung; der
  Wert wurde gegen AA gerechnet, aber **Marken-Stakeholder-Approval
  empfohlen**.

## Metadata
- **Confidence breakdown:** Codebase HIGH (alle Dateien direkt gelesen).
  Tailwind v4 Syntax HIGH (Doku abgerufen + npm versions verifiziert).
  AA-Messung HIGH (Python-Berechnung). Konsumenten-Impact HIGH (`grep -r`
  ueber `/workspace/`). Mark-Stakeholder-Frage zum Hellgruen-Wert LOW
  (offen, Owner-Entscheidung).
- **Research date:** 2026-05-23
- **Sub-agents used:** Light-mode (direct research only — depth-driver
  was clarity of CONTEXT.md decisions plus deep input file set; no parallel
  fanout needed for a tightly scoped, well-defined v2.0)
- **Raw research files:** keine Subagent-Ausgaben (alles inline synthetisch
  ueber direkte Quellenarbeit).
