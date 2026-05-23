# Grüne AT Design System

Gemeinsames Designsystem für alle Repositories und Tools der Grünen
Österreich. Es stellt konsistente Farben, ein einheitliches Layout und
wiederverwendbare UI-Bausteine aus dem grünen Corporate Design bereit, damit
alle Grüne-AT-Anwendungen dasselbe Erscheinungsbild teilen.

Das Designsystem wird als statische Site über GitHub Pages gehostet:
<https://grueneat.github.io/design-system/>

## Einbindung

Das gehostete Stylesheet lässt sich aus jedem Projekt per `<link>` einbinden:

```html
<link rel="stylesheet" href="https://grueneat.github.io/design-system/design-system.css">
```

Damit erhalten konsumierende Tools automatisch die zentral gepflegten
Design-Tokens und Komponenten. Die URL ist seit v1.0 stabil und ändert sich
auch in v2.0 nicht — `npm`, Build-Schritte oder andere Tooling-Aufwände sind
auf der Konsumenten-Seite nicht nötig.

`design-system.css` setzt bewusst **keine Tag-Defaults** — es stylt also kein
`body`, kein `h1` und keine anderen HTML-Elemente direkt. Eine konsumierende
Seite muss ihr Grundlayout daher selbst setzen, sonst rendert sie in der
Browser-Standardschrift (serif) und ohne Hintergrund. Das Minimum sind vier
Eigenschaften am `body`, aufgebaut aus den `--gat-*`-Tokens:

```css
body {
  margin: 0;
  background: var(--gat-color-surface);
  color: var(--gat-color-text);
  font-family: var(--gat-font-copy);
}
```

Ein vollständiges, lauffähiges Minimal-Beispiel für ein konsumierendes Tool
liegt unter [examples/minimal.html](examples/minimal.html) und ist live
abrufbar unter
<https://grueneat.github.io/design-system/examples/minimal.html>.

### Chart-Helfer (ES-Modul)

Für ECharts-basierte Datenwerkzeuge liefert das DS ein zusätzliches
ES-Modul mit Palette und Helfern:

```js
import {
  PALETTE, INK, LABEL_SIZE, AXIS_SIZE,
  BAR_MAX_DICHT, BAR_MAX_WEIT,
  tip, legende, grid, planIstLegende
} from 'https://grueneat.github.io/design-system/gat-charts.js';
```

Die Palette spiegelt die CSS-Tokens `--gat-web-chart-1..8` 1:1. ECharts
selbst wird vom Konsumenten unabhängig (eigener CDN-Import) geladen — das
DS bündelt keine fremden Bibliotheken.

## Versionierung und Updates

Das Designsystem ist produktiv: Design-Tokens (Farben, Typografie, Abstände,
Radien), UI-Komponenten und ein ausgearbeiteter Style Guide (`index.html`) sind
vorhanden und einsatzbereit.

Konsumierende Tools verlinken die feste, gehostete CSS-URL und erhalten damit
immer den aktuellen Stand — es gibt **keine** versionierten URLs oder Pfade.
Ein Update des Designsystems wirkt automatisch auf alle einbindenden Tools.

Damit dieser stetige Fluss nachvollziehbar bleibt, werden alle nennenswerten
Änderungen — insbesondere Breaking Changes — in der
[CHANGELOG.md](CHANGELOG.md) dokumentiert. Das Projekt folgt Semantic
Versioning: Ein Major-Versionssprung kündigt Breaking Changes an (entfernte
oder umbenannte Klassen bzw. Tokens), ein Minor-Sprung neue Komponenten oder
Tokens, ein Patch-Sprung reine Wert-Korrekturen ohne Auswirkung auf die
Klassen-API.

Ab v2.0 ist das Stylesheet Tailwind-v4-getrieben. Konsumenten merken davon
nichts — die `<link>`-URL bleibt identisch, die `--gat-*`-Namen bleiben
stabil. Migrations-Anleitung für Token-Wert- und optische Änderungen siehe
[MIGRATION.md](MIGRATION.md).

## Für Mitwirkende

Das Stylesheet wird aus `src/design-system.css` per Tailwind-CLI gebaut.
Lokal:

```bash
npm install
npm run build         # einmal bauen — schreibt design-system.css
# oder
npm run watch         # bei Änderungen automatisch neu bauen
```

Wer `src/` editiert, **muss** den frisch gebauten `design-system.css` mit
committen — der CI-Workflow `build-check.yml` prüft auf jedem PR per
`git diff --exit-code design-system.css`, dass committed Output und
Source-Build übereinstimmen.

Der Pages-Workflow (`.github/workflows/pages.yml`) baut auf jedem `push`
nach `main` ebenfalls neu, bevor er die Repo-Inhalte hochlädt — die
gehostete URL spiegelt also immer den aktuellen Source-Stand wider.

## Lizenz

Lizenziert unter der [Creative Commons Attribution 4.0 International
(CC BY 4.0)](LICENSE).

Urheber: Die Grünen.
