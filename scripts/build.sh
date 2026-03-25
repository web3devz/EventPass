#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
echo "🛠️  Building EventPass"
sui move build --path contracts "$@"
