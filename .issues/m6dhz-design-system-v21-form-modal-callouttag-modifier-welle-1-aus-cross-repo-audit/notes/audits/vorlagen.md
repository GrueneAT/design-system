# vorlagen — DS-v2.0-Audit

## App-Zweck (1-2 Saetze)

Astro-Galerie (GitHub Pages) fuer Scribus-Druckvorlagen der Gruenen Niederoesterreich — Flyer A6, Falzflyer/Leporellos, Plakate A1, Postkarten, Zeitungen, Tueranhaenger, Tischschilder. Sekundaerseiten: Schriften-Vergleich/-Entscheidung und Design-Experimente (Click-to-rank Voting auf LLM-generierten Layout-Hypothesen).

## Aktuelle DS-Anbindung

- **DS-CSS-Link:** **nein** — kein `<link rel="stylesheet" href="…design-system.css">`. Styling komplett ueber inline `<style is:global>` in `site/src/layouts/Base.astro` + Inline-`style="…"`-Attribute auf praktisch jedem Element.
- **DS-Logo-Asset:** **nein** — kein Bezug auf `gruene-logo.svg`. Header zeigt nur Wortmarke "Gruene Vorlagen NOE" als `<h1>`, kein Bildlogo.
- **gat-charts.js:** **nein** — keine Charts, nicht relevant.
- **Verwendet schon:** keine `.gat-*`-Klassen, keine `--gat-*`-Tokens. Null DS-Anbindung.
- **Verwendet noch lokale Alt-Klassen / Eigenes:**
  - Eigene CSS-Vars in `Base.astro:12-20`: `--gruen-dunkel #2a734f`, `--gruen-hell #6abf2c`, `--gelb #ffeb00`, `--magenta #e6177e`, `--bg #fafafa`, `--text #222`, `--muted #666`.
  - Lokale Komponenten-Klassen (Voting/Schriften): `.preview-link`, `.variant-card`, `.checkmark`/`.checkmark-visual`/`.position-badge`, `.ranked-row`, `.drag-handle`, `.arrow-up`/`.arrow-down`/`.remove-btn`, `.thumbnail`, `.title`, `.rank-empty`, `.vote-submission`, `.schrift-preview`, `.exp-mode`/`.exp-mode-btn`, `.sr-only`.
  - Header/Nav: hartcodiert in `Base.astro`, kein `.gat-header`.
  - Massiv Inline-Styles (jeder `<a>`, `<div>`, `<h*>` traegt `style="…"`).

Quellen: `site/src/layouts/Base.astro`, `site/src/pages/index.astro`, `site/src/pages/typ/[category].astro`, `site/src/pages/templates/[...id].astro`, `site/src/pages/experiments/[id].astro`, `site/src/pages/experiments/index.astro`, `site/src/pages/schriften/index.astro`, `site/src/components/Breadcrumb.astro`.

## Befunde (kategorisiert)

### A. Kandidaten fuer DS-Aufnahme

#### A1. Breadcrumb-Komponente

**Element:** `site/src/components/Breadcrumb.astro` — `<nav aria-label="Brotkruemel-Navigation">` mit `<ol>` aus `{label, href?}`-Items, Separator `›`, letztes Item `aria-current="page"`.
**Vorschlag:** `.gat-breadcrumb` (`__item`, `__link`, `__current`, `__separator`).
**Begruendung:** Mehrstufige Galerien/Indizes braucht jedes Tool, das Inhalte kategorisch (typ → variante → detail) navigierbar macht — `bildgenerator`, `buergerinnenrat` und der Voranschlags-Viewer haben aequivalente Anforderungen. Sehr generisch, kostet das DS fast nichts.
**Aufwand:** S (1 Block, ein Modifier fuer dark/light).

#### A2. Lightbox-Pattern (Vollbild-Overlay mit Prev/Next)

