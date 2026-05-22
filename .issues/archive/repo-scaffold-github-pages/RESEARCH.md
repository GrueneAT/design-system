# Research — Repo-Grundgerüst und GitHub-Pages-Setup

Recherche-Phase, 2026-05-22. Baut auf CONTEXT.md (D-1…D-4) auf.

## 1 — Persönliches Designsystem als Strukturvorlage

Das persönliche System liegt **nicht** in einem eigenen Repo, sondern im
Unterordner `docs/` von `flomotlik/claude-code`:

```
docs/design-system.css
docs/index.html
docs/design-system-sample.html
docs/README.md
```

Pages liefert den `docs/`-Ordner unter `flomotlik.github.io/claude-code/` aus.

**Konsequenz für uns:** `grueneat/design-system` ist ein **dediziertes** Repo —
das Designsystem *ist* das Repo. Es braucht keinen `docs/`-Unterordner. Die
Dateien liegen im **Repo-Root**:

```
index.html            # Style-Guide-Skelett (Ausbau = Issue #5)
design-system.css     # Platzhalter mit Header (Tokens = Issue #3, Komponenten #4)
README.md             # Deutsch (D-3)
LICENSE               # CC BY 4.0 (D-4)
.gitignore            # *.pdf (bereits angelegt)
.github/workflows/    # Pages-Deploy (D-2)
```

## 2 — GitHub-Pages-Deploy via Actions (verifiziert)

Geprüft gegen `actions/starter-workflows` (`pages/static.yml`, Stand 2026-05).
Aktuelle Action-Versionen für eine statische Site **ohne Build-Schritt**:

| Action | Version |
| :----- | :------ |
| `actions/checkout` | `v4` |
| `actions/configure-pages` | `v5` |
| `actions/upload-pages-artifact` | `v3` |
| `actions/deploy-pages` | `v5` |

Pflicht-Bestandteile des Workflows:
- `permissions: { contents: read, pages: write, id-token: write }`
- `concurrency: { group: "pages", cancel-in-progress: false }`
- Job-`environment: { name: github-pages, url: ${{ steps.deployment.outputs.page_url }} }`
- Trigger: `push` auf Default-Branch + `workflow_dispatch`
- `upload-pages-artifact` mit `path: '.'` (gesamtes Repo, da kein Build)

## 3 — Pages-Aktivierung

Pages muss auf Source **„GitHub Actions"** gestellt sein, sonst läuft der
Workflow ins Leere. Optionen:
- Per CLI: `gh api -X POST repos/grueneat/design-system/pages -f build_type=workflow`
  (bzw. `-X PUT`, falls Pages schon existiert).
- Alternativ manuell durch den User unter *Settings → Pages → Source: GitHub Actions*.

Der erste Workflow-Lauf passiert automatisch beim Push des Initial-Commits.

## 4 — Bootstrap-Mechanik (zu D-1)

- Lokaler Klon: `/workspace/design-system/`, HEAD = `master`, **0 Commits**.
- GitHub-Default-Branch = `main`.
- Schritte: lokalen Branch `master` → `main` umbenennen
  (`git branch -m main`), Dateien anlegen, **direkt auf `main` committen**,
  `git push -u origin main`.
- Kein Worktree/PR möglich — universelle Bootstrap-Ausnahme, einmalig.

## 5 — Empfehlung: `commit_artifacts` auf `false`

Aktuell `commit_artifacts: true` → Issue-Artefakte (CONTEXT/RESEARCH/PLAN/
EXECUTION.md) würden in den Worktree und damit **in das Repo** committet. Für
ein **öffentliches, konsumierbares Designsystem-Repo** ist das unsauber:
interne Planungsdokumente landen im Repo und würden vom Pages-Workflow
(`path: '.'`) sogar mit deployt.

**Empfehlung:** `commit_artifacts: false` in `.issues/config.yaml` setzen.
Dann bleiben Artefakte dauerhaft unter `/workspace/.issues/<slug>/`, das Repo
enthält ausschließlich die echten Designsystem-Dateien, und der Bootstrap
vereinfacht sich (kein Artefakt-Verschieben). Gilt für alle 5 Issues.

→ Bestätigung des Users am Plan-Review-Gate einholen.

## 6 — CC BY 4.0 LICENSE

Standardisierter Volltext „Creative Commons Attribution 4.0 International".
GitHub kennt die Lizenz (`gh repo` / Lizenz-Picker liefert `licenses/cc-by-4.0`).
Im Plan: Volltext als `LICENSE` ablegen; README nennt Lizenz + Urheber
(Die Grünen / Grüne AT).

<interfaces>

Dieses Issue erzeugt das öffentliche Kontrakt-Gerüst, auf das spätere Issues
und konsumierende Grüne-AT-Tools aufsetzen:

- **`design-system.css`** (Repo-Root) — die gehostete Stylesheet-Datei. Stabile
  öffentliche URL, von anderen Tools per `<link>` eingebunden:
  `https://grueneat.github.io/design-system/design-system.css`
  In diesem Issue nur Platzhalter mit Datei-Header; Tokens = Issue #3.
- **`index.html`** (Repo-Root) — Einstieg/Style-Guide unter
  `https://grueneat.github.io/design-system/`. Hier nur Skelett; Ausbau = Issue #5.
- **`.github/workflows/pages.yml`** — Deploy-Pipeline. Trigger: Push auf `main`
  + `workflow_dispatch`. Verträge: `permissions` (contents:read, pages:write,
  id-token:write), `concurrency` group `pages`, Environment `github-pages`.
- **`README.md`** — deutschsprachig; nennt Zweck, Einbindungs-Snippet
  (`<link>`-Tag mit Pages-URL), Verhältnis zum persönlichen System.
- **`LICENSE`** — CC BY 4.0 Volltext.
- **`.gitignore`** — bereits vorhanden, Inhalt `*.pdf`.
- **Default-Branch `main`** — entsteht mit dem Initial-Commit; Basis für alle
  künftigen Feature-Branches/Worktrees (Issues #3–#6).

Keine Code-APIs/Funktionssignaturen — dies ist ein reines Datei-/Infrastruktur-
Gerüst.

</interfaces>

## Offene Entscheidung für den Plan
- `commit_artifacts`-Empfehlung (Abschnitt 5): **vom User entschieden →
  bleibt `true`** (Standardverhalten, Artefakte werden ins Repo committet).
