# bildgenerator — DS-v2.0-Audit

## App-Zweck

Browser-basierter Bildgenerator fuer GRUENE-Wahlkampf-/Social-Media-Grafiken (Fabric.js Canvas) und QR-Code-Generator. Reine Client-Side-App (jQuery + Fabric.js + Mustache + Masonry + Tailwind 3.x).

Eintragsdateien: `/workspace/bildgenerator/index.html` (1226 Zeilen Wizard-UI), `/workspace/bildgenerator/impressum.html`, `/workspace/bildgenerator/resources/css/style.css` (514 Z.), `/workspace/bildgenerator/resources/css/input.css` (Tailwind-Components, 208 Z.), `/workspace/bildgenerator/tailwind.config.js`, `/workspace/bildgenerator/resources/css/fonts.css`.

## Aktuelle DS-Anbindung

- DS-CSS-Link: **nein**. Kein `https://grueneat.github.io/design-system/design-system.css` referenziert.
- DS-Logo-Asset: **nein**. Eigenes lokales SVG `resources/images/gruene-logo.svg`, PNG-Logos `Logo-einzeilig_blanko.png` / `Logo-zweizeilig_blanko.png` (54 KB, im Repo committed).
- `gat-charts.js`: **nein** (App nutzt keine Charts, korrekt).
- Verwendet schon: **keine** DS-Klassen (`.gat-*`) und **keine** DS-Tokens (`--gat-*`). Verifiziert per Grep ueber `index.html`, `impressum.html`, `resources/css/`, `resources/js/`.
- Verwendet noch lokale Alt-Klassen / Tailwind-Komponenten:
  - Markenfarben hartkodiert in `tailwind.config.js`: `gruene-primary #257639`, `gruene-secondary #56AF31`, `gruene-dark #1a5428` (Magenta/Gelb fehlen als Theme-Token, werden inline als `#E6007E`, `#FFED00` benutzt)
  - `.btn-primary`, `.btn-secondary`, `.btn-danger` aus `input.css` (gruene-primary, dunkelrot, grau)
  - `.form-input`, `.form-select`, `.searchable-select*` (eigener Searchable-Select)
  - `.alert`, `.alert-danger`, `.alert-container` (toast-aehnliches Overlay)
  - `.modal-overlay`, `.modal-container` (Video-Modal)
  - `.badge`, `.badge-dark`
  - `.btn-group` (Segmented-Button-Look)
  - `.qr-type-button`, `.qr-preview-container`, `.qr-step-content`, `.qr-form-section`
  - `.nav-tab`, `.nav-tab-mobile`
  - `.step-indicator`, `.step-content`, `.step-section-header`
  - `.element-button`, `.element-buttons-grid`, `.element-controls`
  - `.meme-preview`, `.fabric-canvas-wrapper`, `.memes-container`, `.grid-item`, `.grid-sizer`
  - `.choice`, `.custom-file`, `.input-image`
  - `.validation-hint`, `.touch-friendly`
- Fonts: `Gotham Narrow` (Ultra, Ultra-Italic, Bold, Book) lokal via `@font-face`. **DS-Font `--gat-font-headline/-copy` wird nicht verwendet** — Tailwind-Default-Stack greift fuer Body.
- A11y-Mode (`.gat-mode-hc`): **nicht implementiert**. Kein High-Contrast-Toggle.

## Befunde (kategorisiert)

### A. Kandidaten fuer DS-Aufnahme

**A1. Form-Komponenten (`.form-input`, `.form-select`, `<textarea>`, Range-Slider, Checkbox)**
Bildgenerator hat einen vollstaendigen Form-Stack (Selects mit optgroups, Number-Input, Range-Slider, Checkbox, File-Input mit verstecktem Label-Trigger, Radio-Group als segmented Buttons). DS v2.0 hat **gar keine** Form-Tokens/Komponenten. Buergerinnenrat-, Gemeindefinanzen- und Psychotherapie-Sites haben (oder werden) ebenfalls Formulare brauchen.
Vorschlag: `.gat-input`, `.gat-select`, `.gat-textarea`, `.gat-checkbox`, `.gat-radio`, `.gat-range`, `.gat-field` (Wrapper mit Label+Hint+Error), `.gat-field__label`, `.gat-field__hint`, `.gat-field__error`. Tokens: `--gat-web-input-bg`, `--gat-web-input-border`, `--gat-web-input-border-focus` (= `--gat-color-primary`), `--gat-web-input-radius` (existiert schon als `--gat-web-radius-input`).
Aufwand: **mittel** (5-7 Komponenten + Focus/Disabled/Invalid-States, ca. 1-2 Tage DS-seitig).

