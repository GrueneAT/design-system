# Plan — Design-Tokens aus dem Grüne-AT Corporate Design

Basiert auf CONTEXT.md (D-1…D-4) und RESEARCH.md. Umsetzung im Worktree zu
Issue #3 (`grueneat/design-system`). Eine einzige Datei wird geändert:
`design-system.css` — der Platzhalter-`:root`-Block aus Issue #2 wird durch das
vollständige Token-Set ersetzt.

## Bestätigte Entscheidungen
- **Freie Schrift: Barlow Semi Condensed** (Headlines + Sublines/Copy).
  Vollkorn bleibt für Hervorhebungen/Zitate. Beide via Google Fonts.
- Token-Prefix `--gat-` (D-4); modulare Typo-Skala Basis 1rem / Ratio 1,25 (D-3);
  minimale Neutrals (D-2); Magenta-HEX `#e6007e` maßgeblich.

## Ausführungs-Hinweise für den Executor
- Normaler Worktree+Branch-Flow (Repo hat Commits — kein Bootstrap mehr).
- Commit-Format: Conventional Commits. **Keine KI-/Tool-Attribution.**
- Alle Kommentare in der CSS-Datei auf **Deutsch**.
- Werte, die **über das CD-PDF hinausgehen** (Neutrals, Typo-Skala, Abstands-
  Skala), im CSS klar als Kommentar „Web-Ergänzung, nicht im CD-Quickguide"
  kennzeichnen — Nachvollziehbarkeit gegenüber dem Corporate Design.
