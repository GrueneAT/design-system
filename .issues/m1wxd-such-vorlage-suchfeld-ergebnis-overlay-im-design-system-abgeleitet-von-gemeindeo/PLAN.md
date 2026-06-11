# Plan: Such-Vorlage (Suchfeld + Ergebnis-Overlay) im Design System

<objective>
Was dieser Plan liefert: eine wiederverwendbare Such-Vorlage im Grüne-AT
Design System, bestehend aus (1) einer net-new `.gat-search*`-CSS-Familie in
`src/design-system.css`, (2) einem engine-neutralen ESM-Verhaltensmodul
`gat-search.js` (Open/Close, Pfeiltasten-Navigation, ARIA combobox/listbox/
option, Focus-Trap im Modal, `Strg/Cmd+K`, `prefers-reduced-motion`,
Adapter-Vertrag), (3) einem dokumentierten, optionalen Pagefind-Adapter, (4)
einem Showcase in `index.html` mit BEIDEN Varianten (Inline-Overlay +
`Strg+K`-Modal) und einem Dummy-In-Memory-Adapter, und (5) einem additiven
Minor-Release v2.3.0 (CHANGELOG, MIGRATION, `package.json`-Bump, neu gebautes
und mit committetes minifiziertes CSS) plus Consumer-Doku im README.

Warum es zählt: werkzeuge rendert Pagefind-Treffer heute inline (Layout-Shift);
die Gemeindeordnung hat eine reife, aber app-verflochtene Lösung. Diese Vorlage
hebt das generische Verhalten zentral ins DS (kein Layout-Shift, echte
A11y/Tastatur-Navigation, einheitliche Zustände), sodass die Folge-Issues
werkzeuge#15 und Gemeindeordnung#15 darauf umstellen können, ohne die Brücke
jeweils neu (und unterschiedlich) zu bauen.

Scope IN: DS-Vorlage (CSS + ESM + Adapter-Beispiel + Showcase + Release-Doku).
Scope OUT (Deferred, NICHT anfassen): Rollout in werkzeuge/Gemeindeordnung,
Bundesland-Filter, Content-Typ-Gruppierung/Tabs, Stemming-Falsch-Positiv-Filter,
IntersectionObserver-Hero-Tracking, localStorage-BL-Persistenz, `?highlight=`-
URL-Bau, FAB-Logik. App-spezifisches bleibt App-Schicht.

Hinweis: CONTEXT.md liegt vor — alle drei gesperrten Entscheidungen sind in
Tasks abgebildet (siehe `<strategy>`).
</objective>

<strategy>
Richtung: Generisches Such-Verhalten aus der Gemeindeordnung-Referenz
destillieren und engine-neutral ins DS heben — CSS-Familie + ein ESM-Modul wie
`gat-charts.js`, additiv hinter Toast/Toolbar, vor dem Hochkontrast-Block.

Gesperrte Entscheidungen (CONTEXT.md, nicht relitigieren):
1. `gat-search.js` als ESM-Verhaltensmodul von der Pages-URL (wie
   `gat-charts.js`). Implementiert in Task 2.
2. v1 liefert BEIDE Varianten: Inline-Overlay-Dropdown (kein Layout-Shift) UND
   Modal/`Strg+K` (wiederverwendet `.gat-modal --blur/--wide`). Tasks 1, 2, 4.
3. Engine-agnostischer Kern + dokumentierter optionaler Pagefind-Adapter.
   Tasks 2, 3.

Strategische Optionen und Begründung der Wahl:
- `<dialog>` vs. eigener Backdrop (zentrale Architektur-Spannung). Die Referenz
  baut bewusst KEIN `<dialog>`, weil der sticky Trigger beim Schließen den
  Tastatur-Fokus verliert. Wir bleiben dennoch beim nativen `<dialog>` /
  `showModal()` (= `.gat-modal`), weil das Top-Layer, Focus-Trap, ESC und
  `inert`-Hintergrund gratis liefert; `gat-search.js` löst die einzige Lücke
  (`returnFocus` auf das auslösende Trigger-Element) selbst. Eigenen Backdrop
  nachbauen würde die DS-Modal-Shell duplizieren — abgelehnt.
- Debouncing-Ort: `gat-search.js` macht das Debouncing (konfigurierbar); der
  Pagefind-Adapter ruft `debouncedSearch(q, opts, 0)` oder `search`. Kein
  doppeltes Debouncing (Referenz warnt davor).
- ARIA-Navigation: `aria-activedescendant` (Fokus bleibt im Input) statt
  Roving-`tabindex` — entspricht dem APG-Combobox-with-listbox-Pattern und ist
  net-new gegenüber der Referenz.

