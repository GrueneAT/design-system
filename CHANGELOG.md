# Changelog

Alle nennenswerten Änderungen am Grüne AT Design System werden in dieser Datei
dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.1.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/lang/de/).

Konsumierende Tools binden immer die aktuelle gehostete `design-system.css` ein
(siehe README). Diese Datei zeigt, was sich zwischen den Ständen geändert hat —
insbesondere Breaking Changes (MAJOR-Versionssprünge).

## [Unreleased]

## [1.0.0] - 2026-05-22

### Added

- Design-Tokens aus dem Corporate Design der Grünen Österreich: Farben,
  Typografie (Barlow Semi Condensed, Vollkorn), Abstände und Radien — als
  `--gat-*`-CSS-Custom-Properties.
- UI-Komponenten: `gat-header`/`gat-nav`, `gat-section`/`gat-container`,
  Typografie-Klassen (`gat-headline`, `gat-subline`, `gat-fliesstext`,
  `gat-emphasis`), `gat-btn` und `gat-card` (jeweils mit Pflicht-Modifier)
  sowie die CD-Layout-Elemente `gat-underline`, `gat-highlight` und
  `gat-stoerer`.
- Sichtbarer Style Guide unter `index.html` mit eingebetteter,
  maschinenlesbarer Spezifikation des gesamten Klassen- und Token-Vokabulars.
- Einbindungs-Anleitung in der `README.md` sowie ein vollständiges
  Minimal-Beispiel eines konsumierenden Tools unter `examples/minimal.html`.