**A2. Searchable-Select (Combobox)**
Eigene Implementierung in `resources/js/searchable-select.js` mit CSS-Klassen `.searchable-select` / `-button` / `-dropdown` / `-search` / `-options` / `-option` / `-option-group` / `-chevron`. Generisches Listbox-mit-Suchfeld-Pattern — Gemeindeordnung (Tag-Filter), Buergerinnenrat (Personen-Filter), jedes Datentool mit langen Listen koennte das brauchen.
Vorschlag: `.gat-combobox` mit `__button`/`__dropdown`/`__search`/`__option`/`__option-group`/`__chevron` Submodifier `.is-open`/`.is-selected`. Optional JS-Helper im `gat-charts.js`-Stil (oder neues `gat-combobox.js`).
Aufwand: **mittel** (CSS straightforward, JS-Helfer optional; ca. 1 Tag).

**A3. Wizard-Step-Indicator (numerierter Schritt-Fortschritt)**
Drei separate Wizards in der App: `step-indicator` x 4 (Bildgenerator), x 3 (QR-Code), plus Mobile-Layout. Klassen `.step-indicator` (rund, aktiver/inaktiver Zustand) + `.step-content` + Progress-Line `bg-gray-200`/`bg-green-600`. Sehr generisches Pattern (Bewerbungs-Formulare, Multi-Step-Calculator, Bidder-Onboarding).
Vorschlag: `.gat-stepper` (Container), `.gat-stepper__step` (mit `.is-active`/`.is-done`/`.is-todo` States), `.gat-stepper__indicator` (runde Bubble), `.gat-stepper__label`, `.gat-stepper__connector` (Linie zwischen Steps). Tokens: `--gat-web-stepper-active` (default `--gat-color-primary`), `--gat-web-stepper-todo`.
Aufwand: **klein-mittel** (rein CSS, Markup ist Konsumenten-Sache; ca. 0,5-1 Tag).

**A4. Alert/Toast-Container (`.alert-container`)**
Position fixed, top, center, `z-index:99999`, max-width 32rem (Code `style.css:148-157`). Fuer jedes Datentool mit Userinteraktion nuetzlich (Buergerinnenrat-Formulare, Gemeindeordnung "Link kopiert"). DS hat `.gat-callout` — fuer **inline** Hinweise, aber nichts fuer **top-fixed Toasts**.
Vorschlag: `.gat-toast` (einzelner Toast mit Variant `--info`/`--warning`/`--error`/`--success`), `.gat-toast-region` (fixed positionierter Container). Tokens fuer Variant-Farben mappen auf bestehende `--gat-color-*`.
Aufwand: **klein** (rein CSS + Close-Button-Markup-Konvention).

**A5. Modal-Dialog (`.modal-overlay`, `.modal-container`)**
Generisches Pattern — Video-Modal in Bildgenerator (`#videoModal`), aber zukuenftig auch z.B. Detail-Drilldown im Mehrjahres-Browser von Gemeindefinanzen, Confirm-Dialoge etc. DS hat aktuell nichts dazu (`.gat-callout` ist inline, `.gat-panel` ist eine Card).
Vorschlag: `.gat-modal` (Container mit Backdrop), `.gat-modal__dialog`, `.gat-modal__header`/`__body`/`__footer`, `.gat-modal__close`, Size-Modifier `--sm`/`--md`/`--lg`. Backdrop-Token `--gat-web-modal-backdrop`. Inert-/`<dialog>`-Variante optional.
Aufwand: **klein-mittel** (rein CSS + a11y-Hinweise; ca. 1 Tag).

