# personenwahl (buergerinnenrat) — DS-v2.0-Audit

Audit-Datum: 2026-05-23. Quelle: `/workspace/personenwahl/apps/web/`. Live: `https://flomotlik.github.io/buergerinnenrat/` (SPA, Hash-Routing — WebFetch liefert nur den `<title>`, weil das DOM clientseitig gerendert wird; Befunde stützen sich daher primär auf den Quellcode).

## App-Zweck

Browser-natives, backend-loses Sortition-Werkzeug fuer stratifizierte Personenauswahl (Buergerinnenrat, Delegierten-/Vereinsgremien). Stage 1 = Versand-Liste aus Melderegister (Hamilton + Fisher-Yates), Stage 3 = Panel-Maximin auf HiGHS-WASM, beides mit Ed25519-signiertem Audit-JSON. Stage 2 (Outreach) und Stage 4 (Reserve) bewusst out-of-tool.

## Aktuelle DS-Anbindung

- **DS-CSS-Link:** nein. Kein `<link rel="stylesheet" href="https://grueneat.github.io/design-system/design-system.css">` in `apps/web/index.html`.
- **DS-Logo-Asset:** nein. Eigenes Inline-SVG-„Assembly-Icon" (`apps/web/src/shell/Brand.tsx`, gleiches Motiv auch als Favicon in `apps/web/index.html`). Keine Gruene-Marke.
- **gat-charts.js:** nein. Eigene Native-SVG-Balken in `apps/web/src/stage1/AxisBreakdown.tsx` mit hart-codierten Slate-Hex (`#94a3b8`, `#e2e8f0`, `#3b82f6`, `#1e293b`, `#475569`).
- **Verwendet schon:** _nichts_ aus DS v2.0 — keine `--gat-*`/`--gat-web-*`-Tokens, keine `.gat-*`-Klassen, kein gemeinsamer Header.
- **Verwendet noch lokale Alt-Klassen:** ja, komplett eigene Komponenten-Schicht in `apps/web/src/index.css` (895 Zeilen). Eigenes Token-System `--bg`, `--bg-sunken`, `--bg-card`, `--ink`, `--ink-2..4`, `--accent`, `--accent-strong`, `--accent-soft`, `--accent-line`, `--accent-ink`, `--ok`, `--warn`, `--err` (je mit `-soft`), `--gap-1..7`, `--radius`, `--radius-lg`, `--row-h`, `--sidebar-w` — alle in OkLCH mit `--hue: 145` (Civic Green). Plus Brand-Aliase in `tailwind.config.cjs`. Eigene Komponenten: `.btn-primary/-secondary/-ghost`, `.card`/`.card-hover`/`.card-head`/`.card-eyebrow`/`.card-title`/`.card-help`, `.pill-tab`/`-active`/`-inactive`, `.status-pill`/`-ok`/`-warn`/`-err`, `.input-base`/`.input`/`.select`/`.input-label`/`.field-label`/`.field`, `.dropzone`/`-icon`/`-label`/`-hint`/`.is-drag`, `.prose-app`, `.banner`/`.info`/`.warn`/`.ok`/`.err`, `.step-rail`/`.step`/`.is-current`/`.is-done`/`.step-num`, `.tbl`/`.tnum`, `.audit` (mono dl), `.sig-pill`/`.is-unsigned`, `.stats-grid`/`.stat`/`.k`/`.v`/`.delta`, `.chip`/`.is-on`, `.sample-grid`/`.sample-card`, `.doc-grid`/`.doc-toc`/`.doc-body`, `.callout`, `.sidebar`.

Kurz: **Das Tool ist im Zustand „pre-DS-Migration". Keine einzige DS-Klasse, kein DS-Token, kein DS-Asset.** Es laeuft auf seiner eigenen, sehr ausgereiften Token+Komponenten-Schicht aus Issue #65 (`design_handoff_buergerinnenrat/`).

## Befunde (kategorisiert)

### A. Kandidaten fuer DS-Aufnahme

Patterns, die generisch sind und in anderen Tools (gemeindefinanzen, austender, bildgenerator etc.) ebenso gebraucht werden.