**Element:** Dreimal nahezu identisch implementiert:
- `pages/templates/[...id].astro:60-138` (Vorlagen-Vorschauen, mit Touch-Swipe)
- `pages/experiments/[id].astro:394-605` (Variant-Vorschauen)
- `pages/schriften/index.astro:365-482` (Schriften-Vergleich pro Seite)

Gleiche Struktur: `position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 1000` + Close/Prev/Next-Buttons (weisse Pillen / Kreise), Label oben links, Bild zentriert, Escape/Arrow-Key, Touch-Swipe.
**Vorschlag:** `.gat-lightbox` (`__backdrop`, `__close`, `__prev`, `__next`, `__label`, `__image`) plus optional ein winziges JS-Modul (`gat-lightbox.js`) — analog zu `gat-charts.js`.
**Begruendung:** Galerien/Plakat-Previews/Vorlagen-Previews/Karten-Detailansichten tauchen in mehreren Tools auf (Vorlagen, evtl. spaeter Marketing-Site, Buergerinnenrat-Dokumente). Die dreifache Duplizierung allein innerhalb dieses Repos ist Beweis genug.
**Aufwand:** M (CSS einfach; minimales JS-Modul mit Keyboard/Touch-Handling).

#### A3. Preview-Grid / Galerie-Karte mit Cover-Bild

**Element:** `pages/index.astro:73-101`, `pages/typ/[category].astro:38-69`, `pages/templates/[...id].astro:32-54`.
Wiederkehrendes Muster: `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` mit Karten `background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); overflow: hidden;` + 3:4-Aspect-Ratio-Cover (`aspect-ratio: 3/4; background: #eee; display: flex; align-items: center; justify-content: center;`) + `<h3>` + Metadata.
**Vorschlag:** `.gat-gallery-grid`, `.gat-gallery-card` (`__cover`, `__body`, `__title`, `__meta`) — Modifier `--cover-3-4` / `--cover-4-3` / `--cover-square` fuer das Aspekt-Verhaeltnis.
**Begruendung:** Generisches "Sammlung mit Vorschau"-Muster (Templates, Buerger:innenraete, Dokumente, Schriften-Karten, Logos). Tritt im Repo schon 4-5 mal auf.
**Aufwand:** S-M.

#### A4. Status-Lozenge / Tag mit Status-Semantik

**Element:** `pages/schriften/index.astro:33-39` `tagFor()` baut "Empfehlung" / "Zweitwahl" / "Nicht empfohlen" mit Hintergrund + Text-Farbpaar:
- success: `#e3f5e8` / `#0f5c2e`
- info/secondary: `#eaf3ee` / `#2a734f`
- danger: `#fbe9e7` / `#b3261e`

Plus "Empfehlung auf einen Blick"-Karten mit `border-left: 6px solid …`.
**Vorschlag:** `.gat-status` (`--success` / `--warning` / `--danger` / `--info`) und `.gat-callout` mit linkem Farbbalken (`--success/--warning/--danger/--info`). DS hat schon `.gat-callout` und `.gat-tag` — die brauchen aber **semantische Modifier** (success/warning/danger/info), die heute fehlen.
**Begruendung:** Bewertungen, Status, Severities sind in jedem Daten-Tool noetig (Voranschlag, Buerger:innenrat, Issue-System). Aktuell improvisieren alle mit ad-hoc Hex-Farben.
**Aufwand:** S — Tokens + 3 Modifier auf bestehenden Klassen.

#### A5. Dot-Rating (●●○ Skala)

**Element:** `pages/schriften/index.astro:181-185` — 3 Dots a 9x9px mit Farb-Gradient (`#0f5c2e` → `#6abf2c` → `#e69500` → `#b3261e` je nach Wert).
**Vorschlag:** `.gat-rating-dots` (data-value=N/3 oder N/5, attr-driven). Optional generisch als `.gat-rating--scale-3/5`.
**Begruendung:** Bewertungsmatrizen tauchen ueberall auf (Vergleichstabellen, Schriften, Tools-Comparison, Vorlagen-Qualitaet). Wiederverwendbar.
**Aufwand:** S.