**A6. Segmented Button Group (`.btn-group`)**
Mehrere Buttons als 1 zusammenhaengende UI-Leiste (Bildgenerator: Text-Alignment Links/Mitte/Rechts; potentiell auch Filterleisten in Gemeindefinanzen / Buergerinnenrat fuer Sicht-Wechsel). DS hat `.gat-tabbar`/`.gat-tab` — aehnliches Pattern, aber semantisch verschieden (Tabbar = Navigation/Inhaltswechsel, Segmented = Form-Eingabe-Variante).
Vorschlag: `.gat-segmented` (Wrapper), `.gat-segmented__btn` (Radio-aehnliche Buttons mit `.is-active`). Klar abgrenzen zur `.gat-tabbar`.
Aufwand: **klein** (rein CSS).

**A7. Galerie/Masonry-Grid mit Thumbnails (`.memes-container`, `.grid-item`, `.grid-sizer`)**
Vorlagen-Browser im Bildgenerator: responsives Spalten-Grid (2/3/4/5 Spalten nach Breakpoint, `style.css:67-101`), Hover-Zoom (`grid-item img:hover { transform: scale(1.1) }`). Pattern ist nicht reine "Meme-Auswahl" — Buergerinnenrat koennte Personen-Karten so anzeigen, Psychotherapie Lena Methoden-Cards. DS hat `.gat-grid` (2/3 Spalten), aber **kein Card-mit-Hover-Image-Thumbnail-Pattern**.
Vorschlag: `.gat-thumb-grid` (responsiver Spalten-Container 2/3/4/5), `.gat-thumb` (Klickbares Image-Tile mit Hover-Scale, Caption optional). Modifier `--rund`/`--quadrat`.
Aufwand: **klein** (`.gat-grid` als Basis, Thumb-Tile dazu; ca. 0,5 Tag).

**A8. File-Upload-Trigger (Label-als-Button-Pattern)**
`<input type="file" hidden>` + `<label class="btn-secondary btn-block">` (Zeile 695-701, 893-895 in `index.html`). Generisches Upload-UI-Pattern, jede Anwendung mit Bild-/Doc-Upload braucht das.
Vorschlag: `.gat-upload-trigger` (Button-Look-Wrapper um File-Input) oder rein Doku-Pattern „benutze `.gat-btn` mit `<label for>`-Trick". Beim Bildgenerator + Psychotherapie-Site relevant.
Aufwand: **klein** (Doku + ggf. Helper-Klasse; ca. 0,5 Tag oder weniger).

### B. App-spezifisch — bleibt lokal

**B1. Fabric.js-Canvas-Wrapper (`.meme-preview`, `.fabric-canvas-wrapper`, `#meme-canvas`)**
Reines Bildgenerator-Konstrukt (Canvas-Padding, Mindesthoehe 300px, Centering). Kein anderes GRUENE-Tool baut auf Fabric.js. Belassen wie ist, ggf. unter `.app-canvas-*`-Namespace.

**B2. Element-Editor-Buttons (`.element-button`, `.element-buttons-grid`)**
Greife-Buttons fuer "Bild hinzufuegen", "Rosa Kreis", "Wahlkreuz", "QR Code" — fuegen Fabric-Objekte hinzu. Sehr spezifisches In-Canvas-Editing-UI, kein generisches DS-Pattern. Lokal lassen, Umbenennung auf `.app-element-button` waere konsequenter.

**B3. QR-Code Type-Selector (`.qr-type-button`)**
2x2-Grid mit Icon+Titel+Subtitle fuer QR-Inhaltstyp (Text/URL/Email/vCard). Domain-spezifisch (QR-Inhaltstyp). DS sollte sich nicht damit beschaeftigen.
Hinweis: Das **visuelle Pattern** "grosser Icon-Klickbutton mit Titel+Subtitle" ist generisch — koennte spaeter zu `.gat-tile-choice` werden, falls weitere Tools das gleiche brauchen (TBD).

**B4. QR-Form-Section, QR-Preview-Container (`.qr-form-section`, `.qr-preview-container`)**
QR-Code-Builder-Spezifika. Lokal lassen.

