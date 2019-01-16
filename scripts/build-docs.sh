#!/usr/bin/env bash
echo "Building Aggregator Service Docs"
./node_modules/.bin/typedoc \
    --out public/api/aggregator-service \
    packages/aggregator-service/src \
    --name "Aggregator Server"

echo "Building Aggregator Console Docs"
./node_modules/.bin/typedoc \
    --out public/api/aggregator-console \
    packages/aggregator-console/src \
    packages/aggregator-console/server \
    --name "Aggregator Console"