#### A6. Hero-Card / "CTA-Banner-Link" (gruener Block mit Pfeil)

**Element:** `pages/index.astro:48-68` — grosse Link-Karten mit `background: var(--gruen-dunkel); color: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);`, Titel + Subline + "Ansehen →"-Pill auf der rechten Seite.
**Vorschlag:** `.gat-cta-banner` (`__title`, `__intro`, `__action`) — Modifier `--dunkel`/`--magenta`.
**Begruendung:** Wiederkehrendes Marketing-Pattern (Cross-Linking zwischen Sektionen). DS hat `.gat-hero` als Auftaktblock — eine kompakte Aktions-Variante fehlt.
**Aufwand:** S.

#### A7. Vergleichstabelle mit Sticky-First-Column

**Element:** `pages/schriften/index.astro:152-200` — Bewertungsmatrix:
- `overflow-x: auto` Wrapper
- `<th>` und `<td>` der ersten Spalte mit `position: sticky; left: 0; background: …; z-index: 1`
- Zebra-Striping (`background: #f4f4f2` je 2. Reihe)
- Spalten-Header mit Tag-Lozenge unterhalb des Namens.

**Vorschlag:** `.gat-compare-table` (mit `__sticky-col` Modifier, Zebra-Striping per Default, Header-Cell-Slot fuer Tags).
**Begruendung:** Vergleichstabellen sind ein klassisches Daten-Tool-Muster (Voranschlag pro Posten, Wahlprogramme, Schriften, Tools). Sticky-First-Column ist nicht-trivial korrekt umzusetzen.
**Aufwand:** M (mit responsive Mobile-Verhalten).

#### A8. Toast / Aria-Live-Status-Pill

**Element:** `pages/experiments/[id].astro:1052-1071` (`#vote-toast`, `role="status"`, `aria-live="polite"`), zwei Stile (success / error) mit harten Hex-Werten.
**Vorschlag:** `.gat-toast` (`--success` / `--error` / `--info`).
**Begruendung:** Generisches Pattern, gehoert ins DS. Auch andere Tools (`gemeindefinanzen`, `issue-system` Web-UI) brauchen kurze Status-Meldungen.
**Aufwand:** S.

#### A9. Drag-and-Drop Rank-Row Liste

**Element:** `pages/experiments/[id].astro:296-390` (`.ranked-row` mit `.drag-handle`, `.arrow-up`/`down`, `.thumbnail`, `.remove-btn`).
**Vorschlag:** **Kein DS-Kandidat** — siehe B3. Aber das **Pattern** "Liste mit Drag-Handle + Pfeil-Buttons + Remove" sollte als minimaler Generic-Baustein `.gat-sortable-list`/`.gat-sortable-item` aufgenommen werden, ohne Sortable.js-Pflicht.
**Begruendung:** Kommt typisch fuer Ranking/Reorder-UI vor; aber Sortable-Engine bleibt App-Sache.
**Aufwand:** S (nur CSS-Skelett).

#### A10. Print-Format-Tokens

**Element:** Druckformate sind im Code semantisch addressiert ("A6 Hochformat", "A1 Hochformat", "Z-Falz 99x210"), aber das DS hat **keine Page-Size-Tokens** (`--gat-page-a4`, `--gat-page-a6`, `--gat-page-din-lang` etc.) oder CSS-`@page`-Mixins.
**Vorschlag:** Druckseiten-Tokens unter `--gat-page-*` und ein generisches `@page`-Set-Up im Print-Stylesheet (siehe `:print`-Sektion im DS).
**Begruendung:** Andere Tools, die Wahl-Materialien als PDF rendern (zukuenftig `buergerinnenrat`-Reports, Voranschlag-Print-Ausdrucke), brauchen dieselben Werte. **Print-Defaults sind bereits explizit im DS-Scope** (Inventur §"Patterns": `@media print`).
**Aufwand:** S (rein Tokens).

