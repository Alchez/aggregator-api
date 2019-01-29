#!/usr/bin/env bash
echo "Building Aggregator Service Docs"
./node_modules/.bin/typedoc \
    --out public/api/aggregator-service \
    packages/aggregator-service/src \
    --name "Aggregator Server"

echo "Building Aggregator Console Server Docs"
./node_modules/.bin/typedoc \
    --out public/api/aggregator-console-server \
    packages/aggregator-console/server \
    --name "Aggregator Console Server"

echo "Building Aggregator Console Client Docs"
./node_modules/.bin/typedoc \
    --out public/api/aggregator-console-client \
    packages/aggregator-console/src \
    --name "Aggregator Console Client"
