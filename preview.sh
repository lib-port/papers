#!/usr/bin/env bash
set -euo pipefail

repo_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
site_dir="$repo_dir"

if ! command -v node >/dev/null 2>&1; then
  printf 'Node.js is not on PATH. See README.md for setup.\n' >&2
  exit 1
fi

if ! node -e 'process.exit(Number(process.versions.node.split(".")[0]) >= 24 ? 0 : 1)' >/dev/null 2>&1; then
  printf 'Node.js 24 or newer is required. See README.md for setup.\n' >&2
  exit 1
fi

if [[ ! -x "$site_dir/node_modules/.bin/docusaurus" ]]; then
  printf 'Docusaurus is not installed. Run "npm ci" in the repository root, then run "./preview.sh" again.\n' >&2
  exit 1
fi

cd "$site_dir"
exec "$site_dir/node_modules/.bin/docusaurus" start "$@"
