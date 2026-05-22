---
id: ryhv5
title: Integrations-Leitfaden und Querverlinkung
status: done
priority: medium
dependencies:
- ddh6g
labels:
- design-system
- documentation
remote:
- source: github
  id: '6'
  url: https://github.com/GrueneAT/design-system/issues/6
---

Dokumentieren, wie Grüne-AT-Tools und -Repos das Designsystem einbinden, und das org-System mit dem persönlichen System querverlinken.

## Umfang
- Einbindungs-Anleitung: `<link>` auf das gehostete `design-system.css` von GitHub Pages.
- Beispiel-Snippet / Minimal-HTML für ein neues Tool.
- Versionierungs-/Update-Hinweise (wie Tools Änderungen mitbekommen).
- Querverlinkung: persönliches System (https://flomotlik.github.io/claude-code/) ↔ Grüne-AT-System — Abgrenzung und gegenseitige Verweise.
- README und Style Guide entsprechend ergänzen.

## Acceptance Criteria
- README enthält eine kopierbare Einbindungs-Anleitung mit der gehosteten CSS-URL.
- Mindestens ein vollständiges Minimal-Beispiel für ein konsumierendes Tool.
- Persönliches und org-System verweisen gegenseitig aufeinander; Abgrenzung ist beschrieben.
- Update-/Versionierungs-Strategie ist dokumentiert.
