# gemeindefinanzen — DS-v2.0-Audit

## App-Zweck (1-2 Saetze)

VRV-2015-Voranschlaganalysator (Voranschlaege, Nachtragsvoranschlaege,
Rechnungsabschluesse oesterreichischer Gemeinden) als statische Browser-App
mit clientseitigem PDF-Extract, SQLite-WASM-Persistenz und ECharts-Dashboard.
Heute morgen (2026-05-23, PR #7) auf DS v2.0 migriert (Iteration 19,
Abschluss-Iteration).

## Aktuelle DS-Anbindung

- **DS-CSS-Link:** ja — `https://grueneat.github.io/design-system/design-system.css`
  (CDN, index.html:23)
- **DS-Logo-Asset:** ja — `https://grueneat.github.io/design-system/assets/gruene-logo.svg`
  (index.html:34)
- **gat-charts.js:** ja — per CDN aus `dashboard-charts.js` und
  `sankey-drill.js` importiert (PALETTE, INK, LABEL_SIZE, AXIS_SIZE,
  BAR_MAX_*, VA_DECAL, tip(), legende(), grid(), planIstLegende())
- **A11y-Mode:** Inline-Bootstrap-Script setzt `gat-mode-hc` vor erstem
  Paint; eigener Toggle-Knopf `.gat-header__a11y-toggle` (App-Sache laut DS)
- **Verwendet schon:** `.gat-skiplink`, `.gat-header`(+`__inner`/`__brand`/
  `__logo`/`__wordmark`/`__nav`/`__nav-list`/`__nav-current`), `.gat-hero`(+
  `__title`/`__intro`), `.gat-headline`/`.gat-fliesstext`, `.gat-section-head`,
  `.gat-panel`(+`__head`/`__head-row`/`__body`/`__body--table`/`__note`),
  `.gat-metric-card`(+`--ertrag`/`--aufwand`/`--netto`/`--hero` und
  `__num`/`__label`), `.gat-callout`, `.gat-btn`/`--primary`/`--secondary`,
  `.gat-tab`/`.gat-tabbar`, `.gat-switcher`/`.gat-switcher__label`/
  `.gat-switch-btn` (alle Tab- und Switch-Knoepfe tragen Doppelklassen
  `class="tab-btn gat-tab"` bzw. `class="switch-btn gat-switch-btn"`),
  `.gat-mode-hc`-Variante.
- **Verwendet noch lokale Alt-Klassen / parallele Schichten:**
  - Funktionsklassen (Vertrag mit JS): `.tab-btn`, `.tab-panel`, `.is-active`,
    `.switch-btn`, `.dtable`, `.drill-list`/`.drill-row`/`.crumbs`,
    `.mj-overlay`/`.mj-dialog`/`.mj-btn`/`.mj-close`/`.mj-chart`,
    `.sortable`/`.arrow`, `.filterbar`, `.search`/`.betrag`
  - App-eigene Komponenten (echte Lokalisate): `.dropzone`(+`-title`/`-hint`/
    `-btn`/`.is-over`), `.doc-manager`(+`-summary`/`-body`/`-title`/`-count`),
    `.doc-table`/`.doc-table-scroll`, `.doc-status`(+`.ok`/`.fehl`),
    `.doc-remove`/`.doc-edit-btn`/`.doc-clear-btn`, `.doc-einwohner-dialog`+
    Form-Klassen, `.doc-empty`/`.persist-note`/`.doc-clear-zeile`,
    `.progress-list`/`.progress-item`/`.progress-bar`/`.progress-fill`/
    `.progress-head`/`.progress-name`/`.progress-stage`/`.progress-error`
    (+`.is-error`/`.is-done`), `.toast`(+`.ok`/`.fehl`),
    `.sankey-bar`/`.sankey-hint`(+`.is-visible`)/`.sankey-reset`,
    `.app-panel-fs-btn`, `.app-intro`, `.lead`, `.dashboard-leer`,
    `.boot-banner`, `.mark-positiv`/`.mark-neutral`/`.mark-risiko`,
    `.stats`/`.stats--einspalt`/`.stat`/`.stat-delta`(+`.is-up`/`.is-down`)/
    `.stat-pk`, `.dash-grid`/`.dash-chart`/`.dash-controls`,
    `.table-scroll`/`.table-hint`/`.result-meta`, `.footer`
  - App-Adapter-Token (nur 4): `--app-hair`, `--app-soft`,
    `--app-akzent-primaer`, `--app-risiko` — duenne Bruecke auf
    `--gat-web-hairline`/`-text-soft`/`-green-deep`/`-chart-5`.

