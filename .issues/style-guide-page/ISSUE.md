---
id: ddh6g
title: Sichtbarer Style Guide
status: open
priority: medium
dependencies:
- uq0vb
labels:
- design-system
- documentation
remote:
- source: github
  id: '5'
  url: https://github.com/GrueneAT/design-system/issues/5
---

Die `index.html` zu einem vollständigen, sichtbaren Style Guide ausbauen — analog zum persönlichen System (https://flomotlik.github.io/claude-code/). Dient Menschen als Referenz und LLMs als lesbare Spezifikation.

## Umfang
- Alle Farb-Tokens mit HEX/Verwendungszweck.
- Typografie-Skala mit Live-Beispielen (Headline, Subline, Fließtext).
- Alle Kernkomponenten (Header, Buttons, Karten, Störer, Hervorhebungen) als gerenderte Beispiele.
- Layout-Grundprinzipien aus dem CD (Schutzzone, Logo-Verhältnis, „Typografie immer auf Grün").
- LLM-lesbare Spezifikation: geschlossenes Komponenten-Vokabular, Nutzungsregeln.

## Acceptance Criteria
- `index.html` zeigt alle Farben, Typografie-Stufen und Komponenten mit gerenderten Beispielen.
- Seite verwendet selbst das `design-system.css` (dogfooding).
- Enthält einen maschinenlesbaren Spezifikationsteil (geschlossenes Klassen-/Token-Vokabular, Regeln).
- Über GitHub Pages erreichbar.