#### A1. Sidebar-Shell (Desktop md+) + Mobile-Tab-Pill-Bar
- **Element:** Linke fixierte Sidebar (`--sidebar-w: 256px`) mit Brand-Block oben, `NavGroup` (Eyebrow + UL), Footer mit Build-SHA + „Daten bleiben lokal"; auf <md ersetzt durch horizontal scrollende Pill-Tabbar.
- **DS-Vorschlag:** `.gat-sidebar` / `.gat-sidebar__group` / `.gat-sidebar__group-label` / `.gat-sidebar__link` / `.gat-sidebar__footer`. `--gat-web-sidebar-width`. Mobile-Fallback nutzt bereits vorhandene `.gat-tabbar` aus DS v2.0.
- **Begruendung:** Jedes Daten-Tool mit > 1 Verfahrensschritt braucht das (gemeindefinanzen hat es schon als App-spezifisch). Ein Brand+Footer-Sidebar-Pattern ist generischer als die jetzt schon im DS lebende `.gat-header`.
- **Aufwand:** mittel (M). Mehrere Sub-Komponenten + Responsive-Switch.

#### A2. Drop-Zone (CSV/Excel-Upload)
- **Element:** `.dropzone` + `.dropzone-icon`/`-label`/`-hint`, mit `.is-drag` Modifier, gestricheltem Rand, Hover/DragOver-Tint auf `--accent-soft`, Inline-SVG Upload-Pfeil.
- **DS-Vorschlag:** `.gat-dropzone`/`__icon`/`__label`/`__hint`, Modifier `--dragging`/`--invalid`. Standalone-Bestandteil, kein abhaengiger State.
- **Begruendung:** Jedes Tool das CSV/PDF/Excel akzeptiert (austender Tender-Upload, gemeindefinanzen VRV-CSV) braucht eine konsistente Drop-Zone. DS hat heute nur generische Inputs.
- **Aufwand:** klein (S).

#### A3. Step-Rail / Stepper
- **Element:** `.step-rail` Grid mit `.step`/`.is-current`/`.is-done`/`.step-num`, responsive 6→3→1 Spalten.
- **DS-Vorschlag:** `.gat-stepper`/`__step`/`__num`, Modifier `.is-current`/`.is-done`. Vermutlich braucht auch austender (Tender-Pruefung) sowas, gemeindefinanzen ebenso wenn ein mehrstufiger Workflow rein kommt.
- **Begruendung:** Eine Mehr-Schritt-UI ist ein Klassiker. DS hat `.gat-tabbar` aber das ist semantisch was anderes (parallel switchbar vs. seriell-progressiv).
- **Aufwand:** klein (S).

#### A4. Stats/KPI-Grid
- **Element:** `.stats-grid` 4→2→1 + `.stat`/`.k` (uppercase eyebrow)/`.v` (grosse Mono-Zahl)/`.delta` (kleiner Subtext).
- **DS-Vorschlag:** Es gibt schon `.gat-metric-card` mit Modifiern `--ertrag/--aufwand/--netto/--hero`. Das deckt **Finanzdaten** ab, aber nicht den hier vorliegenden „Algorithmus-Resultat"-Stil (Gezogen, Gruppen-Abdeckung, Unterbesetzt, Dauer). Vorschlag: zweite Variante `.gat-metric-card--neutral` bzw. eine `.gat-stat-card`-Klasse mit derselben Struktur aber neutraler Farbsemantik (keine Ertrag/Aufwand-Konnotation).
- **Begruendung:** Jedes Tool mit Result-Dashboard ohne Finanz-Semantik (austender Lauf-Statistik, bildgenerator Render-Stats) braucht das.
- **Aufwand:** klein (S) — Variante einer existierenden Klasse.

