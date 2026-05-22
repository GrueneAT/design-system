# Plan — Repo-Grundgerüst und GitHub-Pages-Setup

Basiert auf CONTEXT.md (D-1…D-4) und RESEARCH.md. Umsetzung im Repo
`/workspace/design-system/` (Klon von `grueneat/design-system`).

## Ausführungs-Hinweise für den Executor

- **Bootstrap-Ausnahme (D-1):** Das Repo hat 0 Commits — es ist **kein Worktree
  möglich**. Arbeite direkt in `/workspace/design-system/` auf Branch `main`.
  Der lokale HEAD heißt aktuell `master`; zuerst auf `main` umbenennen.
- **Commit-Format:** Conventional Commits (`feat:`, `chore:` …).
- **Keine KI-/Tool-Attribution** in Commits, Dateien oder Metadaten.
- **Reihenfolge der Commits:** erst Issue-Artefakte, dann Scaffold-Dateien
  (`commit_artifacts: true`).
- Alle Dokumentation/Texte auf **Deutsch** (D-3).
- `.gitignore` mit Inhalt `*.pdf` existiert bereits — nicht überschreiben.

<task id="T1" title="Lokalen Branch auf main umbenennen">
**Ziel:** Lokaler Default-Branch heißt `main` (Übereinstimmung mit GitHub).

**Schritte:**
1. In `/workspace/design-system/`: `git branch -m master main`.
2. Verifizieren: `git symbolic-ref HEAD` → `refs/heads/main`.

**Verifikation:** `git symbolic-ref --short HEAD` gibt `main` aus.
</task>

<task id="T2" title=".github/workflows/pages.yml erstellen">
**Ziel:** GitHub-Actions-Workflow, der das Repo als statische Site nach
GitHub Pages deployt (D-2).

**Datei:** `/workspace/design-system/.github/workflows/pages.yml`

**Inhalt — exakt diese verifizierten Action-Versionen (RESEARCH §2):**
- `name: Deploy zu GitHub Pages`
- Trigger: `push` auf Branch `main` **und** `workflow_dispatch`
- `permissions:` `contents: read`, `pages: write`, `id-token: write`
- `concurrency:` group `"pages"`, `cancel-in-progress: false`
- Ein Job `deploy`:
  - `environment:` name `github-pages`, `url: ${{ steps.deployment.outputs.page_url }}`
  - `runs-on: ubuntu-latest`
  - Steps: `actions/checkout@v4` → `actions/configure-pages@v5` →
    `actions/upload-pages-artifact@v3` (mit `path: '.'`) →
    `actions/deploy-pages@v5` (Step-`id: deployment`)

**Verifikation:** YAML ist valide (`python3 -c "import yaml,sys;
yaml.safe_load(open('.github/workflows/pages.yml'))"`); alle vier Action-
Versionen entsprechen RESEARCH §2.
</task>

<task id="T3" title="design-system.css Platzhalter anlegen">
**Ziel:** Die öffentlich verlinkbare Stylesheet-Datei existiert als Platzhalter.

**Datei:** `/workspace/design-system/design-system.css`

