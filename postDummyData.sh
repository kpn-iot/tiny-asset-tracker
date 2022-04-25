#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

function put () {
    curl -X POST http://localhost:3000/api/lora \
    -H 'Content-Type: application/json' -H 'Origin: http://example.com' \
    -d "[{ \"bn\": \"urn:dev:DVNUUID:???:\", \"bt\": 111111111111},{ \"n\": \"battery\", \"u\": \"%\", \"vs\": \"85.0\"},{ \"n\": \"accelerationX\", \"u\": \"m/s2\", \"v\": 0},{ \"n\": \"latitude\", \"u\": \"lat\", \"v\": $1},{ \"n\": \"longitude\", \"u\": \"lon\", \"v\": $2},{ \"n\": \"locTime\", \"vs\": \"1\"} ]"
}

curl http://localhost:3000/api/coords

put "52.3993234" "4.8695023"

sleep 10

put "53.2105276" "6.5822406"

sleep 10

put "51.4587546" "5.3913289"

sleep 10

put "52.0577972" "5.1090947"

sleep 10
