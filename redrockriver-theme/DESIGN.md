---
name: Red Rock River
description: Streetwear-Shop, Sneaker-Szene, kontrastreich und reduziert. ENTWURF (Seed), nicht freigegeben.
colors:
  ink: "#121110"
  paper: "#F4F1EC"
  sand: "#E8E2D8"
  line: "#D9D4CB"
  stone: "#6B665F"
  rock-red: "#C2371F"
  rock-red-deep: "#9E2A14"
typography:
  display:
    fontFamily: "{{ Shopify font_picker: kompakte, kräftige Grotesk }}, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.75rem, 8vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "{{ Shopify font_picker: wie display }}, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  body:
    fontFamily: "{{ Shopify font_picker: neutrale Sans }}, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "{{ Shopify font_picker: wie body }}, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  none: "0px"
  sm: "2px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "64px"
  section: "clamp(64px, 10vw, 128px)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.rock-red}"
    textColor: "{colors.paper}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
  badge-sale:
    backgroundColor: "{colors.rock-red-deep}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"
  product-card:
    backgroundColor: "{colors.sand}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
---

# Design System: Red Rock River

> **Status: Entwurf (Seed) vor dem Bau.** Nicht freigegeben. Impeccable schreibt DESIGN.md regulär erst am Ende aus der gebauten Oberfläche. Dieser Entwurf dient als Richtung zur Freigabe und wird nach dem Bau gegen das Ergebnis geprüft und angepasst. Schriftnamen sind Platzhalter (siehe Typography).

## Overview

**Richtung: Fels und Tinte.** Warmes Papierweiß, fast-schwarze Tinte, ein einziger Akzent in Rotoxid. Die Produkte tragen die Farbe, die Oberfläche tritt zurück. Kein Rot-Schwarz-Gaming-Look, keine Verläufe, keine Glaseffekte. Streetwear entsteht über Maßstab, Typografie und Beschnitt der Bilder, nicht über Effekte.

**Was die Seite ausmacht:**
- Sehr große, enge Überschriften in Versalien auf ruhigem Grund.
- Bilder randlos und bildschirmfüllend, Text sitzt darauf oder direkt darunter, ohne Kartenrahmen.
- Rotoxid nur für Handlung und Status (Hover, Sale, Fokus), nie als Flächenfüllung.
- Eckig. Keine Rundungen außer Pills bei Filtern.

**Abgrenzung:** Aufbau der Startseite folgt dem Muster eines Multi-Brand-Händlers (siehe PRODUCT.md), Gestaltung und Inhalt sind eigenständig. Keine Marken, Logos oder Fotos Dritter.

## Colors

| Token | Wert | Einsatz |
|---|---|---|
| `paper` | #F4F1EC | Grundfläche, Text auf Dunkel |
| `sand` | #E8E2D8 | Produktbildgrund, abgesetzte Bereiche |
| `line` | #D9D4CB | Haarlinien, Trenner |
| `stone` | #6B665F | Sekundärtext, Metadaten |
| `ink` | #121110 | Text, primäre Buttons, dunkle Sektionen |
| `rock-red` | #C2371F | Akzent: Hover, Links, Fokusring |
| `rock-red-deep` | #9E2A14 | Sale-Badges, Preishinweise |

**Kontrast (berechnet):** ink auf paper 16,7:1. rock-red auf paper 4,8:1 (AA für Text). paper auf rock-red-deep 6,7:1. stone auf paper 5,1:1. **Einschränkungen:** stone auf sand nur 4,4:1, dort nur für Text ab 18px oder fett, sonst ink. rock-red auf ink nur 3,5:1, dort nur für große Schrift oder Grafik, nie für Fließtext.

Reines #000 und #FFF werden nicht verwendet. Dunkle Sektionen (Editorial, Footer) nutzen `ink` mit `paper`-Text.

## Typography

Ziel: eine enge, kräftige Grotesk für Überschriften, eine neutrale Sans für Fließtext. **Konkrete Schriften sind noch nicht gewählt.** Shopify-Themes sollten über `font_picker` (Shopify-Schriftbibliothek) arbeiten. So bleiben Schriften vom Betreiber änderbar und werden von Shopify ausgeliefert, ohne externe Google-Fonts-Aufrufe (relevant für Datenschutz in Deutschland). Vorschläge aus der Shopify-Bibliothek prüfe ich vor dem Bau auf Verfügbarkeit.

- **Display:** 700, Versalien, Zeilenhöhe 0,95, Laufweite −0,02em, Größe fluid bis 96px. Nur für Hero und Kampagnenblöcke.
- **Headline:** 700, Größe fluid 24–36px.
- **Body:** 400, 16px, Zeilenhöhe 1,5. Zeilenlänge maximal 70 Zeichen.
- **Label:** 600, 12px, Versalien, Laufweite 0,08em. Für Buttons, Navigation, Badges.

