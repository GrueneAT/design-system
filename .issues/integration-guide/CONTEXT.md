# Context — Integrations-Leitfaden und Querverlinkung

Discuss-Phase, festgehalten 2026-05-22.

> **Scope-Änderung gegenüber ISSUE.md:** Der ursprüngliche Punkt
> „Querverlinkung persönliches ↔ org-System" entfällt (Entscheidung D-1).
> Statt eines Querverweises wird der bestehende Bezug **entfernt**. Der
> Issue-Titel bleibt, der Inhalt verschiebt sich entsprechend.

## Entschiedene Fragen

### D-1 — Kein Bezug zum persönlichen System; bestehende Verweise entfernen
`grueneat/design-system` ist ein **öffentliches Organisations-Repo**. Es soll
**keinen** Verweis auf das persönliche/private System des Maintainers
(`flomotlik.github.io/claude-code`, `flomotlik/claude-code`) enthalten.

Im Gegenteil — die **bereits vorhandenen** Verweise werden **repo-weit
entfernt**:
- `README.md` — der Abschnitt „Verhältnis zum persönlichen System" (aus #2)
- `index.html` — etwaige Links/Hinweise auf das persönliche System
- `design-system.css` und sonstige Produktdateien — etwaige Erwähnungen

**Ausgenommen:** die internen Issue-Artefakt-HTMLs unter `.issues/`
(`PLAN.html`, `RESEARCH.html`, …). Diese sind Entwickler-Tooling, folgen einem
eigenen Contract und binden bewusst ein anderes (Tooling-)Stylesheet ein — sie
werden **nicht** angefasst.

### D-2 — Versionierung: Latest-URL + CHANGELOG
Konsumierende Tools verlinken die **feste Pages-URL**
(`https://grueneat.github.io/design-system/design-system.css`) und erhalten
immer den aktuellen Stand. Eine **`CHANGELOG.md`** dokumentiert Änderungen; eine
Versionsnummer wird geführt; Breaking Changes werden dort angekündigt. Keine
versionierten URLs/Pfade.

### D-3 — Minimal-Beispiel als echte Datei
Das geforderte vollständige Minimal-Beispiel kommt als echte Datei
**`examples/minimal.html`** ins Repo — über GitHub Pages aufrufbar, dogfooded
das System real.

### D-4 — Startversion 1.0.0
Das Designsystem startet im `CHANGELOG.md` mit **`1.0.0`** (funktional
vollständig nach #2–#6). Künftige Breaking Changes → Major-Bump.

### D-5 — Kein Git-Tag
Es wird **kein** Git-Tag gesetzt. Die `CHANGELOG.md` verzichtet daher auf
Compare-/Release-Links; der Eintrag nennt Version + Datum
(`[1.0.0] - 2026-05-22`).

### D-6 — Version nicht im CSS
`design-system.css` bleibt inhaltlich unverändert — die Versionsnummer steht
nur in `CHANGELOG.md` (nicht im CSS). Der `index.html`-Integrationsabschnitt
wird vor dem Footer platziert.

## Rahmen / Annahmen
- Reine Dokumentations-/Beispiel-Arbeit; deutschsprachig.
- Bekannter Mangel: Der README-Abschnitt „Stand und nächste Schritte" ist
  **veraltet** (behauptet noch Platzhalter-CSS / Skelett-`index.html`) — er wird
  korrigiert bzw. ersetzt.
- `design-system.css` und `assets/` werden inhaltlich nicht verändert
  (höchstens ein personal-system-Verweis entfernt, falls vorhanden).
- Style Guide (`index.html`) wird um einen knappen Integrations-Abschnitt
  ergänzt (ISSUE.md: „README und Style Guide entsprechend ergänzen").

## Umfang dieses Issues (revidiert)
- README: kopierbare Einbindungs-Anleitung (verfeinern), „Stand"-Abschnitt
  korrigieren, personal-system-Abschnitt entfernen, Versionierungs-/Update-
  Hinweis + Link auf `CHANGELOG.md`.
- `examples/minimal.html` — vollständiges Minimal-Beispiel eines konsumierenden
  Tools.
- `CHANGELOG.md` anlegen (D-2).
- `index.html` — knapper Integrations-Abschnitt; personal-system-Verweise raus.
- Repo-weite Entfernung der personal-system-Verweise (außer `.issues/`).

## Offene Punkte für Research
- Vollständige Inventur **aller** Fundstellen von `flomotlik`/`claude-code`/
  „persönliches System" in Produktdateien (README, index.html, css, …).
- Sinnvolles Format/Startinhalt der `CHANGELOG.md` (z. B. „Keep a Changelog").
