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
Design-Tokens und Komponenten.

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

## Lizenz

Lizenziert unter der [Creative Commons Attribution 4.0 International
(CC BY 4.0)](LICENSE).

Urheber: Die Grünen.
