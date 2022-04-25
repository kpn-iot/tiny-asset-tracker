#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

curl -X POST http://localhost:3000/api/lora \
   -H 'Content-Type: application/json' -H 'Origin: http://example.com' \
   -d '[{ "bn": "urn:dev:DVNUUID:???:", "bt": 111111111111},{ "n": "battery", "u": "%", "vs": "85.0"},{ "n": "accelerationX", "u": "m/s2", "v": 0},{ "n": "latitude", "u": "lat", "v": 1.10000},{ "n": "longitude", "u": "lon", "v": 2.10000},{ "n": "locTime", "vs": "1"} ]'