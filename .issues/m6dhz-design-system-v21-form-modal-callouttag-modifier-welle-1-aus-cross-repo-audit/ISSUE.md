---
id: m6dhz
title: Design-System v2.1 — Form, Modal, Callout/Tag Modifier (Welle 1 aus Cross-Repo-Audit)
status: open
priority: high
labels:
- enhancement
- discovery
remote:
- source: github
  id: '13'
  url: https://github.com/GrueneAT/design-system/issues/13
---

DS-Welle 1 (v2.1). Triggered durch Cross-Repo-Audit (2026-05-23, 5 Repos parallel analysiert) — siehe `.issues/<this-slug>/notes/SYNTHESIS.md`. **Vier Komponentenfamilien**, die mehrfach (≥3 Repos) gewuenscht sind und das Designsystem heute nicht abdeckt. Gebuendelt als ein Release.

## Quellen

- `notes/SYNTHESIS.md` — Cross-Repo-Synthese mit Konvergenz-Matrix (Welle-1 = die top 4 Luecken).
- `notes/audits/{bildgenerator,Gemeindeordnung,gemeindefinanzen,personenwahl,vorlagen}.md` — Einzel-Audits je Repo.
- Vorlaeufer: `#11` (v2.0 Tailwind-Migration + entsaettigte Web-Schicht).

## Scope: vier Komponentenfamilien

### A. Form-Primitives — `.gat-input`-Familie

DS hat heute **keine** Formular-Komponenten. Vier Konsumenten (bildgenerator, Gemeindeordnung, gemeindefinanzen, personenwahl) brauchen identische Bausteine.

- `.gat-input` (text/number/url/email/tel/search/password/date)
- `.gat-select`
- `.gat-textarea`
- `.gat-checkbox` (+ Label-Layout)
- `.gat-radio` (+ Group-Wrapper)
- `.gat-range`
- `.gat-field` — Wrapper mit `__label` / `__hint` / `__error`
- States: default / hover / focus-visible / disabled / readonly / invalid

Neue Token (Web-Layer):
- `--gat-web-input-bg`, `--gat-web-input-border`, `--gat-web-input-border-focus`, `--gat-web-input-border-invalid`, `--gat-web-input-radius` (Alias auf `--gat-web-radius-input` falls vorhanden), `--gat-web-input-padding-x/-y`.

### B. Modal / Dialog — `.gat-modal`

Vier Konsumenten haben heute eigene Implementierungen (gemeindefinanzen `.mj-overlay`, `.doc-einwohner-dialog`; bildgenerator Modal; Gemeindeordnung Cmd-K + Overlay; vorlagen Lightbox 3× dupliziert).

- Basis: natives `<dialog>` plus opt-in `.gat-modal`-Klasse fuer Backdrop, Schatten, Radius, Innenabstand.
- Subelemente: `.gat-modal__head` / `__title` / `__close` / `__body` / `__actions` (Sticky-Footer).
- Backdrop via `::backdrop`-Pseudo plus opt-in `--blur`-Modifier.
- Esc-/Backdrop-close: empfohlenes Pattern in der Doku (kein DS-JS).
- Fokus-Trap: dokumentiertes Snippet in der Doku (kein DS-JS).
- HC-Variant kompatibel.

Tokens:
- `--gat-web-modal-bg` (= `--gat-web-surface`), `--gat-web-modal-backdrop` (= `rgba(31,38,28,.55)` o. ae.), `--gat-web-modal-shadow` (= `--gat-web-shadow-elevated`), `--gat-web-modal-radius` (= `--gat-web-radius-card`).

### C. Callout-Modifier — `.gat-callout--{info,warn,error,success,legal}`

`.gat-callout` existiert in v2.0 als Hinweis-Panel. Was fehlt: **semantische Modifier**.