## Befunde (kategorisiert)

### A. Kandidaten fuer DS-Aufnahme

#### A1 — `.toast` als generische Inline-Notification

- **Wo:** `app.css` 798-814, JS `app.js:603-609` (`function toast(text, art)`).
- **Was:** Pill-Notification (`.toast.ok` gruen, `.toast.fehl` clay), 6s
  auto-dismiss; in `#toast-box` gestapelt; benutzt
  `--gat-web-green-tint`/`-clay-text`/`-chart-5`-Mixe und
  `--gat-web-radius-control`.
- **Vorschlag:** `.gat-toast`, `.gat-toast--ok` / `--fehl` / `--warn`,
  Container-Klasse `.gat-toast-stack` oder `.gat-toast-box`. JS bleibt
  Konsumenten-Sache (Lebenszyklus); das DS liefert nur Optik + ARIA-Empfehlung
  (`role="status"`/`role="alert"`).
- **Begruendung:** Jedes Datenwerkzeug (auch buergerinnenrat,
  bildgenerator etc.) braucht eine ruhige, markenkonforme
  Inline-Erfolgs-/Fehlermeldung. Die Toaster-Optik ist nirgends VRV-spezifisch
  und die semantischen Farben sind exakt die DS-Palette.
- **Aufwand:** XS (~15 LOC im DS, 3 Klassen).

#### A2 — `.doc-status` als generische Status-Pille (Datenset-Health)

- **Wo:** `app.css` 658-675, Markup `index.html:106` (Pruefstatus-Spalte).
- **Was:** Pill (radius 999px), `.ok` gruen, `.fehl` clay; identisches
  Pattern wie `.toast`, nur als Inline-Label statt Notification.
- **Vorschlag:** Erweiterung der bereits existierenden `.gat-tag`-Familie
  um `--ok` / `--fehl` / `--warn` Modifier (das DS hat schon `.gat-tag`,
  `--neutral`, `--info`, `--pflicht`, `--risiko` — `--ok`/`--fehl` fehlen).
- **Begruendung:** Jedes Datenwerkzeug, das eingelesene Dateien validiert
  (Import-Listen, Schema-Checks, OCR-Status etc.), bekommt diese Pill
  „kostenlos".
- **Aufwand:** XS (~6 LOC, zwei Tag-Modifier).

#### A3 — `.progress-item` als Datei-/Job-Fortschrittsliste

- **Wo:** `app.css` 577-624, Markup `index.html:89`, JS-Lebenszyklus
  ueber `progress-name`/`progress-stage`/`progress-fill`/`progress-error`.
- **Was:** Karten-Pattern mit Kopfzeile (Name + Stage), 5px-Balken
  (radius 999px), Fortschritts-Fill, Error-Variante (Fill rot,
  Error-Absatz darunter), Done-Variante (Fill gruen).
- **Vorschlag:** `.gat-job-list` / `.gat-job-item` (+`__head`, `__name`,
  `__stage`, `__bar`, `__fill`, `__error`, Modifier `--error`/`--done`).
  Alternativ generischer `.gat-progress` (nur der Bar-Teil) zur Wiederverwendung.
