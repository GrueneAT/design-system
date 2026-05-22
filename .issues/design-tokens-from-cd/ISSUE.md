---
id: d2gfp
title: Design-Tokens aus dem Grüne-AT Corporate Design
status: done
priority: high
dependencies:
- lnwdl
labels:
- design-system
- tokens
remote:
- source: github
  id: '3'
  url: https://github.com/GrueneAT/design-system/issues/3
---

Die im CD-Quickguide definierten Werte als CSS Custom Properties (Design-Tokens) festschreiben. Quelle ist das CD-Quickguide-PDF — es liegt **außerhalb des Repos** beim Workspace und wird nicht versioniert. Alle relevanten Werte sind unten festgehalten; das PDF muss zur Umsetzung nicht erneut gelesen werden.

## Tokens aus dem CD-Quickguide

**Farben**
| Name | HEX | RGB | CMYK | Pantone |
|------|-----|-----|------|---------|
| Dunkelgrün | `#257639` | 37/118/57 | 85/35/95/10 | 2465 C |
| Hellgrün | `#56af31` | 86/175/49 | 69/0/100/0 | 3501 C |
| Gelb | `#ffed00` | 255/240/0 | 0/0/100/0 | 102 C |
| Magenta | `#e6007e` | 225/0/120 | 0/100/0/0 | 225 C |

**Typografie**
- Gotham Narrow Ultra → Headlines
- Gotham Narrow Book → Sublines, Copytext
- Vollkorn Black Italic → Hervorhebungen in Headlines und Zitate
- Headline-Zeilenabstand = Schriftgröße × 0,9
- Fließtext-Zeilenabstand = Schriftgröße × 1,3
- Abstand Headline↔Subline und Headline↔Copy = X × 2

**Layout / Logo**
- Mindestabstand (Schutzzone) M = 0,06 × kurze Kante
- Logogröße Print = 3 × M, Digital = 2,5 × M

## Offene Fragen / Entscheidungen
- **Gotham Narrow ist eine kommerzielle Schrift** — nicht frei web-hostbar. Web-Fallback bzw. Lizenz klären (z. B. lizenzierte Web-Fonts oder freie Annäherung). Vollkorn ist als Google Font frei verfügbar.
- RGB/HEX bei Magenta leicht inkonsistent im PDF (RGB 225/0/120 vs. HEX #e6007e) — HEX als maßgeblich festlegen.

## Acceptance Criteria
- Alle 4 Farben als CSS Custom Properties mit semantischen Namen definiert.
- Typografie-Tokens (Font-Familien, Zeilenabstands-Faktoren, Abstands-Skala) als Custom Properties definiert.
- Layout-/Spacing-Tokens für Schutzzone und Logo-Verhältnis dokumentiert.
- Font-Lizenz-/Fallback-Entscheidung dokumentiert und im CSS umgesetzt.
- Tokens sind in `design-system.css` eingebunden und im Style Guide referenzierbar.
