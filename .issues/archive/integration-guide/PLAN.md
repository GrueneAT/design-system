# Plan: Integrations-Leitfaden und Querverlinkung

<objective>
Ziel: Die Konsumenten-Dokumentation des Grüne AT Design System fertigstellen —
eine verfeinerte Einbindungs-Anleitung in `README.md`, ein echtes
Minimal-Beispiel (`examples/minimal.html`), eine `CHANGELOG.md` und ein knapper
Integrations-Abschnitt im Style Guide (`index.html`). Zusätzlich werden alle
Verweise auf das persönliche/private System des Maintainers aus den
Produktdateien entfernt.

Warum: Das Designsystem ist nach den Issues #2–#5 inhaltlich vollständig
(`design-system.css`, `index.html`), aber es fehlt die Doku, die ein neues
Grüne-AT-Tool zum Einbinden braucht. Außerdem enthält `README.md` einen
veralteten Stand-Abschnitt (behauptet Platzhalter-CSS / Skelett-`index.html`)
und einen Bezug auf das persönliche System, der in ein öffentliches
Organisations-Repo nicht gehört.

Scope (in):
- `README.md`: personal-system-Abschnitt löschen (Zeilen 22–33), veralteten
  „Stand"-Abschnitt ersetzen, Einbindungs-Abschnitt verfeinern + CHANGELOG-Link.
- `CHANGELOG.md` (neu): Keep-a-Changelog-Format, Start-Eintrag `[1.0.0] - 2026-05-22`.
- `examples/minimal.html` (neu): vollständiges, eigenständiges Minimal-Beispiel.
- `index.html`: knapper Integrations-Abschnitt vor dem Footer + Nav-Link.

Scope (out):
- Querverlinkung persönliches ↔ org-System — per CONTEXT.md D-1 entfällt dieser
  ursprüngliche ISSUE.md-Punkt vollständig; statt zu verlinken wird der Bezug
  entfernt.
- `design-system.css` und `assets/` — inhaltlich unverändert (RESEARCH bestätigt:
  keine personal-system-Verweise, nichts zu tun).
- `.issues/`-Artefakte — Entwickler-Tooling, NICHT anfassen (D-1).
- Git-Tag / GitHub-Release `v1.0.0` — wird NICHT gesetzt (D-5).
</objective>

<strategy>
Reine Dokumentations- und Beispiel-Arbeit auf einem inhaltlich fertigen Repo.
Die kritische Forschungsfrage — wo überall Verweise auf das persönliche System
liegen — hat ein eindeutiges Ergebnis: genau eine Produktdatei ist betroffen,
`README.md`, Zeilen 22–33. `index.html` und `design-system.css` sind bereits
sauber. Alle weiteren Treffer liegen unter `.issues/` und sind ausdrücklich
out of scope.

Die Arbeit zerfällt in vier klar trennbare Pakete: README umarbeiten,
CHANGELOG anlegen, Minimal-Beispiel anlegen, Style-Guide-Abschnitt ergänzen.
Bewusste Entscheidungen: (a) `CHANGELOG.md` folgt „Keep a Changelog" 1.1.0 +
SemVer 2.0.0 statt einer Eigenkonstruktion — etablierter Standard, Konsumenten
kennen ihn; (b) das Minimal-Beispiel bindet die *absolute* gehostete CSS-URL ein
(nicht relativ), sonst dogfooded es das Hosting nicht; (c) da kein Git-Tag
gesetzt wird, verzichtet das CHANGELOG bewusst auf Compare-/Release-Links —
diese wären sonst 404.