### B. App-spezifisch — bleibt lokal

#### B1. Rank/Voting-Engine (Sortable.js + localStorage + Mail/Copy-Submission)

**Element:** `pages/experiments/[id].astro` — komplette Voting-Logik inkl. `buildVoteBody()`, VOTE-JSON-START/END Markers, mailto-Submission, `?dev=1` JSON-Export, v1→v2 Storage-Migration.
**Warum app-spezifisch:** Tief verkoppelt mit `tools/experiment_results.py --from-emails`-Aggregator und der Click-to-rank-Domain. Nicht generalisierbar.
**Umbenennung:** Sinnvoll auf `.app-vote-…`-Namespace oder `.vorlagen-vote-…` (heute generische Namen wie `.variant-card`, `.checkmark` koennten mit DS-Komponenten kollidieren, wenn DS-CSS spaeter eingebunden wird).

#### B2. Schriften-Vergleich (Live-`@font-face`-Spezimen, Bewertungsmatrix)

**Element:** `pages/schriften/index.astro` — komplette Domaen-Logik fuer Font-Comparison, Empfehlungs-Karten, Glyph-Set-Demo, Headline-auf-Markenfarbe-Demo.
**Warum app-spezifisch:** Die **Inhaltslogik** (Kriterien, Empfehlungsobjekt, `specimens`-Array) gehoert ins App-Repo. Die **Bausteine** (Cards, Status-Lozenges, Tabelle, Dot-Rating, Lightbox) sollten aber kommen aus DS — siehe A3, A4, A5, A7.
**Umbenennung:** ja, App-Klassen auf `.app-fonts-…` / `.schriften-…` namespacen.

#### B3. Drag-Handle Touch-Action-Constraints

**Element:** `pages/experiments/[id].astro:307-320` — `touch-action: none` **nur** auf `.drag-handle`, nicht auf der Row oder Liste (sonst killt es Page-Scroll auf Mobile).
**Warum app-spezifisch:** Implementierungsdetail von SortableJS-Integration. **Aber** — der Hinweis ("top pitfall #5") gehoert in DS-Doku/Comment, wenn DS einen `.gat-sortable-…` Baustein aufnimmt (A9).

#### B4. localStorage-Non-Persistent-Banner

**Element:** `pages/experiments/[id].astro:418-427` — Privatmodus-Detection + Warnbanner.
**Warum app-spezifisch:** Nur Voting braucht das. Bleibt lokal.

### C. Hybrid: DS-konforme Loesung benoetigt

#### C1. Site-Header mit Brand-Wortmarke + Nav

**Element:** `Base.astro:28-66` — kompletter `<header>` lokal gebaut: dunkelgruener Hintergrund, Wortmarke als `<h1>`, Nav-Links als gerundete Outline-Pillen mit Hover-zu-hellgruen.
**Was das DS heute liefert (siehe Inventur):** `.gat-header` mit `--dunkel`/`--fixed` Modifier + `__inner`/`__brand`/`__logo`/`__wordmark`/`__nav`/`__nav-list`/`__nav-link`.
**Was die App davon spezialisiert:** Lediglich der Brand-Title ("Gruene Vorlagen NOE") und drei Nav-Eintraege. **Nichts** App-Spezifisches, das das DS nicht generisch abdeckt.
**Loesung:** **Quick-Win** — komplette Migration auf `.gat-header --dunkel`. Kein DS-Aufnahmebedarf.

#### C2. Site-Footer

**Element:** `Base.astro:70` — schmaler Text-Footer (`color: muted; padding: 2rem; text-align: center; font-size: 0.85em`).
**Was das DS heute liefert:** **Nichts** — DS hat keinen `.gat-footer`.
**Loesung:** **C — DS sollte einen generischen `.gat-footer` liefern** (mit optionalem Branding-Slot, Impressum-Slot, A11y-Toggle-Slot). Mehrere Tools brauchen einen schlanken Brand-Footer.
**Aufwand:** S.

