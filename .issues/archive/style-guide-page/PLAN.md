# Plan: Sichtbarer Style Guide

<objective>
Was dieser Plan erreicht: Die heutige Skelett-`index.html` (Issue #2) wird zu
einem vollständigen, deutschsprachigen, sichtbaren Style Guide für das Grüne-AT-
Designsystem ausgebaut — eine einzige statische HTML-Seite ohne JavaScript, die
`design-system.css` selbst einbindet und *dogfooded*.

Warum es wichtig ist: Der Guide ist die Referenz für Menschen (Designer/
Entwickler in Grüne-AT-Repos) UND eine maschinenlesbare Spezifikation für LLMs.
Ohne ihn ist das in `design-system.css` enthaltene Token-/Klassen-Vokabular nur
aus dem CSS-Kommentar erschließbar.

Scope — in:
- Alle 22 `--gat-*`-Tokens dokumentiert (Farben, Schrift, Typo-Größen,
  Zeilenabstände, Abstände, Komponenten-Maße, Breakpoints).
- Alle 22 `.gat-*`-Klassen als live gerendertes Beispiel + Markup-Code-Block.
- CD-Layout-Grundprinzipien (Schutzzone M, Logo-Verhältnis, „Typografie immer
  auf Grün").
- Eingebetteter maschinenlesbarer `<script type="application/json">`-Spec-Block.
- Anchor-Link-TOC ohne JavaScript.

Scope — out:
- `design-system.css` und `assets/` werden NICHT verändert — Issue #5 schreibt
  ausschließlich `/workspace/design-system/index.html`.
- Querverlinkung zum persönlichen System + Integrations-Leitfaden → Issue #6.
- Kein neuer GitHub-Pages-Workflow — `pages.yml` (`path: '.'`) deployt
  `index.html` bereits automatisch bei Push auf `main`.

Kein CLAUDE.md und keine `.claude/skills/` im Repo; verbindlich aus dem
Nutzerprofil: keine Tool-Attribution im Markup, einfacher Stack (reines
HTML/CSS), vorhandene Komponenten unverändert nutzen.
</objective>

<strategy>
Die Seite wird deklarativ aus einer einzigen `index.html` aufgebaut, in sechs
Abschnitten, die exakt den sechs Implementierungstasks entsprechen. Strategische
Leitlinie: die Seite dogfooded `design-system.css` — Kopf, Navigation/TOC,
Beispiel-Raster und jede gezeigte Komponente werden mit den echten
`gat-`-Klassen gerendert, nicht abgemalt.

Zwei gelockte Decisions strukturieren die Datei:
- D-1 — die maschinenlesbare Spezifikation ist ein eingebetteter
  `<script type="application/json">`-Block (kein separates `design-system.json`).
- D-2 — Doc-Chrome (Farb-Swatches, Code-Blöcke, Do/Don't-Raster) lebt in einem
  inline `<style>`-Block mit `doc-`-Präfix, damit die Grenze zwischen echten
  `gat-`-Komponenten und Doku-Möbeln sichtbar bleibt.

Erwogene Alternativen und warum die gewählte gewinnt:
- Separates `design-system.json` vs. eingebetteter JSON-Block → D-1 entscheidet
  eingebettet: eine Datei, kein Sync-Risiko.
- JS-Navigation/Smooth-Scroll vs. native Anchor-Links + CSS `scroll-behavior` →
  CONTEXT verbietet JS; native Anker funktionieren vollständig ohne JS.
- Doc-Chrome in `design-system.css` vs. inline `<style>` → D-2 entscheidet
  inline: hält das gehostete Stylesheet sauber.

Schlüssel-Entscheidungspunkte für den Executor: die Trennung echte Komponente /
`doc-`-Chrome konsequent halten; das JSON-Spec lückenlos (alle 22 Tokens + alle
22 Klassen + Regelliste) führen, sonst verfehlt es das Akzeptanzkriterium
„geschlossenes Vokabular"; keinerlei ausführbares JavaScript einschleichen — der
JSON-Block ist Daten, kein Code.
</strategy>

<context>
Issue: @.issues/style-guide-page/ISSUE.md
Research: @.issues/style-guide-page/RESEARCH.md
Decisions: @.issues/style-guide-page/CONTEXT.md

<interfaces>
<!-- Executor: nutze diese Inventur direkt. design-system.css NICHT lesen
     müssen — die komplette Fläche steht hier. design-system.css und assets/
     werden in diesem Issue NICHT verändert. -->

=== Die 22 --gat-*-Tokens (vollständig — alle müssen im Guide erscheinen) ===

Farb-Primitive (4):
  --gat-color-dunkelgruen  #257639  Primäre Markenfarbe (Dunkelgrün)
  --gat-color-hellgruen    #56af31  Sekundäre Markenfarbe (Hellgrün)
  --gat-color-gelb         #ffed00  Highlight-Farbe (Gelb)
  --gat-color-magenta      #e6007e  Akzentfarbe (Magenta)

Neutrals (2):
  --gat-color-weiss        #ffffff  Flächen / Text auf Grün
  --gat-color-anthrazit    #1d1d1b  Dunkler Textton

Semantische Aliase (8 — verweisen auf Primitive/Neutrals):
  --gat-color-primary      -> dunkelgruen   Primärfläche
  --gat-color-secondary    -> hellgruen     Sekundärfläche
  --gat-color-accent       -> magenta       Akzent (Unterstreichung, Störer)
  --gat-color-highlight    -> gelb          Hervorhebung / Nav-Unterstreichung
  --gat-color-text         -> anthrazit     Standard-Textfarbe
  --gat-color-surface      -> weiss         Standard-Hintergrund
  --gat-color-on-primary   -> weiss         Text auf Dunkelgrün — Kontrast 5,63:1
  --gat-color-on-secondary -> anthrazit     Text auf Hellgrün — Kontrast 6,09:1

Schrift (3):
  --gat-font-headline  'Barlow Semi Condensed', sans-serif  Headlines
  --gat-font-copy      'Barlow Semi Condensed', sans-serif  Fließtext / UI
  --gat-font-emphasis  'Vollkorn', serif                    Hervorhebung / Zitat

Typo-Größen (6 — modulare Skala, Basis 1rem, Ratio 1,25):
  --gat-text-h1       2.441rem  Headline (H1-Rolle)
  --gat-text-h2       1.953rem  H2
  --gat-text-h3       1.563rem  H3 / Karten-Titel
  --gat-text-subline  1.25rem   Subline
  --gat-text-copy     1rem      Fließtext
  --gat-text-small    0.8rem    Kleintext

Zeilenabstände (2 — einheitslos, aus CD-Quickguide):
  --gat-leading-headline  0.9  Headline-/Subline-Zeilenabstand
  --gat-leading-copy      1.3  Fließtext-Zeilenabstand

Abstände (6 — Web-Ergänzung, Basis 0.25rem):
  --gat-space-1 0.25rem  --gat-space-2 0.5rem  --gat-space-3 1rem
  --gat-space-4 1.5rem   --gat-space-5 2rem    --gat-space-6 3rem

Komponenten-Maße (4):
  --gat-radius-sm     0.25rem  Kleine Rundung — Buttons, Badges
  --gat-radius-md     0.5rem   Karten-Rundung
  --gat-border-width  2px      Standard-Strichstärke
  --gat-container-max 72rem    Maximale Inhaltsbreite

Breakpoints (2 — NUR Dokumentation, @media kann kein var() lesen):
  --gat-breakpoint-sm  36rem
  --gat-breakpoint-md  48rem

=== Die 22 .gat-*-Klassen (vollständig — jede als gerendertes Beispiel) ===

Layout (5):
  .gat-container  Zentrierter Container, max-width 72rem, seitliches Padding
  .gat-grid       Responsives auto-fit/minmax-Raster, bricht ohne @media um
  .gat-grid--2    Feste 2-Spalten-Variante (< 36rem -> 1 Spalte)
  .gat-grid--3    Feste 3-Spalten-Variante (< 36rem -> 1 Spalte)
  .gat-section    Vertikaler Block mit CD-Abstandsrhythmus (padding-block space-6)

Header / Navigation (6 + Modifier --active) — erwartete Struktur:
  <header class="gat-header">
    <div class="gat-header__inner">
      <a class="gat-header__logo"><span class="gat-header__logo-mark"></span></a>
      <nav class="gat-nav">
        <a class="gat-nav__link gat-nav__link--active" href="#...">...</a>
        <a class="gat-nav__link" href="#...">...</a>
      </nav>
    </div>
  </header>
  .gat-header__logo-mark referenziert assets/gruene-logo.svg relativ und färbt
  das SVG per CSS-Maske auf Weiß — unverändert nutzen, NICHT inline einfügen.

Typografie (4 — setzen nur Schrift + color, keine Tag-Defaults):
  .gat-headline    <h_ class="gat-headline">    Barlow Black 900
  .gat-subline     <p class="gat-subline">      Barlow Semibold 600
  .gat-fliesstext  <p class="gat-fliesstext">   Barlow Regular 400, Leading 1,3
  .gat-emphasis    <em class="gat-emphasis">    Vollkorn Black-Kursiv

Buttons (3 — Basis + Pflicht-Modifier):
  .gat-btn .gat-btn--primary    <a class="gat-btn gat-btn--primary">
  .gat-btn .gat-btn--secondary  <a class="gat-btn gat-btn--secondary">

Karten (4 Block/Modifier + 2 Element-Klassen) — Basis IMMER mit Variante:
  <article class="gat-card gat-card--primary">
    <h3 class="gat-card__title">...</h3>
    <p  class="gat-card__body">...</p>
  </article>
  .gat-card  .gat-card--primary  .gat-card--secondary
  .gat-card__title  .gat-card__body
  WARNUNG: .gat-card ohne Varianten-Modifier rendert „kaputt" (transparenter
  Grund) — jede Karte im Guide mit --primary oder --secondary zeigen.

CD-Gestaltungselemente (5):
  .gat-underline           <span class="gat-underline">   Magenta-Unterstreichung
  .gat-highlight           <mark class="gat-highlight">    gelbe Marker-Fläche
  .gat-stoerer .gat-stoerer--gelb     <span ...>  gedrehtes Badge, gelb/Anthrazit
  .gat-stoerer .gat-stoerer--magenta  <span ...>  gedrehtes Badge, magenta/weiß

=== Asset (read-only) ===
assets/gruene-logo.svg : monochrom #2d793c, viewBox 0 0 150.32 132.07.

=== D-1: maschinenlesbarer Spec-Block — Ziel-JSON-Form ===
<script type="application/json" id="gat-design-spec">
{
  "name": "Grüne AT Design System",
  "version": "1.0",
  "stylesheet": "https://grueneat.github.io/design-system/design-system.css",
  "license": "CC BY 4.0",
  "tokens": {
    "color":   { "--gat-color-dunkelgruen": { "value": "#257639",
                 "role": "primitive", "usage": "Primäre Markenfarbe" }, ... },
    "font":    { ... }, "text": { ... }, "leading": { ... },
    "space":   { ... }, "size": { ... }
  },
  "components": {
    "gat-btn": { "purpose": "Basis-Button",
                 "modifiers": ["gat-btn--primary","gat-btn--secondary"],
                 "requires": "ein Modifier ist Pflicht",
                 "markup": "<a class=\"gat-btn gat-btn--primary\">...</a>" },
    ...
  },
  "rules": [
    "Typografie steht immer auf grüner Fläche (CD-Grundregel).",
    "Komponenten-Selektoren sind flach, einklassig, .gat--präfixiert.",
    "Keine nackten Tag-Selektoren — fremdes Markup darf nicht umgestylt werden.",
    "Jeder Komponentenwert verweist auf ein --gat--Token.",
    ".gat-card wird nie ohne Varianten-Modifier verwendet.",
    "Weiß-Text wird nie auf Hellgrün/Gelb gepaart (Kontrast)."
  ]
}
</script>
</interfaces>

<call_sites>
Searched: `index.html`, `design-system.css`, `pages.yml`.
Surfaces grepped: `.github/workflows/`, Repo-Root.

Found:
- .github/workflows/pages.yml — deployt `index.html` aus Repo-Root
  (`path: '.'`, Trigger Push auf `main`) — OUT OF SCOPE: kein Workflow-Change
  nötig, der Plan ändert nur `index.html`.

Dieses Issue führt keinen neuen CLI-Flag/Command/Script ein — keine weiteren
Call-Sites.
</call_sites>

Key files:
@design-system/index.html — DAS einzige Schreibziel; aktuell Skelett aus #2.
@design-system/design-system.css — read-only; gesamte Inventur ist oben in
  `<interfaces>` inlined, muss nicht erneut gelesen werden.
@design-system/assets/gruene-logo.svg — read-only; vom Header per CSS-Maske
  konsumiert.
</context>

<commit_format>
Format: conventional mit Issue-Prefix (`.issues/config.yaml`: format
conventional, prefix true; branch `issue/5`).
Pattern: {source-id}: {type}({scope}): {description}
Beispiel: 5: feat(style-guide): Farb- und Typografie-Abschnitte ergänzen
Typen: feat, fix, docs, chore. Keine Tool-Attribution im Commit.
</commit_format>

<tasks>

<task type="auto">
  <name>Task 1: Seitengerüst, inline doc-Style und Anchor-TOC-Header</name>
  <files>design-system/index.html</files>
  <action>
  Ersetze den Inhalt der bestehenden `index.html` (Skelett aus #2) durch das
  Grundgerüst des Style Guides. Behalte `<!DOCTYPE html>`, `<html lang="de">`,
  `<meta charset="UTF-8">`, `<meta name="viewport" ...>`, `<title>Grüne AT
  Design System</title>` und `<link rel="stylesheet" href="design-system.css">`.

  Füge im `<head>`, NACH dem CSS-Link, einen inline `<style>`-Block ein (D-2 —
  ausschließlich Doc-Chrome, alle Klassen mit `doc-`-Präfix). Dieser Block
  enthält MINDESTENS:
  - `html { scroll-behavior: smooth; }`
  - `body` Grundlayout: Hintergrund (`--gat-color-surface`), Standard-Textfarbe
    (`--gat-color-text`), `margin: 0`. `design-system.css` setzt KEINE
    Tag-Defaults — ohne diese Regel rendert die Seite in Serifenschrift ohne
    Spacing (siehe RESEARCH „Ungestyltes Doc-Grundgerüst").
  - `[id] { scroll-margin-top: ... }` (oder eine `doc-anchor`-Klasse) auf den
    Abschnitts-`id`s, damit der Anker-Sprung die Überschrift nicht hinter dem
    Header versteckt.
  - `doc-`-Klassen für: Swatch-Kachel + Swatch-Fläche (`doc-swatch`,
    `doc-swatch__chip`, `doc-swatch__meta`), Code-Block (`doc-code` —
    Monospace, dezenter Hintergrund, `white-space: pre`, `overflow-x: auto`),
    Komponenten-Demo-Wrapper (`doc-demo` — rahmt live-Beispiel + Code-Block),
    Do/Don't-Raster (`doc-dodont`, `doc-dodont--do`, `doc-dodont--dont`),
    Spacing-Balken (`doc-spacebar`), CD-Layout-Diagramm (`doc-diagram`).
  Doc-Chrome-Werte dürfen `var(--gat-*)`-Tokens referenzieren (das Stylesheet
  ist eingebunden). KEINE `gat-`-Klasse in diesem `<style>` neu definieren oder
  überschreiben.

  Direkt nach `<body>`: den Seitenkopf mit den ECHTEN `gat-`-Klassen bauen
  (Dogfooding) — `<header class="gat-header">` > `<div class="gat-header__inner">`
  mit `<a class="gat-header__logo" href="#top"><span
  class="gat-header__logo-mark"></span></a>` und `<nav class="gat-nav">`. Die
  Nav IST der Anchor-TOC: je ein `<a class="gat-nav__link" href="#...">` pro
  Abschnitt — `#farben`, `#typografie`, `#layout`, `#komponenten`, `#cd-layout`,
  `#spezifikation`. Der erste Link trägt zusätzlich `gat-nav__link--active`.

  Lege die sechs leeren Abschnitts-Container an (in dieser Reihenfolge), jeweils
  `<section class="gat-section" id="...">` mit `<div class="gat-container">`
  innen und einer `gat-`-Typo-Überschrift — die Tasks 2-6 füllen sie. Schließe
  mit `<footer class="gat-section">` (Inhalt in Task 6). Logo NICHT inline
  einfügen — `.gat-header__logo-mark` lädt `assets/gruene-logo.svg` per CSS.
  Durchgängig deutschsprachig.
  </action>
  <verify>
  <automated>python3 -c "import html.parser,sys; h=open('/workspace/design-system/index.html',encoding='utf-8').read(); P=html.parser.HTMLParser; \
import re; \
assert 'design-system.css' in h, 'CSS-Link fehlt'; \
assert h.count('<style')==1 and '<script' not in h.replace('application/json','') or True; \
[print('anchor', a, a in h) or sys.exit(1) for a in ['id=\"farben\"','id=\"typografie\"','id=\"layout\"','id=\"komponenten\"','id=\"cd-layout\"','id=\"spezifikation\"'] if a not in h]; \
assert 'gat-header' in h and 'gat-nav__link' in h, 'Header/TOC fehlt'; \
print('OK Task1')"</automated>
  </verify>
  <done>
  - `index.html` enthält genau einen inline `<style>`-Block, ausschließlich mit
    `doc-`-präfixierten Klassen plus `html`/`body`/`[id]`-Regeln.
  - `<header class="gat-header">` mit `gat-nav` als Anchor-TOC; sechs
    `gat-nav__link` zeigen auf die sechs Abschnitts-`id`s.
  - Sechs leere `<section class="gat-section">` mit den `id`s `farben`,
    `typografie`, `layout`, `komponenten`, `cd-layout`, `spezifikation` plus ein
    `<footer>` existieren.
  - Datei ist wohlgeformtes HTML (balancierte Tags), `lang="de"`.
  </done>
</task>

<task type="auto">
  <name>Task 2: Abschnitt Farben — alle 14 Farb-Tokens als Swatches</name>
  <files>design-system/index.html</files>
  <action>
  Fülle `<section id="farben">`. Dokumentiere ALLE 14 Farb-Tokens aus
  `<interfaces>`: 4 Primitive, 2 Neutrals, 8 semantische Aliase. Gruppiere in
  drei Unterblöcken mit `gat-`-Typo-Überschriften („Primitive", „Neutrals",
  „Semantische Aliase").

  Jeder Token wird als Swatch-Kachel (`doc-swatch`) gezeigt: eine Farbfläche
  (`doc-swatch__chip`, Hintergrund via `var(--gat-color-...)` — also der echte
  Token-Wert), darunter `doc-swatch__meta` mit Token-Name (in `doc-code`),
  HEX-Wert und Verwendungszweck-Text. Bei Aliasen zusätzlich angeben, auf
  welches Primitive sie verweisen. Bei `--gat-color-on-primary` und
  `--gat-color-on-secondary` die Kontrast-Notiz nennen (5,63:1 bzw. 6,09:1) und
  das Beispiel kontrastrichtig paaren (siehe RESEARCH „Kontrast-Fehlpaarung":
  weißer Text NUR auf Dunkelgrün, Anthrazit auf Hellgrün/Gelb).

  Ordne die Swatches in einem responsiven Raster an — `<div class="gat-grid">`
  (Dogfooding der Layout-Komponente), die Swatch-Kacheln sind die Rasterkinder.
  Werte 1:1 aus `<interfaces>` übernehmen. Deutschsprachig.
  </action>
  <verify>
  <automated>python3 -c "h=open('/workspace/design-system/index.html',encoding='utf-8').read(); \
toks=['--gat-color-dunkelgruen','--gat-color-hellgruen','--gat-color-gelb','--gat-color-magenta','--gat-color-weiss','--gat-color-anthrazit','--gat-color-primary','--gat-color-secondary','--gat-color-accent','--gat-color-highlight','--gat-color-text','--gat-color-surface','--gat-color-on-primary','--gat-color-on-secondary']; \
missing=[t for t in toks if t not in h]; \
assert not missing, missing; \
assert '#257639' in h and '#e6007e' in h, 'HEX fehlt'; \
print('OK Task2 — 14 Farb-Tokens')"</automated>
  </verify>
  <done>
  - Alle 14 Farb-Tokens erscheinen namentlich im Abschnitt `#farben`.
  - Jeder Token hat eine sichtbare Farbfläche, HEX-Wert und Verwendungszweck.
  - `on-primary`/`on-secondary` tragen die Kontrast-Notiz; kein Beispiel paart
    weißen Text auf Hellgrün/Gelb.
  - Das Swatch-Raster nutzt `gat-grid` (echte Komponente).
  </done>
</task>

<task type="auto">
  <name>Task 3: Abschnitt Typografie — Schrift, Größenskala, Zeilenabstände</name>
  <files>design-system/index.html</files>
  <action>
  Fülle `<section id="typografie">`. Dokumentiere ALLE 11 Typografie-Tokens:
  3 Schrift-Tokens, 6 Typo-Größen, 2 Zeilenabstände (aus `<interfaces>`).

  Schrift-Tokens: pro Token (`--gat-font-headline`, `--gat-font-copy`,
  `--gat-font-emphasis`) ein Live-Beispielsatz, gerendert in der jeweiligen
  Schrift, plus Token-Name und Font-Stack-Wert.

  Typo-Größen: zeige `.gat-headline`, `.gat-subline`, `.gat-fliesstext`,
  `.gat-emphasis` als live gerenderte Beispiele (echte Klassen, Dogfooding) —
  je ein deutscher Beispielsatz. Zusätzlich die 6 Größen-Tokens
  (`--gat-text-h1` … `--gat-text-small`) als Specimen-Reihe mit Token-Name +
  rem-Wert + Pixel-Hinweis sichtbar machen.

  Zeilenabstände: `--gat-leading-headline` (0,9) und `--gat-leading-copy` (1,3)
  mit kurzer Erklärung und je einem mehrzeiligen Beispiel, das den Unterschied
  zeigt. Markup-Code-Blöcke (`doc-code`, HTML-escaped) für die Typo-Klassen
  beifügen. Deutschsprachig.
  </action>
  <verify>
  <automated>python3 -c "h=open('/workspace/design-system/index.html',encoding='utf-8').read(); \
toks=['--gat-font-headline','--gat-font-copy','--gat-font-emphasis','--gat-text-h1','--gat-text-h2','--gat-text-h3','--gat-text-subline','--gat-text-copy','--gat-text-small','--gat-leading-headline','--gat-leading-copy']; \
cls=['gat-headline','gat-subline','gat-fliesstext','gat-emphasis']; \
m=[x for x in toks+cls if x not in h]; \
assert not m, m; print('OK Task3 — 11 Typo-Tokens + 4 Typo-Klassen')"</automated>
  </verify>
  <done>
  - Alle 11 Typografie-Tokens erscheinen namentlich im Abschnitt `#typografie`.
  - `gat-headline`, `gat-subline`, `gat-fliesstext`, `gat-emphasis` sind als
    live gerenderte Beispiele vorhanden.
  - Die 6 Größen-Tokens stehen als Specimen-Reihe mit rem-Werten.
  - Zeilenabstands-Tokens sind mit Beispiel erklärt.
  </done>
</task>

<task type="auto">
  <name>Task 4: Abschnitt Layout — Container, Raster, Section, Abstände, Maße</name>
  <files>design-system/index.html</files>
  <action>
  Fülle `<section id="layout">`. Dokumentiere die 5 Layout-Klassen plus die
  Abstands-, Komponenten-Maß- und Breakpoint-Tokens.

  Layout-Klassen: `.gat-container`, `.gat-grid`, `.gat-grid--2`, `.gat-grid--3`,
  `.gat-section` — jeweils kurz erklärt und, wo sinnvoll, als gerendertes
  Beispiel. `gat-grid` / `--2` / `--3` mit je einem kleinen Demo-Raster (z. B.
  nummerierte Platzhalter-Blöcke) zeigen, dass die Spaltenzahl variiert und
  ohne `@media` umbricht. Markup je in einem `doc-code`-Block.

  Abstände: die 6 `--gat-space-*`-Tokens (0.25rem … 3rem) als Balken-Demo —
  pro Token ein Balken (`doc-spacebar`), dessen Breite/Höhe dem Token-Wert
  entspricht, plus Name und Wert.

  Komponenten-Maße: `--gat-radius-sm`, `--gat-radius-md`, `--gat-border-width`,
  `--gat-container-max` als Tabelle/Liste mit Wert und Verwendungszweck;
  Rundungen optional als kleines visuelles Beispiel.

  Breakpoints: `--gat-breakpoint-sm` (36rem) und `--gat-breakpoint-md` (48rem)
  als reine Doku-Notiz dokumentieren — mit dem Hinweis, dass `@media` kein
  `var()` lesen kann und diese Tokens daher nur dokumentarisch sind.
  Deutschsprachig.
  </action>
  <verify>
  <automated>python3 -c "h=open('/workspace/design-system/index.html',encoding='utf-8').read(); \
toks=['--gat-space-1','--gat-space-2','--gat-space-3','--gat-space-4','--gat-space-5','--gat-space-6','--gat-radius-sm','--gat-radius-md','--gat-border-width','--gat-container-max','--gat-breakpoint-sm','--gat-breakpoint-md']; \
cls=['gat-container','gat-grid','gat-grid--2','gat-grid--3','gat-section']; \
m=[x for x in toks+cls if x not in h]; \
assert not m, m; print('OK Task4 — 12 Tokens + 5 Layout-Klassen')"</automated>
  </verify>
  <done>
  - Alle 6 `--gat-space-*`-Tokens als Balken-Demo, alle 4 Komponenten-Maß-Tokens
    und beide Breakpoint-Tokens erscheinen im Abschnitt `#layout`.
  - Die 5 Layout-Klassen sind dokumentiert; `gat-grid`/`--2`/`--3` haben ein
    gerendertes Demo-Raster.
  - Breakpoints tragen den „@media kann kein var()"-Hinweis.
  </done>
</task>

<task type="auto">
  <name>Task 5: Abschnitt Komponenten — Header/Nav, Buttons, Karten, CD-Elemente</name>
  <files>design-system/index.html</files>
  <action>
  Fülle `<section id="komponenten">`. Zeige ALLE verbleibenden 13
  `gat-`-Komponenten-Klassen (Header/Nav 6 + Modifier, Buttons 3, Karten 4+2
  Element, CD-Elemente 5) — jede als LIVE gerendertes Beispiel PLUS Markup in
  einem `doc-code`-Block. Pro Komponente ein `doc-demo`-Wrapper: oben das echte
  gerenderte Element, darunter der HTML-escapte Markup-Quelltext (`&lt;`/`&gt;`).

  Header / Navigation: erkläre, dass der Seitenkopf oben auf der Seite (aus
  Task 1) bereits das Live-Beispiel für `.gat-header`, `.gat-header__inner`,
  `.gat-header__logo`, `.gat-header__logo-mark`, `.gat-nav`, `.gat-nav__link`
  und `.gat-nav__link--active` IST — verweise darauf und zeige den
  Markup-Block. Damit gelten diese 7 Klassen als dokumentiert.

  Buttons: `.gat-btn .gat-btn--primary` und `.gat-btn .gat-btn--secondary` als
  `<a>`-Elemente gerendert; Hinweis auf den `:hover`/`:focus`-Zustand (gelbe
  Unterstreichung bzw. Füllung) als Text — kein JS. Hinweis, dass `.gat-btn`
  nie ohne Modifier verwendet wird.

  Karten: `.gat-card gat-card--primary` und `.gat-card gat-card--secondary`,
  jeweils mit `.gat-card__title` und `.gat-card__body`. WARNUNG umsetzen: jede
  Karte trägt einen Varianten-Modifier — niemals nacktes `.gat-card`.
  Kontrastrichtig: `--primary` -> weißer Text, `--secondary` -> Anthrazit.

  CD-Elemente: `.gat-underline` (`<span>`), `.gat-highlight` (`<mark>`),
  `.gat-stoerer .gat-stoerer--gelb` und `.gat-stoerer .gat-stoerer--magenta`
  (`<span>`) — je inline in einem Beispielsatz gerendert.

  Optional ein `doc-dodont`-Do/Don't-Raster für die häufigsten Fehlpaarungen
  (z. B. `.gat-card` ohne Variante; weißer Text auf Hellgrün). Deutschsprachig.
  </action>
  <verify>
  <automated>python3 -c "h=open('/workspace/design-system/index.html',encoding='utf-8').read(); \
cls=['gat-header','gat-header__inner','gat-header__logo','gat-header__logo-mark','gat-nav','gat-nav__link','gat-nav__link--active','gat-btn','gat-btn--primary','gat-btn--secondary','gat-card','gat-card--primary','gat-card--secondary','gat-card__title','gat-card__body','gat-underline','gat-highlight','gat-stoerer','gat-stoerer--gelb','gat-stoerer--magenta']; \
m=[c for c in cls if c not in h]; \
assert not m, m; \
assert '&lt;' in h and '&gt;' in h, 'Markup-Code-Block nicht HTML-escaped'; \
print('OK Task5 — alle Komponenten-Klassen')"</automated>
  </verify>
  <done>
  - Alle 22 `.gat-*`-Klassen erscheinen jetzt insgesamt im Dokument (7
    Header/Nav, 5 Layout aus Task 4, 4 Typo aus Task 3, 3 Button, 6 Karte, 5
    CD-Element — Doppelnennung erlaubt).
  - Jede Komponente in `#komponenten` hat ein live gerendertes Beispiel und
    einen HTML-escapten Markup-Code-Block.
  - Keine Karte ohne Varianten-Modifier; keine kontrastwidrige Paarung.
  </done>
</task>

<task type="auto">
  <name>Task 6: CD-Layout-Prinzipien, JSON-Spec, Footer und Schlussprüfung</name>
  <files>design-system/index.html</files>
  <action>
  Fülle `<section id="cd-layout">`, `<section id="spezifikation">` und den
  `<footer>`.

  CD-Layout-Prinzipien (`#cd-layout`): erkläre als Fließtext + einfache
  CSS-Diagramme (`doc-diagram` — KEIN Bild-Asset):
  - Schutzzone M = 0,06 × kurze Kante des Mediums.
  - Logo-Größe = 3×M (Print) bzw. 2,5×M (Digital).
  - Textabstand: Headline↔Subline = Headline↔Copy = X × 2.
  - „Typografie steht immer auf grüner Fläche" — die CD-Grundregel.
  Hinweis aufnehmen, dass für M und das Logo-Verhältnis bewusst KEIN
  `--gat-*`-Token existiert (nur CSS-Kommentar) — daher als Prinzip, nicht als
  Token-Tabelle dokumentiert.

  Maschinenlesbare Spezifikation (`#spezifikation`, D-1): zuerst eine
  menschenlesbare deutsche Einleitung — was der Block enthält und dass LLMs ihn
  als geschlossene Spezifikation lesen können. Dann der EINGEBETTETE
  `<script type="application/json" id="gat-design-spec">`-Block in der Form aus
  `<interfaces>`. Der Block MUSS lückenlos sein:
  - `tokens`: ALLE 22 Tokens, gruppiert color/font/text/leading/space/size —
    je Token `value`, `role`, `usage` (bei Aliasen `role` „alias" + Verweis).
  - `components`: ALLE 22 `gat-`-Klassen — je Eintrag `purpose`, `modifiers`,
    `requires`, `markup`.
  - `rules`: die geschlossene Regelliste aus `<interfaces>`.
  WICHTIG (RESEARCH „Maschinenlesbarer Block bricht das Markup"): der Inhalt
  muss valides JSON sein; jede literale `</script`-Sequenz im JSON zu
  `<\/script` brechen; Anführungszeichen in `markup`-Strings als `\"`. Dies ist
  der EINZIGE erlaubte `<script>` — kein ausführbares JavaScript auf der Seite.

  Footer: `<footer class="gat-section">` mit Lizenz „CC BY 4.0" und kanonischer
  URL `grueneat.github.io/design-system/`. KEINE Tool-Attribution, kein „claude"
  o. ä. im Markup.

  Schlussprüfung in der Datei: stelle sicher, dass das Dokument wohlgeformt ist
  und der JSON-Block valide JSON enthält.
  </action>
  <verify>
  <automated>python3 -c "
import re,json,sys
h=open('/workspace/design-system/index.html',encoding='utf-8').read()
# wohlgeformtes HTML (balancierte Tags)
from html.parser import HTMLParser
VOID={'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
class B(HTMLParser):
  def __init__(s): super().__init__(); s.st=[]; s.bad=False
  def handle_starttag(s,t,a):
    if t not in VOID: s.st.append(t)
  def handle_endtag(s,t):
    if t in VOID: return
    if s.st and s.st[-1]==t: s.st.pop()
    elif t in s.st:
      while s.st and s.st.pop()!=t: pass
    else: s.bad=True
b=B(); b.feed(h)
assert not b.bad and not b.st, 'HTML-Tags unbalanciert'
# genau ein <script>, und dieses ist application/json (kein JS-Logik)
scripts=re.findall(r'<script([^>]*)>(.*?)</script>',h,re.S|re.I)
assert len(scripts)==1, ('Erwartet genau 1 <script>, gefunden %d'%len(scripts))
attrs,body=scripts[0]
assert 'application/json' in attrs, 'Der <script> ist nicht type=application/json'
json.loads(body)  # valides JSON oder Exception
# CSS verlinkt, kein zweites Stylesheet aus dem Netz
assert h.count('design-system.css')>=1
print('OK Task6 — wohlgeformtes HTML, valides JSON-Spec, kein ausfuehrbares JS')
"</automated>
  </verify>
  <done>
  - `#cd-layout` erklärt Schutzzone M (0,06 × kurze Kante), Logo-Verhältnis
    (3×M / 2,5×M), Textabstand X×2 und „Typografie immer auf Grün".
  - `#spezifikation` enthält genau einen `<script type="application/json">`-Block
    mit validem JSON: alle 22 Tokens, alle 22 Komponenten, die Regelliste.
  - Auf der Seite existiert KEIN `<script>` mit ausführbarer Logik.
  - Footer nennt Lizenz CC BY 4.0 und kanonische URL, ohne Tool-Attribution.
  - `index.html` ist wohlgeformtes HTML.
  </done>
</task>

</tasks>

<verification>
Nach allen Tasks gegen `/workspace/design-system/index.html` ausführen:

1. Wohlgeformtes HTML (balancierte Tags) und genau ein `<script>`, dieser
   `type="application/json"` mit validem JSON — der Task-6-Verify-Block deckt das ab.

2. Lückenlosigkeit der Token-/Klassen-Abdeckung — jeder `--gat-*`-Token und
   jede `.gat-*`-Klasse aus `design-system.css` kommt im Guide vor:
   ```bash
   python3 - <<'PY'
   import re
   css=open('/workspace/design-system/design-system.css',encoding='utf-8').read()
   h=open('/workspace/design-system/index.html',encoding='utf-8').read()
   toks=sorted(set(re.findall(r'--gat-[a-z0-9-]+',css)))
   cls=sorted(set(re.findall(r'\.(gat-[a-z0-9_-]+)',css)))
   mt=[t for t in toks if t not in h]
   mc=[c for c in cls if c not in h]
   assert not mt, ('Fehlende Tokens: %s'%mt)
   assert not mc, ('Fehlende Klassen: %s'%mc)
   print('OK — %d Tokens + %d Klassen vollstaendig dokumentiert'%(len(toks),len(cls)))
   PY
   ```

3. Dogfooding: `index.html` verlinkt `design-system.css` und nutzt echte
   `gat-`-Klassen (`gat-header`, `gat-section`, `gat-grid` u. a.).

4. Kein JavaScript: der einzige `<script>` ist der `application/json`-Datenblock.

5. GitHub-Pages: keine Aktion nötig — `pages.yml` (`path: '.'`) deployt
   `index.html` bei Push auf `main`.
</verification>

<success_criteria>
Bildet die Akzeptanzkriterien aus ISSUE.md 1:1 ab:
- AK „zeigt alle Farben, Typografie-Stufen und Komponenten mit gerenderten
  Beispielen" → Tasks 2-5: alle 14 Farb-Tokens, alle 11 Typo-Tokens, alle 22
  `gat-`-Klassen als Live-Beispiel; Verifikationsschritt 2 prüft Lückenlosigkeit.
- AK „verwendet selbst das `design-system.css` (Dogfooding)" → Task 1 verlinkt
  das CSS; Kopf, TOC, Raster und Komponentenbeispiele nutzen echte
  `gat-`-Klassen (Verifikationsschritt 3).
- AK „maschinenlesbarer Spezifikationsteil (geschlossenes Vokabular, Regeln)" →
  Task 6: eingebetteter `<script type="application/json">`-Block mit allen 22
  Tokens, allen 22 Komponenten und der Regelliste (D-1).
- AK „über GitHub Pages erreichbar" → bestehender `pages.yml`-Workflow deployt
  `index.html` aus dem Repo-Root; kein Workflow-Change nötig.
- Decision D-1 erfüllt (Task 6 — eingebetteter JSON-Block, kein separates File).
- Decision D-2 erfüllt (Task 1 — inline `<style>` mit `doc-`-Präfix).
- Deferred eingehalten: keine Querverlinkung zum persönlichen System / kein
  Integrations-Leitfaden; `design-system.css` und `assets/` unverändert.
</success_criteria>
