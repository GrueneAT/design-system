---
id: uq0vb
title: Kernkomponenten und Layout-System
status: open
priority: medium
dependencies:
- d2gfp
labels:
- design-system
- components
remote:
- source: github
  id: '4'
  url: https://github.com/GrueneAT/design-system/issues/4
---

Auf Basis der Design-Tokens die wiederverwendbaren UI-Bausteine bauen, die alle Grüne-AT-Tools gemeinsam nutzen.

## Umfang
- **Header / Navigation** — konsistenter Seitenkopf inkl. Logo-Platzierung gemäß Schutzzone.
- **Layout-Grid & Seitenstruktur** — Grundraster, Container, Abstände.
- **Typografie-Klassen** — Headline, Subline, Fließtext gemäß CD-Regeln (Zeilenabstand × 0,9 / × 1,3).
- **Buttons** — Primär/Sekundär in der grünen Farbwelt.
- **Karten / Flächen** — inkl. CD-Grundregel: Typografie steht immer auf grüner Fläche (Dunkel- oder Hellgrün).
- Gestaltungselemente aus dem CD: Unterstreichungen, Hervorhebungen, „Störer".

## Acceptance Criteria
- Header, Layout-Grid, Typografie-Klassen, Buttons und Karten als CSS-Komponenten in `design-system.css`.
- Komponenten verwenden ausschließlich Design-Tokens — keine hartcodierten Farben/Größen.
- CD-Grundregel „Text nur auf grüner Fläche" ist in den Text-/Karten-Komponenten abgebildet.
- Komponenten sind responsiv und ohne JavaScript nutzbar.
