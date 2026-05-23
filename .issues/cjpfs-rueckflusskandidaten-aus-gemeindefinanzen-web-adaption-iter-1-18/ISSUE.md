---
id: cjpfs
title: Rueckflusskandidaten aus gemeindefinanzen-Web-Adaption (Iter 1-18)
status: done
priority: medium
labels:
- discovery
remote:
- source: github
  id: '11'
  url: https://github.com/GrueneAT/design-system/issues/11
---

Discovery/Triage-Issue. **Keine Implementation** in diesem Ticket — Aufgabe ist, die in der `gemeindefinanzen`-App erprobten Erweiterungen gegen den aktuellen Stand des org-weiten DS zu spiegeln und in priorisierte Folge-Issues zu schneiden.

## Quellen

- **`gemeindefinanzen/docs/web-design-system.md`** (895 Zeilen, 18 Iterationen). Die App ist explizit als „Labor" fuer das org-weite DS angelegt (Leitsatz, oben im Dokument).
- **`notes/gruene-at-analysis.md`** (in diesem Issue-Ordner) — tiefe Live-Analyse von `gruene.at` als Referenz-Konsument: Stack (WordPress + Sage + Tailwind v4), Tokens, Komponenten-Pattern, A11y-Mechanik (`high-contrast:`-Variant). Liefert zusaetzliche Triage-Kandidaten **G–J** (siehe unten) plus einen langfristigen Spike **K**.

**Kontext:** das Gruene-AT-DS ist heute druck-/plakatpraegt (vollgesaettigte Markenfarben auf Weiss). Fuer eine Datenanwendung mit langen Lesestrecken zu anstrengend. Die gemeindefinanzen-App hat eine **entsaettigte, web-taugliche Auslegung** entwickelt — Token, Komponenten, Patterns. Dieses Issue klaert, was davon ins zentrale DS gehoert.

## Rueckfluss-Kandidaten (Triage-Backlog)

### A. Token & Palette
- Entsaettigte `--web-*`-Token-Schicht (Flaeche/Text/Akzent) als parallele Web-Schicht zu den bestehenden `--gat-*`-Token. Grundton `#f3f5f0` (weich gruenstichig), Karten `#ffffff`, gesenkte Zonen `#f7f9f4`.
- 8-Ton-Chart-Palette, kategorial, niedrige Saettigung (kein vollgesaettigtes Magenta/Hellgruen). Mit semantischen Rollen (Ertraege/Personal/Sachaufwand/Risiko/Transfers/Netto).
- WCAG-AA-Haertung: `--web-text-mute` auf `#6b6f63` (war zu hell), neuer `--web-clay-text` `#9c5a38` fuer Risiko-/Fehler-Text.

### B. Komponenten (neu / erweitert)
- `.web-shell` — zentrierter Container mit `min(2040px, 94vw)` als `--web-page-max`-Token (statt fester 1180px). Fliesstext-Caps `~70rem` je Komponente.
- `.metric-card` — Kennzahlen-Karte mit semantischen Akzent-Modifiern (`--ertrag`/`--aufwand`/`--netto`) und `.metric-card--hero`.
- `.web-panel` — Inhalts-/Diagrammrahmen mit `__head` / `__head-row` (Titel + Aktions-Knopf) / `__body` / `__body--table` / `__note`.
- `.web-callout` — Hinweis-Panel mit gruenem Linksrand, kein vollflaechiges Knallgruen.
- `.web-brandbar` — Header nach gruene.at-Muster (weisse Flaeche, prominentes Logo, gruene Akzentlinie als Separator) statt dunkelgruenem Block.
- `.web-section-head`, `.web-hero` — Sektions- und Auftakt-Einheiten mit ruhigem vertikalen Rhythmus.

