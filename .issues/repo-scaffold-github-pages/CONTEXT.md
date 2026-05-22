# Context — Repo-Grundgerüst und GitHub-Pages-Setup

Discuss-Phase, festgehalten 2026-05-22.

## Entschiedene Fragen

### D-1 — Bootstrap-Ausnahme: Initial-Commit direkt auf `main`
Das Repo `grueneat/design-system` hat **null Commits**. Von einem leeren Repo
lässt sich kein Feature-Branch/Worktree abzweigen — der allererste Commit muss
direkt auf `main` gehen. Das ist die universelle Bootstrap-Ausnahme von der
Worktree-Regel und gilt **einmalig nur für dieses Issue**. Ab Issue #3 gilt der
normale Worktree+PR-Flow.

Zusätzlich: Der lokale Klon hat HEAD auf `master`, GitHub-Default ist `main`.
Der lokale Branch wird auf `main` umbenannt, bevor committet/gepusht wird.

### D-2 — GitHub Pages via Actions-Workflow
Pages wird über einen **GitHub-Actions-Workflow** deployt (nicht „Deploy from
branch"). Quelle: `.github/workflows/` mit `actions/configure-pages`,
`actions/upload-pages-artifact`, `actions/deploy-pages`. Begründung des Users:
Headroom für einen späteren Build-Schritt (Sass/PostCSS). Aktuell wird das Repo
unverändert als statisches Artefakt hochgeladen.

### D-3 — Doku-Sprache: Deutsch
README und Dokumentation in **Deutsch** — konsistent mit der Org (Grüne AT) und
dem deutschsprachigen Corporate Design.

### D-4 — Lizenz: CC BY 4.0
Eine `LICENSE`-Datei mit **Creative Commons Attribution 4.0** — passend für
Design-/Gestaltungsartefakte.

## Rahmen / Annahmen
- Reines HTML + CSS, **kein Build-Schritt** im Scope dieses Issues.
- `index.html` und `design-system.css` liegen im Repo-Root; gespiegelt am
  persönlichen System (https://flomotlik.github.io/claude-code/).
- `index.html` ist hier nur ein **Skelett** — der ausgebaute Style Guide ist
  Issue #5.
- `design-system.css` ist hier ein **Platzhalter** mit Datei-Header — echte
  Tokens/Komponenten kommen in Issue #3/#4.
- `.gitignore` schließt `*.pdf` aus (CD-Quickguide-PDF darf nicht ins Repo).
- Pages-URL ist fix: `https://grueneat.github.io/design-system/`.

## Offene Punkte für Research
- Genauer, aktueller Aufbau eines GitHub-Pages-Actions-Workflows für eine
  statische Site (Action-Versionen, Permissions, `pages`-Environment).
- Aktivierung von Pages auf „GitHub Actions" als Source — per `gh` CLI oder
  manuell durch den User.