#### C3. PDF-Download-Liste pro Bundesland

**Element:** `pages/templates/[...id].astro:140-151` — `<ul>` von `<li>{label}: <a href={d.sla}>SLA herunterladen</a></li>`-Eintraegen mit Pro-Bundesland-Impressum.
**Was das DS heute liefert:** **Nichts** spezifisches.
**Was die App spezialisiert:** Bundeslaender-Aufschluesselung, SLA-vs-PDF-Differenzierung. App-spezifisch.
**Loesung:** **B** — App-spezifisch, aber bringt einen generischen "Download-Liste mit Metadaten"-Baustein nahe (`.gat-download-list`?). Niedrige Prioritaet — nicht im DS aufnehmen, bis ein zweites Tool aehnliches braucht.

#### C4. Empfehlungs-Karten ("Empfehlung / Zweitwahl / Davon abraten")

**Element:** `pages/schriften/index.astro:125-144` — drei farbcodierte Bloecke mit linkem Akzent-Balken, Eyebrow-Label, Titel, Begruendungstext.
**Was das DS heute liefert:** `.gat-callout` existiert, aber **ohne** semantische Modifier (success/warning/danger).
**Loesung:** Siehe A4 — DS sollte `.gat-callout--success/--warning/--danger/--info` ergaenzen. Die App nutzt das dann direkt; die "Eyebrow"-Layout-Variante ist generisch.
**Aufwand:** S (Modifier zu bestehender Komponente).

#### C5. Brand-Farbpaletten-Swatch

**Element:** `pages/schriften/index.astro:259-266` — Farb-Swatches (26x26px farbiges Quadrat + Name + Hex) als Reference-UI.
**Was das DS heute liefert:** **Nichts** als Komponente — wohl aber die **Werte** (`--gat-color-dunkelgruen` etc.).
**Loesung:** DS koennte eine kleine `.gat-swatch`-Komponente liefern, automatisch befuellt aus `--gat-color-*` Tokens. Mehrere Tools (Style-Guide-Seiten, Color-Pickers) wuerden sie nutzen.
**Aufwand:** S.

## Visuelle Anomalien

Farben/Schriften/Radien/Schatten ausserhalb der DS-Tokens:

- **Farb-Drift gegenueber DS:**
  - `--gruen-dunkel: #2a734f` (lokal) **!=** `--gat-color-dunkelgruen` aus DS — Hex-Wert nicht verifiziert, aber sehr wahrscheinlich anders nuanciert (`#2a734f` ist ein eher warmes Gruen). **Quelle:** `Base.astro:13`. Muss gegen DS-Token verifiziert und angeglichen werden.
  - `var(--gruen-hell, #c9d400)` als Fallback in `experiments/[id].astro:140,144` **widerspricht** `--gruen-hell: #6abf2c` aus `Base.astro:14`. Zwei verschiedene Helle Gruens im selben Dokument.
  - Status-Farben hartkodiert (12+ Hex-Werte): `#0f5c2e`, `#e3f5e8`, `#fbe9e7`, `#b3261e`, `#5a201b`, `#1d3b2a`, `#2c3b33`, `#700`, `#234`, `#dca400`, `#ffd400`, `#6a8b2c`, `#e69500` — nichts davon ist mit DS-Tokens abgestimmt.
  - Grey-Skala ad-hoc: `#222 #333 #444 #555 #666 #777 #888 #999 #ccc #ddd #eee #f0f0f0 #f4f4f2 #f7f7f7 #fafafa`. DS hat `--gat-color-text` / `-anthrazit` / `-weiss` plus Web-Layer `--gat-web-text-soft/-mute/-hairline` — alles ungenutzt.

- **Typografie:** `font: 16px/1.5 system-ui, -apple-system, sans-serif;` (`Base.astro:24`) — **kein** Bezug auf `--gat-font-copy`/`--gat-font-headline`/`--gat-leading-copy`. Headlines bekommen kein `.gat-headline`, sondern einfach `color: var(--gruen-dunkel)` per Tag-Selector.

