#!/usr/bin/env bash
set -euo pipefail
dir=${1:?Pass an empty service directory}
mkdir -p "$dir"
cd "$dir"
fetch() {
  local dest=$1 url=$2 digest=$3
  mkdir -p "$dest"
  curl --retry 3 -fsSL "$url" -o archive
  echo "$digest  archive" | shasum -a 256 -c -
  tar xf archive -C "$dest"
  rm archive
}
fetch auth https://github.com/supabase/auth/releases/download/v2.198.0/auth-v2.198.0-darwin-arm64.tar.gz c28c3d67476cf1a76b0bff40fe8b839cbb8a68cc81d7b135a18c1081de3c6ba8
fetch rest https://github.com/PostgREST/postgrest/releases/download/v16.6/postgrest-v16.6-macos-aarch64.tar.xz 8cde0b4272939cf2f7c8e081068a41e9da4335bfd1d7c94716772a4ee4b324d4
fetch mail https://github.com/axllent/mailpit/releases/download/v1.31.3/mailpit-darwin-arm64.tar.gz f72ac5bae2c8ef6bd719c1aa11237500e9a81e50ba759f92b9b1e80812920a85
mkdir -p storage
curl --retry 3 -fsSL https://codeload.github.com/supabase/storage/tar.gz/ba916ffc650ac348f202a89fd99747d0de95471e -o source.tar.gz
tar xzf source.tar.gz --strip-components=1 -C storage
rm source.tar.gz
cd storage
npx --yes --package=npm@12.2.1 npm ci --ignore-scripts --no-audit --no-fund
node build.js