Die größte Gefahr ist ein zu breiter Such-/Ersetzungsschritt, der die 12
`.issues/`-Artefaktdateien beschädigt, deren `flomotlik`-`<link>` korrekt ist.
Jede Verifikation grep't daher strikt mit `--exclude-dir=.issues
--exclude-dir=.git`. Die zweite Gotcha betrifft das Minimal-Beispiel: weil
`design-system.css` bewusst keine Tag-Defaults setzt, muss die Beispielseite ihr
body-Grundlayout selbst setzen — das demonstriert das Beispiel sogar bewusst.
</strategy>

<skills>
Keine Workspace-Skills vorhanden (`/workspace/design-system/` hat kein
`.claude/skills/`-Verzeichnis und keine repo-lokale `CLAUDE.md`). Maßgeblich
sind die User-Memory-Vorgaben, die in die Task-Actions eingearbeitet sind:
keine Tool-/„claude"-Attribution in Commits/Dateien, deutschsprachiger Inhalt,
simpler Stack für Beispiele (reines HTML, kein Framework, kein Build).
</skills>

<context>
Issue: @.issues/integration-guide/ISSUE.md
Research: @.issues/integration-guide/RESEARCH.md
Context (bindende Entscheidungen): @.issues/integration-guide/CONTEXT.md

<interfaces>
<!-- Executor: diese Verträge direkt verwenden. Codebase NICHT explorieren. -->

// ── README.md — aktuelle Struktur (53 Zeilen, Issue #2) ──────────────────
//   # Grüne AT Design System            (Z. 1)   — Titel + Intro (Z. 3–9)
//   ## Einbindung                       (Z. 11)  — <link>-Snippet (Z. 13–20)  → VERFEINERN
//   ## Verhältnis zum persönlichen System (Z. 22) — Z. 22–33               → KOMPLETT LÖSCHEN
//   ## Stand und nächste Schritte       (Z. 35)  — Z. 35–46                 → ERSETZEN (veraltet)
//   ## Lizenz                           (Z. 48)  — CC BY 4.0 (Z. 50–53)     → unverändert
//
// Kanonische CSS-URL (bestätigt, README Z. 16):
//   https://grueneat.github.io/design-system/design-system.css
// Veralteter Text in „Stand und nächste Schritte" (FALSCH, zu ersetzen):
//   „design-system.css ist aktuell ein Platzhalter mit Datei-Header,
//    index.html ein Skelett." → nach #3/#4/#5 unwahr.

// ── design-system.css — öffentliches Klassen-/Token-Vokabular ────────────
//   Tokens:      --gat-color-*, --gat-font-*, --gat-space-*, --gat-radius-*
//   Token-Prefix: --gat- (alle Custom Properties im :root-Block).
//   Komponenten (flach, einklassig, gat-präfixiert):
//     gat-section          — vertikaler Block mit CD-Abstandsrhythmus
//     gat-container        — zentrierter Inhaltscontainer
//     gat-header / gat-header__inner / gat-header__logo / gat-header__logo-mark
//     gat-nav / gat-nav__link / gat-nav__link--active
//     gat-headline         — Headline (H1-Rolle), Barlow Black 900
//     gat-subline          — Subline, Barlow Semibold 600
//     gat-fliesstext       — Fließtext, Barlow Regular 400
//     gat-emphasis         — Hervorhebung/Zitat, Vollkorn Black-Kursiv
//     gat-btn / gat-btn--primary / gat-btn--secondary   (Modifier Pflicht)
//     gat-card / gat-card--primary / gat-card--secondary (Modifier Pflicht)
//     gat-card__title / gat-card__body
//     gat-underline        — CD-Unterstreichung magenta
//     gat-highlight        — gelbe Marker-Fläche
//     gat-stoerer / gat-stoerer--gelb / gat-stoerer--magenta
//   WICHTIG: design-system.css setzt KEINE Tag-Defaults — konsumierende
//   Seiten MÜSSEN body-Grundlayout selbst setzen. Pflicht-Pattern (aus
//   index.html <style> Z. 22–28):
//     body { margin: 0;
//            background: var(--gat-color-surface);
//            color: var(--gat-color-text);
//            font-family: var(--gat-font-copy); }
//   Ohne diese body-Regel rendert die Seite serif und ohne Layout.

// ── index.html — Seitenstruktur (1244 Zeilen, Issue #5) ──────────────────
//   <head>: <link rel="stylesheet" href="design-system.css">  (RELATIV — Z. 7)
//   <body id="top">:
//     <header class="gat-header"> mit <nav class="gat-nav"> (Anchor-TOC).
//       Nav-Links aktuell (in dieser Reihenfolge):
//         #farben (gat-nav__link--active) #typografie #layout
//         #komponenten #cd-layout #spezifikation
//     <section>-Abschnitte: #farben #typografie #layout #komponenten
//       #cd-layout #spezifikation
//     <script type="application/json" id="gat-design-spec"> — maschinen-
//       lesbare Spec (NICHT anfassen, keine Prosa hineinschreiben)
//     <footer class="gat-section doc-footer"> — letztes Element vor </body>
//       (enthält Lizenz-Text + Kanonische Adresse)
//   → Neuer Integrations-Abschnitt: eigene <section class="gat-section">
//     mit id, eingefügt UNMITTELBAR VOR <footer class="gat-section doc-footer">.
//     Passender <a class="gat-nav__link"> in den Nav-Block aufnehmen.

// ── .github/workflows/pages.yml — Deploy-Vertrag (NICHT ändern) ──────────
//   upload-pages-artifact mit path: '.' → ganzes Repo wird publiziert.
//   ⇒ examples/minimal.html ist automatisch erreichbar unter
//     https://grueneat.github.io/design-system/examples/minimal.html
</interfaces>

Key files:
@README.md — drei Abschnitte zu ändern (löschen / ersetzen / verfeinern)
@index.html — Integrations-Abschnitt vor dem Footer ergänzen + Nav-Link
@design-system.css — Referenz für gat-Klassen; NICHT verändern (D-6)
</context>

<commit_format>
Format: conventional, ohne Issue-Prefix (keine `.issues/config.yaml` vorhanden;
Repo-Konvention aus RESEARCH: deutschsprachige conventional commits).
Pattern: {type}({scope}): {Beschreibung auf Deutsch}
Beispiele:
- docs(readme): Bezug zum persönlichen System entfernen
- docs(changelog): Erstfassung im Keep-a-Changelog-Format
- docs(examples): Minimal-Beispiel fuer konsumierende Tools ergaenzen
- docs(styleguide): Integrations-Abschnitt ergaenzen
KEINE Tool-/„claude"-Attribution in Commit-Messages oder Dateiinhalten
(User-Memory `feedback_no_claude_attribution`).
</commit_format>

<tasks>

<task type="auto">
  <name>Task 1: README.md umarbeiten — personal-system-Abschnitt löschen, Stand ersetzen, Einbindung verfeinern</name>
  <files>README.md</files>
  <action>
  Drei zusammenhängende Änderungen an `README.md`. Deutschsprachig, kein
  Framework-Jargon, keine Tool-Attribution.

  (1) personal-system-Abschnitt LÖSCHEN — per D-1 und RESEARCH-Inventur:
  Den kompletten Block „## Verhältnis zum persönlichen System" inklusive
  aller seiner Zeilen (aktuell Zeilen 22–33: Überschrift, beide Absätze,
  beide Bullets) ersatzlos entfernen, samt der trennenden Leerzeile. Nach der
  Löschung darf in `README.md` NIRGENDS mehr `flomotlik`, `claude-code`,
  „persönliches System" oder „Persönliches System" vorkommen. Die
  Abgrenzungs-Aussage „organisationsweit, verbindlich für alle Grüne-AT-Repos"
  geht nicht verloren — sie steht bereits in der README-Einleitung (Z. 3–6).

  (2) „## Stand und nächste Schritte" ERSETZEN — der Abschnitt (aktuell
  Z. 35–46) ist sachlich FALSCH: er behauptet `design-system.css` sei „ein
  Platzhalter mit Datei-Header" und `index.html` „ein Skelett", und listet
  offene Issues #3–#6. Nach #3/#4/#5 ist beides unwahr. Den Abschnitt durch
  einen neuen Abschnitt „## Versionierung und Updates" ersetzen, der korrekt
  beschreibt:
  - Das Designsystem ist produktiv: Design-Tokens, UI-Komponenten und ein
    ausgearbeiteter Style Guide (`index.html`) sind vorhanden.
  - Konsumierende Tools verlinken die feste, gehostete CSS-URL und erhalten
    damit immer den aktuellen Stand — es gibt KEINE versionierten URLs (D-2).
  - Änderungen — insbesondere Breaking Changes — werden in der `CHANGELOG.md`
    dokumentiert; das Projekt folgt Semantic Versioning. Relativen Link
    setzen: `[CHANGELOG.md](CHANGELOG.md)`.
  KEINE Erwähnung von „Platzhalter", „Skelett", „Grundgerüst" oder offenen
  Folge-Issues mehr.

  (3) „## Einbindung" VERFEINERN — das bestehende `<link>`-Snippet (Z. 15–17,
  kanonische URL `https://grueneat.github.io/design-system/design-system.css`)
  BEHALTEN. Ergänzen:
  - Hinweis, dass `design-system.css` bewusst KEINE Tag-Defaults setzt — eine
    konsumierende Seite muss ihr body-Grundlayout selbst setzen (margin,
    background, color, font-family aus den `--gat-*`-Tokens). Diese Eigenschaft
    kurz benennen, damit Konsumenten nicht über serif-gerenderte Seiten
    stolpern.
  - Verweis auf das Minimal-Beispiel `examples/minimal.html` — als relativer
    Repo-Link `[examples/minimal.html](examples/minimal.html)` UND als
    Live-Pages-URL `https://grueneat.github.io/design-system/examples/minimal.html`.

  Abschnittsreihenfolge der fertigen README: Titel/Intro → ## Einbindung →
  ## Versionierung und Updates → ## Lizenz. Der `## Lizenz`-Abschnitt
  (CC BY 4.0, Urheber: Die Grünen) bleibt unverändert.
  </action>
  <verify>
  <automated>test -f README.md && ! grep -niE 'flomotlik|claude-code|persönlich|personal system' README.md && ! grep -niE 'Platzhalter|Skelett|Grundgerüst' README.md && grep -q 'CHANGELOG.md' README.md && grep -q 'examples/minimal.html' README.md && grep -q 'grueneat.github.io/design-system/design-system.css' README.md && echo "README OK"</automated>
  </verify>
  <done>
  - `README.md` enthält keinerlei `flomotlik` / `claude-code` / „persönlich" / „personal system" mehr.
  - Der Abschnitt „Verhältnis zum persönlichen System" ist vollständig entfernt.
  - Kein „Platzhalter" / „Skelett" / „Grundgerüst" mehr; der veraltete Stand-Abschnitt ist durch „Versionierung und Updates" ersetzt.
  - Einbindungs-Abschnitt verweist auf `examples/minimal.html` und benennt das fehlende Tag-Default-Verhalten.
  - README verlinkt `CHANGELOG.md` relativ.
  </done>
