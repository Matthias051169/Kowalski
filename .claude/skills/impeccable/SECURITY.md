# Sicherheitshinweise zu diesem Skill (lokale Ergänzung)

Dieser Skill (`impeccable`, Quelle `pbakaus/impeccable`, Skill-Version 4.4.0, Engine 0.1.6) wurde am 2026-09-29 geprüft. Diese Datei und die Änderung in `SKILL.md` sind **lokale Ergänzungen** und nicht Teil des Originals.

## Lokale Änderung gegenüber dem Original

`SKILL.md`, Abschnitt *Setup*, Schritt 1: Der Agent führt `scripts/impeccable` nicht mehr automatisch aus. Grund: Der Launcher lädt beim ersten Start ein Binary von GitHub-Releases und führt es aus. Ohne ausdrückliche Freigabe liest der Agent `PRODUCT.md` und `DESIGN.md` direkt.

Folge für Updates: `skills-lock.json` enthält den Hash des Originals. Nach `npx skills update` prüfen, ob die Änderung überschrieben wurde, und sie erneut anwenden.

## Engine-Binary 0.1.6: SHA256

Der Launcher prüft gegen eine `.sha256`-Datei desselben Release. Das schützt nicht vor einem kompromittierten Release. Deshalb hier zum Festschreiben. Die Hashes wurden am 2026-09-29 aus dem GitHub-Release `engine-v0.1.6` von `pbakaus/impeccable` berechnet (Vertrauen beim ersten Abruf) und stimmen mit den Sidecar-Dateien überein.

| Plattform | Datei | Größe (Byte) | SHA256 |
|---|---|---|---|
| Linux x64 | `impeccable-linux-x64` | 18182864 | `19dbe233b82acb5d8b8ae2cb37621f23f950cba258cfc62313a3fa50e557930c` |
| Linux arm64 | `impeccable-linux-arm64` | 15097904 | `d69b757aff9c5acc9fb0d865c2d4da57bd1226007666ec158ccf52fcd6d44e54` |
| macOS arm64 | `impeccable-darwin-arm64` | 14481280 | `efa0860cce03382e4d384709529b9892eaaa20dd49c3e5fcf73e680abc6d7574` |
| macOS x64 | `impeccable-darwin-x64` | 16331560 | `7981105e538d95f88b137e83c994922eaa6539a5b0c63b52ed2216c07e3061b4` |
| Windows x64 | `impeccable-windows-x64.exe` | 16729488 | `9f7e10589ff001d50bc6c3573d525e8b176f1ec051f6bcd1c6b13822d8bfc777` |

Download-URL: `https://github.com/pbakaus/impeccable/releases/download/engine-v0.1.6/<Datei>`

Das Binary ist gestrippt und nicht lesbar. Es wurde **nicht ausgeführt und nicht dekompiliert**, nur per Strings-Analyse untersucht.

### Binary manuell und mit Hash-Prüfung einrichten

```bash
curl -fsSL -o impeccable https://github.com/pbakaus/impeccable/releases/download/engine-v0.1.6/impeccable-linux-x64
echo "19dbe233b82acb5d8b8ae2cb37621f23f950cba258cfc62313a3fa50e557930c  impeccable" | sha256sum -c -
chmod +x impeccable
export IMPECCABLE_BIN="$PWD/impeccable"   # Launcher nutzt dann dieses Binary statt eines Downloads
```

Auf macOS `shasum -a 256 -c -` statt `sha256sum -c -`, Datei und Hash der Plattform aus der Tabelle verwenden.

## Bekannte Eigenschaften (aus Prüfung, nicht durch Beobachtung bestätigt)

- **Netzkontakt/Telemetrie:** GET an `https://impeccable.style/api/roll` (Scope, Modus, 8-stelliger Seed, Zähler), anonymer Ping nach einer Auswahl, Update-Check. Abschalten mit `DO_NOT_TRACK=1`, `IMPECCABLE_NO_TELEMETRY=1`, `IMPECCABLE_NO_UPDATE_CHECK=1`.
- **OpenAI:** `generate-image` sendet an `api.openai.com`, nur wenn `OPENAI_API_KEY` gesetzt ist.
- **Hooks:** `impeccable hooks on` installiert Hooks, die bei jedem Edit das Binary starten. Nur bewusst aktivieren.
- **Live-Modus:** lädt Skripte von `localhost:<Port>` in die Dev-Seite. Der Helper-Server steckt im Binary. Bindung nur an Loopback nicht geprüft.
- **Override-Variablen:** `IMPECCABLE_BIN`, `IMPECCABLE_DOWNLOAD_BASE`, `IMPECCABLE_HOME` ändern, was ausgeführt wird. Nicht in geteilten oder fremden Umgebungen setzen.
- **Untergeschobenes Binary:** Eine Datei `scripts/bin/<os>-<arch>/impeccable` im Repo würde vom Launcher ohne Prüfung ausgeführt. Aktuell existiert sie nicht. Änderungen unter `.claude/skills/**` nur nach Review übernehmen.
- **Overlay:** Markdown-Links aus `DESIGN.md` werden im Live-Overlay ohne Schema-Filter als Link gesetzt (`javascript:` möglich, Klick nötig).

## Geprüft und unauffällig

- `scripts/modern-screenshot.umd.js` ist byte-identisch mit npm `modern-screenshot` 4.7.0 (`dist/index.js`, SHA256 `bb36665889124a0b6e15f16045265737449c3bdcf2712cdb08af3cfa01563e2b`).
- Launcher: kein `curl | sh`, Prüfsummenabgleich bricht bei Fehlern ab.
- `live-browser*.js`: nur `localhost`-Ziele, kein `eval`, kein `document.cookie`, kein `sendBeacon`.
- Skill-Texte: kein verstecktes Unicode, keine Prompt-Injection-Muster (Mustersuche, nicht vollständig gelesen).