Kontrast der Größen ist bewusst extrem (mindestens 3:1 zwischen Display und Body).

## Layout

- **Raster:** 12 Spalten Desktop, 4 Spalten mobil. Seitenrand 16px mobil, 32px Desktop, maximale Inhaltsbreite 1600px, Bildflächen dürfen randlos sein.
- **Rhythmus:** Sektionsabstand `clamp(64px, 10vw, 128px)`. Innerhalb von Sektionen Abstände aus der 8px-Skala.
- **Produktraster:** 2 Spalten mobil, 4 Desktop. Karussells mit sichtbarem Anschnitt der nächsten Karte, damit Scrollbarkeit erkennbar ist.
- **Mobil zuerst:** Zielgruppe kauft am Telefon. Touch-Ziele mindestens 44px. Sticky Header mit Warenkorb, Suche im Vollbild-Overlay.
- **Startseiten-Rhythmus:** Wechsel zwischen randlosem Bild, Produktreihe und dunkler Editorial-Sektion. Keine identisch aufgebauten Sektionen hintereinander.

## Elevation & Depth

Flach. Tiefe entsteht durch Fläche und Kontrast, nicht durch Schatten. Kein Box-Shadow auf Karten. Einzige Ausnahme: Mini-Warenkorb und Suche als Overlay mit dunklem Scrim. Fokusring 2px `rock-red` mit 2px Abstand.

## Shapes

Eckig (0px) für Bilder, Karten, Buttons, Eingabefelder. `sm` (2px) nur für Badges. Pill-Form nur für Filter-Chips und Größenwähler. Keine Kreis-Avatare, keine Pfeil-Buttons in Kreisen.

## Components

- **Buttons:** Primär `ink` auf `paper`, Hover `rock-red`. Sekundär mit 1px `ink`-Rahmen. Label-Typografie, volle Breite mobil.
- **Produktkarte:** Bild auf `sand`, kein Rahmen. Darunter Name, Preis, eine Zeile Variantenhinweis. Zweites Bild beim Hover (Desktop). Sale-Preis in `rock-red-deep`, ursprünglicher Preis durchgestrichen in `stone`.
- **Kampagnenkachel:** Randloses Bild, Überschrift im Display-Stil, ein Textlink als Handlung. Kein Kartenrahmen.
- **Navigation:** Zweistufig. Mega-Menü ab Desktop mit Kategorien und Bildkacheln, mobil ausklappbare Liste.
- **Formulare:** Feld mit unterer Linie, Label oberhalb, Fehler in Text und Icon, nicht nur Farbe.
- **Ankündigungsleiste:** `ink` mit `paper`-Text, einzeilig, schließbar.

## Motion (ergänzend, gehört in Sidecar)

Zurückhaltend und schnell. Seitenübergänge und Hover 150–200ms `ease-out`, Menüs und Overlays 250ms. Nur `transform` und `opacity` animieren. Karussells mit nativem Scroll-Snap. Kein automatisches Abspielen von Bewegung. **`prefers-reduced-motion` schaltet alle Bewegungen ab.** Leitlinie aus dem installierten Skill `emil-design-eng`: Bewegung braucht einen Zweck (Rückmeldung, Orientierung), sonst entfällt sie.

## Do's and Don'ts

**Do**
- Produkt und Bild als Hauptdarsteller, Oberfläche zurückhaltend.
- Rotoxid sparsam, nur für Handlung und Status.
- Alle Texte und Farben gegen die berechneten Kontraste prüfen.
- Alle Inhalte über Theme-Einstellungen pflegbar machen.
- Platzhalter sichtbar als Platzhalter kennzeichnen.

**Don't**
- Keine Marken, Logos, Kampagnen- oder Produktfotos Dritter.
- Keine Verläufe, Glas-Effekte, Neon, Schatten auf Karten.
- Kein rotes Fließtext-Design auf dunklem Grund (Kontrast 3,5:1).
- Keine Karten in Karten, keine identischen Sektionen in Reihe.
- Keine externen Font-Aufrufe ohne Einwilligung.
- Keine automatisch laufenden Karussells oder Video-Endlosschleifen ohne Stopp.

## Offen zur Freigabe

1. Akzentfarbe Rotoxid `#C2371F` und Papierton `#F4F1EC` einverstanden, oder andere Richtung (z. B. dunkel/laut)?
2. Zeichensatz: Display in Versalien einverstanden?
3. Logo und Schriftzug: liegt etwas vor, oder gestalte ich einen einfachen Textschriftzug als Platzhalter?