**B5. Wahlkreuz-Asset / Pinker Kreis / Logo-Toggle**
Domain-Marken-Assets der App. Logos sind als PNG ins Repo committed. Bleibt lokal. (Anmerkung: das DS liefert ja schon explizit kein Logo-Toggle-JS — Inventur Zeile 56.)

**B6. Masonry-Library-Integration**
Vendor-Masonry-Layout-Trigger und Grid-Sizer-Tricks sind app-spezifisch. CSS-Hooks (siehe A7) koennten ins DS, JS-Wiring bleibt App-Sache.

**B7. Searchable-Select-JS-Implementierung**
JS-Komponenten-Code (`searchable-select.js`) bleibt in der App. **Nur** die CSS-Konventionen sollten ins DS (A2).

### C. Hybrid: DS-konforme Loesung benoetigt

**C1. Header / Topbar mit Logo + Title + Nav-Tabs + Mailto + CTA-Button**
App hat einen Tailwind-zusammen-geklebten Header (Zeile 48-103). Layout: Logo + H1 links / Tab-Buttons mitte / Mailto + Erklaervideo-Button rechts. Mobile-Variante mit ausgelagerten Tab-Buttons darunter.
DS sollte liefern: `.gat-header` (existiert schon!) mit Slot fuer optionalen `gat-tabbar` als Sub-Nav statt nur `.gat-header__nav`. Aktuell ist das DS-Header-Pattern eher fuer Marketing-Sites mit Top-Nav konzipiert. Hier braucht es **Modul-Switcher-Tabs** (Bildgenerator vs QR-Code).
App spezialisiert: nur die App-spezifischen Tab-Labels und Mailto-Link.
Aufwand: **klein** (Doku zu Tabbar-im-Header-Slot + Migration der App auf `.gat-header` mit `.gat-tabbar` als Modul-Switcher).

**C2. "Section-Card" mit Icon-Header + Body (die Schritt-Inhalte und Sektion-Header)**
Jeder Wizard-Step ist eine `bg-white rounded-xl shadow-sm border border-gray-200 p-8` Card mit Icon-Bubble + Titel + Subtitel + Inhalt (Zeile 575+, 660+, 716+, 1040+). Auch `.step-section-header` (Zeile 392-413 in style.css): expandable Sections mit Icon + h4. Das ist im Prinzip `.gat-panel` + `.gat-section-head` Variante mit Icon-Slot.
DS sollte liefern: `.gat-panel__head` mit optionalem `__icon`-Slot, plus Modifier `.gat-panel--card` (`box-shadow`, weisses Background). Eventuell `.gat-section-head--icon` Variante.
App spezialisiert: ihre Icons (FontAwesome) und Schritt-Nummerierung.
Aufwand: **klein-mittel** (Erweitern von `.gat-panel`/`.gat-section-head`; ca. 0,5 Tag).

**C3. Info-Box (gelb + blau, Warn/Info-Hinweis)**
Zeile 970-985 (gelb, Kreis-Ausschnitt-Hinweis), Zeile 1064-1076 (blau, Erfolgs-Hinweis), Zeile 428-447 (`#qr-section` mit gelbem Hintergrund). DS hat `.gat-callout` — aber nur eine Variante. Hier braucht es **Variant-System**: `info` (blau), `warning` (gelb), `success` (gruen), `error` (magenta/rot).
DS sollte liefern: `.gat-callout--info`/`--warning`/`--success`/`--error` mit Token `--gat-web-callout-bg-*` / `--gat-web-callout-border-*` / `--gat-web-callout-icon-*`. Optional `.gat-callout__icon`-Slot.
App spezialisiert: Den genauen Text und FontAwesome-Icon.
Aufwand: **klein** (4 Varianten am bestehenden `.gat-callout`; ca. 0,5 Tag).