</task>

<task type="auto">
  <name>Task 2: CHANGELOG.md neu anlegen (Keep a Changelog, [1.0.0] - 2026-05-22)</name>
  <files>CHANGELOG.md</files>
  <action>
  Neue Datei `CHANGELOG.md` im Repo-Root anlegen. Format: „Keep a Changelog"
  1.1.0 + Semantic Versioning 2.0.0. Deutschsprachig.

  Aufbau:
  - Titel `# Changelog`.
  - Einleitungsabsatz: alle nennenswerten Änderungen am Grüne AT Design System
    werden hier dokumentiert; Format basiert auf „Keep a Changelog", das
    Projekt folgt Semantic Versioning. Kurzer Satz: konsumierende Tools binden
    immer die aktuelle gehostete `design-system.css` ein (siehe README); diese
    Datei zeigt, was sich zwischen den Ständen geändert hat — insbesondere
    Breaking Changes (MAJOR-Versionssprünge).
  - `## [Unreleased]` — leer.
  - `## [1.0.0] - 2026-05-22` mit einer `### Added`-Sektion, die den
    funktional vollständigen Stand nach #2–#5 zusammenfasst: Design-Tokens aus
    dem Corporate Design der Grünen Österreich (Farben, Typografie — Barlow
    Semi Condensed und Vollkorn, Abstände, Radien als `--gat-*`-CSS-Custom-
    Properties); UI-Komponenten (`gat-header`/`gat-nav`, `gat-section`/
    `gat-container`, Typografie-Klassen, `gat-btn`, `gat-card`, CD-Layout-
    Elemente `gat-underline`/`gat-highlight`/`gat-stoerer`); sichtbarer Style
    Guide unter `index.html` mit maschinenlesbarer Spezifikation;
    Einbindungs-Anleitung und Minimal-Beispiel (`examples/minimal.html`).

  WICHTIG (D-4/D-5): Startversion ist `1.0.0`. Es wird KEIN Git-Tag gesetzt —
  daher KEINE Compare-/Release-Link-Zeilen am Dateiende (`[1.0.0]: .../compare/...`
  oder `.../releases/tag/...`). Diese würden ohne Tag auf 404 zeigen. Der
  Versions-Header `## [1.0.0] - 2026-05-22` nennt Version und Datum direkt;
  das genügt. Optional darf eine Markdown-Linkdefinition für `[Unreleased]`
  ebenfalls weggelassen werden.

  Wenn die Markdown-Versions-Header `[1.0.0]` / `[Unreleased]` ohne zugehörige
  Linkdefinition stehen, dürfen sie NICHT als anklickbarer Link gerendert
  werden — entweder die eckigen Klammern als reinen Text belassen (Keep a
  Changelog erlaubt das) oder konsequent ohne Linkdefinitionen schreiben.
  </action>
  <verify>
  <automated>test -f CHANGELOG.md && grep -qF '[1.0.0] - 2026-05-22' CHANGELOG.md && grep -q 'Keep a Changelog' CHANGELOG.md && grep -q '### Added' CHANGELOG.md && ! grep -E 'compare/|releases/tag/' CHANGELOG.md && echo "CHANGELOG OK"</automated>
  </verify>
  <done>
  - `CHANGELOG.md` existiert im Repo-Root.
  - Enthält den Eintrag `[1.0.0] - 2026-05-22` mit einer `### Added`-Sektion.
  - Folgt dem Keep-a-Changelog-Format mit `## [Unreleased]`-Block.
  - Enthält KEINE Compare-/Release-Tag-Links (kein Git-Tag, D-5).
  - Durchgehend deutschsprachig.
  </done>
