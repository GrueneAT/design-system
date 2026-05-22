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

## Verhältnis zum persönlichen System

Als strukturelles Vorbild diente das persönliche Designsystem unter
<https://flomotlik.github.io/claude-code/> (gehostetes CSS plus sichtbarer
Style Guide auf GitHub Pages).

Die beiden Systeme sind klar abgegrenzt:

- **Persönliches System** (`flomotlik.github.io/claude-code`) — privat, für
  persönliche Projekte und Reports.
- **Grüne AT Design System** (dieses Repo) — organisationsweit, verbindlich
  für alle Grüne-AT-Repos und -Tools.

## Stand und nächste Schritte

Dieses Repo enthält derzeit das Grundgerüst. Die inhaltliche Ausarbeitung
erfolgt in Folge-Issues:

- **Issue #3** — Design-Tokens (Farben, Typografie, Abstände)
- **Issue #4** — UI-Komponenten
- **Issue #5** — ausgearbeiteter Style Guide (`index.html`)
- **Issue #6** — weitere Ausbaustufen

`design-system.css` ist aktuell ein Platzhalter mit Datei-Header,
`index.html` ein Skelett.

## Lizenz

Lizenziert unter der [Creative Commons Attribution 4.0 International
(CC BY 4.0)](LICENSE).

Urheber: Die Grünen.