Kern-Entscheidungspunkte für den Executor: nur `src/design-system.css` editieren
und neu bauen (CI prüft `git diff --exit-code design-system.css`); keine
hardcodierten Font-Strings (nicht den Barlow-Fehler aus `gat-charts.js`
wiederholen — Schrift über `--gat-font-*` / CSS); keine Seiteneffekte beim
Modul-Import (Astro-SSR-sicher); `design-spec`-JSON-Version (1.0) NICHT mit
`package.json` angleichen.
</strategy>

<context>
Issue: @.issues/m1wxd-such-vorlage-suchfeld-ergebnis-overlay-im-design-system-abgeleitet-von-gemeindeo/ISSUE.md
Research: @.issues/m1wxd-such-vorlage-suchfeld-ergebnis-overlay-im-design-system-abgeleitet-von-gemeindeo/RESEARCH.md

WORKSPACE-LAYOUT (genested): issue-cli-Root ist `/workspace/design-system`
(KEIN git-Repo). Das git-Repo und der gesamte Code liegen unter
`/workspace/design-system/design-system/`. ALLE unten genannten `<files>`-Pfade
sind relativ zu diesem git-Repo-Root (`design-system/...`). Die Execution legt
den Worktree via `issue-cli` an — in diesem Plan NICHT selbst.

<interfaces>
<!-- Executor: diese Verträge direkt verwenden. Den Code NICHT erneut explorieren. -->

=== Wiederverwendbare DS-CSS-Bausteine (src/design-system.css) — KOMPONIEREN, nicht neu bauen ===
.gat-input          : Feld-Optik: width:100%, var(--gat-font-copy),
                      border var(--gat-web-input-border), radius var(--gat-web-input-radius),
                      min-height var(--gat-web-input-min-h, 44px) [WCAG Touch-Floor],
                      :focus-visible -> box-shadow var(--gat-web-focus-ring)
.gat-modal          : natives <dialog>; bg/radius/shadow; max-width min(40rem,92vw)
.gat-modal::backdrop: var(--gat-web-modal-backdrop) rgba(31,38,28,.55)
.gat-modal--blur    : backdrop-filter: blur(3px)
.gat-modal--wide    : max-width min(64rem,94vw)
.gat-modal--narrow  : max-width min(28rem,90vw)
.gat-modal__head/__title/__close/__body/__actions  : __body max-height:70vh; overflow:auto
.gat-toaster        : position:fixed; z-index:1000 (Overlay-Stacking-Obergrenze)
.gat-skiplink       : position:fixed; z-index:999

Token-Vokabular (alle :root, consumer-stabil --gat-web-* / --gat-*):
--gat-web-focus-ring         0 0 0 3px color-mix(... green 38%)
--gat-web-focus-offset       2px
--gat-web-shadow-elevated    0 6px 24px (Overlay-Schatten)
--gat-web-surface / -surface-sunk / -text / -text-soft / -hairline
--gat-web-green / -green-deep / -green-tint
--gat-web-radius-card / -radius-control / -radius-mini
--gat-space-1..6, --gat-text-copy/-small/-micro, --gat-font-copy/-headline

prefers-reduced-motion-Muster (aus .gat-toast, src ~Z.1809):
  @media (prefers-reduced-motion: reduce){ .gat-toast{ animation: gat-toast-fade ... } }
HC-Override-Muster (aus .gat-mode-hc .gat-modal, src ~Z.2087): jede Familie hat HC-Overrides.

=== gat-search.js Modul-API (DIESE implementieren, Task 2) ===
import { createSearch } from 'https://grueneat.github.io/design-system/gat-search.js';
const controller = createSearch({
  input,                 // HTMLInputElement oder Selector-String (Pflicht)
  overlay,               // Ergebnis-Container (Inline) - optional im Modal-Modus
  search,                // async (query, { signal }) => SearchResult[] | null  (Pflicht; LOCKED #3)
  renderItem,            // (result) => HTMLElement | string  (default: Titel+Snippet+Badge)
  getItemHref,           // (result) => string  (default: result.url)
  minQueryLength = 3,
  debounceMs = 200,
  mode = 'inline',       // 'inline' | 'modal'
  shortcut = true,       // Strg/Cmd+K + '/'
  triggers = [],         // Elemente, die das Modal oeffnen (Header-Lupe etc.)
  closeOnSelect = true,
  labels = { placeholder, noResults, hint, loading, count }  // deutsche Defaults
});
controller.open(); controller.close(); controller.focus(); controller.destroy();
controller.setQuery(q); controller.refresh();
// SearchResult-Slot-Schema (was der Adapter liefern MUSS):
//   { id, title, excerpt? (HTML mit <mark>, vom Adapter HTML-escaped), url, badge?, meta? }
// CustomEvents (auf input/overlay): 'gat-search:open' | ':close' | ':query'
//   | ':select' (detail {result}) | ':results' (detail {query,count})

