#!/bin/bash
# Legt die Karpathy-Regeln aus dem Repo-CLAUDE.md global in ~/.claude/CLAUDE.md ab.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

src="${CLAUDE_PROJECT_DIR:-$(pwd)}/CLAUDE.md"
dst="$HOME/.claude/CLAUDE.md"
marker="# Verhaltensregeln (nach Andrej Karpathy)"

[ -f "$src" ] || exit 0
mkdir -p "$HOME/.claude"

if [ ! -f "$dst" ]; then
  cp "$src" "$dst"
elif ! grep -qF "$marker" "$dst"; then
  { echo; cat "$src"; } >> "$dst"
fi
