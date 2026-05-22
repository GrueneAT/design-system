# Research — Design-Tokens aus dem Grüne-AT Corporate Design

Recherche-Phase, 2026-05-22. Baut auf CONTEXT.md (D-1…D-4) auf.

## 1 — Freie Ersatzschrift für Gotham Narrow (zu D-1)

Gotham Narrow ist eine **geometrische, schmal laufende** Sans mit der sehr
schweren „Ultra"-Strichstärke (Headlines) und „Book" (Sublines/Copy). Eine
freie Schrift muss zwei Eigenschaften abdecken: **schmale Laufweite** (die
bewusste CD-Wahl „Narrow") und ein **volles Gewichtsspektrum** inkl. sehr
schwer.

Evaluierte Google-Fonts-Kandidaten:

| Schrift | Stil | Laufweite | Gewichte | Bewertung |
| :------ | :--- | :-------- | :------- | :-------- |
| **Barlow Semi Condensed** | Grotesk-humanistisch | schmal (semi-condensed) | 100–900 + Kursiv | Beste Kombination aus Narrow + voller Gewichtsskala; exzellentes Screen-Rendering |
| Saira Semi Condensed | Geometrisch | schmal (semi-condensed) | 100–900 | Geometrischer (näher an Gothams Bauprinzip), etwas technischer Charakter |
| Montserrat | Geometrisch | **normal** | 100–900 + Kursiv | Bester Gotham-Match im Charakter, verliert aber die „Narrow"-Laufweite |

**Empfehlung: Barlow Semi Condensed.** Sie erhält die im CD bewusst gewählte
schmale Laufweite, deckt mit Black (900) die „Ultra"-Headlinerolle und mit
Regular/Medium die „Book"-Copyrolle aus *einer* Familie ab und rendert auf
Bildschirmen sehr sauber. → Dem User zur Bestätigung vorgelegt.

**Vollkorn** (Hervorhebungen/Zitate) bleibt — frei über Google Fonts, inkl.
Black Italic, exakt die im CD genannte Rolle.

Einbindung: Google-Fonts-`<link>` bzw. `@import` — wird in Issue #4/#5 in den
Seiten gesetzt. Die Tokens hier referenzieren nur die Font-Family-Namen als
Stack: gewählte Schrift → generische Fallbacks (`sans-serif` / `serif`).

## 2 — Web-Typo-Skala (zu D-3)

Das PDF liefert nur Faktoren, keine absoluten Größen. Vorschlag: **modulare
Skala**, Basis `1rem` (16px), Verhältnis **1,25 (große Terz)**.

| Token-Rolle | rem | abgeleitet |
| :---------- | :-- | :--------- |
| `text-h1` | 2.441rem | Basis × 1,25⁴ |
| `text-h2` | 1.953rem | Basis × 1,25³ |
| `text-h3` | 1.563rem | Basis × 1,25² |
| `text-subline` | 1.25rem | Basis × 1,25 |
| `text-copy` | 1rem | Basis |
| `text-small` | 0.8rem | Basis ÷ 1,25 |

Zeilenabstände direkt aus dem CD als **einheitslose Multiplikatoren**
(CSS `line-height` akzeptiert das):
- `leading-headline: 0.9` (CD: Headline-ZA = Größe × 0,9)
- `leading-copy: 1.3` (CD: Fließtext-ZA = Größe × 1,3)

Die Skala selbst ist Web-Ergänzung und im CSS so zu kommentieren.

## 3 — Abstände / Layout (zu D-3, CD-Layoutregeln)

- Abstands-Skala (Web-Ergänzung), Basis `0.25rem`:
  `space-1 … space-8` (0.25/0.5/1/1.5/2/3/4/6rem o. ä.).
- CD-Relation „HL↔SL = HL↔Copy = X×2": über ein Token-Paar abbilden, X als
  Basiseinheit dokumentieren.
- Logo-Schutzzone (M = 0,06 × kurze Kante; Logo = 3×M print / 2,5×M digital):
  als **informelle Verhältnis-Tokens** + Kommentar festhalten — nicht in feste
  px gießen, da formatabhängig. Reine Dokumentation in den Tokens.

## 4 — Token-Struktur (Prefix `--gat-`, D-4)

Zwei Ebenen:
- **Primitive** — die Rohwerte mit CD-Namen:
  `--gat-color-dunkelgruen #257639`, `--gat-color-hellgruen #56af31`,
  `--gat-color-gelb #ffed00`, `--gat-color-magenta #e6007e`,
  plus Neutrals (D-2): `--gat-color-weiss #ffffff`,
  `--gat-color-anthrazit` (dunkler Textton, ~`#1d1d1b`).
- **Semantische Aliase** — verweisen auf Primitive:
  `--gat-color-primary` → dunkelgruen, `--gat-color-secondary` → hellgruen,
  `--gat-color-accent` → magenta, `--gat-color-highlight` → gelb,
  `--gat-color-text` → anthrazit, `--gat-color-surface` → weiss,
  `--gat-color-on-green` → weiss (CD-Regel „Typografie immer auf Grün" →
  Text auf grüner Fläche braucht eine helle Farbe).

CD-Treue: Primitive 1:1 aus dem PDF (Magenta-HEX `#e6007e` maßgeblich).
Neutrals + Skala sind als Web-Ergänzung kommentiert.

## 5 — Bestehende Datei

`design-system.css` enthält aus Issue #2 einen Platzhalter-Header-Kommentar und
einen leeren `:root { }`-Block. Dieses Issue **füllt den `:root`-Block** mit den
Tokens; der Datei-Header bleibt (ggf. Hinweis „Tokens folgen" entfernen).

<interfaces>

Dieses Issue definiert das **Token-Vokabular**, auf das Issue #4 (Komponenten)
und alle konsumierenden Grüne-AT-Tools zugreifen. Öffentlicher Kontrakt:

- **`design-system.css` — `:root`-Block** mit CSS Custom Properties, alle mit
  Prefix `--gat-`:
  - Farb-Primitive: `--gat-color-{dunkelgruen,hellgruen,gelb,magenta,weiss,anthrazit}`
  - Farb-Semantik: `--gat-color-{primary,secondary,accent,highlight,text,surface,on-green}`
  - Schrift-Familien: `--gat-font-headline`, `--gat-font-copy`,
    `--gat-font-emphasis` (Font-Stacks: gewählte freie Schrift → generisch)
  - Typo-Größen: `--gat-text-{h1,h2,h3,subline,copy,small}` (rem)
  - Zeilenabstände: `--gat-leading-headline` (0.9), `--gat-leading-copy` (1.3)
  - Abstände: `--gat-space-1 … --gat-space-N` (rem)
- Stabile Namen — Issue #4 und externe Tools referenzieren diese Properties;
  Umbenennungen wären Breaking Changes.
- Keine Selektoren/Komponenten/Klassen hier — nur `:root`-Tokens. Die Anwendung
  (Header, Buttons, Typo-Klassen) ist Scope von Issue #4.
- Keine JS-/Code-APIs — reines CSS.

</interfaces>

## Offene Entscheidung für den Plan
- Bestätigung der freien Ersatzschrift (Abschnitt 1) durch den User.
