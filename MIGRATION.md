# Migration

Die Anleitung gliedert sich nach Release. Konsumenten lesen den Abschnitt
zu dem Sprung, der gerade ansteht — alle früheren Hinweise gelten weiter.

- [v2.0 → v2.1](#v20--v21) — strikt additiv, keine Breaking Changes.
- [v1.x → v2.0](#v1x--v20) — Major, optische Änderungen am Header und
  am Hellgrün-Wert.

---

## v2.0 → v2.1

**Strikt additiv. Konsumenten brauchen nichts zu ändern.** v2.1 ergänzt
vier Komponentenfamilien und die zugehörigen Web-Tokens; alle v2.0-Token
und -Klassen bleiben werteweise unverändert. Wer aktuell `.gat-callout`,
`.gat-tag--neutral` oder `.gat-tag--info` setzt, sieht weiterhin denselben
Stil — die neuen Modifier sind reine Ergänzung.

### Was Konsumenten **nicht** ändern müssen

- CSS-URL bleibt:
  `https://grueneat.github.io/design-system/design-system.css`
- Alle v2.0-Klassen, Tokens und Selektoren bleiben unverändert.
- Kein `npm install` auf Konsumenten-Seite, kein Build-Schritt.
- Optik bestehender Pages bleibt identisch — `.gat-callout` ohne Modifier
  rendert visuell weiter wie v2.0 (= info).

### Was Konsumenten **neu nutzen können**

#### Form-Primitives — `.gat-input`-Familie

Strikt additiv. Native HTML-Elemente bekommen die Klasse direkt; das DS
liefert Optik plus States (default / hover / focus-visible / disabled /
readonly / invalid). Verhalten (Validierung, Submit) baut der Konsument
selbst.

```html
<div class="gat-field">
  <label class="gat-field__label" for="email">E-Mail-Adresse</label>
  <input class="gat-input" id="email" type="email"
         placeholder="name@example.at">
  <span class="gat-field__hint">Wir nutzen die Adresse nur für Rückfragen.</span>
</div>
```

Weitere Elemente:

- `.gat-select`, `.gat-textarea`, `.gat-range` — gleiche Klassen-Optik.
- `.gat-checkbox`, `.gat-radio` — native Inputs mit `accent-color`.
- `.gat-check` — Inline-Label-Wrapper für Checkbox/Radio.
- `.gat-radio-group` (`--inline` für horizontale Anordnung) — Group-
  Wrapper für mehrere Radios.

**Invalid-State** wird per `aria-invalid="true"` oder `.is-invalid`
ausgelöst. Beide Schreibweisen funktionieren parallel; `aria-invalid`
ist die a11y-vorzugsweise.

**Token-Familie** (alle überschreibbar):
`--gat-web-input-bg`, `-border`, `-border-focus`, `-border-invalid`,
`-text`, `-placeholder`, `-radius`, `-padding-x`, `-padding-y`,
`-disabled-bg`, `-disabled-text`.

#### Modal — `.gat-modal` über natives `<dialog>`

Opt-in-Klasse für das native `<dialog>`-Element. Esc und Backdrop-Klick
schließen das Dialog ohne weiteren Code; der Konsument ruft `showModal()`
zum Öffnen und `.close()` zum programmatischen Schließen auf.

```html
<button type="button" onclick="document.getElementById('m').showModal()">
  Öffnen
</button>

<dialog class="gat-modal" id="m">
  <div class="gat-modal__head">
    <h2 class="gat-modal__title">Titel</h2>
    <button type="button" class="gat-modal__close" aria-label="Schließen"
            onclick="this.closest('dialog').close()">×</button>
  </div>
  <div class="gat-modal__body">
    <p>Inhalt des Modals.</p>
  </div>
  <div class="gat-modal__actions">
    <button type="button" class="gat-btn gat-btn--secondary"
            onclick="this.closest('dialog').close()">Abbrechen</button>
    <button type="button" class="gat-btn gat-btn--primary"
            onclick="this.closest('dialog').close()">Bestätigen</button>
  </div>
</dialog>
```

**Modifier**: `.gat-modal--blur` (Backdrop-Blur), `--wide`, `--narrow`.

**Empfohlenes Pattern für Backdrop-Click-Close**:

```js
dialog.addEventListener('click', (e) => {
  const r = dialog.getBoundingClientRect();
  if (e.clientX < r.left || e.clientX > r.right ||
      e.clientY < r.top  || e.clientY > r.bottom) {
    dialog.close();
  }
});
```

**Fokus-Trap** liefert `<dialog>` mit `showModal()` nativ — kein eigener
Trap-Code nötig.

**Token-Familie**: `--gat-web-modal-bg`, `-backdrop`, `-shadow`, `-radius`.

#### Callout-Modifier (semantisch)

```html
<aside class="gat-callout gat-callout--warn">…</aside>
<aside class="gat-callout gat-callout--error">…</aside>
<aside class="gat-callout gat-callout--success">…</aside>
<aside class="gat-callout gat-callout--legal">…</aside>
```

`.gat-callout--info` ist visuell identisch zum unbenannten
`.gat-callout`, aber semantisch eindeutig. `.gat-callout--danger` ist
ein Alias für `--error`.

Optionaler Icon-Slot:

```html
<aside class="gat-callout gat-callout--warn">
  <p><span class="gat-callout__icon"><!-- SVG --></span>
     <strong>Warnung:</strong> …</p>
</aside>
```

Das DS liefert **keine** Icons — der Konsument inseriert ein eigenes
SVG (oder einen Buchstaben).

**Token-Familie**:
`--gat-web-callout-{info,warn,error,success,legal}-{bg,border,text}`.

#### Tag-Modifier (semantisch)

```html
<span class="gat-tag gat-tag--ok">OK</span>
<span class="gat-tag gat-tag--success">Erfolg</span>
<span class="gat-tag gat-tag--warn">Warnung</span>
<span class="gat-tag gat-tag--error">Fehler</span>
<span class="gat-tag gat-tag--danger">Danger</span>
```

`.gat-tag--success` ist Alias für `--ok`; `--danger` Alias für `--error`.
Die bestehenden Modifier `--neutral`, `--info`, `--pflicht`, `--risiko`
bleiben unverändert.

**Token-Familie**:
`--gat-web-tag-{ok,warn,error,neutral,info}-{bg,text}`.

### HC-Modus

Alle neuen Komponenten haben HC-Pendants. Wer `.gat-mode-hc` auf `<body>`
setzt, bekommt:

- Form-Inputs auf Anthrazit + Gelb-Border, Magenta-Border für `invalid`.
- Modal auf Anthrazit-Fläche mit Gelb-Rahmen, kein Schatten.
- Callout-Varianten alle auf Anthrazit + Gelb; warn/error/danger mit
  Magenta-Linksrand.
- Tag-Varianten alle auf Anthrazit + Gelb-Border; error/danger mit
  Magenta-Border und -Text.

### Folgewellen (nicht Teil von v2.1)

- **v2.2** geplant: `.gat-table`, `.gat-dropzone`, `.gat-toast`,
  `.gat-toolbar`.
- **v2.3** geplant: `.gat-chip`, `.gat-combobox`, `.gat-breadcrumb`,
  `.gat-prose`, `.gat-step-indicator`.

---

## v1.x → v2.0

v2.0 ist ein Major-Release: das Stylesheet ist jetzt Tailwind-v4-gebaut,
und ein paar Werte/Markups ändern sich sichtbar. Die `<link>`-URL bleibt
identisch — Konsumenten bekommen die neue Datei automatisch beim
nächsten Reload.

Diese Anleitung erklärt nur, was Konsumenten **tun müssen** bzw. **neu
nutzen können**. Wer nur das DS-Reload abwarten will, kann auch nichts
anpassen — die Marken-Tokens (`--gat-color-dunkelgruen`,
`--gat-color-hellgruen`, …) heißen unverändert.

## Was Konsumenten **nicht** ändern müssen

- **CSS-URL bleibt:**
  `https://grueneat.github.io/design-system/design-system.css`
- Alle `--gat-*`-Token-Namen aus v1.x bleiben stabil. Werte können sich
  ändern (siehe Hellgrün unten), aber kein Name verschwindet.
- Alle v1.x-Komponenten-Klassen bleiben:
  `.gat-container`, `.gat-grid*`, `.gat-section`, `.gat-nav*`,
  `.gat-headline`, `.gat-subline`, `.gat-fliesstext`, `.gat-emphasis`,
  `.gat-btn*`, `.gat-card*`, `.gat-underline`, `.gat-highlight`,
  `.gat-stoerer*`.
- Keine `npm install`-Pflicht, kein Build-Schritt auf der Konsumer-Seite.

## Was sich optisch ändert

### 1. `.gat-header` ist jetzt eine weiße Brandbar

**Vorher (v1.x):**

```html
<header class="gat-header">
  <div class="gat-header__inner">
    <a class="gat-header__logo" href="#top">
      <span class="gat-header__logo-mark"></span>
    </a>
    <nav class="gat-nav">
      <a class="gat-nav__link gat-nav__link--active" href="#start">Start</a>
      <a class="gat-nav__link" href="#kontakt">Kontakt</a>
    </nav>
  </div>
</header>
```

**Nachher (v2.0):**

```html
<header class="gat-header">
  <div class="gat-header__inner">
    <a class="gat-header__brand" href="#top">
      <img class="gat-header__logo"
           src="https://grueneat.github.io/design-system/assets/gruene-logo.svg"
           alt="Die Grünen">
      <span class="gat-header__wordmark">Tool-Name</span>
    </a>
    <nav class="gat-header__nav" aria-label="Hauptnavigation">
      <ul class="gat-header__nav-list">
        <li><a class="gat-header__nav-current" href="#start">Start</a></li>
        <li><a href="#kontakt">Kontakt</a></li>
      </ul>
    </nav>
  </div>
</header>
```

Die weiße Brandbar passt besser zu langen Lesestrecken (Datenwerkzeuge,
Dokumentation, Listenansichten). Logo ist jetzt ein echtes `<img>` —
referenziert per CDN-URL aus dem DS-Repo, ohne lokales Vendoring.

**Wer die v1.x-Optik beibehalten möchte**, ergänzt
`.gat-header--dunkel` zum gleichen Markup:

```html
<header class="gat-header gat-header--dunkel">
  ...
</header>
```

Damit kehrt der dunkelgrüne Block-Look zurück, das Markup-Schema bleibt
das neue. `.gat-header__logo-mark` (CSS-Mask) wird nicht mehr verwendet
und kann ersatzlos entfallen.

### 2. Hellgrün wandert von `#56af31` zu `#3e8a25`

`--gat-color-hellgruen` ändert seinen Wert. Der neue Ton ist sichtbar
dunkler, aber für Akzent-Flächen-Nutzung tauglicher:

- v1.x `#56af31` auf Weiß: Kontrast 2.77 (AA FAIL).
- v2.0 `#3e8a25` auf Weiß: Kontrast 4.31 (AA-OK für Großschrift; für
  normalen Text noch knapp unter 4.5).

**Strukturelle Regel — gilt auch nach der Wert-Änderung:** Hellgrün ist
**Akzent-Fläche, nicht Textfarbe auf hellem Grund**. Konkret:

- `--gat-color-on-secondary` bleibt Anthrazit — Anthrazit-Text auf
  Hellgrün-Fläche ist die gewollte Paarung (Kontrast 3.91, AA-OK für
  Großschrift).
- Weiße Schrift auf Hellgrün-Fläche bleibt verboten (Kontrast unter 4).
- Für Webschrift auf Hellem nutze stattdessen `--gat-color-dunkelgruen`
  oder die neue `--gat-web-green-deep`-Schicht.

### 3. Headline-Gewichte sind ruhiger

| Klasse | v1.x | v2.0 |
|--------|------|------|
| `.gat-headline` | `font-weight: 900` | `font-weight: 800` |
| `.gat-card__title` | `font-weight: 900` | `font-weight: 700` |
| `.gat-subline` | `font-weight: 600` | unverändert |

Plus: alle Headline-Klassen haben jetzt `hyphens: auto` für deutsche
Komposita.

## Was Konsumenten **neu nutzen können**

### `--gat-web-*`-Token-Schicht

Eine additive, entsättigte Schicht für Datenwerkzeuge. Marken-Tokens
bleiben unverändert; die Web-Schicht steht parallel daneben.

Wichtige Tokens (Vollständige Liste im Style-Guide):

- Flächen: `--gat-web-bg`, `--gat-web-surface`, `--gat-web-surface-sunk`,
  `--gat-web-hairline`, `--gat-web-shadow`.
- Text-Töne: `--gat-web-text`, `--gat-web-text-soft`,
  `--gat-web-text-mute`, `--gat-web-clay-text`.
- Web-Grüns: `--gat-web-green-deep`, `--gat-web-green`,
  `--gat-web-green-tint`, `--gat-web-yellow`.
- Chart-Palette: `--gat-web-chart-1` … `--gat-web-chart-8` (semantische
  Rollen siehe Style-Guide).
- Web-Radien & Fokus: `--gat-web-radius-control`,
  `--gat-web-radius-card`, `--gat-web-focus-ring`,
  `--gat-web-focus-offset`.

**AA-Notes:**

- `--gat-web-text-mute` (`#6b6f63`) ist AA auf allen drei
  Web-Surfaces.
- `--gat-web-clay-text` (`#9c5a38`) ist AA auf Weiß (Kontrast 5.34).
- Magenta-Text (`--gat-color-magenta`) nur auf Weiß oder Tiefem Grün
  nutzen, nicht auf web-bg/sunk/tint.

### Neue Komponenten

- `.gat-panel` mit `__head`/`__head-row`/`__body`/`__body--table`/
  `__note`/`:fullscreen` — Rahmen für Datenwerkzeug-Inhalte.
- `.gat-metric-card` mit Modifiern `--ertrag`/`--aufwand`/`--netto`/
  `--hero` und Sub-Elementen `__num`/`__label` — Kennzahlen-Tile.
- `.gat-callout` — Hinweis-Panel mit grünem Linksrand.
- `.gat-section-head` — Headline + Lead-Block mit einheitlichem Spacing.
- `.gat-hero` mit `__title`/`__intro` — Hero-Streifen.
- `.gat-tag` mit `--neutral`/`--info`/`--pflicht`/`--risiko`.
- `.gat-skiplink` — A11y-Skip-Link, sichtbar erst beim Tab-Fokus.
- `.gat-tabbar`/`.gat-tab`/`.gat-tab-panel` — Folder-Tab-Optik.
- `.gat-switcher`/`.gat-switcher__label`/`.gat-switch-btn` — Segment-
  Toggle-Gruppe.

### `.gat-mode-hc` — High-Contrast-Modus

Eine Tailwind-v4 Custom-Variant. Konsumenten setzen die Klasse
`.gat-mode-hc` auf `<body>` (oder einem Ancestor) — alle DS-Komponenten
schalten automatisch auf eine Anthrazit + Gelb + Magenta-Akzent-Palette
um.

**Den Toggle-Knopf bauen Konsumenten selbst:**

```html
<button type="button"
        aria-pressed="false"
        onclick="this.setAttribute('aria-pressed',
                 document.body.classList.toggle('gat-mode-hc'))">
  Hoher Kontrast
</button>
```

Das DS bewusst ohne Toggle-Knopf — Position und Beschriftung gehören in
die Konsumenten-Brandbar.

### Chart-Helfer via `gat-charts.js`

ECharts-basierte Tools importieren Palette + Helfer direkt von der
Pages-URL:

```js
import {
  PALETTE, INK, LABEL_SIZE, AXIS_SIZE,
  BAR_MAX_DICHT, BAR_MAX_WEIT,
  tip, legende, grid, planIstLegende
} from 'https://grueneat.github.io/design-system/gat-charts.js';
```

`PALETTE` spiegelt die CSS-Tokens `--gat-web-chart-1..8` 1:1. ECharts
selbst lädt der Konsument unabhängig (eigener CDN-Import).

### `.gat-no-print` und `.gat-header--fixed`

- `.gat-no-print` versteckt Bedienelemente bei `window.print()`:

  ```html
  <div class="gat-tabbar gat-no-print">…</div>
  ```

- `.gat-header--fixed` setzt den Header per `position: fixed`. Konsument
  ergänzt eine zur Header-Höhe passende
  `scroll-padding-top` auf `<html>`:

  ```css
  html { scroll-padding-top: 80px; }
  ```

## Hinweis für gemeindefinanzen-Konsumenten

Die gemeindefinanzen-App nutzt heute eine lokale `--web-*`-Schicht. Ein
separates Folge-Issue im `gemeindefinanzen`-Repo wird sie auf die
DS-Variante `--gat-web-*` umstellen — bis dahin bleibt die lokale
Schicht parallel aktiv (kein Bruch durch v2.0).

## Beitragen am DS

Wer am Stylesheet mitarbeitet, baut lokal:

```bash
npm install
npm run build
```

Source-Datei ist `src/design-system.css`. Der gerenderte
`design-system.css` im Repo-Root **muss** mit committed werden — der
CI-Job `build-check.yml` prüft per `git diff --exit-code
design-system.css`, dass Source und Output deckungsgleich sind.

## Kein Tag-Pinning nötig

Die `<link>`-URL ist Rolling — der `v2.0.0`-Tag markiert das Datum der
Welle, **erzwingt aber kein neues Markup auf der Konsumer-Seite**,
außer den oben aufgeführten optischen Anpassungen. Wer noch nicht
umstellen kann, bleibt mit v1.x-Markup auch unter v2.0 funktionsfähig
— nur der Header sieht jetzt weiß statt dunkelgrün aus (oder
dunkelgrün mit `.gat-header--dunkel` opt-in).