#### A5. Status-Pill / Inline-Status-Badge
- **Element:** `.status-pill` + `.status-pill-ok/-warn/-err` (in Tabellen, neben KPI, in Karten).
- **DS-Vorschlag:** Es gibt `.gat-tag` (Pill/Badge), aber ohne semantische Modifier. Erweiterung: `.gat-tag--ok/-warn/-err/-info` mit Token-Anbindung an die jetzt schon im DS lebenden `--gat-color-gelb/-magenta` plus neue State-Tokens.
- **Begruendung:** Mehr-Tool-Bedarf: gemeindefinanzen hat Warn-Pills bei Quoten-Verletzungen, austender bei Konformitaets-Pruefung.
- **Aufwand:** klein (S).

#### A6. Banner / Notice / Alert
- **Element:** `.banner` + `.info/.warn/.ok/.err`, mit Border + Soft-BG + farbiger Text, oft mit Icon links.
- **DS-Vorschlag:** Es gibt `.gat-callout`. Vergleich: `gat-callout` ist eher ein „Auszug/Quote", die hier vorliegenden Banner sind explizit `info/warn/ok/err` mit semantischer Farbe. Vorschlag: `.gat-banner--info/--warn/--ok/--err` zusaetzlich zum bestehenden Callout.
- **Begruendung:** Form-Feedback + Page-Level-Notices sind Standard. Heute decken weder `.gat-callout` noch sonst was im DS die `warn/err`-Faelle ab.
- **Aufwand:** klein (S).

#### A7. Chip / Multi-Select-Toggle
- **Element:** `.chip` + `.is-on` mit Dot-Indikator, basiert auf versteckter Checkbox. Ueberall dort wo Achsen/Spalten ausgewaehlt werden (AxisPicker).
- **DS-Vorschlag:** `.gat-chip`/`.is-on` (Toggle-Pill), gerne als reines CSS-Pattern (Checkbox-Wrapper) damit Konsumenten den State-Mechanismus selbst waehlen.
- **Begruendung:** Generischer Filter-/Multi-Select-Baustein. gemeindefinanzen koennte das fuer „welche Konti einbeziehen" nutzen, austender fuer Pruefungs-Kriterien-Filter.
- **Aufwand:** klein (S).

#### A8. Data-Table (`.tbl`) mit Sticky-Header, Mono-Zahlen, Hover, kleiner Hairline
- **Element:** `.tbl` + `thead th` sticky/uppercase/eyebrow-Stil, `tbody td` mit Hover, `.tnum` Mono+tabular. Dazu Wrapping `overflow-x-auto` Container fuer Mobile.
- **DS-Vorschlag:** `.gat-table` + `__head/__body/__cell-num`. DS hat heute `.gat-panel__body--table` als Wrapper, aber keine Tabellen-Komponente selbst.
- **Begruendung:** Jedes Daten-Tool hat Tabellen. gemeindefinanzen rendert sehr aehnliche Quoten-/Detailtabellen, austender ebenso.
- **Aufwand:** mittel (M) — viel Mobile-/Print-/Sticky-Detail.