- Nur der `:root`-Block wird befüllt — **keine** Selektoren/Komponenten/Klassen
  (das ist Scope von Issue #4).

<task id="T1" title="Farb-Tokens (Primitive + Semantik)">
**Ziel:** Alle Farben als CSS Custom Properties im `:root`-Block von
`design-system.css`.

**Primitive (1:1 aus dem CD-Quickguide):**
- `--gat-color-dunkelgruen: #257639;`
- `--gat-color-hellgruen: #56af31;`
- `--gat-color-gelb: #ffed00;`
- `--gat-color-magenta: #e6007e;`  /* HEX maßgeblich, vgl. CONTEXT D-1 */

**Neutrals (Web-Ergänzung, D-2 — als solche kommentieren):**
- `--gat-color-weiss: #ffffff;`
- `--gat-color-anthrazit: #1d1d1b;`  /* dunkler Textton */

**Semantische Aliase (verweisen auf Primitive via `var()`):**
- `--gat-color-primary` → dunkelgruen
- `--gat-color-secondary` → hellgruen
- `--gat-color-accent` → magenta
- `--gat-color-highlight` → gelb
- `--gat-color-text` → anthrazit
- `--gat-color-surface` → weiss
- `--gat-color-on-primary` → weiss   /* Text auf Dunkelgrün */
- `--gat-color-on-secondary` → anthrazit  /* Text auf Hellgrün — siehe T5-Kontrastprüfung */

**Verifikation:** Alle 10 Primitive/Neutral- + 8 semantischen Tokens vorhanden;
semantische Aliase nutzen `var(--gat-color-…)`; Neutrals als Web-Ergänzung
kommentiert.
</task>

<task id="T2" title="Schrift-Tokens (Font-Stacks)">
**Ziel:** Font-Family-Tokens als Stacks.

- `--gat-font-headline: 'Barlow Semi Condensed', sans-serif;`
- `--gat-font-copy: 'Barlow Semi Condensed', sans-serif;`
- `--gat-font-emphasis: 'Vollkorn', serif;`  /* Hervorhebungen/Zitate */

Kommentar: CD-Rollen (Gotham Narrow Ultra = Headline, Gotham Narrow Book =
Copy) — durch Barlow Semi Condensed ersetzt (Gotham kommerziell, CONTEXT D-1);
Gewichtung (Black für Headlines, Regular für Copy) erfolgt in Issue #4.

**Verifikation:** Drei Font-Tokens vorhanden, jeweils mit generischem Fallback;
Ersatz-Begründung kommentiert.
</task>

<task id="T3" title="Typo-Größen, Zeilenabstände, Abstände">
**Ziel:** Typo-Skala und Abstands-Skala als Tokens.

**Typo-Größen (Web-Ergänzung, modulare Skala Basis 1rem / Ratio 1,25 — D-3):**
- `--gat-text-h1: 2.441rem;`
- `--gat-text-h2: 1.953rem;`
- `--gat-text-h3: 1.563rem;`
- `--gat-text-subline: 1.25rem;`
- `--gat-text-copy: 1rem;`
- `--gat-text-small: 0.8rem;`

**Zeilenabstände (einheitslos, direkt aus dem CD):**
- `--gat-leading-headline: 0.9;`  /* CD: Headline-ZA = Größe × 0,9 */
- `--gat-leading-copy: 1.3;`      /* CD: Fließtext-ZA = Größe × 1,3 */

**Abstands-Skala (Web-Ergänzung, Basis 0.25rem):**
- `--gat-space-1: 0.25rem;` … `--gat-space-6: 3rem;`
  (Stufen z. B. 0.25 / 0.5 / 1 / 1.5 / 2 / 3rem)

**Layout-/Logo-Verhältnisse (nur als dokumentierende Kommentare im `:root`,
keine festen px — formatabhängig):** CD: Schutzzone M = 0,06 × kurze Kante;
Logo = 3×M (Print) / 2,5×M (Digital); CD-Textabstand HL↔SL = HL↔Copy = X×2.

**Verifikation:** 6 Größen-, 2 Zeilenabstands-, ≥6 Abstands-Tokens vorhanden;
Web-Ergänzungen kommentiert; Layout-Verhältnisse als Kommentar dokumentiert.
</task>

<task id="T4" title="Datei-Header aktualisieren">
**Ziel:** Der Datei-Header von `design-system.css` (aus Issue #2) spiegelt den
neuen Stand.

- Den Hinweis „Tokens folgen in Issue #3" entfernen/anpassen.
- Kurz ergänzen: Token-Vokabular mit Prefix `--gat-`; Komponenten folgen in
  Issue #4. Lizenz-/URL-Zeilen aus Issue #2 bleiben erhalten.

**Verifikation:** Header nennt keine offene „Tokens folgen"-Aussage mehr und
ist zum Inhalt konsistent.
</task>

<task id="T5" title="Validität, Kontrastprüfung, Commit">
**Ziel:** Tokens sind valide und barrierefrei sinnvoll; Änderung committet.

**Schritte:**
1. **CSS-Validität:** `design-system.css` muss syntaktisch fehlerfrei sein
   (keine offenen Blöcke, valide `var()`-Referenzen — jede referenzierte
   Variable existiert).
2. **Kontrastprüfung (WCAG):** Kontrastverhältnisse berechnen für
   - `anthrazit` auf `weiss` (Fließtext) — Ziel ≥ 4,5:1
   - `weiss` auf `dunkelgruen` (`on-primary`) — Ziel ≥ 4,5:1
   - `anthrazit` auf `hellgruen` (`on-secondary`) — Ziel ≥ 4,5:1
   Falls eine Kombination scheitert: den betroffenen `on-*`-Alias bzw.
   `anthrazit`-Wert anpassen, bis ≥ 4,5:1 erreicht ist, und die Anpassung in
   EXECUTION.md begründen. (Hintergrund: weiß auf Hellgrün fällt typischerweise
   durch — deshalb ist `on-secondary` bewusst auf `anthrazit` gelegt.)
3. **Commit** im Worktree: `feat: add design tokens from corporate design`
   (Conventional Commits, keine KI-Attribution).

**Verifikation:** CSS ist valide; alle drei Kontrastpaare ≥ 4,5:1 (oder
dokumentierte Anpassung); ein Commit auf dem Feature-Branch.
</task>

## Acceptance Criteria (aus ISSUE.md)
- [ ] Alle 4 Farben als CSS Custom Properties mit semantischen Namen. → T1
- [ ] Typografie-Tokens (Font-Familien, Zeilenabstands-Faktoren, Abstands-
      Skala) als Custom Properties. → T2, T3
- [ ] Layout-/Spacing-Tokens für Schutzzone und Logo-Verhältnis dokumentiert.
      → T3
- [ ] Font-Lizenz-/Fallback-Entscheidung dokumentiert und im CSS umgesetzt.
      → T2 (Barlow Semi Condensed statt Gotham, im CSS kommentiert)
- [ ] Tokens in `design-system.css` eingebunden und im Style Guide
      referenzierbar. → T1–T4 (Style-Guide-Anzeige selbst = Issue #5)
