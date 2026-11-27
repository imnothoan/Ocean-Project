#!/usr/bin/env bash
set -euo pipefail
# Run against the real Expo entry point. Only guest screens are captured.
repo=$(cd "$(dirname "$0")/../.." && pwd)
cd "$repo"
artifacts=${NATIVE_ARTIFACTS:-"$repo/.expo/iphone-11"}
mkdir -p "$artifacts"
scratch=$(mktemp -d)
device=''
metro=''
cleanup() {
  if [[ -n "$metro" ]]; then kill "$metro" 2>/dev/null || true; fi
  if [[ -n "$device" ]]; then xcrun simctl delete "$device" || true; fi
  rm -rf "$scratch"
}
trap cleanup EXIT
runtimes=$(xcrun simctl list runtimes -j | python3 -c 'import json, sys
rs=[r for r in json.load(sys.stdin)["runtimes"] if r["isAvailable"] and ".iOS-" in r["identifier"]]
for r in sorted(rs,key=lambda r:tuple(map(int,r["version"].split("."))), reverse=True): print(r["identifier"])')
for runtime in $runtimes; do
  if device=$(xcrun simctl create 'Ocean iPhone 11' com.apple.CoreSimulator.SimDeviceType.iPhone-11 "$runtime"); then break; fi
done
test -n "$device" || { echo "Install an iOS simulator runtime compatible with iPhone 11."; exit 1; }
xcrun simctl boot "$device"
xcrun simctl bootstatus "$device" -b
curl --retry 3 -fsSL https://github.com/expo/expo-go-releases/releases/download/Expo-Go-58.0.7/Expo-Go-58.0.7.tar.gz -o "$scratch/expo.tgz"
(cd "$scratch" && echo '17ab20f856c72690a750e79826ab5c90550a1441b1d1d67db6cd252af979b903  expo.tgz' | shasum -a 256 -c - && tar xzf expo.tgz)
app=$(find "$scratch" -name '*.app' -prune | head -1)
xcrun simctl install "$device" "$app"
CI=1 EXPO_NO_TELEMETRY=1 npx --no-install expo start --go --localhost --port 8081 --no-dev --minify > "$artifacts/metro.log" 2>&1 &
metro=$!
for ((i=0;i<90;i++)); do
  if curl -fsS http://127.0.0.1:8081/status 2>/dev/null | grep -q 'packager-status:running'; then break; fi
  sleep 1
done
curl -fsS -H 'Expo-Platform: ios' http://127.0.0.1:8081/ > "$scratch/manifest.json"
bundle=$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["launchAsset"]["url"])' "$scratch/manifest.json")
curl -fsS "$bundle" -o /dev/null
xcrun simctl openurl "$device" exp://127.0.0.1:8081
cd "$artifacts"
maestro --device "$device" test --test-output-dir "$artifacts" "$repo/tests/ios/guest.yaml"