**Inhalt:**
- Datei-Header-Kommentar: Name („Grüne AT Design System"), Zweck, Hinweis
  „Tokens folgen in Issue #3, Komponenten in Issue #4", Lizenz-Hinweis
  (CC BY 4.0), kanonische URL
  `https://grueneat.github.io/design-system/design-system.css`.
- Ein leerer `:root { }`-Block als Platzhalter für die kommenden Tokens.
- Kein echtes Styling — das ist Scope von Issue #3/#4.

**Verifikation:** Datei existiert, ist valides CSS (kein Syntaxfehler), enthält
den Header-Kommentar und den `:root`-Block.
</task>

<task id="T4" title="index.html Skelett anlegen">
**Ziel:** Einstiegsseite unter `https://grueneat.github.io/design-system/`.

**Datei:** `/workspace/design-system/index.html`

**Inhalt:**
- Vollständiges, valides HTML5-Dokument, `lang="de"`.
- `<meta charset>`, Viewport, aussagekräftiger `<title>`
  („Grüne AT Design System").
- `<link rel="stylesheet" href="design-system.css">` (relativ — funktioniert
  lokal und auf Pages).
- Schlichter Platzhalter-Inhalt: Überschrift, ein bis zwei Sätze, dass dies das
  Grüne-AT-Designsystem ist und der vollständige Style Guide in Issue #5 folgt.
- Hinweis/Link auf das persönliche System
  (`https://flomotlik.github.io/claude-code/`) als verwandte Referenz.
- Kein eigenes CSS inline — Styling kommt später aus `design-system.css`.

**Verifikation:** Datei ist wohlgeformtes HTML, referenziert `design-system.css`
relativ, `lang="de"` gesetzt.
</task>

<task id="T5" title="README.md schreiben (Deutsch)">
**Ziel:** README erklärt Zweck und Einbindung (D-3).

**Datei:** `/workspace/design-system/README.md`

**Inhalt (Deutsch):**
- Titel + Einleitung: gemeinsames Designsystem für alle Grüne-AT-Repos und
  -Tools; konsistente Farben/Layout/UI aus dem grünen Corporate Design.
- Abschnitt **Einbindung**: kopierbares Snippet
  `<link rel="stylesheet" href="https://grueneat.github.io/design-system/design-system.css">`.
- Abschnitt **Verhältnis zum persönlichen System**: Abgrenzung zu
  `https://flomotlik.github.io/claude-code/` (persönlich vs. org-weit).
- Hinweis, dass Tokens/Komponenten/Style Guide in Folge-Issues (#3–#6) entstehen.
- Abschnitt **Lizenz**: CC BY 4.0, Urheber „Die Grünen".

**Verifikation:** README existiert, ist deutschsprachig, enthält das
Einbindungs-Snippet mit der korrekten Pages-URL.
</task>

<task id="T6" title="LICENSE (CC BY 4.0) anlegen">
**Ziel:** Lizenzdatei mit CC-BY-4.0-Volltext (D-4).

**Datei:** `/workspace/design-system/LICENSE`

**Schritte:**
1. Kanonischen Volltext beziehen:
   `gh api /licenses/cc-by-4.0 --jq .body` → in `LICENSE` schreiben.
2. Falls der API-Weg fehlschlägt: offiziellen „Creative Commons Attribution 4.0
   International"-Volltext verwenden.

**Verifikation:** `LICENSE` existiert und enthält den CC-BY-4.0-Text
(Kopfzeile „Creative Commons Attribution 4.0 International").
</task>

<task id="T7" title="Initial-Commit auf main und Push">
**Ziel:** Repo hat seinen ersten Commit auf `main`; alles ist auf GitHub.

**Schritte:**
1. Issue-Artefakte ins Repo übernehmen: `.issues/repo-scaffold-github-pages/`
   (ISSUE/CONTEXT/RESEARCH/PLAN.md) nach
   `/workspace/design-system/.issues/repo-scaffold-github-pages/` kopieren.
2. **Commit 1 (Artefakte):** `git add .issues/` →
   `chore: add issue artifacts for repo scaffold`.
3. **Commit 2 (Scaffold):** `git add .github/ design-system.css index.html
   README.md LICENSE .gitignore` →
   `feat: scaffold design-system repo and GitHub Pages deploy`.
4. `git push -u origin main`.

**Verifikation:** `git log --oneline` zeigt zwei Commits auf `main`;
`git status` ist sauber; `git ls-remote origin main` liefert einen Ref.
</task>

<task id="T8" title="GitHub Pages auf Source GitHub Actions stellen">
**Ziel:** Pages ist aktiv mit Source „GitHub Actions" (RESEARCH §3).

**Schritte:**
1. `gh api -X POST repos/grueneat/design-system/pages -f build_type=workflow`
   (falls bereits vorhanden: `-X PUT`).
2. Workflow-Lauf prüfen: `gh run list --repo grueneat/design-system` —
   der durch den Push (T7) ausgelöste `pages.yml`-Lauf sollte erscheinen.

**Falls die API fehlschlägt** (z. B. fehlende Berechtigung): in EXECUTION.md
klar vermerken, dass der User Pages manuell unter *Settings → Pages → Source:
GitHub Actions* aktivieren muss.

**Verifikation:** `gh api repos/grueneat/design-system/pages --jq .build_type`
gibt `workflow` aus; der Pages-Workflow ist gelaufen oder läuft.
</task>

## Acceptance Criteria (aus ISSUE.md)
- [ ] Repo hat einen Initial-Commit auf `main`. → T1, T7
- [ ] GitHub Pages liefert `index.html` unter
      `https://grueneat.github.io/design-system/` aus. → T2, T4, T7, T8
- [ ] `design-system.css` ist von der Pages-URL aus per `<link>` erreichbar.
      → T3, T7, T8
- [ ] `README.md` erklärt Zweck und Einbindung. → T5
- [ ] `.gitignore` schließt `*.pdf` aus; kein PDF ist im Repo eingecheckt.
      → bereits erfüllt (`.gitignore` vorhanden), T7 committet sie mit.

## Hinweis zur Verifikation des Pages-Deploys
Der Pages-Build läuft asynchron nach dem Push. Die Live-URL ist evtl. erst
1–2 Minuten nach T7/T8 erreichbar. EXECUTION.md soll den Workflow-Status
(`gh run list`) festhalten; ein 200 auf der Live-URL ist wünschenswert, aber
ein erfolgreich gestarteter/abgeschlossener Workflow-Lauf genügt als Nachweis.
