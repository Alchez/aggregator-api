#!/bin/bash

# Check helm chart is installed or create
# reuse installed values and resets data
export CHECK_AS=$(helm ls -q aggregator-api-staging --tiller-namespace staging)
if [ "$CHECK_AS" = "aggregator-api-staging" ]
then
    echo "Updating existing aggregator-api-staging . . ."
    helm upgrade aggregator-api-staging \
        --tiller-namespace staging \
        --namespace staging \
        --reuse-values \
        --recreate-pods \
        helm-charts/aggregator-api
fi
