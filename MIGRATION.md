# Migration v1.x → v2.0

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
