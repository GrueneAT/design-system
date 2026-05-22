# Research: Integrations-Leitfaden und Querverlinkung

**Researched:** 2026-05-22
**Issue:** integration-guide (GrueneAT/design-system#6)
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-1 — Kein Bezug zum persönlichen System; bestehende Verweise entfernen.**
  `grueneat/design-system` ist ein öffentliches Organisations-Repo. Es soll
  **keinen** Verweis auf das persönliche/private System des Maintainers
  (`flomotlik.github.io/claude-code`, `flomotlik/claude-code`) enthalten. Die
  **bereits vorhandenen** Verweise werden **repo-weit entfernt**:
  - `README.md` — der Abschnitt „Verhältnis zum persönlichen System" (aus #2)
  - `index.html` — etwaige Links/Hinweise auf das persönliche System
  - `design-system.css` und sonstige Produktdateien — etwaige Erwähnungen
  - **Ausgenommen:** die internen Issue-Artefakt-HTMLs unter `.issues/`
    (`PLAN.html`, `RESEARCH.html`, …). Diese sind Entwickler-Tooling, folgen
    einem eigenen Contract und binden bewusst ein anderes (Tooling-)Stylesheet
    ein — sie werden **nicht** angefasst.

- **D-2 — Versionierung: Latest-URL + CHANGELOG.** Konsumierende Tools
  verlinken die feste Pages-URL
  (`https://grueneat.github.io/design-system/design-system.css`) und erhalten
  immer den aktuellen Stand. Eine `CHANGELOG.md` dokumentiert Änderungen; eine
  Versionsnummer wird geführt; Breaking Changes werden dort angekündigt. Keine
  versionierten URLs/Pfade.

- **D-3 — Minimal-Beispiel als echte Datei.** Das vollständige Minimal-Beispiel
  kommt als echte Datei `examples/minimal.html` ins Repo — über GitHub Pages
  aufrufbar, dogfooded das System real.

### Claude's Discretion (Rahmen / Annahmen)

- Reine Dokumentations-/Beispiel-Arbeit; deutschsprachig.
- Bekannter Mangel: README-Abschnitt „Stand und nächste Schritte" ist veraltet
  (behauptet noch Platzhalter-CSS / Skelett-`index.html`) — er wird korrigiert
  bzw. ersetzt.
- `design-system.css` und `assets/` werden inhaltlich nicht verändert (höchstens
  ein personal-system-Verweis entfernt, falls vorhanden).
- Style Guide (`index.html`) wird um einen knappen Integrations-Abschnitt
  ergänzt.

### Deferred Ideas (OUT OF SCOPE)

- Der ursprüngliche ISSUE.md-Punkt „Querverlinkung persönliches ↔ org-System"
  entfällt vollständig. Statt eines Querverweises wird der bestehende Bezug
  **entfernt**. Kein gegenseitiges Verlinken — der Issue-Titel bleibt, der
  Inhalt verschiebt sich entsprechend.
</user_constraints>

## Summary

Dieses Issue ist reine Dokumentations- und Beispiel-Arbeit auf einem
inhaltlich fertigen Repo. Die Designsystem-Substanz (`design-system.css`,
`index.html`) ist nach den Issues #3/#4/#5 vollständig — es fehlt nur die
Konsumenten-Dokumentation: eine verfeinerte Einbindungs-Anleitung, ein echtes
Minimal-Beispiel, eine `CHANGELOG.md` und das Entfernen des Bezugs zum
persönlichen System des Maintainers.

Die kritische Inventur-Aufgabe hat ein eindeutiges Ergebnis: **In Produktdateien
gibt es genau eine betroffene Datei — `README.md`.** Vier Zeilen (22, 24, 25,
30, 31) bilden zusammen den Abschnitt „Verhältnis zum persönlichen System".
`index.html` und `design-system.css` enthalten **keine** Verweise auf
`flomotlik` / `claude-code` / „persönliches System" — sie sind bereits sauber.
Alle weiteren Treffer liegen ausschließlich unter `.issues/` (Issue-Artefakte,
inkl. dev-tooling-Stylesheet-`<link>`s in `PLAN.html`/`RESEARCH.html`) und sind
per D-1 ausdrücklich **out of scope** — nicht anfassen.

Zusätzlich ist der README-Abschnitt „Stand und nächste Schritte" sachlich falsch
(behauptet Platzhalter-CSS und Skelett-`index.html`) und muss korrigiert werden.
GitHub Pages serviert `examples/minimal.html` automatisch, da `pages.yml` mit
`path: '.'` das gesamte Repo hochlädt — kein Workflow-Änderungsbedarf.

**Primary recommendation:** Vier Produktdatei-Änderungen plus zwei neue Dateien.
(1) `README.md`: personal-system-Abschnitt löschen, „Stand"-Abschnitt durch
einen aktuellen Stand + Versionierungs-/CHANGELOG-Hinweis ersetzen,
Einbindungs-Abschnitt um Minimal-Beispiel-Verweis + Update-Strategie erweitern.
(2) `CHANGELOG.md` neu im „Keep a Changelog 1.1.0"-Format mit SemVer, Startstand
`[1.0.0]`. (3) `examples/minimal.html` neu — eine vollständige, eigenständige
Seite, die ausschließlich die gehostete `design-system.css` per absoluter URL
einbindet und echte `gat-`-Komponenten verwendet. (4) `index.html`: knapper
Integrations-Abschnitt; keine personal-system-Verweise vorhanden, nichts zu
entfernen. `design-system.css`: kein Verweis vorhanden, nicht anfassen.

## Codebase Analysis

### Relevant Code

| File | Purpose | Last Modified | Relevance |
|------|---------|---------------|-----------|
| `README.md` | Repo-Einstieg; enthält Einbindung + personal-system-Abschnitt + veralteten „Stand"-Abschnitt | 2026-05-22 08:57 (Issue #2) | **HOCH** — drei Abschnitte zu ändern |
| `index.html` | Vollständiger sichtbarer Style Guide (Issue #5), 1244 Zeilen | 2026-05-22 11:50 | **HOCH** — Integrations-Abschnitt ergänzen; kein personal-system-Verweis vorhanden |
| `design-system.css` | Kanonisches Stylesheet (Tokens + Komponenten), 429 Zeilen | 2026-05-22 11:04 | NIEDRIG — kein personal-system-Verweis, nicht anfassen (siehe Inventur) |
| `.github/workflows/pages.yml` | GitHub-Pages-Deploy, lädt `path: '.'` | 2026-05-22 08:56 | MITTEL — bestätigt: serviert `examples/` automatisch, keine Änderung nötig |
| `assets/gruene-logo.svg` | Logo-Asset | — | NIEDRIG — kein Verweis, nicht anfassen |
| `LICENSE` | CC BY 4.0 | — | NIEDRIG — Referenz, unverändert |
| `.gitignore` | Inhalt: nur `*.pdf` | — | NIEDRIG — blockiert `examples/` nicht |
| `CHANGELOG.md` | — | **existiert nicht** | **HOCH** — neu anzulegen (D-2) |
| `examples/minimal.html` | — | **existiert nicht** | **HOCH** — neu anzulegen (D-3) |

### Reference Inventory (kritische Forschungsaufgabe — D-1)

Exhaustiver `grep` über `*.html`, `*.css`, `*.md`, `*.yml`, `*.svg`, `*.json`
für `flomotlik`, `claude-code`, `claude` (case-insensitive), `persönlich` /
`personal system` / `persoenlich`.

#### PRODUKTDATEIEN — MÜSSEN entfernt werden (alle in `README.md`)

| Datei | Zeile | Exakter Text | Aktion |
|-------|-------|--------------|--------|
| `README.md` | 22 | `## Verhältnis zum persönlichen System` | Überschrift entfernen (ganzer Abschnitt) |
| `README.md` | 24 | `Als strukturelles Vorbild diente das persönliche Designsystem unter` | Abschnitt entfernen |
| `README.md` | 25 | `<https://flomotlik.github.io/claude-code/> (gehostetes CSS plus sichtbarer` | Abschnitt entfernen — enthält `flomotlik` + `claude-code` |
| `README.md` | 26 | `Style Guide auf GitHub Pages).` | Abschnitt entfernen |
| `README.md` | 28 | `Die beiden Systeme sind klar abgegrenzt:` | Abschnitt entfernen |
| `README.md` | 30 | `- **Persönliches System** (`flomotlik.github.io/claude-code`) — privat, für` | Abschnitt entfernen — enthält `flomotlik` + `claude-code` |
| `README.md` | 31 | `  persönliche Projekte und Reports.` | Abschnitt entfernen |
| `README.md` | 32–33 | `- **Grüne AT Design System** (dieses Repo) — organisationsweit, verbindlich für alle Grüne-AT-Repos und -Tools.` | Abschnitt entfernen (die Abgrenzungs-Bullet wird mit dem Abschnitt gelöscht; die org-Beschreibung steht ohnehin schon in der README-Einleitung Zeilen 3–6) |

**Vollständiger zu löschender Block: `README.md` Zeilen 22–33** (Überschrift
„## Verhältnis zum persönlichen System" bis inkl. der zweiten Bullet, plus die
umgebende Leerzeile). Die Abgrenzungs-Aussage „organisationsweit, verbindlich"
ist bereits redundant zur README-Einleitung (Zeilen 3–6), geht also nicht
verloren.

#### KEINE Treffer in folgenden Produktdateien (verifiziert sauber)

| Datei | Ergebnis |
|-------|----------|
| `index.html` | **0 Treffer** für `flomotlik` / `claude-code` / `claude` / „persönlich" / „personal system". Der Style Guide referenziert das persönliche System nicht. Es ist daher **nichts zu entfernen** — nur der neue Integrations-Abschnitt kommt hinzu. |
| `design-system.css` | **0 Treffer**. Datei-Header (Zeilen 1–17) nennt nur die kanonische `grueneat.github.io`-URL und CC BY 4.0. **Nicht anfassen.** |
| `.github/workflows/pages.yml` | 0 Treffer. |
| `assets/gruene-logo.svg` | 0 Treffer. |
| `LICENSE` | 0 Treffer. |

#### `.issues/` ARTEFAKTE — DÜRFEN NICHT angefasst werden (out of scope, D-1)

Diese Dateien enthalten `flomotlik` / `claude-code` / „persönlich", sind aber
Entwickler-Tooling-Artefakte. Der `<link>` auf
`flomotlik.github.io/claude-code/design-system.css` darin ist **korrekt** — er
folgt dem `artifact-html`-Contract, der bewusst das Tooling-Stylesheet einbindet.
**Vollständig auflisten, damit der Planner sie als Ausschluss kennt:**

| Datei | Art des Treffers |
|-------|------------------|
| `.issues/archive/core-components-layout/RESEARCH.html` | `<link rel="stylesheet" href="https://flomotlik.github.io/claude-code/design-system.css">` (Z. 15) — Contract-konform |
| `.issues/archive/core-components-layout/PLAN.html` | `<link>` auf Tooling-Stylesheet (Z. 15) — Contract-konform |
| `.issues/archive/style-guide-page/RESEARCH.html` | `<link>` (Z. 13) + `flomotlik`-Erwähnung im eingebetteten JSON-Quelltext |
| `.issues/archive/style-guide-page/PLAN.html` | `<link>` auf Tooling-Stylesheet — Contract-konform |
| `.issues/archive/style-guide-page/RESEARCH.md` | Erwähnung des persönlichen Systems als strukturelles Vorbild (Research-Notiz) |
| `.issues/archive/style-guide-page/CONTEXT.md` | „Struktur/Aufbau des persönlichen Systems (`flomotlik.github.io/claude-code/`)" (Z. 36) |
| `.issues/archive/style-guide-page/ISSUE.md` | Erwähnung |
| `.issues/repo-scaffold-github-pages/CONTEXT.md` | Erwähnung |
| `.issues/repo-scaffold-github-pages/ISSUE.md` | Erwähnung |
| `.issues/repo-scaffold-github-pages/PLAN.md` | Erwähnung |
| `.issues/repo-scaffold-github-pages/EXECUTION.md` | Erwähnung |
| `.issues/repo-scaffold-github-pages/RESEARCH.md` | Erwähnung |

**Regel für den Planner:** Jeder Task, der personal-system-Verweise entfernt,
MUSS sich auf Produktdateien beschränken (`README.md`). Ein `grep`/`sed` über
`.issues/` ist ein Fehler. Verifikations-Schritte sollten explizit
`--exclude-dir=.issues --exclude-dir=.git` verwenden.

#### Verifikations-Kommando (nach der Umsetzung — erwartet 0 Treffer)

```bash
grep -rni "flomotlik\|claude-code\|persönlich\|personal system" \
  --include="*.html" --include="*.css" --include="*.md" --include="*.yml" \
  --exclude-dir=.issues --exclude-dir=.git .
# Erwartung: keine Ausgabe.
```

### Interfaces

<interfaces>
// ── README.md — aktuelle Struktur (53 Zeilen, Issue #2) ──────────────────
// Abschnitte in Reihenfolge:
//   # Grüne AT Design System            (Z. 1)   — Titel + Intro (Z. 3–9)
//   ## Einbindung                       (Z. 11)  — <link>-Snippet (Z. 13–20)  → VERFEINERN
//   ## Verhältnis zum persönlichen System (Z. 22) — Z. 22–33               → KOMPLETT LÖSCHEN
//   ## Stand und nächste Schritte       (Z. 35)  — Z. 35–46                 → ERSETZEN (veraltet)
//   ## Lizenz                           (Z. 48)  — CC BY 4.0 (Z. 50–53)     → unverändert
//
// Aktuelles Einbindungs-Snippet (Z. 15–17), kanonische URL bestätigt:
//   <link rel="stylesheet" href="https://grueneat.github.io/design-system/design-system.css">
//
// Veralteter Text in „Stand und nächste Schritte" (FALSCH — zu ersetzen):
//   „design-system.css ist aktuell ein Platzhalter mit Datei-Header,
//    index.html ein Skelett."  → beides nach #3/#4/#5 unwahr.

// ── design-system.css — Datei-Header (Z. 1–17), unveränderter Referenz ───
//   Kanonische URL: https://grueneat.github.io/design-system/design-system.css
//   Lizenz: CC BY 4.0. Urheber: Die Grünen.
//   @import Google Fonts: Barlow Semi Condensed + Vollkorn (Z. 26).
//   Token-Prefix: --gat-  (alle Custom Properties im :root-Block).

// ── design-system.css — öffentliches Klassen-/Token-Vokabular ────────────
//   (Quelle: index.html Spezifikations-JSON #gat-design-spec, Z. 1128 ff.)
//   Tokens:      --gat-color-*, --gat-font-*, --gat-space-*, --gat-radius-*
//   Komponenten (flach, einklassig, gat-präfixiert):
//     gat-section            — vertikaler Block mit CD-Abstandsrhythmus
//     gat-container          — zentrierter Inhaltscontainer
//     gat-header / gat-header__inner / gat-header__logo / gat-header__logo-mark
//     gat-nav / gat-nav__link / gat-nav__link--active
//     gat-headline           — Headline (H1-Rolle), Barlow Black 900
//     gat-subline            — Subline, Barlow Semibold 600
//     gat-fliesstext         — Fließtext, Barlow Regular 400
//     gat-emphasis           — Hervorhebung/Zitat, Vollkorn Black-Kursiv
//     gat-btn / gat-btn--primary / gat-btn--secondary   (Modifier Pflicht)
//     gat-card / gat-card--primary / gat-card--secondary (Modifier Pflicht)
//     gat-card__title / gat-card__body
//     gat-underline          — CD-Unterstreichung magenta
//     gat-highlight          — gelbe Marker-Fläche
//     gat-stoerer / gat-stoerer--gelb / gat-stoerer--magenta
//   Regeln: keine nackten Tag-Selektoren; design-system.css setzt KEINE
//   Tag-Defaults — konsumierende Seiten müssen body-Grundlayout selbst setzen
//   (siehe index.html <style>-Block Z. 22–28: body margin/background/color/
//   font-family explizit, sonst rendert die Seite serif & ohne Spacing).

// ── index.html — Seitenstruktur (1244 Zeilen, Issue #5) ──────────────────
//   <head>: <link rel="stylesheet" href="design-system.css">  (RELATIV — Z. 7)
//   <style>-Block (Z. 8–~300): doc-präfixierte Doku-Möbel (CONTEXT #5 D-2)
//   <body id="top">:
//     <header class="gat-header"> … <nav class="gat-nav"> (Anchor-TOC, Z. 305)
//     <section class="gat-section"> Einleitung (Z. 322–342)
//     #farben (Z. 347) / #typografie (Z. 505) / #layout (Z. 676) /
//     #komponenten (Z. 850) / #cd-layout (Z. 1015) / #spezifikation (Z. 1105)
//     <script type="application/json" id="gat-design-spec"> (Z. 1128) —
//       maschinenlesbares Vokabular (CONTEXT #5 D-1)
//     <footer class="gat-section doc-footer"> (Z. ~1230)
//   Nav-Links (Z. 311–316): #farben #typografie #layout #komponenten
//     #cd-layout #spezifikation
//   → Neuer Integrations-Abschnitt: eigene <section> + neuer gat-nav__link.
//     id-Vorschlag: #einbindung oder #integration.

// ── .github/workflows/pages.yml — Deploy-Vertrag ─────────────────────────
//   upload-pages-artifact@v5 mit  path: '.'  → das GANZE Repo wird publiziert.
//   ⇒ examples/minimal.html ist automatisch erreichbar unter
//     https://grueneat.github.io/design-system/examples/minimal.html
//   Trigger: push auf main + workflow_dispatch. KEINE Workflow-Änderung nötig.

// ── examples/minimal.html — NEU, Vertrag für die Datei ───────────────────
//   Eigenständige HTML-Seite, die ausschließlich die GEHOSTETE CSS einbindet:
//     <link rel="stylesheet"
//           href="https://grueneat.github.io/design-system/design-system.css">
//   (absolute URL — NICHT relativ, sonst dogfooded sie das Hosting nicht).
//   Setzt body-Grundlayout selbst (design-system.css setzt keine Tag-Defaults).
//   Verwendet echte gat-Komponenten: gat-header/gat-nav, gat-section/
//   gat-container, gat-headline/gat-subline/gat-fliesstext, gat-btn, gat-card.
//   lang="de". Kein eigenes Asset, kein Build.

// ── CHANGELOG.md — NEU, Vertrag für die Datei (D-2) ──────────────────────
//   Format: „Keep a Changelog" 1.1.0 + Semantic Versioning 2.0.0.
//   Start-Eintrag [1.0.0] - 2026-05-22 fasst #2–#5 zusammen.
//   README verlinkt darauf relativ: [CHANGELOG.md](CHANGELOG.md).
</interfaces>

### Reusable Components

- **`examples/minimal.html` baut NICHTS neu nach** — es verwendet ausschließlich
  die existierenden `gat-`-Klassen aus der gehosteten `design-system.css`. Das
  vorhandene `index.html` (Style Guide) ist die Referenz für korrektes Markup
  jeder Komponente; der `#komponenten`-Abschnitt zeigt Copy-Paste-Snippets.
- Der `<style>`-Block in `index.html` (Z. 22–28) zeigt das **Pflicht-Pattern**,
  das `examples/minimal.html` übernehmen muss: `body { margin; background:
  var(--gat-color-surface); color: var(--gat-color-text); font-family:
  var(--gat-font-copy); }`. Ohne das rendert eine konsumierende Seite serif und
  ohne Layout — genau der Punkt, den das Beispiel demonstrieren muss.
- README-Einbindungs-Snippet (Z. 15–17) ist bereits korrekt — es wird nur
  ergänzt (Hinweis auf das Beispiel + body-Defaults-Hinweis + Update-Strategie),
  nicht ersetzt.

### Potential Conflicts

- **Kein git-Konflikt zu erwarten:** Alle Änderungen sind additiv oder isoliert
  (README-Abschnitt, zwei neue Dateien, ein neuer `index.html`-Abschnitt). Keine
  offenen PRs auf diese Dateien (`git log`: letzter Commit `bd74588`,
  style-guide-page archiviert).
- **`index.html`-Nav-Konsistenz:** Wird ein Integrations-Abschnitt mit eigener
  `<section id="…">` ergänzt, MUSS ein passender `gat-nav__link` in den Nav-Block
  (Z. 310–317) aufgenommen werden, sonst ist der TOC unvollständig. Der
  `gat-nav__link--active`-Modifier steht aktuell auf `#farben` — Reihenfolge
  beachten.
- **`#spezifikation`-JSON nicht anfassen:** Der `<script type="application/json"
  id="gat-design-spec">`-Block (Z. 1128 ff.) ist die maschinenlesbare Spec aus
  #5. Ein Integrations-Abschnitt ist menschliche Doku und gehört NICHT in dieses
  JSON.
- **`.DS_Store` im Repo-Root** (6 KB, getrackt?) — irrelevant für dieses Issue,
  nicht im Scope, nicht anfassen.

### Code Patterns in Use

- **Deutschsprachig durchgehend** — README, `index.html`, CSS-Kommentare,
  Commit-Messages, sogar Workflow-Step-Namen sind deutsch. `CHANGELOG.md` und
  `examples/minimal.html` müssen ebenfalls deutsch sein.
- **`gat-`-Präfix** für alle Designsystem-Klassen; **`doc-`-Präfix** für
  Doku-Möbel in `index.html`. `examples/minimal.html` braucht idealerweise gar
  keine eigenen Klassen — wenn doch (z. B. minimaler `<style>` für body), dann
  klar abgegrenzt und kommentiert.
- **Commit-Konvention:** `<typ>(<scope>): <beschreibung>` auf Deutsch, z. B.
  `docs(readme): …`, `docs(changelog): Erstfassung`. Keine Tool-Attribution
  (Memory: `feedback_no_claude_attribution`).
- **Datei-Header-Kommentare:** `design-system.css` und `index.html` tragen
  ausführliche Kopf-Kommentare mit Zweck + kanonischer URL + Lizenz. Eine neue
  `examples/minimal.html` sollte einen knappen erklärenden Kopf-Kommentar haben.

## Standard Stack

Reine Doku-/Statik-Arbeit — kein Build, keine Laufzeit-Abhängigkeiten, keine
npm-Pakete. Der „Stack" ist eine Format-/Konventionswahl:

| Artefakt | Format / Standard | Version | Begründung | Confidence |
|----------|-------------------|---------|------------|------------|
| `CHANGELOG.md` | Keep a Changelog | 1.1.0 | De-facto-Standard für menschenlesbare Changelogs; explizit in D-2 als Kandidat genannt und hier bestätigt. Klare Sektions-Konvention (Added/Changed/Deprecated/Removed/Fixed/Security), `[Unreleased]`-Block, Versions-Links am Dateiende. | HIGH |
| Versionsschema | Semantic Versioning | 2.0.0 | Komplement zu Keep a Changelog; D-2 verlangt „eine Versionsnummer … Breaking Changes angekündigt" — MAJOR.MINOR.PATCH bildet das direkt ab. Für ein CSS-Designsystem: MAJOR = entfernte/umbenannte Klassen oder Tokens, MINOR = neue Komponenten/Tokens, PATCH = Wert-Korrekturen ohne API-Wirkung. | HIGH |
| `examples/minimal.html` | Reines HTML5 + gehostete CSS | — | Dogfooding-Anforderung D-3; kein Framework, kein Build (Memory: `feedback_simple_stack_for_tests` — simpler Stack für Demos). | HIGH |
| Hosting | GitHub Pages, `actions/upload-pages-artifact@v5`, `path: '.'` | bereits konfiguriert | `pages.yml` publiziert das gesamte Repo; `examples/` wird ohne Workflow-Änderung erreichbar. | HIGH |

### Keep a Changelog 1.1.0 — Startinhalt (konkreter Vorschlag)

```markdown
# Changelog

Alle nennenswerten Änderungen am Grüne AT Design System werden in dieser Datei
dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.1.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/lang/de/).

Konsumierende Tools binden immer die aktuelle gehostete `design-system.css` ein
(siehe README). Diese Datei zeigt, was sich zwischen den Ständen geändert hat —
insbesondere Breaking Changes (MAJOR-Versionssprünge).

## [Unreleased]

## [1.0.0] - 2026-05-22

### Added
- Design-Tokens aus dem Corporate Design der Grünen Österreich: Farben,
  Typografie (Barlow Semi Condensed, Vollkorn), Abstände, Radien — als
  `--gat-*`-CSS-Custom-Properties.
- UI-Komponenten: `gat-header`/`gat-nav`, `gat-section`/`gat-container`,
  Typografie-Klassen, `gat-btn`, `gat-card`, CD-Layout-Elemente
  (`gat-underline`, `gat-highlight`, `gat-stoerer`).
- Sichtbarer Style Guide unter `index.html` mit maschinenlesbarer
  Spezifikation.
- Einbindungs-Anleitung und Minimal-Beispiel (`examples/minimal.html`).

[Unreleased]: https://github.com/GrueneAT/design-system/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/GrueneAT/design-system/releases/tag/v1.0.0
```

> **Hinweis zu den Versions-Links am Dateiende:** Sie verweisen auf
> `compare/`- und `releases/tag/`-URLs. Es existieren aktuell **keine
> git-Tags** im Repo (`git tag -l` leer). Diese Links funktionieren erst, wenn
> ein Tag `v1.0.0` gesetzt bzw. ein Release angelegt wird — siehe **Open
> Questions**. Bis dahin sind sie korrekt formatiert, aber 404. Alternative:
> die Versions-Links zunächst weglassen und mit dem ersten Tag nachziehen.

### `examples/minimal.html` — Inhaltsvorschlag (was es enthalten muss)

Damit es das System *echt* dogfooded:

1. `<!doctype html>`, `<html lang="de">`, `<meta charset>`, `<meta viewport>`.
2. **Genau eine** Stylesheet-Einbindung — die **absolute, gehostete** URL:
   `<link rel="stylesheet" href="https://grueneat.github.io/design-system/design-system.css">`.
   Keine relative `design-system.css` (das würde nur lokal funktionieren und
   das Hosting nicht demonstrieren).
3. Minimaler `<style>`-Block, der **nur** body-Grundlayout setzt
   (`margin`, `background: var(--gat-color-surface)`, `color`, `font-family:
   var(--gat-font-copy)`) — mit Kommentar, dass `design-system.css` bewusst
   keine Tag-Defaults setzt. Das ist die wichtigste „Gotcha"-Demonstration.
4. Echte Komponenten in einer plausiblen Tool-Seite: `gat-header` + `gat-nav`,
   eine `gat-section`/`gat-container`-Hülle, `gat-headline` + `gat-subline` +
   `gat-fliesstext`, mindestens ein `gat-btn--primary`/`gat-btn--secondary`,
   eine `gat-card--primary`/`gat-card--secondary`.
5. Ein erklärender Kopf-Kommentar: „Vollständiges Minimal-Beispiel eines
   konsumierenden Grüne-AT-Tools …".
6. Kein JavaScript nötig; kein zweites Asset; eine Datei.

### Alternatives Considered

| Statt | Möglich | Tradeoff |
|-------|---------|----------|
| Keep a Changelog | Freiform-Changelog / nur git-Log | git-Log ist nicht kuratiert und für Konsumenten unbrauchbar; Keep a Changelog ist erwartbar und SemVer-kompatibel. Kein Grund abzuweichen. |
| SemVer | Datums-Versionierung (CalVer) | CalVer kommuniziert keine Breaking Changes — D-2 verlangt aber explizit Breaking-Change-Ankündigung. SemVer gewinnt. |
| `examples/minimal.html` mit absoluter Hosted-URL | Relative `../design-system.css` | Relativ würde das Hosting NICHT dogfooden und Konsumenten ein falsches Muster zeigen. Absolute URL ist Pflicht (D-3-Intention). |
| Versionierte URL (`/v1/design-system.css`) | — | Per D-2 ausdrücklich ausgeschlossen — feste Latest-URL. Nicht weiter betrachtet. |

## Don't Hand-Roll

| Problem | Nicht bauen | Stattdessen | Warum |
|---------|-------------|-------------|-------|
| Changelog-Struktur | Eigenes Changelog-Schema erfinden | Keep a Changelog 1.1.0 Sektionen | Etablierter Standard; Konsumenten kennen ihn. |
| Versionsschema | Eigene Versionslogik | SemVer 2.0.0 | Bildet Breaking/Feature/Fix direkt ab. |
| Beispiel-Styling | Eigene CSS-Regeln in `examples/minimal.html` | Echte `gat-`-Klassen aus der gehosteten CSS | Das IST der Sinn des Beispiels — Dogfooding. Eigenes CSS außer minimalem body-Layout untergräbt den Zweck. |
| Versionsnummer im CSS | Versionskommentar mit jedem Edit pflegen | Version lebt in `CHANGELOG.md` | Eine Quelle der Wahrheit; CSS-Header muss nicht synchron gehalten werden. (Optional: ein `--gat-version`-Token — siehe Open Questions.) |
| Pages-Routing für `examples/` | Workflow anpassen / eigene Deploy-Logik | Nichts tun | `path: '.'` publiziert `examples/` bereits automatisch. |

## Architecture Patterns

### Recommended Approach

Sechs abgegrenzte Arbeitspakete, klar trennbar:

1. **`README.md` — personal-system-Abschnitt entfernen.** Zeilen 22–33
   (Überschrift „## Verhältnis zum persönlichen System" bis Ende des Abschnitts,
   inkl. umgebender Leerzeile) ersatzlos löschen. Die Abgrenzung „verbindlich für
   alle Grüne-AT-Repos" ist bereits in der Einleitung (Z. 3–6) abgedeckt.
2. **`README.md` — „Stand und nächste Schritte" ersetzen.** Der veraltete
   Abschnitt (Z. 35–46, behauptet Platzhalter-CSS/Skelett) wird durch einen
   kurzen, korrekten Stand ersetzt: Designsystem ist produktiv, Tokens +
   Komponenten + Style Guide sind vorhanden; Verweis auf `CHANGELOG.md` für
   Änderungen. Alternativ ganz streichen und Inhalt in einen
   „Versionierung"-Abschnitt überführen.
3. **`README.md` — Einbindungs-Abschnitt verfeinern.** Bestehendes `<link>`-
   Snippet behalten; ergänzen: (a) Hinweis, dass `design-system.css` keine
   Tag-Defaults setzt → konsumierende Seite muss body-Grundlayout selbst setzen;
   (b) Verweis auf `examples/minimal.html` (lokal + Live-Pages-URL); (c)
   Update-Strategie: feste Latest-URL ⇒ automatische Aktualisierung, Änderungen
   in `CHANGELOG.md`, Breaking Changes als MAJOR-Sprung.
4. **`CHANGELOG.md` neu anlegen** im oben gezeigten Keep-a-Changelog-Format,
   Startstand `[1.0.0]`.
5. **`examples/minimal.html` neu anlegen** nach dem Inhaltsvorschlag oben.
6. **`index.html` — knapper Integrations-Abschnitt.** Neue `<section
   class="gat-section" id="einbindung">` (Platzierung: nach der Einleitung oder
   vor dem Footer) mit dem `<link>`-Snippet (als `doc-codeblock`), Verweis auf
   `examples/minimal.html` und `CHANGELOG.md`; passenden `gat-nav__link` in den
   Nav-Block aufnehmen. **Kein** personal-system-Verweis vorhanden — nichts zu
   entfernen.

### Anti-Patterns to Avoid

- **`.issues/`-Artefakte anfassen.** Ein repo-weites `sed`/`grep` über
  `flomotlik` ohne `--exclude-dir=.issues` würde Tooling-Artefakte beschädigen.
  Streng auf Produktdateien beschränken.
- **`design-system.css` editieren.** Sie enthält keinen personal-system-Verweis
  und ist per CONTEXT inhaltlich unverändert zu lassen.
- **Relative CSS-Einbindung im Beispiel.** `examples/minimal.html` MUSS die
  absolute Hosted-URL einbinden, sonst dogfooded es das Hosting nicht.
- **Integrations-Doku ins `#gat-design-spec`-JSON schreiben.** Das JSON ist
  maschinenlesbares Komponenten-Vokabular, keine Prosa.
- **Nav-Link vergessen.** Ein neuer `index.html`-Abschnitt ohne passenden
  `gat-nav__link` macht den Anchor-TOC inkonsistent.
- **Englisch schreiben.** Das gesamte Repo ist deutschsprachig.
- **Tool-Attribution** in Commits/Dateien (Memory-Vorgabe).

## Common Pitfalls

### `.issues/`-Treffer mitlöschen
**Was schiefgeht:** Ein naives `grep -rl flomotlik | xargs sed -i …` ändert auch
12 Artefakt-Dateien unter `.issues/`, deren `flomotlik`-`<link>` korrekt ist.
**Warum:** Der Suchbegriff kommt in beiden Welten vor.
**Vermeidung:** Immer `--exclude-dir=.issues --exclude-dir=.git`. Die Änderung
betrifft ausschließlich `README.md`.
**Warnsignal:** `git status` zeigt geänderte Dateien unter `.issues/`.

### Beispielseite rendert serif / ohne Layout
**Was schiefgeht:** `examples/minimal.html` lädt die CSS, sieht aber falsch aus.
**Warum:** `design-system.css` setzt bewusst KEINE Tag-Defaults (keine
`body`-Regel) — siehe `index.html`-`<style>` Z. 22–28.
**Vermeidung:** `examples/minimal.html` setzt `body`-Grundlayout selbst
(`margin`, `background`, `color`, `font-family` aus `--gat-*`-Tokens). Diese
„Gotcha" sollte das Beispiel sogar bewusst kommentieren.
**Warnsignal:** Seite zeigt Times New Roman, kein Hintergrund, kein Spacing.

### CHANGELOG-Versions-Links zeigen ins Leere
**Was schiefgeht:** Die `[1.0.0]:`/`[Unreleased]:`-Links am Dateiende sind 404.
**Warum:** Es existieren keine git-Tags / GitHub-Releases (`git tag -l` leer).
**Vermeidung:** Entweder beim Issue-Abschluss ein Tag `v1.0.0` setzen, oder die
Versions-Link-Zeilen zunächst weglassen und mit dem ersten Release nachziehen.
**Warnsignal:** Klick auf die Version im gerenderten Changelog führt zu 404.

### README behält falschen Stand
**Was schiefgeht:** „Stand und nächste Schritte" bleibt unkorrigiert und
behauptet weiter Platzhalter-CSS.
**Warum:** Der Abschnitt ist leicht zu übersehen, weil er thematisch nicht zur
Einbindung gehört.
**Vermeidung:** Explizit als eigenes Arbeitspaket führen (Schritt 2 oben).
**Warnsignal:** README erwähnt nach Umsetzung noch „Skelett" / „Platzhalter" /
„Issue #3/#4/#5".

### `index.html`-Abschnitt ohne Nav-Eintrag
**Was schiefgeht:** Neuer Integrations-Abschnitt, aber TOC kennt ihn nicht.
**Vermeidung:** `gat-nav__link` in Z. 310–317 mit aufnehmen.
**Warnsignal:** Die Nav springt nicht zum neuen Abschnitt.

## Environment Availability

| Dependency | Benötigt von | Verfügbar | Version | Fallback |
|------------|--------------|-----------|---------|----------|
| Keine Build-Tools | — | n/a | — | Reine Statik, kein Build |
| `git` | Commits | ja | — | — |
| GitHub Pages Workflow | Live-Vorschau `examples/` | konfiguriert (`pages.yml`) | `actions/*@v5/v6` | — |
| Browser | Sichtprüfung `examples/minimal.html` | beim Reviewer | — | — |

Hinweis: Dieses Issue erzeugt keine Laufzeit-Abhängigkeiten. Verifikation =
Browser-Sichtprüfung + der oben angegebene `grep`-Check (erwartet 0 Treffer).

## Project Constraints (from CLAUDE.md)

Es existiert **keine workspace-lokale `./CLAUDE.md`** im Repo
`/workspace/design-system/` und kein `.claude/skills/`-Verzeichnis. Maßgeblich
sind daher die User-Memory-Vorgaben:

- **Keine Tool-/„claude"-Attribution** in Commits, Code oder Dateinamen
  (`feedback_no_claude_attribution`) — der User exponiert seine Werkzeuge nicht
  gegenüber Dritten; das Repo ist öffentlich. Diese Vorgabe verstärkt D-1
  unabhängig.
- **Simpler Stack für Demos/Beispiele** (`feedback_simple_stack_for_tests`) —
  `examples/minimal.html` bleibt reines HTML, kein Framework.
- **Issue-Artefakte nie löschen** (`feedback_preserve_issue_artifacts`) —
  deckt sich mit D-1: `.issues/` bleibt unangetastet.
- Das gehostete `flomotlik.github.io/claude-code`-Stylesheet IST das
  Tooling-Designsystem aus der User-Memory (`reference_flomotlik_design_system`)
  — es ist legitim in den `.issues/`-Artefakt-HTMLs, gehört aber nicht ins
  öffentliche org-Produkt.

## Sources

### HIGH confidence
- Codebase-Analyse: `README.md`, `index.html`, `design-system.css`,
  `.github/workflows/pages.yml`, `.gitignore` direkt gelesen.
- Reference-Inventur: exhaustiver `grep -rni` über alle `*.html/*.css/*.md/
  *.yml/*.svg/*.json`, getrennt nach Produkt vs. `.issues/`.
- `git log` / `git tag -l` / `git remote -v` — Repo-Zustand verifiziert.
- `artifact-html`-Contract (`/opt/claude-config/templates/artifact-html.md`)
  für die RESEARCH.html-Emission.
- CONTEXT.md D-1/D-2/D-3 — bindende Entscheidungen.

### MEDIUM confidence
- Keep a Changelog 1.1.0 / SemVer 2.0.0 als Standards — etabliert und
  trainingsbekannt; konkrete Spezifikationsdetails nicht gegen die Live-Sites
  geprüft (Format ist seit Jahren stabil).
- GitHub-Pages-Verhalten bei `path: '.'` — Standardverhalten von
  `upload-pages-artifact`, hier aus der Workflow-Datei abgeleitet, nicht durch
  einen Live-Deploy verifiziert.

### LOW confidence (needs validation)
- Keine. Alle Befunde sind durch Codebase-Lesung oder Contract belegt.

## Metadata

**Confidence breakdown:**
- Reference-Inventur: HIGH — vollständiger grep, eindeutiges Ergebnis (nur
  `README.md` betroffen; `index.html`/`css` sauber).
- Codebase-Struktur: HIGH — alle relevanten Dateien gelesen.
- Changelog-Format: MEDIUM — Standard trainingsbekannt, Detail-Spec nicht live
  gegengeprüft.
- Pages-Serving von `examples/`: MEDIUM — aus `path: '.'` abgeleitet.

**Research date:** 2026-05-22
**Sub-agents used:** keine — Single-Pass; Issue eng umrissen, reine
Doku-/Statik-Arbeit, leichte Tiefe ausreichend.
**Raw research files:** keine separaten — Befunde direkt in dieser Datei.

## Open Questions

Vom User vor/in der Planung zu klären:

1. **Start-Versionsnummer.** Vorschlag `1.0.0` (Designsystem ist produktiv nach
   #2–#5). Alternativ `0.1.0`, falls die API noch als instabil gelten soll.
   **Empfehlung: `1.0.0`** — die Klassen-API ist in `index.html` als Spec
   eingefroren.
2. **git-Tag / GitHub-Release `v1.0.0`?** Damit die `CHANGELOG.md`-Versions-Links
   (`compare/`, `releases/tag/`) funktionieren, braucht es ein Tag. Soll dieses
   Issue ein `v1.0.0`-Tag setzen, oder die Links zunächst weglassen und später
   nachziehen? **Empfehlung:** Links jetzt korrekt formatiert aufnehmen und beim
   Issue-Abschluss ein `v1.0.0`-Tag setzen.
3. **Versionsnummer auch im CSS sichtbar machen?** Optional ein
   `--gat-version: "1.0.0";`-Token oder eine Zeile im `design-system.css`-
   Header. CONTEXT sagt „`design-system.css` wird inhaltlich nicht verändert" —
   daher **Empfehlung: nicht** im CSS; Version lebt nur in `CHANGELOG.md`.
4. **Platzierung des Integrations-Abschnitts in `index.html`** — direkt nach der
   Einleitung (prominent) oder kurz vor dem Footer (nach dem inhaltlichen Teil)?
   **Empfehlung:** vor dem Footer, da der TOC fachlich von Farben → Spezifikation
   läuft und Einbindung eher Anhang-Charakter hat. Reine Stilfrage.
</content>
</invoke>