=== Pagefind-Adapter-Beispiel (Task 3, dokumentiertes optionales Beispiel) ===
export function pagefindAdapter({ bundlePath='/pagefind/', limit=10, filters } = {}) -> async (query,{signal})=>results[]
// import(`${bundlePath}pagefind.js`); pf.options({bundlePath}); pf.debouncedSearch(q,{filters},0)
// -> null bei superseded; sonst r.data() je Treffer -> map auf Slot-Schema {id,title,excerpt,url,meta}
// try/catch + stiller Fallback (Pagefind fehlt im Dev-Modus vor `pagefind --site dist`).

=== ESM-Liefermuster (gat-charts.js) ===
Header-Kommentar mit Import-Beispiel + Lizenz (CC BY 4.0); benannte Exporte.
ACHTUNG: gat-charts.js hardcodiert 'Barlow Semi Condensed' - NICHT uebernehmen.
gat-search.js setzt KEINE Font-Strings; Schrift regelt CSS ueber --gat-font-*.
</interfaces>

<call_sites>
Gesucht: Einbindungen von `gat-search.js` und der `.gat-search*`-Klassen sowie
Build-/Pages-Surface der DS.
Surfaces gegrept: .github/workflows/, package.json, index.html, examples/,
README.md, CHANGELOG.md, MIGRATION.md (alle unter design-system/).

Gefunden:
- .github/workflows/build-check.yml:19-21 — `npm run build` + `git diff --exit-code
  design-system.css` — IN SCOPE (Task 5: gebautes CSS muss committet sein, sonst CI rot).
- .github/workflows/pages.yml — deployt das Repo statisch nach GitHub Pages; macht
  `gat-search.js` automatisch unter der Pages-URL verfuegbar — OUT OF SCOPE (kein
  Workflow-Edit noetig; neue Repo-Root-Datei wird mitdeployt, wie `gat-charts.js`).
- package.json:7 — `"build": "tailwindcss -i ./src/design-system.css -o
  ./design-system.css --minify"` — IN SCOPE als Build-Befehl (Task 5).