- `.gat-callout--info` (heute Default-Stil, neu explizit)
- `.gat-callout--warn` (gelb-akzentuiert)
- `.gat-callout--error` / `--danger` (clay/rot-akzentuiert)
- `.gat-callout--success` (gruen-akzentuiert, dezent)
- `.gat-callout--legal` (grau-formal, fuer Disclaimer/Rechtshinweis)
- Optional Sub-Element `.gat-callout__icon` (Slot fuer SVG; DS liefert keine Icons — Konsument-Sache)

Tokens:
- `--gat-web-callout-info-bg/-border/-text`
- `--gat-web-callout-warn-bg/-border/-text`
- `--gat-web-callout-error-bg/-border/-text`
- `--gat-web-callout-success-bg/-border/-text`
- `--gat-web-callout-legal-bg/-border/-text`

### D. Tag-Modifier — `.gat-tag--{ok,warn,error,neutral,info}`

`.gat-tag` existiert in v2.0 (Pill/Badge). Was fehlt: **semantische Modifier** (drei Konsumenten haben Status-Pills lokal nachgebaut).

- `.gat-tag--ok` / `--success`
- `.gat-tag--warn`
- `.gat-tag--error` / `--danger`
- `.gat-tag--neutral` (Default in Grau)
- `.gat-tag--info`

Tokens: gleiche Familie wie Callout, aber kompaktere Padding/Schriftgroesse.

## Akzeptanzkriterien

- [ ] Source: `src/design-system.css` mit allen neuen Komponentenfamilien (A-D); jeweils in eigenen Abschnitten kommentiert.
- [ ] Build: `npm run build` produziert das gebaute `design-system.css`; `git diff --exit-code design-system.css` passt (per CI-Drift-Guard).
- [ ] HC-Variant: jede neue Komponente hat `gat-mode-hc:` Pendants fuer Farben und Borders.
- [ ] `index.html` Style-Guide: neue Section "Formulare", erweiterte "Callout"-Sektion mit Varianten, erweiterte "Tag"-Sektion mit Varianten, neue Section "Modal" mit funktionierendem `<dialog>`-Demo.
- [ ] `examples/minimal.html`: ein Form-Block + ein Callout-Variant + ein Modal-Demo eingebaut.
- [ ] CHANGELOG.md: `[2.1.0]`-Eintrag, gruppiert nach Added / Token-Notes / Migration.
- [ ] MIGRATION.md: Abschnitt "v2.0 → v2.1" mit additiver Hinweis (keine Breaking Changes).
- [ ] Akzeptanzkriterien aus den 4 Konsumenten-Audits sind als „covered by v2.1" markiert (Cross-Reference in Synthesis).
- [ ] Release `v2.1.0` getagged, GitHub Pages deployt neue CSS.
- [ ] Konsumenten-URL `https://grueneat.github.io/design-system/design-system.css` unveraendert.

## Constraints

- **Strikt additiv.** Keine Breaking Changes — alle v2.0-Token/Klassen bleiben unveraendert.
- **Kein Vendoring.**
- **Keine Werkzeug-Attribution.**
- **Konsumenten-URL stabil.**
- **Kein DS-JS-Modul** fuer Modal-/Form-Logik — Doku zeigt Patterns, Konsumenten implementieren Verhalten.

## Folgewellen (Tracking, nicht Teil dieses Issues)

Nach v2.1 kommen — basierend auf der Synthese:
- **v2.2**: `.gat-table`, `.gat-dropzone`, `.gat-toast`, `.gat-toolbar`
- **v2.3**: `.gat-chip`, `.gat-combobox`, `.gat-breadcrumb`, `.gat-prose`, `.gat-step-indicator`
- **v3.0 / optional**: `.gat-cmdk-modal`, `.gat-footer`, Print-Tokens, FAB, Tooltip

## Abhaengigkeit fuer App-Repos

Vier App-Repos (bildgenerator, Gemeindeordnung, personenwahl, vorlagen) haben Umbrella-Migrations-Issues, deren **Phase 2 (Voll-Migration)** auf diesem `v2.1.0`-Release wartet. Phase 0 (Quick-Wins) ist unabhaengig und kann parallel laufen.
