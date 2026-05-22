# Context — Design-Tokens aus dem Grüne-AT Corporate Design

Discuss-Phase, festgehalten 2026-05-22.

## Entschiedene Fragen

### D-1 — Schriften: nur freier Ersatz
Gotham Narrow (Ultra/Book) ist kommerziell und nicht frei web-hostbar. Der
Token enthält **kein Gotham** — durchgängig eine **freie Schrift**. Die konkrete
freie Schrift (geometrisch/schmal, mit schwerer „Ultra"-fähiger Strichstärke)
wird in der Research-Phase aus Kandidaten gewählt und dem User zur Bestätigung
vorgelegt.

Vollkorn (Hervorhebungen in Headlines & Zitate) ist bereits frei über Google
Fonts verfügbar und bleibt unverändert.

### D-2 — Minimale Neutraltöne definieren
Der CD-Quickguide definiert nur die 4 Markenfarben, keine Text-/Hintergrund-
Neutraltöne. Es werden **minimale Neutrals** als Tokens ergänzt: Weiß + ein
dunkler Textton. Diese sind im CSS klar als **Web-Ergänzung** (nicht aus dem
CD-PDF) zu kommentieren.

### D-3 — Web-Typo-Skala definieren
Das PDF gibt nur Zeilenabstands-Faktoren (×0,9 Headline, ×1,3 Fließtext) und
relationale Abstände (X×2); die absolute Größentabelle (S. 38) ist nicht im
Quickguide enthalten. Es wird eine **modulare Web-Typo-Skala in `rem`** als
Tokens definiert (Headline/Subline/Fließtext), zusätzlich zu den CD-Faktoren.
Die selbst gewählte Skala ist als Web-Ergänzung zu kommentieren.

### D-4 — Token-Prefix `--gat-`
Alle CSS Custom Properties bekommen den Prefix **`--gat-`**
(z. B. `--gat-color-dunkelgruen`). Kurz und kollisionssicher, da das Stylesheet
in fremde Tools eingebunden wird.

## Aus ISSUE.md übernommen
- Magenta: HEX `#e6007e` ist maßgeblich (PDF-RGB 225/0/120 ist inkonsistent).
- 4 Farben, Schrift-Rollen, Layout-/Logo-Verhältnisse: siehe ISSUE.md / das
  Memory `gruene-at-corporate-design`.

## Rahmen / Annahmen
- Reines CSS (Custom Properties), kein Build-Schritt.
- Tokens werden in `design-system.css` definiert (ersetzt den Platzhalter-
  `:root`-Block aus Issue #2).
- Komponenten/Anwendung der Tokens sind Scope von Issue #4 — hier nur die
  Token-Definitionen.
- Skala/Neutrals, die über das PDF hinausgehen, werden im CSS als Web-Ergänzung
  kenntlich gemacht (Nachvollziehbarkeit gegenüber dem CD).

## Offene Punkte für Research
- Konkrete freie Ersatzschrift für Gotham Narrow auswählen (Kandidaten
  evaluieren, Verfügbarkeit auf Google Fonts, Gewichte inkl. sehr schwer für
  Headlines) → dem User zur Bestätigung vorlegen.
- Sinnvolle modulare Typo-Skala (Verhältnis, Basisgröße) festlegen.
- Token-Struktur: primitive Farb-Tokens vs. semantische Aliase.
