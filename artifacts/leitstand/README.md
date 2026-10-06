# Leitstand-Artifacts

Export aus dem Artifact-Tool. Exportdatum: 2026-10-06.

| Datei | Artifact | Quell-URL | Stand Quelle | Exportdatum |
| --- | --- | --- | --- | --- |
| `keil-leitstand.html` | Keil Leitstand | https://claude.ai/artifact/MTLe6qVHWKNXPqS4FsPXed | 2026-09-24 (Version 1790252595-b229) | 2026-10-06 |
| `leitstand-keil-anforderungen-und-offene-fragen.md` | Leitstand Keil: Anforderungen und offene Fragen | https://claude.ai/artifact/Te1SmxrxUdgSzwY4Vv5tor | 2026-09-24 (Version 1790235456-e047, Doc-Revision 10) | 2026-10-06 |
| – | Design | https://claude.ai/artifact/9gWoPqsJpGTxjGv8z6Yj4G | 2026-09-24 (Version 1790238270-9f18) | 2026-10-06 (kein Inhalt, siehe unten) |

## Hinweise zu den Quellen

- **Keil Leitstand:** Einzelne HTML-Seite, 485.580 Byte, unverändert aus dem Artifact-Dienst übernommen. Deklariert keine Runtime-Capabilities, hat also keine Artifact-Datenbank.
- **Leitstand Keil: Anforderungen und offene Fragen:** Ein Claude-Docs-Dokument (Artifact-Typ „Docs“). Der Inhalt liegt im Docs-Dienst, nicht in den Artifact-Dateien. Exportiert als Markdown über den Docs-Export (10.217 Byte). Die Markdown-Datei wurde aus dem Base64-Export von Hand übertragen, nicht per Dekodierung geschrieben (10.219 Byte), und ist daher nicht byte-identisch. Datums- und Erwähnungs-Chips sind im Export als Text enthalten. Die Artifact-Datenbank ist nicht deklariert.
- **Design:** Canvas-Artifact (Typ „Design“). Es enthält keine eigenen Dateien unter `project/` (nur die Dateien des Typs, die hier bewusst nicht exportiert werden). Es deklariert die Datenbank-Fähigkeit; die Sammlungen `design`, `boards`, `notes` und `files` sind leer. Es gibt daher nichts zu exportieren, und es wurde keine JSON-Datei angelegt.

## Datenbank-Prüfung

| Artifact | Datenbank deklariert | Ergebnis |
| --- | --- | --- |
| Keil Leitstand | nein | Lesen abgelehnt (keine DB-Capability) |
| Leitstand Keil: Anforderungen und offene Fragen | nein | Lesen abgelehnt (keine DB-Capability) |
| Design | ja | Sammlungen `design`, `boards`, `notes`, `files` leer; die Sammlungsnamen des Wurzelverzeichnisses lassen sich nicht auflisten |
