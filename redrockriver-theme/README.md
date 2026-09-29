# Red Rock River – Shopify-Theme (Grundgerüst, v0.1.0)

Online Store 2.0 Theme in Liquid. Gestaltung siehe `DESIGN.md` (Entwurf), Produktkontext siehe `PRODUCT.md`.

## Inhalt

| Bereich | Dateien |
|---|---|
| Layout | `layout/theme.liquid` |
| Startseite | `templates/index.json` mit `hero`, `featured-collection` (2×), `campaign-tiles`, `collection-list`, `editorial-cards`, `newsletter` |
| Shop-Seiten | `templates/collection`, `product`, `cart`, `search`, `page`, `404`, `list-collections` (je `.json` mit Section `main-*`) |
| Kopf/Fuß | `sections/header-group.json` (Ankündigung, Header mit Mega-Menü und mobilem Menü), `sections/footer-group.json` |
| Einstellungen | `config/settings_schema.json` (Farben, Schriften, Seitenbreite, Logo, Social) |
| Texte | `locales/de.default.json` (nur Deutsch) |
| Assets | `assets/theme.css`, `assets/theme.js` (ohne Framework, ohne externe Aufrufe) |

Alle Startseiten-Inhalte sind **Platzhalter** (Texte, Bilder, Produkte) und im Theme-Editor ersetzbar.

## Prüfen

```bash
npx @shopify/cli theme check --path redrockriver-theme
```

Stand: keine Verstöße. Getestet wurde **nicht** in einem echten Shopify-Shop, sondern per Theme Check und lokaler Vorschau mit Mock-Daten.

## Hochladen

- **ZIP:** Ordnerinhalt (ohne `README.md`, `PRODUCT.md`, `DESIGN.md`) als ZIP packen, in Shopify unter *Onlineshop → Themes → Theme hinzufügen → ZIP hochladen*.
- **CLI:** `shopify theme push --store <shop>.myshopify.com --unpublished` (erfordert Anmeldung oder Theme-Access-Token).

## Noch nicht enthalten

- Kundenkonto-Templates (`templates/customers/*`), Blog/Artikel, Passwortseite, Geschenkkarte
- Shop the Look, Markenlogo-Leiste, Store-Standorte, Eigenmarken-Bereich mit Video
- Warenkorb als Schublade (Ajax), Wunschliste, Suchvorschläge
- Schriftwahl (Platzhalter `assistant`), Logo, echte Inhalte
- Rechtliche Prüfung: Preisangaben, Versandhinweis, Newsletter-Einwilligung, Cookie-Banner, Impressum/AGB/Widerruf/Datenschutz