</task>

<task type="auto">
  <name>Task 3: examples/minimal.html neu anlegen (vollständiges Minimal-Beispiel)</name>
  <files>examples/minimal.html</files>
  <action>
  Neue Datei `examples/minimal.html` anlegen (das `examples/`-Verzeichnis neu
  erstellen). Eine vollständige, eigenständige HTML5-Seite, die ein
  konsumierendes Grüne-AT-Tool demonstriert. Reines HTML, kein Build, kein
  JavaScript, kein zweites Asset (User-Memory `feedback_simple_stack_for_tests`).
  Deutschsprachig, `<html lang="de">`.

  Pflicht-Inhalt:
  1. `<!doctype html>`, `<meta charset="utf-8">`, `<meta name="viewport"
     content="width=device-width, initial-scale=1">`, ein `<title>`.
  2. GENAU EINE Stylesheet-Einbindung — die ABSOLUTE, gehostete URL:
     `<link rel="stylesheet" href="https://grueneat.github.io/design-system/design-system.css">`.
     KEINE relative `design-system.css` und KEINE `../design-system.css` — eine
     relative Einbindung würde nur lokal funktionieren und das Hosting nicht
     dogfooden. Die absolute Hosted-URL ist Pflicht (D-3).
  3. Ein minimaler `<style>`-Block, der NUR das body-Grundlayout setzt:
     `body { margin: 0; background: var(--gat-color-surface);
     color: var(--gat-color-text); font-family: var(--gat-font-copy); }`.
     Mit einem HTML-Kommentar versehen, der erklärt, dass `design-system.css`
     bewusst keine Tag-Defaults setzt und eine konsumierende Seite ihr
     body-Grundlayout selbst setzen muss — das ist die wichtigste Gotcha-
     Demonstration des Beispiels. Sonst KEINE eigenen CSS-Regeln.
  4. Ein erklärender Kopf-Kommentar ganz oben: „Vollständiges Minimal-Beispiel
     eines konsumierenden Grüne-AT-Tools …".
  5. Echte `gat-`-Komponenten in einer plausiblen Tool-Seite — ausschließlich
     Klassen aus dem in <interfaces> dokumentierten Vokabular, KEINE
     erfundenen Klassen:
     - `gat-header` mit `gat-header__inner`, `gat-header__logo`,
       `gat-header__logo-mark`, und einer `gat-nav` mit ein paar
       `gat-nav__link` (einer mit `gat-nav__link--active`).
     - eine `gat-section` mit `gat-container`-Hülle.
     - `gat-headline`, `gat-subline`, mindestens ein `gat-fliesstext`-Absatz.
     - mindestens ein `gat-btn` MIT Modifier (`gat-btn--primary` und
       `gat-btn--secondary`) — der Modifier ist Pflicht.
     - mindestens eine `gat-card` MIT Modifier (`gat-card--primary` oder
       `gat-card--secondary`), inkl. `gat-card__title` und `gat-card__body`.
  6. Kein Verweis auf `flomotlik` / `claude-code` / das persönliche System.
  7. Keine Tool-/„claude"-Attribution.

  Korrektes Markup je Komponente: `index.html` (der Style Guide,
  `#komponenten`-Abschnitt) ist die Referenz. Das Beispiel baut nichts neu nach
  — es verwendet nur vorhandene Klassen.
  </action>
  <verify>
  <automated>test -f examples/minimal.html && grep -qF 'https://grueneat.github.io/design-system/design-system.css' examples/minimal.html && ! grep -E 'href="(\.\./)?design-system\.css"' examples/minimal.html && grep -q 'lang="de"' examples/minimal.html && ! grep -niE 'flomotlik|claude-code' examples/minimal.html && python3 -c "from html.parser import HTMLParser; import sys