**C4. Sticky/Side-by-side Layout: links Controls + rechts Live-Preview**
Hauptlayout `grid grid-cols-1 lg:grid-cols-3 gap-8`, Controls in `col-span-1`, Preview in `col-span-2 sticky` (visuell, aber CSS-Sticky nicht gesetzt — verbesserungsfaehig). Generisches "Tool-mit-Preview"-Layout — Buergerinnenrat-Karten-Editor, Gemeindefinanzen-Chart-Konfigurator koennten das brauchen.
DS sollte liefern: Layout-Klassen `.gat-tool-layout` (Wrapper) + `.gat-tool-controls` (linke Spalte, scrollbar) + `.gat-tool-preview` (rechte Spalte, sticky). Verhaeltnis 1/3 + 2/3 als Default, ueberschreibbar.
App spezialisiert: Inhalte (Wizard-Steps links, Canvas rechts).
Aufwand: **klein** (1 Layout-Pattern; ca. 0,5 Tag).

## Visuelle Anomalien

- **Magenta `#E6007E` und Gelb `#FFED00` werden inline als `<option value="#E6007E">` und Outputs verwendet, sind aber nicht als Tailwind-Theme-Token oder CSS-Variable hinterlegt.** Marken-Hauptfarben sollten ueber `--gat-color-magenta`/`--gat-color-gelb` kommen statt hartkodiert in HTML-Optionsfeldern. Stelle: `index.html` Zeile 325-328, 782-785, 932-934. -> Bei DS-Migration die Werte aus `--gat-color-magenta`/`--gat-color-gelb` lesen oder hartkodierten Hex-Wert beibehalten und nur das Label aus DS uebernehmen.
- **`gruene-primary` (#257639) und `gruene-dark` (#1a5428) weichen vom DS-`--gat-color-primary` ab.** Die DS-Inventur listet `--gat-color-dunkelgruen`/-hellgruen, ohne konkrete Hexwerte zu nennen — Konsistenzcheck mit dem CD-PDF noetig. Tailwind-Theme-Block sollte ersetzt werden durch direkte Nutzung von `--gat-color-*`.
- **Hartkodierte "Grey-Scale"-Farben in `style.css`** (`#e5e7eb`, `#9ca3af`, `#f9fafb`, `#f3f4f6`, `#d1d5db`, `#6b7280`, `#111827`, `#374151`, `#4d7c0f`) sind Tailwind-Default-Greys, kommen aber an 15+ Stellen wiederholt vor. Sollten durch `--gat-web-hairline`, `--gat-web-text-mute`, `--gat-web-surface-sunk` u.ae. ersetzt werden (Tokens existieren laut Inventur).
- **`#fef3cd` + `#fbbf24` (`#qr-section`, gelbe Info-Box)** sind reine Tailwind-Yellow-Shades. Sollten via DS-Callout-Warn-Variante kommen (siehe C3).
- **`#d9534f`/`#fff`** in `.choice label` (`style.css:46-53`) — Bootstrap-Rot von "Choose file"-Hack. Toter Code (alte Bootstrap-Anbindung) oder Resterampe. **Cleanup-Kandidat unabhaengig vom DS.**
- **Eigene Box-Shadows** (`box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1)`) tauchen 3x auf — sollten durch `--gat-web-shadow` Token kommen.
- **Eigene Radien** (`rounded`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-full`) ohne System. DS hat `--gat-radius-sm/-md` + `--gat-web-radius-card/-pill/-input` — bisher ungenutzt.
- **Font-Stack**: Body verwendet Tailwind-Default-Sans (System-Stack). Headlines sollten `--gat-font-headline` (Gotham) bekommen; aktuell wird Gotham nur per `font-gotham`/`font-gotham-bold`-Utility selektiv eingesetzt (in HTML grep ich keine direkte Nutzung -> wahrscheinlich Tot-Code im tailwind.config).
- **Step-Indikatoren Farbe**: `bg-green-600` statt `--gat-color-primary`. Visuell quasi gleich, semantisch falsch.
- **Focus-Ring**: in `style.css:235-237` ein eigenes `box-shadow: 0 0 0 3px rgb(37 118 57 / 0.1)`-Pattern. DS hat `--gat-web-focus-ring` / `--gat-web-focus-offset` Tokens und `:focus-visible`-Pattern (Inventur Z. 36). Sollte ersetzt werden.
- **Schriftgroessen**: keine Verwendung von `.gat-text-h1/h2/h3/copy/small` — Tailwind-Utilities (`text-2xl`, `text-xl`, `text-lg`, `text-sm`, `text-xs`) ueberall. Migration auf DS-Skala empfohlen, **aber** ohne dass DS feste px-Werte liefert (Inventur erwaehnt sie, aber konkrete Werte unklar) bleibt das ein nice-to-have.
- **`-webkit-font-smoothing: antialiased !important`** global mit `!important` (style.css:3-10) — wird fuer Visual-Regression-Konsistenz erzwungen, ueberschreibt aber bewusst alles. Behalten, aber dokumentieren.

## Quick-Wins (Migration low-effort)

1. **DS-Stylesheet einbinden** und Tailwind-Theme um `--gat-*`-CSS-Variablen erweitern (statt `gruene-primary: '#257639'` -> `gruene-primary: 'var(--gat-color-primary)'`). 1 PR, 30 Min. Wirkt sofort fuer alle bestehenden Tailwind-Utilities.
2. **`#E6007E`, `#FFED00` zu Theme-Tokens machen** (`gruene-magenta`, `gruene-gelb`), via `--gat-color-magenta`/`-gelb`. 15 Min.
3. **Logo-SVG durch DS-Logo ersetzen**: `https://grueneat.github.io/design-system/assets/gruene-logo.svg` statt lokales SVG (bzw. lokales als Fallback). 5 Min.
4. **`#qr-section` gelbe Info-Box** auf `.gat-callout--warning` umstellen (sobald A3/C3 im DS existiert). 5 Min im Markup.
5. **Bootstrap-Resterampe `.choice label`** (style.css:24-63) loeschen — Bootstrap ist laut CLAUDE.md nicht mehr im Einsatz, die Klassen sind Tot-Code. 5 Min.
6. **`.btn-primary` / `.btn-secondary` auf `.gat-btn--primary` / `.gat-btn--secondary` umstellen** (sobald A1-Tokens fix sind). Such+Ersetzen in `index.html` (~25 Stellen) + Entfernen der Tailwind-Component-Definitionen aus `input.css`. 1 Std.
7. **`.modal-overlay`/`.modal-container` auf DS-Modal umstellen** (sobald A5 im DS). 30 Min.
8. **Step-Indikator-Aktivfarbe `bg-green-600` -> `bg-gruene-primary`** in Markup. 10 Min Such-Ersetzen.
9. **A11y-Toggle (`.gat-mode-hc`)** in den Header einbauen — gleichzeitig mit Header-Migration nach `.gat-header__a11y-toggle` (Inventur Z. 17). DS-konformer Schritt, der "Wir nutzen das DS" auch fuer User sichtbar macht. 1 Std.
10. **Focus-Ring auf DS-Tokens umstellen** (style.css:235-237 entfernen, `--gat-web-focus-ring` via DS-globaler `:focus-visible`-Style automatisch greifen lassen). 10 Min.

## Zusammenfassung

bildgenerator ist heute **vollstaendig DS-unverbunden** — kein Link, kein Token, keine Klasse. Migration ist ein groesserer Brocken (Tailwind-Component-Layer + 50+ Klasseninstanzen), aber gut planbar in 3 Wellen:

- **Welle 1 — Tokens**: Stylesheet einbinden, Tailwind-Theme auf `var(--gat-*)` umpolen. Sofort sichtbarer Marken-Sync ohne Markup-Aenderungen.
- **Welle 2 — Komponenten**: Buttons, Cards, Modal, Callout-Varianten, Stepper (sobald DS A1+A3+A5+C3 liefert).
- **Welle 3 — Form-System**: Forms, Searchable-Select, File-Upload-Trigger (DS-Aufnahme A1+A2+A8).

Konkrete DS-Erweiterungen, die andere Tools (Buergerinnenrat, Gemeindefinanzen, Psychotherapie Lena) ebenfalls profitieren wuerden:
- Form-Komponentenfamilie (A1) — **hoechste Prioritaet**, fehlt heute komplett im DS
- Combobox/Searchable-Select (A2)
- Stepper (A3)
- Modal (A5)
- Callout-Variantensystem (C3)
- Tool-Layout mit Sticky-Preview (C4)
