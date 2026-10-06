# Leitstand Keil: Anforderungen und offene Fragen

Sep 24, 2026 · @Matthias Loheide

## Ziel und Stand

Der Leitstand soll Finanzkennzahlen und den weltweiten Einsatz der Servicetechniker auf einer Oberfläche zusammenführen, am PC und auf dem Smartphone. Ein klickbarer Prototyp mit fiktiven Daten steht: [Keil Leitstand (Prototyp)](https://claude.ai/artifact/MTLe6qVHWKNXPqS4FsPXed).

Der Prototyp zeigt, *was* gewünscht ist. Er ist kein Produktivsystem: Alle Zahlen, Namen, Standorte und Kontaktadressen sind erfunden. Für den Echtbetrieb braucht es die Datenquellen aus Abschnitt 5 und eine Entscheidung zur Plattform (Abschnitt 6).

## Funktionen Finanzen

Der Finanzbereich hat fünf Unterseiten. Über allen liegen dieselben Filter: Zeitraum (Monat, Quartal, Geschäftsjahr bis heute), Geschäftsbereich (Neuanlagen, Service, Ersatzteile), Region (Europa, Amerika, Asien-Pazifik, Nahost & Afrika) und Vergleich mit Plan oder Vorjahr.

| Unterseite | Kennzahlen und Inhalte |
| --- | --- |
| Übersicht | Umsatz, EBIT mit Marge, Cashflow, EBIT-Prognose Gesamtjahr, Auftragsbestand mit Reichweite, überfällige Forderungen; Verlauf Cashflow (Ist, Prognose, Vergleich) und EBIT pro Monat |
| Umsatz & Aufträge | Umsatz, Auftragseingang, Book-to-Bill, Auftragsbestand; Umsatz nach Geschäftsbereich; Top-Kunden (Umsatz, Marge, Bestand); laufende Projekte mit Plan- und erwarteter Marge |
| Liquidität | Kontostand und freie Kreditlinie, offene und überfällige Forderungen, DSO; Altersstruktur der Forderungen; überfällige Posten je Kunde |
| Kosten | Gesamtkosten und Kostenquote; Ist gegen Plan oder Vorjahr je Kostenart (Personal, Material, Fremdleistungen, Reisekosten, Sonstige); Kosten pro Monat |
| After Sales | Service- und Ersatzteilumsatz mit Marge, Technikerauslastung gesamt und je Techniker, Wartungsverträge mit Laufzeitende und Verlängerungswarnung |

Im Prototyp werden die Kosten aus Umsatz minus EBIT abgeleitet. Im Echtbetrieb müssen sie aus der Kostenrechnung kommen.

## Funktionen Einsatzkarte

Die Einsatzkarte zeigt, wo jeder Techniker ist, wie spät es dort ist, welche Kundenanlagen eine Störung haben und wer sie am schnellsten beheben kann.

| Funktion | Inhalt |
| --- | --- |
| Weltkarte | Ländergrenzen eingebettet (Natural Earth), Zoomen und Verschieben mit Maus oder zwei Fingern, Ebenen ein- und ausblendbar |
| Techniker | Status (im Einsatz, unterwegs, verfügbar), Standort, Reiserouten, aktueller Einsatz mit Kunde, Anlage, Auftrag, Zeitraum und Einsatztagen |
| Zeitzonen | Ortszeit je Techniker inkl. Sommerzeit, Arbeitszeitstatus (Arbeitszeit, Randzeit, Nacht, Wochenende), Zeitzonenleiste am Kartenrand |
| Tag und Nacht | Nachtschattierung, Tag-Nacht-Grenze, Sonnenstand, Hinweis auf Tagundnachtgleiche |
| Kontakt | Teams-Anruf und Teams-Chat per Klick, E-Mail-Adresse zum Kopieren |
| Kundenanlagen | Anlagen als Marker; Detail mit Umsatz, Marge, Auftragsbestand, offenen und überfälligen Forderungen, Wartungsvertrag, Projekten |
| Störungen | Offene Störmeldungen mit Priorität, benötigter Qualifikation und Einreisedokument |
| Techniker-Vorschlag | Zu jeder Störung die 5 passendsten Techniker, sortiert nach Verfügbarkeit, Qualifikation, gültigen Dokumenten und Entfernung, mit geschätzter Reisezeit |
| Qualifikationen und Dokumente | Qualifikationen je Techniker; A1-Bescheinigung, Visum, Sicherheitsschulung mit Ablaufdatum und Warnung ab 60 Tagen |
| Finanzwarnung | Hinweis bei Forderungen über 90 Tage vor einem Einsatz beim Kunden (nur Anzeige, keine Sperre) |

## Übergreifende Funktionen

- **Desktop und Smartphone:** Die Ansicht passt sich automatisch an, auf dem Smartphone getrennt nach Hoch- und Querformat.
- **Hell und Dunkel:** Umschalter mit Automatisch (folgt dem Gerät), Hell und Dunkel.
- **Teams:** Kontakt zu Technikern über Teams-Links; der Leitstand selbst könnte als Tab in Teams laufen.
- **Anmeldung:** Im Echtbetrieb nur für angemeldete Mitarbeitende, idealerweise mit dem Firmenkonto (Microsoft Entra ID).

## Benötigte Datenquellen

Der Leitstand braucht 14 Datenbereiche aus mindestens vier Systemen. Welches System jeweils die Quelle ist, ist noch offen. Die Spalte „Quelle“ ist eine Vermutung.

| Daten | Gebraucht für | Quelle (vermutet) | Zuständig | Aktualität |
| --- | --- | --- | --- | --- |
| Umsatz je Monat, Bereich, Region | Übersicht, Umsatz, After Sales | ERP / Finanzbuchhaltung | Linda | monatlich |
| EBIT je Monat | Übersicht, Kosten | Controlling / Monatsabschluss | Linda | monatlich |
| Cashflow Ist und Prognose | Übersicht | Controlling / Liquiditätsplanung | Linda | monatlich |
| Plan- und Vorjahreswerte | alle Vergleiche | Budget / Planung | Linda | jährlich, Vorjahr fix |
| Auftragseingang und -bestand | Umsatz & Aufträge | ERP (Aufträge) | Linda | täglich bis wöchentlich |
| Kosten je Kostenart | Kosten | Kostenrechnung | Linda | monatlich |
| Kontostand, Kreditlinie | Liquidität | Bank / Finanzbuchhaltung | Linda | täglich |
| Offene Posten je Kunde mit Fälligkeit | Liquidität, Anlagen, Störungen | Debitorenbuchhaltung | Linda | täglich |
| Projekte mit Auftragswert, Fortschritt, Marge | Umsatz & Aufträge, Anlagen | Projektcontrolling | Linda | monatlich |
| Wartungsverträge mit Wert und Laufzeit | After Sales, Anlagen | Vertragsverwaltung / ERP | After Sales | bei Änderung |
| Kundenanlagen mit Standort | Karte | ERP / Service-System (Stammdaten) | After Sales | bei Änderung |
| Störmeldungen | Karte, Techniker-Vorschlag | Service-/Ticketsystem | After Sales | laufend |
| Techniker-Stammdaten, Qualifikationen, Dokumente | Karte, Vorschlag, Warnungen | Personalabteilung / Einsatzplanung | Personal, After Sales | bei Änderung |
| Einsätze, Standorte, Stunden | Karte, Auslastung | Einsatzplanung / Zeiterfassung | After Sales | täglich |

Alle Datenbereiche brauchen dieselbe Kundennummer. Nur so lassen sich Buchhaltung, Anlagen und Einsätze demselben Kunden zuordnen.

## Offene Fragen an Simon (IT)

**Plattform und Lizenzen**

- [ ] Welche Microsoft-Lizenzen gibt es bei Keil: Microsoft 365 Copilot, Power Apps Premium, Power BI Pro?
- [ ] Ist der Copilot App Builder (Microsoft 365 Copilot) im Tenant freigeschaltet?
- [ ] Bevorzugte Umsetzung: Power BI für Finanzen und Power Apps (Code App) für die Einsatzkarte, oder eine eigene Web-App?
- [ ] Soll der Leitstand als Tab in Teams laufen?

**Systeme und Schnittstellen**

- [ ] Welches ERP und welche Finanzbuchhaltung laufen bei Keil?
- [ ] Wo liegen Einsatzplanung, Zeiterfassung und Störmeldungen (Service- oder Ticketsystem)?
- [ ] Gibt es Schnittstellen oder Exporte (API, Datenbankzugriff, Excel/CSV)? Wie oft lassen sie sich aktualisieren?
- [ ] Gibt es eine einheitliche Kundennummer über alle Systeme?

**Zugriff und Sicherheit**

- [ ] Anmeldung über Entra ID möglich?
- [ ] Wer darf was sehen? Finanzzahlen vermutlich nur ein kleiner Kreis, Einsatzkarte für After Sales und Disposition.
- [ ] Zugriff vom Smartphone: Firmengeräte, Privatgeräte oder beides (Geräteverwaltung / Intune)?
- [ ] Stimmen die Teams-Adressen der Techniker mit den E-Mail-Adressen überein?

**Betrieb**

- [ ] Wer betreut die Lösung nach dem Start, intern oder extern?
- [ ] Gibt es Budget und einen Zeitrahmen?

## Offene Fragen an Linda (Finanzen)

**Datenlieferung**

- [ ] In welcher Form können die Zahlen geliefert werden: Excel-Export, Bericht aus dem ERP, direkte Schnittstelle?
- [ ] Wie oft sind die Zahlen belastbar: täglich, wöchentlich oder erst nach dem Monatsabschluss?
- [ ] Gibt es Plan- und Vorjahreswerte je Monat, oder nur als Jahressumme?

**Definitionen**

- [ ] Welche EBIT-Definition gilt intern (vor oder nach Sondereffekten)?
- [ ] Cashflow: operativer Cashflow oder Veränderung der liquiden Mittel? Wer erstellt die Prognose?
- [ ] Welche Kostenarten werden geführt? Passen die fünf im Prototyp (Personal, Material, Fremdleistungen, Reisekosten, Sonstige)?
- [ ] Wie wird der Auftragsbestand ermittelt, und ab wann gilt ein Auftrag als Eingang?
- [ ] DSO-Berechnung: Welche Methode und welcher Zeitraum?

**Aufteilung**

- [ ] Lassen sich Umsatz, EBIT und Kosten nach Geschäftsbereich (Neuanlagen, Service, Ersatzteile) und nach Region trennen?
- [ ] Werden Kunden, die Anlagen und Service kaufen, auf Rechnungsebene getrennt gebucht?
- [ ] Gibt es Projektmargen (Plan und erwartet) aus dem Projektcontrolling?

**Regeln und Zugriff**

- [ ] Soll ein Kunde mit Forderungen über 90 Tage nur markiert werden, oder soll ein Einsatz dort vorher freigegeben werden?
- [ ] Wer darf welche Finanzzahlen sehen, insbesondere Marge und Forderungen je Kunde?

## Datenschutz

Keil hat keinen Betriebsrat, deshalb entfällt die Mitbestimmung. Der Datenschutz für Beschäftigte (DSGVO, BDSG) gilt trotzdem, vor allem für Standortdaten.

- **Standortquelle festlegen:** Am einfachsten ist der geplante Einsatzort aus der Einsatzplanung. Eine laufende GPS-Ortung ist deutlich aufwändiger zu rechtfertigen.
- **Datenschutzbeauftragten einbinden**, bevor echte Standort- oder Personaldaten fließen.
- **Folgenabschätzung prüfen:** Bei systematischer Ortung von Mitarbeitenden ist eine Datenschutz-Folgenabschätzung (Art. 35 DSGVO) wahrscheinlich nötig.
- **Mitarbeitende informieren**, welche Daten der Leitstand zeigt und wofür (Art. 13 DSGVO).
- **Sparsam bleiben:** Bei Dokumenten genügen Art und Ablaufdatum, keine Kopien von Pässen oder Visa.

Das ist keine Rechtsberatung. Die verbindliche Bewertung liegt beim Datenschutzbeauftragten.

## Vorschlag nächste Schritte

1. **Termin mit Simon und Linda (1 Stunde):** Prototyp zeigen, Fragen aus Abschnitt 6 und 7 durchgehen.
2. **Plattform entscheiden:** anhand der vorhandenen Lizenzen und Systeme.
3. **Mit einem Ausschnitt anfangen:** Finanzübersicht mit echten Zahlen aus einem monatlichen Excel-Export. Das zeigt schnell, ob Definitionen und Datenqualität passen.
4. **Einsatzkarte danach:** zuerst mit Einsatzorten aus der Einsatzplanung, ohne Ortung.
5. **Datenschutzbeauftragten einbinden**, bevor Personaldaten angebunden werden.

Der Finanzteil ist der einfachere Einstieg, weil die Daten meist schon strukturiert vorliegen. Die Einsatzkarte hängt von mehr Systemen ab.