- **Begruendung:** Jedes Datenwerkzeug mit clientseitigem Upload (PDFs,
  CSVs, Bilder) zeigt File-für-File-Fortschritt — Pattern ist ueberall gleich,
  Texte unterschiedlich.
- **Aufwand:** S (~35 LOC, sauber benannt mit BEM).

#### A4 — `.dropzone` als generische Drag-&-Drop-Zone

- **Wo:** `app.css` 545-574, Markup `index.html:80`.
- **Was:** Gestrichelter Karton (`2px dashed --gat-web-hairline`,
  `--gat-web-surface-sunk`), Hover-/Drag-State (`.is-over` → gruener Rand
  + gruener Tint), Titel + Hint + Pick-Button + verstecktes `<input
  type="file">`.
- **Vorschlag:** `.gat-dropzone` (+`__title`, `__hint`, `__btn`,
  `.is-over`). Die JS-Verdrahtung (dragover/dragleave/drop, File-API)
  bleibt Konsumenten-Sache.
- **Begruendung:** Der nuechtern-gruene Drop-Karton ist Marken-Sprache
  fuer „hier kommen Dateien rein"; jedes Tool im Org-Stack mit Upload (siehe
  auch Austender-Tender-Upload, Doc-Bewertungs-Tools, Bildgenerator) profitiert.
- **Aufwand:** S (~30 LOC, plus Doku-Snippet zur JS-Anbindung).

#### A5 — `.dtable` als generische Datentabelle

- **Wo:** `dashboard.css` 73-92, Markup an 5+ Stellen (Suche, Einnahmen,
  Investitionen, Transfers, Ausgaben-Top).
- **Was:** Komplette Datentabellen-Optik: sticky `thead` mit Sunk-Hintergrund,
  Uppercase-Headers, 2px-Bottom-Border, Hover-Tint, tabular-nums fuer
  `.num`-Spalten, `.sortable` mit Cursor/Hover/Arrow.
- **Vorschlag:** `.gat-dtable` (+`__head`/`__cell` per Element-Selektor,
  `.gat-dtable__cell--num`, `.gat-dtable__head--sortable`).
- **Begruendung:** Datenwerkzeuge sind im Org-Kontext fast immer
  Tabellen-erste Anwendungen — `.dtable` ist heute schon die De-facto-Tabelle
  und sollte als DS-Komponente kanonisiert werden. **Hoechste Priorität**
  unter den A-Befunden.
- **Aufwand:** M (~50 LOC, plus sticky-thead-Verhalten dokumentieren).

#### A6 — `.crumbs` als Breadcrumb-Pfad

- **Wo:** `dashboard.css` 128-138, JS `dashboard.js:237-257`.
- **Was:** Inline-Button-Pfad mit `<span class="sep">/</span>`-Trenner,
  unterstrichener gruener Link-Button, `:disabled` = aktuelles Element.
- **Vorschlag:** `.gat-crumbs` / `.gat-crumbs__btn` / `.gat-crumbs__sep`.
  Pfad-Logik bleibt im JS, das DS liefert die Optik.
- **Begruendung:** Jedes drilldown-faehige Tool (auch Sankey-Drill,
  Treemap-Drill, Doc-Hierarchien) braucht Breadcrumbs.
- **Aufwand:** XS (~15 LOC).

#### A7 — `.drill-list` / `.drill-row` als generische Drill-Liste

- **Wo:** `dashboard.css` 140-164.
- **Was:** Drei-Spalten-Listenpunkt (Label links, Betrag rechts, Chevron
  rechts), klickbare Variante mit Hover/Active-Tint, optionaler
  Inline-Button (`.mj-drill`) im Item.
- **Vorschlag:** `.gat-list-row` / `.gat-list-row--clickable` / `__label` /
  `__value` / `__chev`. Eher generischer „Datenwerkzeug-Listeneintrag" als
  spezifisch zu Drill-down.
- **Begruendung:** Jede listenbasierte Detailansicht (Akten, Posten,
  Treffer) folgt diesem Schema. Spart Doppel-Implementierungen.