- README.md (Abschnitt „Chart-Helfer (ES-Modul)") — Muster fuer einen neuen
  „Such-Helfer (ES-Modul)"-Abschnitt — IN SCOPE (Task 7).
- gat-charts.js (Repo-Root) — Liefer-/Header-Muster fuer gat-search.js — Vorlage,
  keine Aenderung — OUT OF SCOPE als Edit.
Es wurde KEIN bestehender App-/CI-Aufruf von `gat-search.js` oder `.gat-search*`
gefunden (net-new Surface; Consumer-Rollout ist Folge-Issue).
</call_sites>

Key files:
@design-system/src/design-system.css — CSS-Quelle (Tailwind v4 build -> minified Root). NUR hier editieren.
@design-system/design-system.css — gebautes/minifiziertes Stylesheet; CI prueft Gleichheit. Mit committen, nie von Hand editieren.
@design-system/gat-charts.js — ESM-Praezedenz (Header/Lizenz/Export-Stil) fuer gat-search.js.
@design-system/index.html — Styleguide-Showcase; neue Such-Section + TOC-Eintrag.
@design-system/examples/minimal.html — Consumer-Minimalbeispiel; Vorlage fuer optionales examples/suche.html.
@design-system/CHANGELOG.md, @design-system/MIGRATION.md, @design-system/package.json, @design-system/README.md — Release-Artefakte.
</context>

<commit_format>
Format: conventional mit Issue-Prefix (aus .issues/config.yaml: commits.format=conventional, prefix=true).
Pattern: {issue-id}: {type}({scope}): {description}
Beispiel: m1wxd: feat(search): add .gat-search overlay + modal CSS family
Typen: feat, fix, test, refactor, docs, chore. Keine Werkzeug-Attribution.
</commit_format>

<tasks>

<task type="auto">
  <name>Task 1: .gat-search*-CSS-Familie in src/design-system.css</name>
  <files>design-system/src/design-system.css</files>
  <action>
  Fuege eine net-new `.gat-search*`-Komponentenfamilie additiv ein — platziere
  sie HINTER dem v2.2-Toast/Toolbar-Block und VOR dem Hochkontrast-Block
  (`.gat-mode-hc ...`, beginnt ~Z.2087). Komponiere ausschliesslich auf
  vorhandenen Tokens/Bausteinen (siehe interfaces); KEINE hardcodierten
  Farben/Radien/Spacings, KEINE hardcodierten Font-Strings (Schrift via
  `--gat-font-*`). Editiere NUR diese Quelldatei, NIE die minifizierte
  Root-`design-system.css` (das macht Task 5 per Build).

  Klassen-API (BEM-Stil wie der Rest des DS):
  - `.gat-search` — Feld-Wrapper, `position: relative` (Overlay-Anker).
  - `.gat-search__field` — nutzt `.gat-input`; `padding-left` fuer Icon-Slot.
  - `.gat-search__icon` — absolut positionierter Lupe-Slot, `pointer-events:none`.
  - `.gat-search__overlay` — `position:absolute; top:100%; left:0; right:0;`
    `box-shadow: var(--gat-web-shadow-elevated)`; Hintergrund `var(--gat-web-surface)`,
    Radius `var(--gat-web-radius-card)`; z-index ~50 (ueber sticky Header, UNTER
    `.gat-skiplink` 999 / `.gat-toaster` 1000). NIMMT KEINEN PLATZ IM FLUSS ->
    kein Layout-Shift (harte AC). Default versteckt via `[hidden]`; sichtbar via
    `.is-open`.
  - `.gat-search__results` — Listbox-Container; `max-height` + `overflow:auto`.
  - `.gat-search__item` — Ergebnis-Item; `.is-active` fuer Highlight des aktiven
    Items (Tastatur-Navigation / `aria-activedescendant`).
  - `.gat-search__item-title`, `.gat-search__item-excerpt`, `.gat-search__item-badge`.
  - `.gat-search__count` — "N Treffer"-Kopf.
  - `.gat-search__state` mit Zustands-Modifiern `--empty`, `--loading`,
    `--no-results`, `--hint` (vereinheitlichte Zustaende, harte AC).
  - `.gat-search-trigger` — Header-Lupe-Button, der Modal/`Strg+K` ausloest
    (ersetzt das app-lokale `.gat-header__search`; Touch-Floor 44px wie `.gat-input`).
  - `.gat-search--modal` — Variante fuer das Feld IM `.gat-modal`; bei <640px
    Full-Screen (`inset:0; height:100dvh; max-width:100vw`) — `100dvh` statt
    `100vh` (iOS-Safari-Address-Bar). KEINE neue Modal-Shell — die Modal-Variante
    nutzt `.gat-modal --blur --wide` + `.gat-search` darin.

  Einblende-Animation des Overlays mit `prefers-reduced-motion`-Fallback nach
  dem `.gat-toast`-Muster (Slide/Scale -> reiner Opacity-Fade). Sichtbarer Fokus
  auf Items via `--gat-web-focus-ring`.
  </action>
  <verify>
  <automated>cd design-system && grep -q "gat-search__overlay" src/design-system.css && grep -q "gat-search--modal" src/design-system.css && grep -q "gat-search-trigger" src/design-system.css && grep -q "gat-search__state" src/design-system.css && npm run build && echo BUILD_OK</automated>
  </verify>
  <done>
  - `.gat-search`, `__field`, `__icon`, `__overlay`, `__results`, `__item`(+`.is-active`),
    `__item-title/__item-excerpt/__item-badge`, `__count`, `__state`(--empty/--loading/
    --no-results/--hint), `.gat-search-trigger`, `.gat-search--modal` sind in src vorhanden.
  - Overlay ist `position:absolute; top:100%` (kein Fluss-Platz -> kein Layout-Shift).
  - z-index des Overlays liegt unter 999 (Skiplink) / 1000 (Toaster).
  - Reduced-motion-Fallback fuer die Overlay-Einblendung vorhanden.
  - Keine hardcodierten Hex-Farben/Font-Strings in der neuen Familie.
  - `npm run build` endet mit Exit 0 (BUILD_OK).
  </done>
</task>

<task type="auto">
  <name>Task 2: gat-search.js ESM-Verhaltensmodul (engine-neutral)</name>
  <files>design-system/gat-search.js</files>
  <action>
  Erstelle das Modul im Repo-Root neben `gat-charts.js`. Header-Kommentar mit
  Import-Beispiel von der Pages-URL und Lizenz (CC BY 4.0) im `gat-charts.js`-Stil.
  KEINE Seiteneffekte beim Import (kein Top-Level-DOM/`document`/`window`-Zugriff —
  Astro-SSR-sicher); alles erst in `createSearch()`. KEINE hardcodierten
  Font-Strings (Schrift regelt CSS).

  Implementiere `export function createSearch(options)` exakt nach der Modul-API in
  interfaces. Verhalten (generisch, aus der Referenz destilliert; LOCKED #1):
  - Open/Close des Overlays (Inline: `.gat-search__overlay.is-open` toggeln) bzw.
    Modal (`mode:'modal'` -> `<dialog>.showModal()`/`.close()` auf `.gat-modal`).
  - Debounce (`debounceMs`, default 200) MIT Generation-/Race-Guard
    (Generation-Counter), damit veraltete async-Treffer nie eine neuere Anzeige
    ueberschreiben. Das Modul macht das Debouncing — NICHT zusaetzlich der Adapter.
  - Min-Zeichen-Hinweis (`minQueryLength`, default 3) -> `__state--hint`.
  - Zustaende rendern: `--loading` waehrend Adapter laeuft, `--no-results` bei
    leerem Ergebnis, `--empty` initial, `__count` bei Treffern.
  - Adapter-Aufruf `search(query, { signal })`; `null` (superseded) wird ignoriert.
    Default-`renderItem` baut Titel (`textContent`-escaped — XSS!), `excerpt`
    (HTML, NUR wenn vom Adapter escaped, via innerHTML) und optionales Badge.
    `getItemHref` default `result.url`.
  - Pfeiltasten-Navigation (NEU, harte AC): ArrowDown/ArrowUp bewegt aktives Item
    (mit Wrap), Home/End optional, Enter aktiviert (Navigation via `getItemHref`
    ODER `gat-search:select`-Event), ESC schliesst (Inline: blur/close; Modal:
    close + `returnFocus`).
  - ARIA-Verdrahtung (NEU, harte AC) AUTOMATISCH setzen: input
    `role=combobox aria-expanded aria-controls=<overlay-id> aria-autocomplete=list
    aria-activedescendant=<aktives-item-id>`; `__results` `role=listbox`; items
    `role=option id=... aria-selected`.
  - Modal-Modus: nativer `<dialog>` liefert Focus-Trap + ESC + inert-Hintergrund
    gratis; Modul ergaenzt NUR `returnFocus` auf das ausloesende Trigger-Element
    beim Schliessen (loest die in der Referenz dokumentierte Fokus-Verlust-Luecke).
    Body-Scroll-Lock beim Oeffnen (`overflow:hidden`), Restore beim Schliessen.
  - `Strg/Cmd+K` und `/` oeffnen (wenn `shortcut`), `triggers[]`-Elemente oeffnen
    das Modal per Click.
  - CustomEvents feuern: `gat-search:open|close|query|select|results` wie in interfaces.
  - Controller zurueckgeben: `open/close/focus/destroy/setQuery/refresh`. `destroy`
    entfernt ALLE Listener (kein Leak).
  </action>
  <verify>
  <automated>cd design-system && node --input-type=module -e "import('./gat-search.js').then(m=>{if(typeof m.createSearch!=='function')throw new Error('createSearch fehlt');console.log('IMPORT_OK no side-effects')}).catch(e=>{console.error(e);process.exit(1)})" && grep -q "role=.combobox\|combobox" gat-search.js && grep -q "aria-activedescendant" gat-search.js && grep -q "returnFocus\|return.*[Ff]ocus" gat-search.js && ! grep -q "Barlow" gat-search.js && echo CHECKS_OK</automated>
  </verify>
  <done>
  - Modul importiert in Node OHNE Seiteneffekte (kein DOM-Zugriff beim Import) -> IMPORT_OK.
  - `createSearch` ist exportiert; Controller-Methoden open/close/focus/destroy/setQuery/refresh vorhanden.
  - ARIA combobox/listbox/option + `aria-activedescendant` werden gesetzt.
  - Pfeiltasten-Navigation, Enter, ESC, Focus-Trap (Modal via <dialog>) + `returnFocus` implementiert.
  - Debounce mit Generation-Guard; Adapter wird mit `{signal}` aufgerufen, `null` ignoriert.
  - Default-Renderer escaped Titel via `textContent`.
  - Keine hardcodierten Font-Strings (kein "Barlow").
  </done>
</task>

<task type="auto">
  <name>Task 3: Dokumentierter Pagefind-Adapter (optionales Beispiel)</name>
  <files>design-system/examples/pagefind-adapter.js</files>
  <action>
  Lege einen dokumentierten, optionalen Pagefind-Adapter als Beispiel/Helfer an
  (LOCKED #3). KEINE Pflicht-Abhaengigkeit, KEIN Vendoring von Pagefind — der
  Adapter importiert das Consumer-Bundle dynamisch zur Laufzeit.

  Implementiere `export function pagefindAdapter({ bundlePath='/pagefind/',
  limit=10, filters } = {})`, die eine `async (query, { signal }) => results[]`
  zurueckgibt (passt auf die `search`-Adapter-Signatur aus Task 2):
  - Lazy-Init: beim ersten Aufruf `await import(\`${bundlePath}pagefind.js\`)` (mit
    `/* @vite-ignore */`), dann `await pf.options({ bundlePath })`.
  - `await pf.debouncedSearch(query, { filters }, 0)` (Debounce macht gat-search;
    KEIN doppeltes Debouncing). `null` (superseded) unveraendert zurueckgeben ->
    gat-search ignoriert es.
  - Sonst `res.results.slice(0, limit)`, je Treffer `await r.data()`, mappen auf
    das Slot-Schema: `{ id: d.url, title: d.meta?.title ?? '', excerpt: d.excerpt,
    url: d.url, meta: d.meta }`. (Pagefind-`excerpt` ist HTML-escaped, safe fuer
    innerHTML; `meta.title` ist es NICHT -> Default-Renderer escaped Titel.)
  - `try/catch` mit stillem Fallback (leeres Array), weil `pagefind.js` im
    Dev-Modus vor `pagefind --site dist` fehlt.
  Kopf-Kommentar dokumentiert Nutzung mit `createSearch({ search: pagefindAdapter(...) })`
  und den XSS-Hinweis (Titel escapen).
  </action>
  <verify>
  <automated>cd design-system && node --input-type=module -e "import('./examples/pagefind-adapter.js').then(m=>{if(typeof m.pagefindAdapter!=='function')throw new Error('export fehlt');const fn=m.pagefindAdapter();if(typeof fn!=='function')throw new Error('adapter ist keine Funktion');console.log('ADAPTER_OK')}).catch(e=>{console.error(e);process.exit(1)})" && grep -q "debouncedSearch" examples/pagefind-adapter.js && grep -q "bundlePath" examples/pagefind-adapter.js && grep -q "catch" examples/pagefind-adapter.js && echo CHECKS_OK</automated>
  </verify>
  <done>
  - `pagefindAdapter` exportiert; Aufruf liefert eine `async`-Funktion.
  - Nutzt `pf.options({bundlePath})` + `pf.debouncedSearch(...,0)`; kein eigenes Debounce.
  - Mappt auf Slot-Schema {id,title,excerpt,url,meta}; gibt `null` durch.
  - `try/catch`-Fallback fuer fehlendes Pagefind im Dev-Modus.
  - Kopf-Kommentar mit Nutzung + XSS-Hinweis.
  </done>
</task>

<task type="auto">
  <name>Task 4: Showcase in index.html (beide Varianten + Dummy-Adapter)</name>
  <files>design-system/index.html</files>
  <action>
  Fuege eine neue Such-Section in den Styleguide ein, nach dem bestehenden
  Section-Muster (`<section class="gat-section" id="gat-search">` mit `doc-block`,
  `doc-demo`, `doc-codeblock`-Bloecken) und ergaenze einen TOC-Eintrag in
  `.gat-header__nav-list`. Zebra-Hintergrund (`doc-section-alt`) konsistent zur
  Nachbarsection waehlen.

  Inhalt der Section:
  - Variante A — Inline-Overlay: `.gat-search` mit `.gat-search__field` (nutzt
    `.gat-input`), `.gat-search__icon`, `.gat-search__overlay`/`__results`. Live-Demo,
    verdrahtet mit `gat-search.js` (relativer Import `./gat-search.js`) und einem
    INLINE Dummy-In-Memory-Adapter (kleines Array statisch im Seiten-Script,
    `async (q) => array.filter(...)`). Zeigt sichtbar: kein Layout-Shift, Tastatur-
    Navigation, Zustaende.
  - Variante B — Modal/`Strg+K`: `.gat-search-trigger` (Header-Lupe) oeffnet ein
    `<dialog class="gat-modal gat-modal--blur gat-modal--wide">` mit `.gat-search--modal`
    darin; `createSearch({ mode:'modal', shortcut:true, triggers:[trigger] })`,
    selber Dummy-Adapter. ESC schliesst, Fokus kehrt zum Trigger zurueck.
  - Code-Snippet-Block, der die Einbindung zeigt (Import-URL + `createSearch`-Aufruf
    + Slot-Schema), damit Consumer es kopieren koennen.
  - `.gat-mode-hc`-Overrides der Such-Section greifen automatisch via CSS aus Task 1
    (in index.html nur sicherstellen, dass die Demo im HC-Umschalter mitlaeuft).

  KEINE Netzwerk-Referenzen im Showcase ausser den bereits im DS ueblichen
  (Google-Fonts/Pages). KEINE Pagefind-Einbindung hier (Pagefind ist Consumer-Sache;
  Dummy-Adapter genuegt fuer die Demo). KEINE App-Spezifika (BL-Filter, Tabs).
  Optional: spiegel die Demo zusaetzlich als `examples/suche.html` (eigenstaendig,
  importiert `../gat-search.js`), falls zeitlich machbar — nicht verpflichtend.
  </action>
  <verify>
  <automated>cd design-system && grep -q "id=.gat-search" index.html && grep -q "gat-search__overlay" index.html && grep -q "gat-search--modal" index.html && grep -q "createSearch" index.html && grep -q "gat-search.js" index.html && ! grep -q "pagefind" index.html && echo SHOWCASE_OK</automated>
  </verify>
  <done>
  - Neue Section `id="gat-search"` mit beiden Varianten (Inline-Overlay + Modal/Strg+K) vorhanden.
  - TOC-Eintrag in `.gat-header__nav-list` ergaenzt.
  - Live-Demo verdrahtet `gat-search.js` mit einem Dummy-In-Memory-Adapter (kein Pagefind).
  - Code-Snippet fuer Consumer-Einbindung vorhanden.
  - Keine App-Spezifika, keine Pagefind-Einbindung im Showcase.
  </done>
</task>

<task type="auto">
  <name>Task 5: Build + gebautes CSS committen (CI-Drift-Gate)</name>
  <files>design-system/design-system.css, design-system/src/design-system.css</files>
  <action>
  Stelle sicher, dass das minifizierte Root-`design-system.css` exakt aus dem
  aktuellen `src/design-system.css` gebaut ist. Fuehre `npm run build` (im
  Repo-Root `design-system/`) aus — das ist der gleiche Befehl wie in
  `build-check.yml`. Editiere die Root-Datei NIE von Hand. Verifiziere danach,
  dass `git diff --exit-code design-system.css` sauber ist (genau die CI-Pruefung):
  ein Re-Build darf keine weitere Aenderung produzieren. Beide Dateien (`src/` +
  Root) werden mit committet.
  </action>
  <verify>
  <automated>cd design-system && npm run build && git diff --exit-code design-system.css && grep -q "gat-search__overlay" design-system.css && grep -q "gat-search--modal" design-system.css && echo DRIFT_CLEAN</automated>
  </verify>
  <done>
  - `npm run build` endet mit Exit 0.
  - `git diff --exit-code design-system.css` ist sauber (kein Drift -> CI gruen).
  - Die `.gat-search*`-Klassen sind im gebauten Root-CSS enthalten.
  </done>
</task>

<task type="auto">
  <name>Task 6: Release v2.3.0 — CHANGELOG, MIGRATION, version bump</name>
  <files>design-system/CHANGELOG.md, design-system/MIGRATION.md, design-system/package.json</files>
  <action>
  Additives Minor-Release v2.3.0 (keine Breaking Changes):
  - `package.json`: `"version"` von `2.2.0` auf `2.3.0` heben. NUR dieses Feld.
  - `CHANGELOG.md`: neuen Block `## [2.3.0] - 2026-06-11` unter `## [Unreleased]`
    im Keep-a-Changelog-Stil (Abschnitt `### Added`). Beschreibe: `.gat-search*`-
    Familie (Inline-Overlay ohne Layout-Shift + Modal/`Strg+K`-Variante, Zustaende),
    `gat-search.js` ESM-Verhaltensmodul (A11y: combobox/listbox/option, Pfeiltasten,
    Focus-Trap, `returnFocus`, `prefers-reduced-motion`, `Strg/Cmd+K`), dokumentierter
    optionaler Pagefind-Adapter, Showcase in index.html. Strikt additiv vermerken.
  - `MIGRATION.md`: neuen Abschnitt `## v2.2 -> v2.3` (additiv, „Konsumenten
    brauchen nichts zu aendern") plus TOC-Eintrag oben analog zu den bestehenden
    Eintraegen. Kurz: wie `gat-search.js` eingebunden wird (Import-URL), Slot-Schema,
    XSS-Hinweis (Titel escapen), und dass die Pagefind-Anbindung Consumer-Sache ist.
  ACHTUNG: Die `design-spec`-JSON-Version in index.html (1.0, ~Z.2706) NICHT
  anfassen/angleichen — eigenes stabiles Schema-Feld.
  </action>
  <verify>
  <automated>cd design-system && grep -q "\"version\": \"2.3.0\"" package.json && grep -q "2.3.0" CHANGELOG.md && grep -q "gat-search" CHANGELOG.md && grep -q "v2.3" MIGRATION.md && echo RELEASE_OK</automated>
  </verify>
  <done>
  - `package.json` version = 2.3.0 (nur dieses Feld).
  - `CHANGELOG.md` hat `[2.3.0]`-Block mit Added-Eintraegen zur Such-Familie + Modul.
  - `MIGRATION.md` hat `v2.2 -> v2.3`-Abschnitt + TOC-Eintrag, additiv.
  - `design-spec`-Version in index.html unveraendert.
  </done>
</task>

<task type="auto">
  <name>Task 7: Consumer-Doku im README (Such-Helfer-Abschnitt)</name>
  <files>design-system/README.md</files>
  <action>
  Ergaenze einen Abschnitt „Such-Helfer (ES-Modul)" im README, parallel zum
  bestehenden „Chart-Helfer (ES-Modul)"-Abschnitt. Inhalt: Import von der
  Pages-URL (`import { createSearch } from
  'https://grueneat.github.io/design-system/gat-search.js'`), Minimal-Beispiel
  (Inline-Overlay mit eigenem `search`-Adapter), Verweis auf die Modal/`Strg+K`-
  Variante, das `SearchResult`-Slot-Schema `{ id, title, excerpt?, url, badge?,
  meta? }`, der XSS-Hinweis (Consumer-gelieferte Titel werden vom Default-Renderer
  via `textContent` escaped; `excerpt` nur HTML, wenn der Adapter es escaped) und
  der Hinweis, dass die konkrete Such-Engine (z. B. Pagefind via
  `examples/pagefind-adapter.js`) Consumer-Aufgabe bleibt (Framework-agnostisch,
  kein Vendoring). Verlinke `examples/pagefind-adapter.js` und den index.html-Showcase.
  Dieser Abschnitt ist die Grundlage, auf die werkzeuge#15 / Gemeindeordnung#15 adoptieren.
  </action>
  <verify>
  <automated>cd design-system && grep -q "gat-search.js" README.md && grep -q "createSearch" README.md && grep -qi "pagefind" README.md && echo README_OK</automated>
  </verify>
  <done>
  - README hat einen „Such-Helfer (ES-Modul)"-Abschnitt mit Pages-URL-Import + Minimal-Beispiel.
  - Slot-Schema + XSS-Hinweis dokumentiert.
  - Framework-Agnostik + Pagefind-als-Consumer-Aufgabe dokumentiert; Adapter/Showcase verlinkt.
  </done>
</task>

</tasks>

<verification>
Nach allen Tasks final pruefen (im Repo-Root design-system/):
- `npm run build` -> Exit 0.
- `git diff --exit-code design-system.css` -> sauber (CI-Drift-Gate gruen).
- `node --input-type=module -e "import('./gat-search.js').then(m=>process.exit(m.createSearch?0:1))"` -> Exit 0 (Modul importierbar, kein Seiteneffekt).
- `grep -q "gat-search__overlay" design-system.css` -> Klassen im gebauten CSS.
- `grep -q "id=.gat-search" index.html` -> Showcase vorhanden.
- `grep -q "\"version\": \"2.3.0\"" package.json` -> Version gebumpt.
</verification>

<success_criteria>
Mappt 1:1 auf die Acceptance Criteria aus ISSUE.md:
- DS enthaelt ein dokumentiertes Suchfeld- + Ergebnis-Overlay-Pattern (CSS + Markup)
  in `design-system.css` mit Showcase in `index.html` (Tasks 1, 4, 5).
- Ergebnis-Anzeige als Overlay/Dropdown schiebt keinen Seiteninhalt
  (`position:absolute; top:100%` — Task 1; sichtbar in der Demo — Task 4).
- A11y: Tastatur-Navigation, aria-Rollen (combobox/listbox/option), ESC/Focus-Handling,
  Focus-Trap im Modal, `prefers-reduced-motion` (Tasks 1, 2; demonstriert in Task 4).
- Responsive inkl. Mobile-Full-Screen-Variante (`.gat-search--modal` <640px, Task 1).
- Framework-agnostisch dokumentiert; Pagefind-Anbindung als Consumer-Aufgabe
  (engine-neutraler Kern Task 2, Adapter-Beispiel Task 3, README Task 7).
- CHANGELOG- + Versionseintrag im DS (Task 6).
- Folge-Issues werkzeuge + Gemeindeordnung: bereits als Deferred/Folge-Issues
  referenziert (werkzeuge#15, Gemeindeordnung#15) — Verlinkung in README/Doku (Task 7).
  Hinweis: das Anlegen der Folge-Issues ist organisatorisch und liegt ausserhalb
  der Code-Execution; die DS-Vorlage (dieses Issue) ist mit Tasks 1-7 vollstaendig.
</success_criteria>
