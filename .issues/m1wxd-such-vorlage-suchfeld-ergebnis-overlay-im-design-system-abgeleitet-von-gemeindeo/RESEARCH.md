# Research: Such-Vorlage (Suchfeld + Ergebnis-Overlay) im Design System

**Researched:** 2026-06-11
**Issue:** m1wxd (GrueneAT/design-system#26)
**Confidence:** HIGH (codebase + locked decisions); HIGH (Pagefind API, Context7-verified)

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions (honor verbatim — do not relitigate)

1. **`gat-search.js` als ESM-Verhaltensmodul mitliefern** — ausgeliefert wie
   `gat-charts.js` von der DS-Pages-URL
   (`https://grueneat.github.io/design-system/gat-search.js` bzw.
   `https://design-system.gruene.at/gat-search.js`). Das Modul besitzt:
   Open/Close von Overlay/Modal, Pfeiltasten-Navigation der Treffer, Enter/ESC,
   Focus-Trap im Modal, ARIA-Verdrahtung (combobox/listbox/option), `Strg/Cmd+K`,
   `prefers-reduced-motion`. Das Modul kennt **nicht** die Suchmaschine.

2. **v1 liefert BEIDE Varianten**: (a) Inline-Suchfeld mit Overlay-Dropdown,
   absolut positioniert, **kein Layout-Shift** (behebt das werkzeuge-Symptom);
   (b) Modal-/`Strg+K`-Variante, aufbauend auf dem vorhandenen `.gat-modal`
   (`--blur/--narrow/--wide`), Desktop zentriert, Mobile Full-Screen.

3. **Engine-agnostischer Kern + optionaler Pagefind-Adapter**: `gat-search.js`
   bekommt eine **Such-Adapter-Funktion** `async (query) => results[]` plus ein
   **Render-/Slot-Schema** für Ergebnis-Items (Titel, Snippet, Badges/Kategorien,
   URL). Zusätzlich ein **dokumentierter Pagefind-Adapter** als optionales
   Beispiel/Helfer.

### Claude's Discretion (Research/Plan-Freiräume)

- Konkrete Klassennamen unter `.gat-search*` (Feld-Wrapper, Overlay-Dropdown,
  Ergebnis-Item, Leer-/Lade-/Keine-Treffer-Zustand).
- Genaue JS-Modul-API (Init-Optionen, Event-Namen, Render-Hook-Signatur).
- Ob die Header-Such-Trigger-Optik (`.gat-header__search`, heute nur App-lokal)
  in dieses Issue mit aufgenommen wird (siehe Codebase-Lücke unten).

### Deferred / OUT OF SCOPE

- **Rollout in werkzeuge** (werkzeuge#15) und **Gemeindeordnung** (Gemeindeordnung#15)
  sind separate Folge-Issues. Dieses Issue ist **nur die DS-Vorlage**.
- App-spezifische Logik bleibt App-Schicht: **Bundesland-Filter**,
  **Content-Typ-Gruppierung/Tabs** (Paragraphen/FAQ/Glossar),
  **Stemming-Falsch-Positiv-Filter**, **IntersectionObserver-Hero-Tracking**,
  **localStorage-BL-Persistenz**, **`?highlight=`-URL-Bau**, **FAB**.
</user_constraints>

## Summary

Die Gemeindeordnung-Suche (`/workspace/Gemeindeordnung/src/js/search.js`, 1198
Zeilen) ist eine **reife, aber stark app-verflochtene** Referenz: Sie mischt das
generische Such-UI-Verhalten (Overlay öffnen/schließen, Debounce, Modal,
`Strg+K`, Click-Outside, ESC) untrennbar mit Gemeindeordnung-Spezifika
(Pagefind-Aufrufe, Bundesland-Zweipass-Suche, Content-Typ-Tabs, Stemming-Filter,
Hero-IntersectionObserver, `?highlight=`). Die Forschungsaufgabe ist im Kern eine
**Extraktions-/Destillationsaufgabe**: das generische Verhalten in ein
engine-neutrales `gat-search.js` heben, das App-Spezifische als Adapter +
Render-Hook draußen lassen. Bemerkenswert: Die Referenz hat **heute keine
echte Pfeiltasten-Treffer-Navigation und keine ARIA-combobox/listbox-Rollen** —
beides sind **Neu-Verbesserungen** dieses Issues, nicht bloß Portierung.

Auf CSS-Seite ist die Lage komfortabel: Das DS hat bereits `.gat-input`
(Touch-Floor 44px, Focus-Ring-Token), `.gat-modal` (natives `<dialog>` mit
`__head/__title/__close/__body/__actions`, `--blur/--narrow/--wide`), eine
saubere Token-Schicht (`--gat-web-*`), Toast-Präzedenz für `position: fixed` +
`z-index` + `prefers-reduced-motion`-Fade. Net-new ist nur die `.gat-search*`-
Familie (Feld-Wrapper mit Icon-Slot, absolut positionierter Overlay-Dropdown,
Ergebnis-Liste/-Item, States) plus das ESM-Modul. **Eine Architektur-Spannung
ist zu entscheiden** (siehe Decisions): Das DS-`.gat-modal` setzt natives
`<dialog>` + `showModal()` voraus — die Gemeindeordnung-Referenz baut bewusst
**kein** `<dialog>`, sondern einen eigenen `.app-search-modal-backdrop`, weil der
sticky Such-Trigger sonst beim Schließen seinen Tastatur-Fokus verliert.
`gat-search.js` muss diese Fokus-Rückgabe selbst lösen, wenn es `<dialog>`
nutzt (`returnFocus`-Pattern).

**Primary recommendation:** Net-new `.gat-search`-CSS-Familie in
`src/design-system.css` (additiv, hinter Toast/Toolbar, vor Hoher-Kontrast),
neues `gat-search.js` ESM-Modul im Repo-Root neben `gat-charts.js`, ein
Such-Section-Showcase in `index.html` mit BEIDEN Varianten (Inline-Overlay +
`Strg+K`-Modal) und einem dummy-In-Memory-Adapter, plus ein dokumentierter
Pagefind-Adapter-Snippet. Minor-Release **v2.3.0** (additiv, keine Breaking
Changes): CHANGELOG `[2.3.0]`, MIGRATION `v2.2 → v2.3`, `package.json` version,
HC-Overrides für die neue Familie, und HC-Modus-`@media (prefers-reduced-motion)`
für die Overlay-Einblendung.

### Recommended Change Surface (Plan-Schritte)

- **Step 1 — `.gat-search`-CSS-Familie** in `src/design-system.css` (additiv,
  hinter Toast/Toolbar, vor Hoher-Kontrast): Feld-Wrapper + Icon-Slot, absolut
  positioniertes Overlay (kein Layout-Shift), Ergebnis-Liste/-Item, Zustände.
- **Step 2 — `gat-search.js` ESM-Modul** im Repo-Root neben `gat-charts.js`:
  engine-neutral; Open/Close, Pfeiltasten-Navigation, ARIA-combobox, Focus-Trap,
  `Strg/Cmd+K`, `prefers-reduced-motion`, Adapter-Signatur.
- **Step 3 — Pagefind-Adapter-Beispiel** als dokumentierter optionaler Helfer,
  der `pagefind.js`-Ergebnisse auf das Slot-Schema mappt.
- **Step 4 — Showcase in `index.html`**: beide Varianten + Dummy-Adapter,
  TOC-Eintrag, `.gat-mode-hc`-Overrides.
- **Step 5 — Release v2.3.0**: CHANGELOG `[2.3.0]`, MIGRATION `v2.2 → v2.3`,
  `package.json`-Bump, minifiziertes CSS neu bauen + mit committen.

## Codebase Analysis

### Relevant Code

| File | Purpose | Relevance |
|------|---------|-----------|
| `/workspace/design-system/design-system/src/design-system.css` | **CSS-Quelle** (Tailwind v4 build → minified `design-system.css`). 2358 Z. | Hier kommt `.gat-search*` rein. NIE die minifizierte Root-Datei editieren. |
| `/workspace/design-system/design-system/design-system.css` | Gebautes/minifiziertes Stylesheet (Repo-Root) — CI prüft `git diff --exit-code` | Wird durch `npm run build` regeneriert; mit committen. |
| `/workspace/design-system/design-system/gat-charts.js` | Präzedenz-ESM-Modul (2556 B), via Pages-URL importiert | Vorlage für `gat-search.js`-Header/Lizenz/Export-Stil. |
| `/workspace/design-system/design-system/index.html` | Styleguide-Showcase (141 KB), Section-Pattern `<section class="gat-section" id="…">`, TOC in `.gat-header__nav-list`, `#gat-design-spec` JSON | Neue Such-Section + TOC-Eintrag; ggf. design-spec ergänzen. |
| `/workspace/design-system/design-system/examples/minimal.html` | Konsumenten-Minimal-Beispiel (kein JS) | Optional: zweites Beispiel `examples/suche.html` mit echtem `gat-search.js`. |
| `/workspace/design-system/design-system/CHANGELOG.md` | Keep-a-Changelog, `## [Unreleased]` + `## [x.y.z] - date` | Neuer `[2.3.0]`-Block. |
| `/workspace/design-system/design-system/MIGRATION.md` | Pro-Release-Migrationsabschnitte | Neuer `v2.2 → v2.3`-Abschnitt (additiv). |
| `/workspace/design-system/design-system/package.json` | `"version": "2.2.0"`, build-script (Tailwind CLI) | Bump auf `2.3.0`. |
| `/workspace/design-system/design-system/README.md` | Doku zu Einbindung + Chart-Helfer-ESM | Such-Helfer-Abschnitt analog zum Chart-Helfer ergänzen. |
| `/workspace/Gemeindeordnung/src/js/search.js` | **REFERENZ** (1198 Z.) — gesamtes Such-Verhalten | Destillationsquelle (generic vs app). |
| `/workspace/Gemeindeordnung/src/index.html` | Referenz-Markup (`#hero-search-input`, `#hero-search-dropdown`, `#search-modal-trigger`, `#fab-search`, `.hero-search-container`) | Markup-Skelett-Vorlage. |
| `/workspace/werkzeuge/src/components/Suche.astro` | Erster Adopter (heute `PagefindUI`-Inline → Layout-Shift) | Zeigt, was der Pagefind-Adapter ersetzen muss. |

### Interfaces

<interfaces>
// === REFERENZ: /workspace/Gemeindeordnung/src/js/search.js ===
// Exporte (ESM). GENERISCH markiert = gehört ins DS gat-search.js;
// APP markiert = bleibt App-Schicht.

// APP — Pagefind-gekoppelt:
loadPagefind(): Promise<PagefindModule | null>            // dynamic import `${base}pagefind/pagefind.js`
executeSearch(query, bundesland=null): Promise<{totalCount, results, hasMore, allResults} | null>
executeUnifiedSearch(query, bundesland=null): Promise<{faq, glossar, gesetz}>  // Zweipass-BL-Suche
getAvailableFilters(): Promise<Object>                    // pf.filters().bundesland
getSavedBundesland(): string|null  / saveBundesland(bl)   // localStorage
filterStemmingFalsePositives(results, query): Array       // deutsche Stemming-Heuristik

// APP — Render (Content-Typ-spezifisch, Tabs, Gruppierung):
renderUnifiedResults(searchResult)   // Tabs Paragraphen/FAQ/Glossar
renderGroupedResults(results, query) // Gruppierung nach Bundesland
renderFAQResult / renderGlossarResult / renderLawGroup / renderPageResult
cleanTitle(title) / isStadtrecht(result)  // app-domänenspezifisch

// GENERISCH — Verhalten, das ins DS-Modul gehört (heute app-verflochten):
escapeForDisplay(text): string             // textContent-escape (XSS-sicher)
handleSearchInput(e)                        // Debounce 200ms + Generation-Guard (Race-Schutz)
hideDropdown() / showMinCharsHint()         // Overlay open/close
openSearchModal(prefilterBundesland=null)   // Modal-Erzeugung, body-scroll-lock, Fokus
closeSearchModal()                          // Teardown, body-scroll-restore, Fokus-Restore
setupKeyboardShortcuts()                    // '/' und Ctrl/Cmd+K öffnen, ESC schließt
setupHeroClickOutside()                     // Click-Outside schließt Overlay

// NICHT vorhanden in der Referenz (NEU in diesem Issue, harte AC):
//  - Pfeiltasten-Navigation der Treffer (ArrowUp/Down, aria-activedescendant)
//  - role=combobox/listbox/option + aria-expanded/-controls/-selected
//  - echter Focus-Trap im Modal (Referenz nutzt non-<dialog>-Backdrop, KEIN Trap)
//  - prefers-reduced-motion-Behandlung der Overlay-Einblendung

// === DS-CSS: /workspace/design-system/design-system/src/design-system.css ===
// Wiederverwendbare Bausteine, auf denen .gat-search* komponiert:

.gat-input          // Z.1123 — Feld-Optik: width:100%, var(--gat-font-copy),
                    // border var(--gat-web-input-border), radius var(--gat-web-input-radius),
                    // min-height var(--gat-web-input-min-h, 44px) [WCAG Touch-Floor],
                    // :focus-visible → box-shadow var(--gat-web-focus-ring)
.gat-select         // Z.1124/1206 — Chevron via data-URI, appearance:none
.gat-modal          // Z.1350 — natives <dialog>; bg/radius/shadow; max-width min(40rem,92vw)
.gat-modal::backdrop// Z.1361 — var(--gat-web-modal-backdrop) rgba(31,38,28,.55)
.gat-modal--blur    // Z.1365 — backdrop-filter: blur(3px)
.gat-modal--wide    // Z.1369 — max-width min(64rem,94vw)
.gat-modal--narrow  // Z.1370 — max-width min(28rem,90vw)
.gat-modal__head/__title/__close/__body/__actions  // Z.1372-1433; __body max-height:70vh; overflow:auto
.gat-header__nav / __nav-list / __support  // Z.443-499 (Header-Navzone)
.gat-skiplink       // Z.988 — position:fixed; z-index:999 (Fokus-Sichtbarkeit-Präzedenz)
.gat-toaster        // Z.1764 — position:fixed; z-index:1000 (Overlay-Stacking-Präzedenz)
.gat-toast          // Z.1796 — animation gat-toast-in 0.22s;
@media (prefers-reduced-motion: reduce){ .gat-toast → gat-toast-fade }  // Z.1809 (Muster!)

// Token-Vokabular (alle unter :root, konsumenten-stabil --gat-web-*):
--gat-web-focus-ring     // Z.227 — 0 0 0 3px color-mix(... green 38%)
--gat-web-focus-offset   // Z.229 — 2px
--gat-web-modal-bg / -backdrop / -shadow / -radius   // Z.232-235
--gat-web-shadow-elevated  // Z.221 — 0 6px 24px … (für Overlay-Schatten)
--gat-web-surface / -surface-sunk / -text / -text-soft / -hairline
--gat-web-green / -green-deep / -green-tint
--gat-web-radius-card / -radius-control / -radius-mini
--gat-space-1..6, --gat-text-copy/-small/-micro, --gat-font-copy/-headline

// === DS-ESM-Präzedenz: gat-charts.js ===
// Header-Kommentar mit Import-Beispiel + Lizenz (CC BY 4.0); benannte Exporte;
// spiegelt CSS-Tokens als JS-Konstanten. gat-search.js folgt diesem Stil.
</interfaces>

### Reusable Components (nicht neu bauen)

- **Feld**: `.gat-input` direkt für `<input type="search">` — liefert Optik,
  Focus-Ring, 44px-Touch-Floor, Disabled/Invalid-States.
- **Modal-Shell**: `.gat-modal` + Sub-Elemente. `--blur` für den Backdrop,
  `--wide` für die zentrierte Desktop-Such-Maske.
- **Overlay-Stacking/Animations-Muster**: aus `.gat-toaster`/`.gat-toast`
  (z-index-Skala, `prefers-reduced-motion`-Fade-Fallback) übernehmen.
- **ESM-Liefermuster**: `gat-charts.js` 1:1 als Vorlage (Header, Lizenz,
  Pages-URL-Import, benannte Exporte).
- **Showcase-Muster**: `index.html`-Sections (`gat-section`, `doc-block`,
  `doc-demo`, `doc-codeblock`) + TOC-Eintrag + `doc-section-alt`-Zebra.

### Potential Conflicts / Codebase-Lücken

1. **`<dialog>` vs. eigener Backdrop (ARCHITEKTUR-SPANNUNG).** Das DS-`.gat-modal`
   ist auf natives `<dialog>` + `showModal()` ausgelegt (siehe index.html-Demo
   Z.1773-1800, CSS-Kommentar Z.1346). Die Gemeindeordnung-Referenz baut
   **bewusst kein `<dialog>`**, sondern `.app-search-modal-backdrop`, mit
   Begründung im Code (search.js Z.739-742): der sticky Such-Trigger verlöre
   sonst beim Schließen seinen Tastatur-Fokus. **`gat-search.js` muss
   Fokus-Rückgabe (`returnFocus`) selbst lösen** — dann ist natives `<dialog>`
   (gratis Focus-Trap + ESC + `::backdrop`) die bessere Basis. Siehe Decisions.

2. **`.gat-header__search` existiert NICHT im DS-CSS.** Die Klasse wird in
   Gemeindeordnungs-Markup (index.html Z.30) und in der DS-index-TOC verwendet,
   ist aber **app-lokal** — `grep` in `src/design-system.css` findet nur
   `__nav`, `__nav-list`, `__support`, **kein** `__search`. Wenn der
   Header-Such-Trigger (Lupe-Button, der das Modal/`Strg+K` auslöst) Teil der
   Vorlage sein soll, braucht er eine DS-Klasse (z. B. `.gat-search-trigger`
   oder `.gat-header__search`). Discretion-Punkt — empfohlen: ja, mit aufnehmen,
   sonst bleibt das Modal-Trigger-Styling in jeder App neu.

3. **`design-spec`-JSON-Version ist „1.0"** (index.html Z.2706), entkoppelt von
   `package.json` `2.2.0`. Beim Bump NICHT versehentlich angleichen — die
   spec-version ist ein eigenes, stabiles Schema-Feld.

4. **Kein `@media (forced-colors)` im DS** — der DS hat einen eigenen
   `.gat-mode-hc`-Hochkontrast-Modus (Custom-Variant). Die neue Familie braucht
   `.gat-mode-hc .gat-search*`-Overrides (Muster: alle anderen Komponenten haben
   welche, z. B. `.gat-mode-hc .gat-modal` Z.2087).

5. **Schrift-Migrationsdrift (Memory).** Workspace ist auf **Raleway** migriert;
   `gat-charts.js` referenziert aber noch `'Barlow Semi Condensed'` (Z.62) und
   die CSS-`@import`-Zeile lädt Barlow (src Z.26). Für `gat-search.js` gilt:
   **keine hardcodierten Font-Strings** — über `--gat-font-copy`/-`headline`
   bzw. gar nicht (CSS regelt Schrift). Nicht den Barlow-Fehler aus
   `gat-charts.js` wiederholen.

## Generic-vs-App-spezifischer Split (destilliert aus der Referenz)

| Aspekt | Gehört ins DS (`gat-search.js` / `.gat-search*`) | Bleibt App-Schicht |
|--------|--------------------------------------------------|--------------------|
| Overlay open/close + Click-Outside + ESC | ✅ | |
| Debounce + Generation-/Race-Guard (search.js Z.681-692) | ✅ (konfigurierbar `debounceMs`) | |
| Min-Zeichen-Hinweis (`< 3`) | ✅ (konfigurierbar `minQueryLength`) | |
| Modal-Erzeugung, body-scroll-lock, Fokus-Restore | ✅ | |
| `Strg/Cmd+K` + `/`-Shortcut | ✅ | |
| **Pfeiltasten-Treffer-Navigation + ARIA-Rollen** | ✅ (NEU) | |
| **Focus-Trap im Modal** | ✅ (NEU) | |
| `prefers-reduced-motion` | ✅ (NEU) | |
| Such-Engine-Aufruf (`pf.search`, `.data()`) | | ✅ via Adapter `async (q)=>results[]` |
| Ergebnis-Item-HTML (Titel/Snippet/Badge) | DS liefert Default-Renderer + Slot-Schema | App darf eigenen `renderItem` einhängen |
| Bundesland-Filter (Zweipass, localStorage) | | ✅ |
| Content-Typ-Tabs (Paragraphen/FAQ/Glossar) | | ✅ (App rendert in den Item-Slot) |
| Stemming-Falsch-Positiv-Filter | | ✅ (in den Adapter) |
| Hero-IntersectionObserver (Trigger ein/aus) | | ✅ |
| `?highlight=`-URL-Bau, `cleanTitle`, `isStadtrecht` | | ✅ |
| FAB (`#fab-search`) | optional CSS, sonst | ✅ |

## Proposed Class API (`.gat-search*`) — Discretion, prescriptive

Komponiert ausschließlich auf vorhandenen Tokens/Komponenten. BEM-Stil wie das
restliche DS. Vorschlag:

```
.gat-search                 /* Feld-Wrapper, position: relative (Overlay-Anker) */
.gat-search__field          /* nutzt .gat-input; padding-left für Icon-Slot */
.gat-search__icon           /* absolut positionierter Lupe-Slot (pointer-events:none) */
.gat-search__overlay        /* position:absolute; top:100%; z-index ~50; box-shadow
                               var(--gat-web-shadow-elevated); KEIN Layout-Shift */
.gat-search__overlay.is-open /* sichtbar (Default hidden via [hidden]/.is-open) */
.gat-search__results         /* role=listbox-Container; max-height + overflow:auto */
.gat-search__item            /* role=option; Titel + Snippet + Badge-Slot */
.gat-search__item.is-active  /* aria-selected/aria-activedescendant-Highlight */
.gat-search__item-title / __item-excerpt / __item-badge
.gat-search__state           /* gemeinsamer Zustands-Wrapper */
  --empty / --loading / --no-results / --hint   /* Zustands-Modifier */
.gat-search__count           /* "N Treffer"-Kopf */

/* Modal-Variante: KEINE neue Shell — .gat-modal[--blur][--wide] +
   .gat-search drin. Optional .gat-search--modal für Full-Bleed-Feld im Modalkopf
   und Mobile-Full-Screen-Override (max-width:100vw; height:100dvh). */
.gat-search-trigger         /* NEU empfohlen: Header-Lupe-Button (ersetzt das
                               app-lokale .gat-header__search) */
```

States vereinheitlicht (AC): `--loading` (Spinner/Skeleton), `--no-results`
("Keine Treffer für „…""), `--hint` ("Bitte mind. N Zeichen"), `--empty`
(Initialzustand). Mobile: `.gat-search--modal` wird `<640px` zu Full-Screen
(`100dvh`, `inset:0`) — wie Referenz-Kommentar search.js Z.731-733.

## `gat-search.js` Modul-API — Discretion, prescriptive

```js
import { createSearch } from 'https://grueneat.github.io/design-system/gat-search.js';

const controller = createSearch({
  // Pflicht: Elemente
  input,                    // HTMLInputElement (oder Selector)
  overlay,                  // Container für Ergebnisse (Inline) — optional bei modal
  // Engine-Adapter (LOCKED #3): engine-neutral
  search: async (query, { signal }) => SearchResult[],  // muss Promise<Array> liefern
  // Render-Hook: DS-Default vorhanden, überschreibbar (LOCKED #3 Slot-Schema)
  renderItem: (result) => HTMLElement | string,   // default: Titel+Snippet+Badge
  getItemHref: (result) => string,                // default: result.url
  // Verhalten (konfigurierbar; Defaults aus Referenz)
  minQueryLength = 3,
  debounceMs = 200,
  mode = 'inline' | 'modal',
  shortcut = true,          // Strg/Cmd+K + '/'
  triggers = [],            // Elemente, die das Modal öffnen (Header-Lupe, FAB)
  closeOnSelect = true,
  // Texte (i18n, deutsche Defaults)
  labels = { placeholder, noResults, hint, loading, count }
});

// SearchResult-Slot-Schema (was der Adapter liefern muss):
// { id, title, excerpt?/*HTML mit <mark>*/, url, badge?, meta? }

controller.open() / .close() / .focus() / .destroy()
controller.setQuery(q) / .refresh()

// Events (CustomEvent auf input/overlay):
'gat-search:open' | 'gat-search:close' | 'gat-search:query'
'gat-search:select'  // detail: { result }
'gat-search:results' // detail: { query, count }
```

**ARIA-Verdrahtung (Modul setzt automatisch, LOCKED #1):** input
`role=combobox aria-expanded aria-controls=<overlay-id> aria-autocomplete=list
aria-activedescendant=<item-id>`; overlay/`__results` `role=listbox`; items
`role=option id=… aria-selected`. **Keyboard-Map:** ArrowDown/Up bewegt aktives
Item (wrap), Enter aktiviert (`getItemHref`-Navigation oder `select`-Event),
ESC schließt (Inline: blur; Modal: close+returnFocus), Home/End optional,
`Strg/Cmd+K` + `/` öffnet. **Focus-Trap** nur im Modal-Modus; `returnFocus`
auf das auslösende Trigger-Element beim Schließen.

## Accessibility-Anforderungen (harte AC)

- **Rollen**: combobox/listbox/option-Triplett, `aria-expanded`,
  `aria-controls`, `aria-activedescendant` (statt Roving-`tabindex` — Fokus
  bleibt im Input). Quelle-Pattern: WAI-ARIA APG „Combobox with List Autocomplete".
- **Keyboard** (vollständig, Referenz hat das NICHT): Arrow-Navigation, Enter,
  ESC, Home/End, Shortcut-Öffnen.
- **Focus-Management**: Modal → Focus-Trap, Fokus auf Input bei Öffnen, Fokus
  zurück auf Trigger bei Schließen (`returnFocus`). Natives `<dialog>` +
  `showModal()` liefert Trap + ESC + `inert`-Hintergrund **gratis** — bevorzugen
  und nur `returnFocus` ergänzen.
- **Reduced motion**: Overlay-Einblendung respektiert
  `@media (prefers-reduced-motion: reduce)` — Muster aus `.gat-toast` (Z.1809):
  Slide → reiner Opacity-Fade.
- **Hoher Kontrast**: `.gat-mode-hc .gat-search*`-Overrides liefern (Muster
  Z.2087 ff.). Sichtbarer Fokus via `--gat-web-focus-ring`.
- **Touch-Target** 44px ist über `.gat-input` schon erfüllt.

## No-Layout-Shift-Technik (harte AC)

- Inline-Overlay: `.gat-search` ist `position: relative`; `.gat-search__overlay`
  ist `position: absolute; top: 100%; left: 0; right: 0;` mit
  `box-shadow: var(--gat-web-shadow-elevated)` und `z-index` über dem Content.
  Es nimmt **keinen Platz im Fluss** → kein Shift. Genau das fehlt heute auf
  werkzeuge (PagefindUI rendert inline im Fluss, schiebt Content). Die
  Gemeindeordnung macht es bereits richtig (`#hero-search-dropdown` mit
  `.search-dropdown`-absolute).
- z-index-Skala beachten: `.gat-skiplink` 999, `.gat-toaster` 1000. Inline-
  Overlay deutlich darunter (~50), aber über sticky Header. Modal nutzt
  `<dialog>` (Top-Layer, immun gegen z-index-Konflikte).

## Pagefind-Adapter-Shape (LOCKED #3 — optionales Beispiel)

Aktueller Pagefind-JS-API-Stand (Context7 + pagefind.app, 2026-06, **HIGH**):

```js
// pagefind-adapter.js (dokumentiertes Beispiel im DS, KEINE Pflicht-Abhängigkeit)
export function pagefindAdapter({ bundlePath = '/pagefind/', limit = 10, filters } = {}) {
  let pf;
  return async function search(query, { signal } = {}) {
    if (!pf) {
      pf = await import(/* @vite-ignore */ `${bundlePath}pagefind.js`);
      await pf.options({ bundlePath });
    }
    const res = await pf.debouncedSearch(query, { filters }, 0); // Debounce macht gat-search
    if (res === null) return null;                  // superseded → gat-search ignoriert
    const loaded = await Promise.all(res.results.slice(0, limit).map(r => r.data()));
    // Map auf das gat-search Slot-Schema:
    return loaded.map(d => ({
      id: d.url,
      title: d.meta?.title ?? '',
      excerpt: d.excerpt,        // HTML mit <mark>, von Pagefind HTML-escaped
      url: d.url,
      meta: d.meta,
    }));
  };
}
```

**Verifizierte Pagefind-API-Fakten (HIGH, Context7 `/websites/pagefind_app`
+ pagefind.app/docs/api):**
- Import: `await import("/pagefind/pagefind.js")`; `pagefind.init()` optional
  (läuft beim ersten search automatisch).
- `pagefind.options({ bundlePath })` **vor** init/erstem Aufruf.
- `pagefind.search(query, options)` → `{ results: [{ id, data() }] }`.
- `await result.data()` → `{ url, excerpt /*HTML mit <mark>, safe für innerHTML*/,
  plain_excerpt, meta: { title, image }, sub_results: [{title,url,excerpt,...}] }`.
- `pagefind.debouncedSearch(query, options, ms)` → liefert `null` wenn von
  neuerem Call überholt.
- `pagefind.filters()` → verfügbare Filter; `pagefind.preload(query)`.
- Build erzeugt `pagefind/pagefind.js` erst **nach** `astro build`/`vite build`
  + `pagefind --site dist` → im Dev-Modus fehlt das Modul ⇒ Adapter muss
  `try/catch` + stillen Fallback haben (wie Suche.astro Z.41 + search.js Z.35).

werkzeuge nutzt heute `PagefindUI` (Suche.astro): ein IIFE-Bundle, das
`window.PagefindUI` als Seiteneffekt setzt und Treffer **inline** rendert
(Layout-Shift). Der Adapter ersetzt das durch die rohe `pagefind.js`-API +
`gat-search`-Overlay.

## Standard Stack

| Library | Version | Purpose | Why Standard | Confidence |
|---------|---------|---------|--------------|------------|
| Tailwind CSS CLI | ^4.3.0 (devDep) | Build `src/design-system.css` → root | DS ist seit v2.0 Tailwind-v4-getrieben | HIGH (package.json) |
| Pagefind | ~1.x (Consumer-seitig) | Statische Volltextsuche | Beide Consumer (werkzeuge/Gemeindeordnung) nutzen es bereits | HIGH (Context7) |
| Vanilla ESM (kein Framework) | — | `gat-search.js` | Präzedenz `gat-charts.js`; framework-agnostische Vorgabe | HIGH (CONTEXT.md) |

### Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Modal-Backdrop/ESC/Focus-Trap | Eigener Overlay-div + manueller Trap | Natives `<dialog>` + `showModal()` (`.gat-modal`) | Top-Layer, gratis Trap+ESC+`inert`; nur `returnFocus` ergänzen |
| Feld-Optik/Focus-Ring/Touch-Floor | Eigene Input-Styles | `.gat-input` | Schon WCAG-konform, token-gebunden |
| Race-Condition bei async Suche | Naives await | Generation-Counter (Referenz Z.681-692) | Vermeidet veraltete Treffer-Anzeige |
| Pagefind-Debounce | Doppeltes Debouncing | `debouncedSearch` ODER eigenes — **nicht beides** | Referenz-Kommentar Z.660-662 warnt vor Konflikt |
| XSS in Titeln | `innerHTML` mit Rohtext | `textContent`-escape (Referenz `escapeForDisplay` Z.320) | Pagefind-`excerpt` ist sicher, `meta.title` NICHT |

## Common Pitfalls

### Doppeltes Debouncing (Pagefind + eigenes)
**Was schiefgeht:** `pf.debouncedSearch` UND ein eigener `setTimeout` ergeben
träges/race-anfälliges Verhalten. **Warum:** Referenz dokumentiert das explizit
(search.js Z.660-662) und nutzt `pf.search` (nicht debounced) im
Zweipass-Fall. **Vermeiden:** `gat-search.js` macht das Debouncing; der Adapter
ruft `pf.debouncedSearch(q, opts, 0)` oder direkt `pf.search`.

### XSS via `meta.title`
**Was schiefgeht:** `excerpt` ist von Pagefind HTML-escaped (safe für
innerHTML), aber `meta.title` und vom Consumer gelieferte Felder sind es NICHT.
**Vermeiden:** Default-Renderer escaped Titel via `textContent` (Muster
`escapeForDisplay`); Doku warnt Consumer.

### `<dialog>`-Fokus-Verlust beim Schließen
**Was schiefgeht:** Modal schließt → Fokus springt auf `<body>`, Tastatur-Nutzer
verlieren Position. **Warum:** Referenz baute deshalb extra kein `<dialog>`
(search.js Z.739-742). **Vermeiden:** `gat-search.js` merkt sich das auslösende
Element und `returnFocus()` nach `close()`.

### Pagefind im Dev-Modus nicht vorhanden
**Was schiefgeht:** `import('/pagefind/pagefind.js')` wirft, weil das Modul erst
nach `build + pagefind --site dist` existiert. **Vermeiden:** Adapter mit
`try/catch` + stillem Fallback (Referenz Z.35, Suche.astro Z.41).

### Mobile-Full-Screen vs. body-scroll
**Was schiefgeht:** Modal offen, dahinter scrollt der Body; iOS-Safari
Address-Bar-Höhe bricht `100vh`. **Vermeiden:** `body { overflow: hidden }` beim
Öffnen (Referenz Z.782) + `100dvh` statt `100vh` für Full-Screen.

### z-index vs. sticky Header
**Was schiefgeht:** Inline-Overlay verschwindet hinter sticky Header.
**Vermeiden:** Overlay-z-index über Header, aber unter Toaster(1000)/Skiplink(999).

### Tailwind-Build-Constraint
**Was schiefgeht:** Direktes Editieren der minifizierten Root-`design-system.css`
→ CI `git diff --exit-code` schlägt fehl. **Vermeiden:** nur `src/` editieren,
`npm run build`, beide Dateien committen.

### SSR/Astro vs. statisches HTML
**Was schiefgeht:** `gat-search.js` greift auf `document`/`window` beim Import zu
→ bricht SSR (Astro `astro build`). **Vermeiden:** Modul macht KEINE
Seiteneffekte beim Import (kein Top-Level-DOM-Zugriff); alles erst in
`createSearch()`/`DOMContentLoaded`. werkzeuge ist Astro (SSR-Build), bindet aber
client-seitig ein (`<script type="module">`) — Init muss client-gated sein.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node | Tailwind build | ✅ | v26.3.0 | — |
| npm | scripts | ✅ | 11.16.0 | — |
| Tailwind CLI | `npm run build` | ✅ | `node_modules/.bin/tailwindcss` (^4.3.0) | — |
| Pagefind | Consumer-Adapter (nicht DS-Build) | n/a (Consumer-seitig) | ~1.x | DS bündelt nicht (No-Vendoring) |

## Project Constraints (from CLAUDE.md)

- **Immer im Worktree arbeiten** — nie am main-Checkout. Worktree via
  `issue-cli worktree create` (erst zur Execution-Zeit; Research schreibt nur
  in den Issue-Dir am Workspace-Root). Nested-Layout: issue-cli von
  `/workspace/design-system`, Code in `/workspace/design-system/design-system/`.
- **Kein Vendoring** — `gat-search.js` und CSS werden per CDN/Pages-URL
  referenziert, nie in Consumer kopiert. Pagefind bleibt Consumer-Abhängigkeit;
  der DS-Adapter ist nur dokumentiertes Beispiel, keine gebündelte Lib.
- **Keine Werkzeug-Attribution** in Commits/Code/Kommentaren.
- **DS-spezifisch (README):** Wer `src/` editiert, MUSS den gebauten
  `design-system.css` mit committen (CI `build-check.yml` prüft Gleichheit).
- **Schrift:** Workspace ist auf Raleway migriert — keine hardcodierten
  Font-Namen in neuem Code; Schrift über `--gat-font-*`-Tokens/CSS.

## Sources

### HIGH confidence
- Codebase-Analyse: `src/design-system.css`, `index.html`, `gat-charts.js`,
  `package.json`, `README.md`, `CHANGELOG.md`, `MIGRATION.md` (DS-Repo).
- Referenz: `/workspace/Gemeindeordnung/src/js/search.js` (1198 Z., vollständig
  gelesen) + `src/index.html`.
- `/workspace/werkzeuge/src/components/Suche.astro` (PagefindUI-Ist-Zustand).
- Pagefind JS API: Context7 `/websites/pagefind_app` (Benchmark 84.1) +
  `https://pagefind.app/docs/api/`.

### MEDIUM confidence
- WAI-ARIA APG Combobox-with-listbox-Pattern (Standard-Wissen, nicht live
  abgerufen — Planner/Executor gegen aktuelle APG verifizieren).

### LOW confidence (needs validation)
- Genaue z-index-Zahl für das Inline-Overlay (~50) — Plan-Zeit gegen sticky
  Header testen.

## Metadata
**Confidence breakdown:** Codebase HIGH (alle Dateien direkt gelesen);
Pagefind-API HIGH (Context7 + offizielle Doku); Klassen-/Modul-API HIGH als
Vorschlag (Discretion, komponiert auf verifizierten Bausteinen); A11y-Pattern
MEDIUM (Standard-APG). **Research date:** 2026-06-11.
**Sub-agents used:** keine separaten BG-Agents — Codebase eng begrenzt,
Researcher hat alle Quellen direkt gelesen (codebase + ecosystem via Context7 +
pitfalls via Referenz-Code), das war günstiger und genauer als Delegation.
**Raw research files:** keine — direkt synthetisiert.