- **Aufwand:** S (~25 LOC).

#### A8 — `.mj-overlay` / `.mj-dialog` als generischer Modal-Dialog

- **Wo:** `dashboard.css` 197-224, Markup `index.html:733`.
- **Was:** Vollbild-Overlay (semi-transparent `--gat-web-text`),
  zentrierter Karten-Dialog mit `--gat-web-radius-card`, Kopfzeile mit
  Titel + Close-Knopf, Body fuer beliebigen Inhalt, `box-shadow: 0 16px
  48px rgba(31,38,28,.22)`.
- **Vorschlag:** `.gat-modal` (+`__overlay`/`__dialog`/`__head`/`__close`/
  `__body`, Modifier `.is-open`). Native `<dialog>`-Variante separat oder
  unter dem gleichen Namen.
- **Begruendung:** Das DS hat **keinen Modal-Baustein**. Jede App, die
  bestaetigen, vergleichen oder editieren laesst, baut ihn neu (siehe auch
  `.doc-einwohner-dialog` direkt darunter — gleicher Use-Case, andere
  Implementierung).
- **Aufwand:** M (~40 LOC; Markup-Variante natives `<dialog>` vs. div).
- **Hinweis:** Im Repo existieren ZWEI parallele Dialog-Patterns:
  `.mj-overlay` (custom div, JS-getrieben) und `.doc-einwohner-dialog`
  (natives `<dialog>`). Das DS sollte einen kanonisieren — Empfehlung
  natives `<dialog>` (mehr A11y „kostenlos").

#### A9 — `.filterbar` als Filter-/Such-Leiste

- **Wo:** `dashboard.css` 96-110, Markup `index.html:644`.
- **Was:** Flexbox-Wrap aus gestapelten Label+Input/Select-Bloecken;
  einheitliche Feld-Optik (Border, Radius, Font), Hover-Border in Gruen,
  Sucheingabe `min-width 16rem`, Betragsfelder `width 7rem`.
- **Vorschlag:** `.gat-filterbar` (+`__field`, `__label`, evtl.
  `.gat-input` / `.gat-select` als allgemeine Form-Optik, die das DS heute
  gar nicht liefert — Formular-Felder sind komplett ungelistet).
- **Begruendung:** Das DS hat **keine Form-Element-Stilebene**. Jede App
  reimplementiert Input/Select-Optik. Das ist die groesste Luecke nach
  Modal und Tabelle.
- **Aufwand:** M (~50 LOC, Form-Felder + Filterbar-Layout).

#### A10 — Inline-Hervorhebungen `.mark-positiv` / `-neutral` / `-risiko`

- **Wo:** `app.css` 301-319.
- **Was:** Inline-Span mit hellem Tint + farbiger 2px-Unterstreichung in
  drei Semantiken (positiv = gruen-deep, neutral = gruen, risiko =
  clay/chart-5).
- **Vorschlag:** `.gat-mark` (+`--positiv`/`--neutral`/`--risiko`) — eine
  Erweiterung des vorhandenen `.gat-highlight` (das nur gelb kennt).
- **Begruendung:** Mehrwertige Inline-Hervorhebung in Fliesstext (Ergebnis,
  Risiko, Erfolg) ist generisch genug fuers DS — vor allem fuer
  Daten-Stories und Berichte.
- **Aufwand:** XS (~12 LOC).

#### A11 — Vollbild-Knopf je Diagramm-Panel `.app-panel-fs-btn`

- **Wo:** `app.css` 232-255.
- **Was:** Kleiner Outline-Button im `.gat-panel__head-row`, schaltet
  `.gat-panel:fullscreen` ueber die native Fullscreen-API.
- **Vorschlag:** `.gat-panel__fs-btn` als optionales Sub-Element von
  `.gat-panel`. Das DS koennte das Knopf-CSS und die `:fullscreen`-Layout-
  Anpassungen (Flex-Spalte, `.gat-panel__body` fuellt Resthoehe)
  mitliefern; den JS-Aufruf bleibt der Konsument.
- **Begruendung:** „Diagramm gross machen" ist generisch fuer jedes
  Chart-Tool. Im DS-Inventur explizit als „nicht enthalten" gelistet, aber
  ueberall braucht man es.
- **Aufwand:** S (~25 LOC, plus `:fullscreen`-Layoutregeln, die heute in
  app.css 261-286 liegen und ebenfalls App-uebergreifend sind).

### B. App-spezifisch — bleibt lokal

#### B1 — `.doc-manager` (einklappbarer `<details>`-Wrapper)

- **Was:** Wrapper um Upload-Sektion + Doc-Liste, der sich automatisch
  schliesst, sobald Dokumente geladen sind. Custom Disclosure-Pfeil.
- **Warum lokal:** Spezielle Lifecycle-Logik (open/close je nach
  Dokumentzahl, App-spezifischer Titel/Counter). Die `<details>`-Optik ist
  derart eng an die Sektionsabfolge dieser App gekoppelt, dass
  Generalisierung mehr Aufwand als Nutzen waere.
- **Umbenennung?** Schon klar nach `.doc-manager*` benannt — passt.

#### B2 — `.doc-table` / `.doc-status`-Detailspalten / `.doc-einwohner-*`

- **Was:** Die Dokumentliste mit Einwohnerzahl-Inline-Edit (Variante A)
  und Edit-Dialog (Variante B), inkl. Pruefstatus-Pill.
- **Warum lokal:** Spalten-Schema und Einwohnerzahl-Bedeutung sind
  VRV-2015-spezifisch (Pro-Kopf-Sichten haengen daran). `.doc-status`
  selbst koennte ins DS (siehe A2), aber `.doc-table` und das
  Einwohner-Dialog-Pattern haben hier keinen org-weiten Sinn.

#### B3 — `.sankey-bar` / `.sankey-hint` / `.sankey-reset`

- **Was:** Brotkrumen-aehnliche Drill-Leiste im Sankey-Panel-Kopf, mit
  Reset-Knopf rechts.
- **Warum lokal:** Sankey-Drill-Verhalten ist datenspezifisch
  („Mittelherkunft/-verwendung-Pfad"). Optik ist eine Variante von
  `.gat-panel__head` mit App-spezifischen Inhalten — keine eigene
  DS-Komponente noetig.

#### B4 — `.mark-*`-Markup-Texte und Tab-Inhalte

- Die konkreten Inline-Markierungen („Kommunalsteuer", „Pflichtumlage")
  sind domaenenspezifisch. Optik geht ins DS (A10), Texte/Bedeutungen nicht.

#### B5 — `.stat-delta` / `.stat-pk` als Sub-Elemente der Metric-Card

- **Was:** Vorjahres-/Soll-Ist-Delta-Anzeige (`.is-up` gruen, `.is-down`
  clay) und Pro-Kopf-Zeile unter der Zahl der `.gat-metric-card`.
- **Warum lokal:** Wertvergleichs-Logik der Karte ist hier
  domaenenspezifisch (Vorjahresvergleich, Pro-Kopf). Die DS-`gat-metric-card`
  bietet `__num`/`__label`; alles weitere ist App-Decoration.
- **Aber:** Wenn das DS spaeter eine `.gat-metric-card__sub` / `__trend`
  ergaenzt, faellt diese Schicht weg. Heute B, nach DS-Erweiterung evtl. C.

#### B6 — `.dashboard-leer` Empty-State

- Spezifischer Wortlaut + Position (zwischen Doc-Manager und Dashboard).
  Optik (gestrichelter Rand, gesunkener Hintergrund) waere generisch, aber
  als alleinstehende Komponente zu duenn.

#### B7 — `.boot-banner` Boot-Fehler

- Spezifisches Magenta-Banner fuer kritische Init-Fehler. Sehr App-eigene
  Semantik (sql.js / mupdf konnte nicht laden). Nicht uebertragbar.

### C. Hybrid: DS-konforme Loesung benoetigt

#### C1 — Tabs/Panels: Doppelklassen-Vertrag mit `dashboard.js`

- **Stand:** Markup traegt `class="tab-btn gat-tab"` und Panels haben nur
  `.tab-panel` (nicht `.gat-tab-panel`). `dashboard.js` schaltet auf
  `.tab-panel.is-active`, aber das DS kennt `.gat-tab-panel` und nicht das
  `.is-active`-Mapping.
- **Was DS liefern muesste:** Klares Toggle-Pattern fuer Tab-Panels —
  entweder dokumentiert, dass `.gat-tab-panel.is-active` der kanonische
  Trigger ist (heute liefert das DS keinen Show/Hide-Default fuer
  `.gat-tab-panel`), oder einen ARIA-aware Tab-Controller-JS-Helfer im
  `gat-charts.js`-Stil.
- **Was App heute spezialisiert:** `.tab-panel { display: none }` plus
  `.tab-panel.is-active { display: block; animation: ... }` —
  Fade/Slide-Animation ist App-Geschmack, aber Show/Hide-Toggle ist
  generisch.
- **Empfehlung:** DS liefert `.gat-tab-panel` mit
  `hidden`/`[data-active]`/`.is-active`-Default, App spezialisiert nur die
  Animation. Spart ~10 LOC und die Verwirrung „warum gibt es beide Namen?".

#### C2 — Form-Felder (Input/Select) generell

- **Stand:** `.filterbar input/select`, `.doc-einwohner-input`, `.search`,
  `.betrag` haben jeweils eine eigene leichte Optik-Schicht (Border,
  Radius, Hover-Border, Focus-Outline). Alle in dieselbe Richtung gepflegt,
  aber jede leicht abweichend.
- **Was DS liefern muesste:** `.gat-input` / `.gat-select` /
  `.gat-input--num` / `.gat-input--search` mit der org-weiten Feld-Optik.
- **Was App spezialisiert:** Spaltenbreite (`.betrag` 7rem, `.search`
  16rem), Inline-Edit (Einwohnerzahl in Tabellenzelle).
- **Empfehlung:** Das ist die wichtigste DS-Luecke nach Modal.

#### C3 — Stats-Raster (`.stats`, `.stats--einspalt`)

- **Stand:** `.stats` ist ein 4-Spalten-Raster fuer `.gat-metric-card`s,
  faellt responsive auf 2 / 1. Lokal in app.css 168-186.
- **Was DS liefern muesste:** Das DS hat schon `.gat-grid`/`--2`/`--3` —
  ein `--metric` (oder `--auto-min`) waere ein konsistentes Pendant fuer
  Kennzahlen-Raster mit den 4-2-1-Breakpoints.
- **Was App spezialisiert:** Genaue Spaltenzahl 4, die andere Tools auf 3
  oder 5 setzen koennten.
- **Empfehlung:** `.gat-grid--metric` mit `grid-template-columns:
  repeat(auto-fit, minmax(14rem, 1fr))` oder festen 4-2-1-Stufen.

#### C4 — Dashboard-Steuerleiste (`.dash-controls`) als sticky Sub-Toolbar

- **Stand:** Sticky Container im DS-`bg`-Ton, der Switcher + Tabbar
  zusammenhaelt. Lokal in `dashboard.css` 37-39.
- **Was DS liefern muesste:** Generisches `.gat-toolbar` /
  `.gat-toolbar--sticky` als Container fuer Bedien-Elemente am Seitenkopf.
- **Was App spezialisiert: ** Inhalt (Switcher + Tabbar) und genaue
  Position (top:0 vs. unter Header).
- **Empfehlung:** Niedrige Prio — nur ~5 LOC, aber: sobald andere Tools
  das gleiche Pattern bauen (Sortier-/Filter-Toolbars), wird es spuerbar.

#### C5 — Section-Head + Lead-Absatz

- **Stand:** `.gat-section-head` liefert h2 + Intro; aber der App-Lead
  unter h2 (`.lead`, 70rem-Lesebreite) ist zusaetzlich. `.app-intro`
  dupliziert das Pattern fuer den Hero-Untertitel.
- **Was DS liefern muesste:** `.gat-section-head__lead` und/oder
  Aufnahme von „Lesebreite 70rem" als Token (`--gat-web-prose-max`) damit
  jede App nicht ihr eigenes max-width-Limit pflegt.
- **Empfehlung:** Niedrig — der Token-Add ist 1 LOC, der spart sich aber
  ueber mehrere Tools.

## Visuelle Anomalien

- **Inkonsistente Knopf-Familie um die App-eigenen Bedienelemente:**
  Es gibt mindestens FUENF leicht unterschiedliche „kleiner-Outline-Knopf"
  Designs nebeneinander — `.mj-btn` (dashboard.css 174), `.mj-drill`
  (dashboard.css 156), `.app-panel-fs-btn` (app.css 232), `.doc-remove`
  (app.css 759), `.doc-edit-btn` (app.css 696), `.doc-clear-btn` (app.css
  783). Alle haben gleiche Grundoptik (Surface-Hintergrund, Hairline-Rand,
  Radius-control, gruene/clay Schrift), aber leicht andere Paddings und
  Fontgroessen (0.76 / 0.80 / 0.82 / 0.85 / 0.88rem). **Konsolidieren auf
  eine Klasse** (z. B. `.gat-btn--xs` mit `--neutral`/`--ok`/`--danger`
  Toenung) — heute leichter Drift in Groesse/Padding sichtbar.
- **Doppelte Fokus-Selektor-Liste:** app.css 450-471 zaehlt 16 Selektoren
  explizit auf — jeder neue Bedien-Block muss hier zugefuegt werden, sonst
  hat er keinen Fokusring. **Brittle.** Im DS koennte ein
  `:where(...)`-Default oder ein `.gat-focusable`-Utility den Listenwartung
  entlasten.
- **`--app-akzent-primaer` = `--gat-web-green-deep`:** Bewusst gewaehlter
  Alias, aber heute nur an EINER Stelle genutzt (`.progress-fill`).
  Konsequent: entweder direkt `--gat-web-green-deep` (dann ein Alias weniger)
  oder mehr Verwendungsstellen.
- **`--app-risiko` = `--gat-web-chart-5`:** Gleiche Geschichte — nur in
  `.progress-item.is-error .progress-fill`. Erwogen werden:
  `--gat-web-clay-text` waere semantisch konsistenter (alle anderen
  „Risiko"-Stellen nutzen schon `clay-text`).
- **`.gat-header__nav`/`__nav-list`/`__nav-link` im Markup vs. DS:**
  Die DS-Inventur fuehrt diese Sub-Elemente; das tatsaechliche DS-CSS
  (per Fetch geprueft) hat aber nur `.gat-header__nav-current` — die
  uebrigen Sub-Klassen existieren im DS nicht oder nicht unter diesen
  Namen (DS hat `.gat-nav__link`). **Inventur/DS-Repo-Drift, nicht App-
  Bug** — App-Markup faellt durch und nutzt die Default-Layout-Regeln.
  Bitte beim DS-Maintainer pruefen (gehoert nicht in diesen Audit, aber
  beim Vorbeigehen mitgenommen).
- **`.gat-tab-panel.is-active` greift heute nicht:** App nutzt
  `.tab-panel.is-active` (mit Animation), bewusste Begruendung in
  Iteration-19-Doku. DS-Konvention waere klarer, wenn das DS selbst die
  `is-active`-Show-Logik fuer `.gat-tab-panel` festlegt (siehe C1).
- **Hartkodierter `box-shadow` im Modal:** `dashboard.css:207`
  `0 16px 48px rgba(31,38,28,.22)` — sollte `--gat-web-shadow` sein
  (existiert im DS). Drift vom Token.
- **Hartkodierte Backdrop-Farbe Modal:** `app.css:722`
  `rgba(31, 38, 28, 0.4)` — wieder der `--gat-web-text` Hex hartkodiert
  statt color-mix(). Konsistenz-Drift.
- **`color-mix(... transparent)` hartkodierte Prozente:** ~12 Stellen
  mit `color-mix(in srgb, var(--gat-web-green) 8%, transparent)` etc.
  Schoen flexibel, aber ein DS-Token `--gat-web-hover-tint` oder eine
  Helfer-Klasse `.gat-hoverable` koennte die Wiederholung kapseln.
- **Drei verschiedene line-height-Strategien auf Headlines:** Body-h1
  benutzt `1.18`, DS-`.gat-headline` (CDN) hat `--gat-leading-headline:
  0.9`, App-Override begruendet das (zu eng fuer mehrzeilige
  Dashboard-Titel). OK so, aber: das DS-Token koennte einen `-relaxed`
  Bruder kriegen.

## Quick-Wins (Migration low-effort)

Was sich mit minimalem Aufwand auf DS umstellen liesse, das nach der
grossen Mai-Migration uebrig blieb:

1. **Modal-Schatten und -Backdrop auf `--gat-web-shadow` umstellen** —
   dashboard.css:207 + app.css:722. Heute hartkodiert in
   `rgba(31,38,28,.22)` / `rgba(31,38,28,0.4)`, beide Hexcodes sind exakt
   der `--gat-web-text` aus dem DS. 2 Zeilen, kein Risiko.
2. **`.doc-status.ok` / `.doc-status.fehl` auf `.gat-tag` + neue
   `--ok`/`--fehl`-Modifier umstellen** — sobald A2 im DS landet.
   Markup-Aenderung in `index.html` (eine Zeile) + DS-Aufnahme der zwei
   Modifier-Klassen.
3. **`.toast` durch `.gat-toast` ersetzen** (A1). JS-Lebenszyklus bleibt;
   nur die Klasse umbenennen. ~3 Edits.
4. **Die fuenf Outline-Mini-Knoepfe auf eine gemeinsame Klasse
   konsolidieren** — auch ohne DS-Erweiterung sofort moeglich: eine
   `.app-btn-xs`-Klasse, die `.mj-btn`/`.mj-drill`/`.app-panel-fs-btn`/
   `.doc-remove`/`.doc-edit-btn`/`.doc-clear-btn` ersetzt, dann eine
   einzige Stelle zum Justieren. Spaeter rueber ins DS als `.gat-btn--xs`.
5. **`--app-akzent-primaer` und `--app-risiko` aufloesen.** Beide nur an
   je einer Stelle benutzt. Entweder Inline durch `--gat-web-green-deep` /
   `--gat-web-clay-text` ersetzen, oder die zwei Aliase ganz weg. Spart
   einen mentalen Schritt beim Lesen.
6. **Sticky-`thead` der `.dtable` als Vorlage fuer kuenftiges
   `.gat-dtable`** — heute funktionsfaehig, kann 1:1 kopiert werden, wenn
   A5 ins DS geht.
7. **Form-Feld-Optik vereinheitlichen:** `.filterbar input/select`,
   `.doc-einwohner-input`, `.search`, `.betrag` benutzen jeweils leicht
   andere Padding-/Fontgroessen-Kombis. Auf einen gemeinsamen lokalen
   `.app-input` zu konvergieren waere eine Vorstufe fuer C2 (DS-Input).
8. **Crumbs nach DS uebersiedeln**, sobald A6 im DS — das Markup im JS
   (`dashboard.js:243-256`) erzeugt schon `<button data-level="N">` —
   nur die Klassennamen am Container muessen mitziehen.