### C. Typografie & Rhythmus
- Ruhigere Headline-Skala: `h1` 800, `h2`/`h3` 700 (statt durchgehend 900 — Barlow Semi Condensed wirkt sonst „schreiend").
- Lesbare Mindestgroessen fuer Tableiste (`1.08rem`) und Umschalter (`0.98rem`).
- Diagrammschrift-Floor 15px (Achsen/Legende/Tooltip/Datenlabels), 14px Wertachse.

### D. Patterns
- Gemeinsamer `:focus-visible`-Ring mit `--web-focus-ring` + `--web-focus-offset`-Token fuer buendige Elemente (Reiter, Sortierkoepfe).
- Globaler `prefers-reduced-motion`-Block (Transitions/Animationen auf ~0).
- `@media print`-Stylesheet fuer Datenwerkzeuge (Bedienelemente ausblenden, Karten/Panels ohne Schatten, `break-inside: avoid` auf Panels).
- Diagramm-Vollbild ueber native Fullscreen-API + Knopf im Panel-Kopf (mit `requestFullscreen()`/`fullscreenchange` und Resize-Stoss).
- Overlay-Pattern: Fokus-Trap, Esc, Backdrop-Click.
- Plan/Ist-Konvention fuer Charts: Decal-Schraffur fuer VA, solide fuer RA; Ring- vs. gefuellte Punkte. Optional als DS-Konvention, wenn andere Tools Zeitreihen mit Plan/Ist zeigen.
- Folder-Tab-Pattern: aktiver Reiter mit gruener Unterkante als `inset`-Schatten, geht buendig in die Panel-Flaeche ueber.

### E. Header & Marke
- gruene.at-Referenz-Analyse als Vorbild aufgenommen: weisse Flaeche statt Dunkelgruen-Block, prominentes vollfarbiges Logo (per CDN — `grueneat.github.io/design-system/assets/gruene-logo.svg`, **nicht** ins Repo kopieren), gruene Navigation, duenne gruene Akzentlinie.
- Bewusst **nicht** uebernommen: Magenta-CTAs und vollflaechige Knall-Baender — fuer Lese-/Analyseanwendungen zu unruhig.

### F. Befunde / blockiert
- `.web-tag` (Pill/Badge) in der App nicht umsetzbar, weil das vendorisierte `dashboard.js` die Tabellenwerte als Klartext rendert (kein klassifizierbarer Anker). Wenn das DS Pills definiert, muss die nutzende Stelle die Werte in `<span class="web-tag ...">` wickeln. **Kein Vendoring** als Loesung — DS-Pill via gehostetes CSS plus Anpassung in der nutzenden App.

### G. A11y-Mode-Token `--gat-*-hc` (high-contrast Modus-Toggle)
Quelle: gruene.at-Analyse. Parallele High-Contrast-Farbschicht ueber `body.gat-mode-hc`-Toggle (gruene.at macht das ueber Tailwind-`high-contrast:`-Variant; wir realisieren ueber Custom-Property-Inheritance ohne Tailwind-Dependency). Vorbild-Farben: schwarz + magenta + gelb statt der normalen Palette. Optionaler Modus, keine Default-Aenderung fuer Konsumenten.

### H. Skip-Link-Pattern
Quelle: gruene.at-Analyse. Standardisierter Skip-to-Main-Link mit `focus:top-0`-Verhalten als `.gat-skiplink`-Komponente. Heute im DS nicht vorhanden, trivial zu ergaenzen, hoher A11y-Wert.

### I. Fixed-Header-Konvention
Quelle: gruene.at-Analyse. Konvention fuer Tools mit fixiertem Header: Header ist `pointer-events-none`, interaktive Kinder `pointer-events-auto`; `html { scroll-padding-top: ${header-height}; }`. Loest das „Klick durch den Header gesperrt"- und Anchor-Scroll-Problem. Low Prio (gemeindefinanzen hat heute keinen fixed Header — relevant fuer andere Konsumenten).

### J. `hyphens: auto` auf Headline-Klassen
Quelle: gruene.at-Analyse. Verbessert deutsche Komposita („Aufgabenbereichsuebersicht"). Trivial, additiv, low Prio.

### K. Tailwind-v4-Adoption
Quelle: gruene.at-Analyse. **Strategische 2.0-Kandidat**. gruene.at ist auf Tailwind v4 mit `@theme` (Token-Definition direkt in CSS) und Variant-System (z. B. `high-contrast:bg-yellow`). Adoption wuerde:
- Token-Definition aus haendischen `:root`-Bloecken in einen `@theme`-Block ueberfuehren (kompatibel zu unserer `--gat-*`-Konvention)
- Variant-Praefixe ermoeglichen (saubere Loesung fuer Kandidat G — `gat-mode-hc:bg-yellow` statt Custom-Property-Inheritance)
- Utility-First-Klassen liefern (Konsumenten brauchen weniger eigenen CSS)
- Den Build umstellen (heute: statisches Stylesheet ohne Build-Schritt; mit Tailwind: PostCSS/Lightning-CSS-Build vor dem GitHub-Pages-Deploy)

**Auswirkung:** Major-Breaking, koppelt mit allen anderen 2.0-Kandidaten. Die Folge-Issue-Liste muss Reihenfolge klaeren (Tailwind-Build zuerst, dann Token-Migration, dann Komponenten-Refactor — oder anders).

## Triage-Aufgabe

Pro Kandidat (A–K oben) entscheiden:

1. **Aufnehmen ins org-DS?** (ja / nein / spaeter)
2. **Form:** neue Token-Schicht parallel zu `--gat-*`, Erweiterung der bestehenden Token, oder eigenes Modul.
3. **Auswirkung auf andere Gruene-Tools:** wer nutzt das DS heute, was bricht (Migrations-Bedarf)?
4. **Folge-Issue** mit Scope, Akzeptanzkriterien und Prioritaet anlegen.

## Constraints

- **Kein Vendoring.** Externe Abhaengigkeiten (inkl. Logos, ECharts, Schriften) bleiben gehostet/per CDN. Keine Kopien in `design-system/` oder Konsumenten-Repos. Auch nicht „voruebergehend".
- **Keine Werkzeug-Attribution** in Commits/Code.
- Bestehende `--gat-*`-Token-Konsumenten duerfen nicht stillschweigend brechen — entweder Migration mitliefern oder parallele `--web-*`-Schicht.

## Definition of Done (dieses Issue)

- [ ] Jeder Kandidat A–K gesichtet (kurz dokumentiert: aufnehmen / verwerfen / spaeter, mit Begruendung). K (Tailwind) ist als strategischer 2.0-Treiber im Scope und beeinflusst die Reihenfolge der anderen Kandidaten.
- [ ] Fuer jeden „aufnehmen"-Kandidat ein Folge-Issue mit Scope + Prio angelegt.
- [ ] Reihenfolge der Folge-Issues festgehalten (Roadmap-Skizze).
- [ ] Dieses Issue verweist auf alle Folge-Issues und wird geschlossen — keine eigene Implementation in diesem Ticket.
