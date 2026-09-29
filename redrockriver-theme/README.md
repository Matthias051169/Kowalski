# Red Rock River – Shopify-Theme (v0.2.0)

Online Store 2.0 Theme in Liquid. Gestaltung siehe `DESIGN.md` (Entwurf), Produktkontext siehe `PRODUCT.md`.

## Inhalt

| Bereich | Dateien |
|---|---|
| Layout | `layout/theme.liquid`, `layout/password.liquid` |
| Startseite | `templates/index.json`: `hero`, `featured-collection` (2×), `campaign-tiles`, `shop-the-look`, `brand-logos`, `collection-list`, `brand-showcase` (Eigenmarke mit Video), `editorial-cards`, `store-locations`, `newsletter` |
| Shop-Seiten | `collection`, `product`, `cart`, `search`, `list-collections`, `404` (je `.json` mit Section `main-*`) |
| Kundenkonto | `templates/customers/`: `login`, `register`, `account`, `order`, `addresses`, `reset_password`, `activate_account` |
| Weitere Seiten | `blog`, `article`, `page`, `page.contact`, `page.wishlist`, `password`, `gift_card` |
| Kopf/Fuß | `header-group.json` (Ankündigung, Header mit Mega-Menü, Suchvorschläge, Wunschliste, Warenkorb-Schublade), `footer-group.json` |
| Einstellungen | `config/settings_schema.json` (Farben, Schriften, Seitenbreite, Logo, Social) |
| Texte | `locales/de.default.json` (nur Deutsch) |
| Assets | `assets/theme.css`, `assets/theme.js` (ohne Framework, ohne externe Aufrufe) |

Alle Startseiten-Inhalte sind **Platzhalter** (Texte, Bilder, Produkte) und im Theme-Editor ersetzbar.

## Einrichtung im Shop

- **Menüs** (Inhalt → Menüs): Handle `main-menu` (Header), `footer` (Fußzeile, Hilfe- und Rechtliche Links).
- **Wunschliste:** Seite mit Handle `wunschliste` und Template `page.wishlist` anlegen. Die Liste wird nur im Browser der Kundschaft gespeichert (localStorage), nicht am Konto und nicht geräteübergreifend.
- **Kontakt:** Seite mit Template `page.contact` anlegen.
- **Blog:** Blog in Shopify anlegen, Template `blog` wird automatisch genutzt.
- **Kundenkonten:** In den Kassen-Einstellungen Konten aktivieren (optional oder erforderlich).
- **Shop the Look:** je Look Bild und bis zu 4 Produkte wählen.

## Prüfen

```bash
npx @shopify/cli theme check --path redrockriver-theme
```

Stand: keine Verstöße. Getestet wurde **nicht** in einem echten Shopify-Shop, sondern per Theme Check und lokaler Vorschau mit Mock-Daten.

## Hochladen

- **ZIP:** Ordnerinhalt (ohne `README.md`, `PRODUCT.md`, `DESIGN.md`) als ZIP packen, in Shopify unter *Onlineshop → Themes → Theme hinzufügen → ZIP hochladen*.
- **CLI:** `shopify theme push --store <shop>.myshopify.com --unpublished` (erfordert Anmeldung oder Theme-Access-Token).

## Bekannte Grenzen

- **Nicht in einem echten Shopify-Shop getestet.** Geprüft wurde mit Theme Check und einer lokalen Vorschau mit Mock-Daten. Erster echter Test: Upload in einen Entwicklungs-Shop. Besonders zu prüfen: Warenkorb-Schublade (Ajax), Suchvorschläge, Kundenkonto-Formulare, Adressen (Löschen, Länderauswahl).
- Adressformular: Bundesland/Region ist ein Textfeld ohne Länderabhängigkeit.
- Wunschliste nur lokal im Browser (siehe oben).
- Nicht enthalten: Produktempfehlungen, Bewertungen, Kommentare im Blog, App-Banner, weitere Sprachen, Größentabelle, Versandrechner.
- Schriftwahl (Platzhalter `assistant`), Logo und echte Inhalte fehlen noch.
- Rechtliche Prüfung vor Livegang: Preisangaben, Versandhinweis, Newsletter-Einwilligung, Cookie-Banner, Impressum/AGB/Widerruf/Datenschutz.
