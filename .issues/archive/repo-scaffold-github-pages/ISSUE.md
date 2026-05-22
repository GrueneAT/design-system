---
id: lnwdl
title: Repo-Grundgerüst und GitHub-Pages-Setup
status: in_progress
priority: high
labels:
- infrastructure
- design-system
remote:
- source: github
  id: '2'
  url: https://github.com/GrueneAT/design-system/issues/2
---

Grundgerüst für `grueneat/design-system` aufsetzen — die Basis, auf der alle weiteren Issues aufbauen. Spiegelt den Aufbau des persönlichen Systems (https://flomotlik.github.io/claude-code/) wider: gehostetes CSS + sichtbarer Style Guide auf GitHub Pages.

PDF-unabhängig — kann sofort starten.

## Umfang
- Verzeichnisstruktur: `design-system.css`, `index.html` (Style-Guide-Skelett), `README.md`.
- GitHub-Pages-Deploy-Workflow (`.github/workflows/`), Pages aktivieren.
- Leeres/Platzhalter-`design-system.css` mit Datei-Header.
- `README.md`: Projektzweck, Verhältnis zum persönlichen System, Einbindungs-Hinweis.
- `.gitignore` mit `*.pdf` — das CD-Quickguide-PDF darf NICHT ins Repo (liegt extern beim Workspace, nicht versioniert).
- Initial-Commit auf `main` (Repo hat aktuell keine Commits).

## Acceptance Criteria
- Repo hat einen Initial-Commit auf `main`.
- GitHub Pages liefert `index.html` unter `https://grueneat.github.io/design-system/` aus.
- `design-system.css` ist von der Pages-URL aus per `<link>` erreichbar.
- `README.md` erklärt Zweck und Einbindung.
- `.gitignore` schließt `*.pdf` aus; kein PDF ist im Repo eingecheckt.
