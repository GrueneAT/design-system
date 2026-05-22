# Context — Sichtbarer Style Guide

Discuss-Phase, festgehalten 2026-05-22.

## Entschiedene Fragen

### D-1 — Maschinenlesbare Spezifikation: eingebettet in `index.html`
Der maschinenlesbare Spezifikationsteil (geschlossenes Token-/Klassen-Vokabular
+ Nutzungsregeln) wird als **`<script type="application/json">`-Block in
`index.html`** eingebettet. Eine Datei, alles beisammen — Muster wie der
artifact-html-Contract. Kein separates `design-system.json`.

### D-2 — Doc-spezifisches CSS: inline `<style>` in `index.html`
Doc-Chrome, das keine echte Designsystem-Komponente ist (Farb-Swatches,
Code-Blöcke, Do/Don't-Raster), kommt als **kleiner `<style>`-Block in die
`index.html`**. `design-system.css` bleibt sauber auf Tokens + echte
Komponenten beschränkt; die Seite *dogfooded* sie.

## Rahmen / Annahmen
- Genau **eine** Seite: die bestehende `index.html` (Skelett aus Issue #2) wird
  zum vollständigen Style Guide ausgebaut.
- Die Seite bindet `design-system.css` ein und **nutzt die echten
  Komponenten/Tokens selbst** (Dogfooding) — die gezeigten Beispiele sind real
  gerendert, nicht abgemalt.
- Deutschsprachig (konsistent mit dem Projekt).
- Reines HTML/CSS, **kein JavaScript** (Anchor-Link-TOC statt JS-Navigation).
- Inhalt: alle Farb-Tokens (HEX + Verwendungszweck), Typo-Skala mit
  Live-Beispielen, alle Kernkomponenten als gerenderte Beispiele,
  CD-Layout-Grundprinzipien (Schutzzone, Logo-Verhältnis, „Typografie auf Grün").
- **Scope-Grenze:** Querverlinkung zum persönlichen System und der
  Integrations-Leitfaden sind Issue #6 — hier nicht.
- `design-system.css` und `assets/` sind aus #3/#4 vorhanden und werden hier
  **nicht verändert** — Issue #5 schreibt nur `index.html`.

## Offene Punkte für Research
- Struktur/Aufbau des persönlichen Systems (`flomotlik.github.io/claude-code/`)
  als Vorbild für Gliederung und LLM-Spec-Form.
- Vollständige Inventur der in `design-system.css` vorhandenen Tokens und
  `gat-`-Klassen — der Style Guide muss sie lückenlos abbilden.
- Sinnvolle Seitengliederung + Anchor-TOC ohne JS.