#### A9. Audit-Block (Mono `<dl>` mit tabular-nums + Sig-Pill)
- **Element:** `.audit` Mono-Block + `<dl>` zweispaltig (Label/Wert), kombiniert mit `.sig-pill` (gruene Pille mit Punkt fuer „signiert") und `.sig-pill.is-unsigned` (gelbe Pille).
- **DS-Vorschlag:** **Hybrid** — siehe C-Abschnitt. Generischer Teil (`.gat-defs` als Mono-Definition-List + Signatur-Lozenge) ja, App-Spezifika nein.
- **Begruendung:** Audit/Provenienz/Signatur-Trail brauchen mehrere Tools (austender wird Pruefberichte signieren, gemeindefinanzen koennte Voranschlags-Hashes ausgeben).
- **Aufwand:** mittel (M).

#### A10. Form-Field-Primitives (`.input-base`, `.input-label`, `.field`)
- **Element:** Konsistentes Input-/Label-Pattern mit `--row-h: 44px` als Touch-Target-Minimum, `:focus`-Ring auf `--accent`, Disabled-States.
- **DS-Vorschlag:** `.gat-input`/`.gat-label`/`.gat-field`/`.gat-select`/`.gat-textarea`/`.gat-radio`/`.gat-checkbox`. Wirklich ueberfaellige Form-Layer im DS — heute nur `.gat-btn` da.
- **Begruendung:** Jedes Daten-Tool. DS-Luecke ist offensichtlich.
- **Aufwand:** mittel (M).

#### A11. Sticky-Action-Footer mit iOS-Safe-Area
- **Element:** Sticky-Wrapper `bottom: env(safe-area-inset-bottom)` + `padding-bottom: env(safe-area-inset-bottom)` mit Border-Top, druckt statisch.
- **DS-Vorschlag:** `.gat-action-footer` mit eingebauten Safe-Area-Insets + Print-Reset.
- **Begruendung:** Mobile-Forms / Run-Trigger ueberall. Trotz Druck-Layer im DS keine Mobile-Form-Pattern.
- **Aufwand:** klein (S).

#### A12. Prose-Wrapper fuer Docs (`.prose-app`)
- **Element:** Tailwind-Typography-Wrapper mit Serif-H2/H3, Mono-`<code>`, akzent-unterstrichene Links.
- **DS-Vorschlag:** `.gat-prose` (Token-gebundene Lange-Text-Defaults). Wirft Tailwind-Typography-Dependency ab und nutzt rein DS-Tokens.
- **Begruendung:** Jedes Tool mit Dokumentations-/Beschreibungs-Seiten.
- **Aufwand:** mittel (M).

### B. App-spezifisch — bleibt lokal

Patterns, die nur fuer dieses Sortition-Tool Sinn haben.

#### B1. AxisBreakdown — Native-SVG Soll/Ist-Bars
- **Element:** Per-Achse SVG mit zwei Balken pro Wert (Soll gestreift, Ist blau), Skala = max(pool/target/actual), Pattern-Defs fuer Greyscale-Print-Kompatibilitaet, axis-scoped Pattern-IDs.
- **Warum App-spezifisch:** Spezifisch fuer Stratifikations-Ergebnisse mit Soll-vs-Ist-Vergleich. DS liefert ohnehin keine Chart-Engine.
- **Namespace:** `.app-axis-breakdown` / `--app-axis-breakdown-*`. Aktueller Code hat keinen `.app-*`-Praefix — Umbenennung sinnvoll, sobald irgend ein DS-Bezug entsteht.

#### B2. OverrideEditor (Sitz-Allokation)
- **Element:** 4-Spalten-Tabelle (Wert / Pool / Baseline / Override / Diff) + Live-Summen-Validator + Pflicht-Begruendung-Textarea mit Non-Whitespace-Counter + Reset-Button + Commit-Pill (`status-pill-ok/-warn`).
- **Warum App-spezifisch:** Sortition-Domaenenlogik (Pflichtbegruendung, Panel-Sum-Constraint, Audit-Schema-0.2). Auch das amber-tonige BG-Tint (`bg-amber-50/40`) ist hier hard-coded — sollte aber auf `--gat-color-gelb` Soft-Variante migrieren, wenn das DS soft-Aliasse anbietet.

#### B3. AgeBandsEditor (Altersgruppen-Baender)
- **Element:** Liste von Baendern mit Min/Max/Offen-Checkbox/Label/Modus-Radios. Pure Stratifikations-Konfiguration.
- **Warum App-spezifisch:** Domaenenmodell (Bevoelkerungs-Strata-Definition).

#### B4. SampleSizeCalculator (Bemessung)
- **Element:** Panel-Groesse + Outreach-Methode (Radio-Group mit 3 Optionen) + Custom-Rate-Inputs → empfohlener Versand-N mit Rechenweg-Details.
- **Warum App-spezifisch:** Outreach-/Rueckweg-Statistik ist sortition-spezifisch.

#### B5. StratificationExplainer
- **Element:** Collapsible mit Definition + numerischem Beispiel + live-count der Kreuzprodukt-Kardinalitaet.
- **Warum App-spezifisch:** Stratifikation als Konzept ist Sortition.

#### B6. TrustStrip / Overview-Principles
- **Element:** 3-Spalten-Grid mit Icon-Karten (Algorithmus / Cross-Validiert / Audit-Protokoll). Linkt in die Dokumentation.
- **Warum App-spezifisch:** Inhalt ist sortition-spezifisch. **Container-Pattern aber generisch:** „3-card icon-strip mit Linkkarten" ist exakt was im DS als `.gat-card-grid--3 .gat-card--linkcard` Sinn ergaebe — siehe A1/A5-Naehe. Inhalts-Mapping bleibt App.

#### B7. Stage1-Print-Rules + DocsLayout (Sticky 220px TOC + 68ch Body)
- **Element:** Print-Hide-Regeln auf `[data-testid="..."]`, expand-on-print fuer `<details>`, Mono-Hash-Layout fuer Audit-Print. DocsLayout extrahiert `<h2>` per JS in eine Sticky-TOC.
- **Warum App-spezifisch:** Die Print-Selektoren sind testid-spezifisch. Das DocsLayout-TOC-Pattern dagegen ist generisch (siehe C).

### C. Hybrid: DS-konforme Loesung benoetigt

Bausteine, bei denen das DS die Struktur liefern muss und die App nur die Domaenenspezifika ueberlagert.

#### C1. Audit-/Provenienz-Footer + Signatur-Lozenge
- **Element:** `.audit` Mono-Definition-List + `.sig-pill`/`.is-unsigned` + abbreviierter Hash/PublicKey/Signature mit `title=`-Tooltip.
- **DS-Anteil:** `.gat-defs` (Mono-`<dl>` zwei-spaltig mit `<dt>`/`<dd>`, tabular-nums, Hairline-BG). `.gat-sig-lozenge`/`--unsigned` als signed/not-signed-Indikator (Token-gefuettert, gruen/gelb). Helper `.gat-abbrev[title]` fuer Hash-Verkuerzung mit Hover-Voll-Wert.
- **App-Spezialisierung:** Welche Felder (`schema_version`, `seed`, `pool_size`, …) und welche Sortierung — kommt aus dem Sortition-Schema.
- **Begruendung:** austender wird Pruef-Audit-Bloecke haben, gemeindefinanzen Voranschlags-Hashes — gleicher Mono-`<dl>`-Stil.

#### C2. Sticky-TOC-Layout fuer lange Dokumente
- **Element:** Auto-extrahierte `<h2>`-TOC links sticky (220px), Reading-Column 68ch, `overflow-y: auto` mit `max-height: calc(100vh - 64px)`, Mobile = 1-Spalten-Stack.
- **DS-Anteil:** `.gat-doc-grid`/`.gat-doc-toc`/`.gat-doc-body` (reine CSS-Pattern; TOC-Auto-Extraktion bleibt JS-Code der Konsumenten).
- **App-Spezialisierung:** Welche Subseiten/Slugs/Titel.

#### C3. Result-Tabelle (Stage 1 Detail-Strata + Stage 3 Quoten-Erfuellung + Selected-Panel)
- **Element:** Sortierbare/Sticky-Header-Tabellen mit Mono-Zahlen, optional Zeilenfaerbung bei Warnungen (`bg-warn-soft`), `tnum`-Mono-Zahlen, Status-Spalte mit Pill.
- **DS-Anteil:** `.gat-table` (siehe A8) + zeilenweise Modifier `.is-warn/.is-error` als CSS-Klassen. DS soll auch das Wrapping in `overflow-x-auto`-Container vorgeben.
- **App-Spezialisierung:** Spaltennamen + welcher Status wann.

#### C4. Progress-Bar (Stage 3 Run-Progress)
- **Element:** 2-Zeiler: Text-Status (`progress().msg`) + 2px-hoher Bar (slate-200 BG, slate-700 Fill, `transition-all`).
- **DS-Anteil:** `.gat-progress`/`__bar`/`__fill`/`__label` mit Token-Farben statt Slate. Erweitern um `--indeterminate` Variante.
- **App-Spezialisierung:** Was die Fraction bedeutet — kommt aus der Engine.
- **Hinweis:** Heute hart-codiert `bg-slate-200`/`bg-slate-700` — `bg-red-700`/`bg-red-50` fuer Abbrechen-/Error-States. Visuelle Anomalie zugleich (siehe unten).

#### C5. Form-Block-Layout (Schritt-Cards)
- **Element:** `.card` + `.card-head` mit `.card-eyebrow` (Mono-Caps „Schritt N") + `.card-title` (Serif) + `.card-help`. Kombiniert in jedem Stage-1-Schritt.
- **DS-Anteil:** Es gibt `.gat-card` (Marketing-Karte) und `.gat-panel` (Daten-Werkzeug-Panel) — Letzteres deckt die Funktion ab, aber **ohne Eyebrow**. Vorschlag: `.gat-panel__eyebrow` (Mono-Caps oberhalb des `__head`-Titels) erweitern.
- **App-Spezialisierung:** Welche Schritt-Nummer + welcher Titel.

## Visuelle Anomalien

Token-fremde Hex/Tailwind-Farben, die im DS auf semantische `--gat-*`-Tokens migrieren muessten.

- **`AxisBreakdown.tsx`:** Hartkodierte Slate-Hex `#94a3b8`, `#e2e8f0`, `#3b82f6` (Soll/Ist-Bars), `#1e293b`, `#475569` (Labels). Sollte auf `--gat-web-chart-*` oder DS-Greyscale.
- **`RunPanel.tsx`:** Vermischt eigenes Token-System mit purem Tailwind-Slate (`bg-slate-900`, `bg-slate-100`, `bg-slate-50`, `bg-slate-200`, `bg-red-700`, `bg-red-50`, `border-red-600`). Bricht das Hue-145-Token-System auf — Cancel-Buttons sind reines `bg-red-700`, Run-Button ist `bg-slate-900` (nicht `--accent`!). **Schwerwiegende Inkonsistenz zur restlichen App.**
- **`StratificationExplainer.tsx`:** `border-sky-300` und `bg-amber-50/amber-200/amber-800` direkt aus Tailwind statt aus Token.
- **`OverrideEditor.tsx`:** `bg-amber-50/40` Wrapper, `border-amber-500`, `text-red-700`, `text-emerald-700` — gemischter Token+Tailwind-Modus.
- **`Stage1Panel.tsx`:** Mehrere `bg-amber-50 border-amber-200 text-amber-800` Inline-Bloecke statt `.banner.warn`. Pool-Preview-Box ist `bg-slate-50` statt `--bg-sunken`.
- **`FilePreview.tsx`/`FileImport.tsx`:** `bg-slate-100`/`bg-slate-50` Zebra-Streifen, `border` (default-color) — keine Token-Anbindung.
- **`AuditFooter.tsx`/`Brand.tsx`:** Tokenisiert sauber. Gegenbeispiel: sehr gut migriert.
- **Schrift-Mischmasch:** `--serif: Source Serif 4`, `--sans: Inter`, `--mono: JetBrains Mono` — alles selbst gehostet, alles unter SIL OFL. DS v2.0 nutzt eigene `--gat-font-headline/-copy/-emphasis`. Die App haette also ihren eigenen Serif-Stack — der **bricht die Marke** sobald die App ein „Gruene AT"-Branding tragen muss. Heute trifft das nicht zu, weil das Tool als civic-tech-neutral positioniert ist. Bei DS-Migration: Entscheidung noetig, ob die App das DS-Branding **uebernimmt** (dann weg von Source Serif 4) oder ob sie als markenneutrales Werkzeug **danebensteht** (dann nur Layer-Tokens uebernehmen, nicht Marken-Tokens).
- **Civic-Green Hue 145** ist eine bewusst nicht-parteiliche Entscheidung (siehe `tailwind.config.cjs` Kommentar). Bei DS-Migration kollidiert das mit `--gat-color-dunkelgruen/-hellgruen`. Klaerung noetig.
- **OkLCH-Fallback-Banner** in `index.css` Zeile 153 — Firefox-ESR-102-Schutz. Pattern wert, in DS aufzunehmen (alle `--gat-color-*` sind heute schon oklch).

## Quick-Wins (Migration low-effort)

Was sich mit minimalem Aufwand auf DS umstellen liesse — sortiert nach Aufwand.

1. **`Brand.tsx` ersetzen:** Inline-„Assembly-Icon" durch `<img src="https://grueneat.github.io/design-system/assets/gruene-logo.svg">` aus dem DS, falls die App das Gruene-Branding annehmen soll. Klaerung S-4/S-5: das Tool ist „civic-tech-neutral" positioniert — falls es **kein** Gruene-Branding tragen soll, bleibt das eigene Logo. Aufwand: triviale 5 Minuten **oder** strategische Entscheidung.
2. **Tailwind-Slate-Reste in `RunPanel.tsx` und `FilePreview.tsx` durch Token-Aliasse ersetzen** (`bg-slate-100` → `bg-bg-sunken`, `bg-slate-900` → `bg-accent` oder besser `.btn-primary`-Klasse). Aufwand: 30 Minuten, beseitigt die schlimmste Inkonsistenz.
3. **`.banner.info/.warn/.err`** ist 1:1 mit dem geplanten `.gat-banner--info/--warn/--err` mappable. Sobald das DS die Klassen liefert: reiner Such+Ersetz.
4. **`.status-pill*`** → `.gat-tag --ok/--warn/--err` (sobald DS-Variante exists). Sub-30-Minuten Replace.
5. **Charts in `AxisBreakdown.tsx`:** Hex-Werte durch CSS-Variablen aus DS-Chart-Palette ersetzen (`var(--gat-web-chart-slate)` etc.). Pattern-Defs koennen bleiben. Aufwand: 20 Minuten.
6. **`.btn-primary/-secondary/-ghost`:** Eins-zu-eins-Mapping auf `.gat-btn`/`--primary`/`--secondary`. Achtung: DS-Variante ist „vollrund Magenta" (Pill), die App nutzt heute Radius `--radius: 8px` (rechteckig-gerundet). Wenn die Marke-Schicht **nicht** uebernommen wird, bleibt der Button-Stil App-spezifisch. Aufwand: 1h oder ungeloest (Marken-Entscheidung).
7. **`.input-base/.input-label/.field`:** Migrationsziel sobald DS-Form-Layer steht (siehe A10). Bis dahin nichts tun.
8. **Build-Footer mit `__GIT_SHA__ + __BUILD_DATE__`** (in `Sidebar.tsx` und `DocsLayout.tsx`): generisches Pattern, koennte in DS als `.gat-build-stamp` Helper. Aufwand: trivial.
9. **`<aside class="sidebar">` Markup:** vermutlich kein Quick-Win, weil DS heute keine Sidebar liefert (A1 ist offen). Bis DS nachzieht: bleibt lokal.

## Zusammenfassung

Das Tool ist **vollstaendig pre-DS**. Es hat eine sehr saubere eigene Token-Schicht (OkLCH, Hue 145) und eine umfangreiche Komponenten-Schicht (`.btn-*`, `.card-*`, `.dropzone`, `.step-rail`, `.banner`, `.audit`, `.sig-pill`, `.stats-grid`, `.chip`, `.tbl`, `.callout`, `.sidebar`, `.doc-grid` …). Mehrere dieser Komponenten sind generisch genug, um ins DS aufgenommen zu werden — vor allem **Drop-Zone (A2)**, **Step-Rail (A3)**, **Sidebar-Shell (A1)**, **Form-Primitives (A10)**, **Banner (A6)**, **Status-Tag-Modifier (A5)**, **Data-Table (A8)**. Zwei strategische Entscheidungen vor der Migration:

1. Soll das Tool das Gruene-Branding (Magenta-Buttons, Source-Serif-weg, Gruene-Logo) tragen, oder bleibt es markenneutrales civic-tech-Werkzeug? Aktuelle Selbstpositionierung sagt Letzteres (siehe `tailwind.config.cjs` Civic-Green-Kommentar).
2. Die zwei groessten visuellen Anomalien (Tailwind-Slate-Reste in `RunPanel`/`FilePreview`, hardcoded Chart-Farben in `AxisBreakdown`) sollten **unabhaengig** von der DS-Migration aufgeraeumt werden, weil sie schon heute das eigene Token-System brechen.