class B(HTMLParser):
 VOID={'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
 def __init__(s): super().__init__(); s.st=[]; s.bad=False
 def handle_starttag(s,t,a):
  if t not in s.VOID: s.st.append(t)
 def handle_endtag(s,t):
  if t in s.VOID: return
  if s.st and s.st[-1]==t: s.st.pop()
  elif t in s.st:
   while s.st and s.st.pop()!=t: pass
  else: s.bad=True
b=B(); b.feed(open('examples/minimal.html',encoding='utf-8').read())
sys.exit(1 if (b.bad or b.st) else 0)" && echo "minimal.html OK"</automated>
  </verify>
  <done>
  - `examples/minimal.html` existiert und ist wohlgeformtes, ausbalanciertes HTML.
  - Bindet die absolute gehostete CSS-URL ein; keine relative `design-system.css`.
  - Setzt das body-Grundlayout selbst und kommentiert die Tag-Default-Gotcha.
  - Verwendet ausschließlich echte `gat-`-Komponenten (Header/Nav, Section/Container, Typografie, Button mit Modifier, Card mit Modifier).
  - `<html lang="de">`, deutschsprachig, kein JavaScript, kein zweites Asset.
  - Kein personal-system-Verweis, keine Tool-Attribution.
  </done>
</task>

<task type="auto">
  <name>Task 4: index.html — Integrations-Abschnitt vor dem Footer ergänzen + Nav-Link</name>
  <files>index.html</files>
  <action>
  Dem Style Guide `index.html` einen knappen Integrations-Abschnitt hinzufügen.
  RESEARCH bestätigt: `index.html` enthält KEINE personal-system-Verweise —
  es ist NICHTS zu entfernen, nur additiv zu ergänzen.

  (1) Neue `<section class="gat-section" id="einbindung">` einfügen —
  UNMITTELBAR VOR `<footer class="gat-section doc-footer">` (das ist das
  letzte Element vor `</body>`), per D-6. Die Section enthält eine
  `gat-container`-Hülle mit:
  - einer `gat-headline` oder passenden Überschrift „Einbindung" / „Einbindung
    in eigene Tools";
  - einem kurzen `gat-fliesstext`-Absatz, der erklärt, wie ein konsumierendes
    Tool das gehostete Stylesheet per `<link>` einbindet;
  - dem `<link>`-Snippet mit der kanonischen URL
    `https://grueneat.github.io/design-system/design-system.css`. Das Snippet
    als Codeblock darstellen — verwende dasselbe `doc-`-präfixierte
    Codeblock-Muster, das `index.html` für andere Code-Snippets im
    `#komponenten`-Abschnitt bereits nutzt (z. B. `doc-codeblock` o. ä. — am
    vorhandenen Markup orientieren, kein neues CSS erfinden);
  - einem Hinweis, dass `design-system.css` keine Tag-Defaults setzt und die
    konsumierende Seite ihr body-Grundlayout selbst setzen muss;
  - Verweisen auf das Minimal-Beispiel `examples/minimal.html` (relativer
    Link `examples/minimal.html`) und auf die `CHANGELOG.md` (relativer Link
    `CHANGELOG.md`) für Versionierung/Updates.
  Den `<script type="application/json" id="gat-design-spec">`-Block NICHT
  anfassen — der Integrations-Abschnitt ist menschliche Doku und gehört nicht
  in dieses JSON.

  (2) Passenden Nav-Link in den `gat-nav`-Block aufnehmen: ein
  `<a class="gat-nav__link" href="#einbindung">Einbindung</a>` ergänzen. Die
  vorhandenen Nav-Links sind in Reihenfolge: Farben, Typografie, Layout,
  Komponenten, CD-Layout, Spezifikation — der neue Link kommt ans Ende, nach
  „Spezifikation" (der Abschnitt selbst sitzt am Ende vor dem Footer). Der
  `gat-nav__link--active`-Modifier bleibt unverändert auf „Farben".

  Deutschsprachig, kein personal-system-Verweis, keine Tool-Attribution.
  Die `id` des Nav-Links (`#einbindung`) MUSS exakt mit der `id` der neuen
  Section übereinstimmen.
  </action>
  <verify>
  <automated>grep -q 'id="einbindung"' index.html && grep -q 'href="#einbindung"' index.html && grep -qF 'https://grueneat.github.io/design-system/design-system.css' index.html && grep -q 'examples/minimal.html' index.html && grep -q 'CHANGELOG.md' index.html && ! grep -niE 'flomotlik|claude-code|persönliches system' index.html && python3 -c "from html.parser import HTMLParser; import sys
class B(HTMLParser):
 VOID={'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
 def __init__(s): super().__init__(); s.st=[]; s.bad=False
 def handle_starttag(s,t,a):
  if t not in s.VOID: s.st.append(t)
 def handle_endtag(s,t):
  if t in s.VOID: return
  if s.st and s.st[-1]==t: s.st.pop()
  elif t in s.st:
   while s.st and s.st.pop()!=t: pass
  else: s.bad=True
b=B(); b.feed(open('index.html',encoding='utf-8').read())
sys.exit(1 if (b.bad or b.st) else 0)" && echo "index.html OK"</automated>
  </verify>
  <done>
  - `index.html` hat eine neue `<section id="einbindung">` unmittelbar vor dem `doc-footer`.
  - Der Abschnitt zeigt das `<link>`-Einbindungs-Snippet, den Tag-Default-Hinweis und Verweise auf `examples/minimal.html` und `CHANGELOG.md`.
  - Ein `gat-nav__link` mit `href="#einbindung"` ist im Nav-Block ergänzt; `id` und `href` stimmen überein.
  - Der `#gat-design-spec`-JSON-Block ist unverändert.
  - `index.html` parst weiterhin als ausbalanciertes HTML; kein personal-system-Verweis.
  </done>
</task>

</tasks>

<verification>
Nach allen Tasks die folgenden Repo-weiten Checks ausführen (aus dem Repo-Root
`/workspace/design-system/`):

- Repo-weiter Inventur-Check — erwartet NULL Treffer (Produktdateien sauber,
  `.issues/` und `.git/` ausgenommen):
  ```
  grep -rniE "flomotlik|claude-code" \
    --include="*.html" --include="*.css" --include="*.md" --include="*.yml" \
    --exclude-dir=.issues --exclude-dir=.git . ; \
    test $? -eq 1 && echo "Inventur OK: keine Treffer"
  ```
- Neue Dateien existieren: `test -f CHANGELOG.md && test -f examples/minimal.html`.
- README enthält die stale Behauptungen nicht mehr:
  `! grep -niE 'Platzhalter|Skelett|Grundgerüst' README.md`.
- `examples/minimal.html` bindet die absolute Hosted-CSS-URL ein und ist
  wohlgeformtes HTML (siehe Task-3-Verify).
- `index.html` parst weiterhin sauber und enthält den `#einbindung`-Abschnitt.
- `git status` zeigt KEINE geänderten Dateien unter `.issues/` — andernfalls
  wurde ein Such-/Ersetzungsschritt zu breit ausgeführt.
</verification>

<success_criteria>
Abbildung 1:1 auf die Acceptance Criteria aus ISSUE.md (in der durch CONTEXT.md
revidierten Fassung):

- README enthält eine kopierbare Einbindungs-Anleitung mit der gehosteten
  CSS-URL — verfeinert um Tag-Default-Hinweis und Beispiel-/CHANGELOG-Verweise
  (Task 1).
- Mindestens ein vollständiges Minimal-Beispiel für ein konsumierendes Tool
  existiert als echte Datei `examples/minimal.html` (Task 3).
- Update-/Versionierungs-Strategie ist dokumentiert: feste Latest-URL +
  `CHANGELOG.md` mit Semantic Versioning; README beschreibt sie und verlinkt
  das CHANGELOG (Task 1 + Task 2).
- Der ursprüngliche Punkt „Querverlinkung persönliches ↔ org-System" ist per
  CONTEXT.md D-1 ersetzt: alle personal-system-Verweise sind aus den
  Produktdateien (`README.md`) entfernt; `index.html` und `design-system.css`
  waren bereits sauber; `.issues/` bleibt unangetastet (Task 1 + Task 4 +
  finaler Inventur-Check).
- Der Style Guide `index.html` ist um einen knappen Integrations-Abschnitt
  vor dem Footer ergänzt, inklusive Nav-Eintrag (Task 4).
- `CHANGELOG.md` startet bei Version `1.0.0`, ohne Git-Tag und ohne
  Compare-/Release-Links (D-4/D-5).
- Sämtliche neuen/geänderten Inhalte sind deutschsprachig und enthalten keine
  Tool-/„claude"-Attribution.
</success_criteria>