- **Radien:** `border-radius: 4px / 6px / 8px / 9px / 50%` — bunt verteilt. DS hat `--gat-radius-sm/-md` und `--gat-web-radius-card/-pill/-input` — ungenutzt.

- **Schatten:** Wiederholt `0 1px 4px rgba(0,0,0,0.1)`, `0 2px 8px rgba(0,0,0,0.08)`, `0 1px 3px rgba(0,0,0,0.08)`. DS hat `--gat-web-shadow` — ungenutzt.

- **Inline-Styles ueberall:** Praktisch jedes Element hat `style="…"`. Das macht jede DS-Migration zu einer mechanischen aber substanziellen Such-und-Ersetz-Arbeit (>500 Inline-Style-Vorkommen). Kein Tailwind, keine Klassen-Konventionen.

- **Focus-Ring:** Lokal als `outline: 3px solid var(--gruen-hell); outline-offset: 2px` reimplementiert (`experiments/[id].astro:234-237, 342-347`). DS-Pattern `--gat-web-focus-ring` + `--gat-web-focus-offset` (Inventur §Patterns) ungenutzt.

- **prefers-reduced-motion / scroll-padding-top / hyphens: auto:** alle DS-Patterns, die hier nicht angewendet werden.

## Quick-Wins (Migration low-effort)

1. **DS-CSS einbinden** (1-Zeiler in `Base.astro:11`):
   ```
   <link rel="stylesheet" href="https://grueneat.github.io/design-system/design-system.css">
   ```
   Damit kommen alle Tokens + Komponenten "for free" rein und Schritt 2-6 koennen iterativ folgen.

2. **Header durch `.gat-header --dunkel` ersetzen** (~30 Zeilen in `Base.astro` weg). Wortmarke ins `__brand`, drei Nav-Links als `__nav-link`. Eliminiert die ad-hoc Hover-Logik. Siehe C1.

3. **CSS-Vars ersetzen** (~20 Stellen): `var(--gruen-dunkel)` → `var(--gat-color-dunkelgruen)`, `var(--gruen-hell)` → `var(--gat-color-hellgruen)`, `var(--gelb)` → `var(--gat-color-gelb)`, `var(--magenta)` → `var(--gat-color-magenta)`, `var(--text)` → `var(--gat-color-text)`, `var(--muted)` → `var(--gat-web-text-mute)`. Ein einziger Find-Replace.

4. **Breadcrumb auf `.gat-breadcrumb` umstellen** sobald A1 im DS angekommen ist. `Breadcrumb.astro` wird auf ~5 Zeilen reduziert.

5. **Galerie-Karten auf `.gat-gallery-card` umstellen** sobald A3 im DS ist — entfernt ~60 Zeilen Inline-Styles aus `index.astro`/`typ/[category].astro`.

6. **Status-Lozenges/Callouts** auf `.gat-callout--success/--warning/--danger` umstellen sobald A4/C4 im DS sind — entfernt ~30 Zeilen Hex-Werte aus `schriften/index.astro`.

7. **Lightbox dedup** — sobald A2 im DS ist, drei identische Implementierungen (`templates/[...id].astro`, `experiments/[id].astro`, `schriften/index.astro`) auf einen Aufruf reduzieren. Spart ~250 Zeilen Code.

8. **Voting-Engine-Klassen namespacen** (`.variant-card`, `.checkmark`, `.ranked-row` → `.app-vote-card`, `.app-vote-checkmark`, `.app-vote-ranked-row`), damit kein Konflikt entsteht, wenn das DS spaeter generische `.variant-card` bringt.

---

**Reihenfolge fuer Migration:** 1 → 2 → 3 erstmal mechanisch durch, dann iterativ 4-7 wenn die jeweiligen DS-Bausteine landen. 8 unabhaengig.
