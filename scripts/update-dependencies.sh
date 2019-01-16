#!/usr/bin/env bash

# Update packages

# Root Dependencies
./node_modules/.bin/npm-check --update

# Aggregator Service
./node_modules/.bin/npm-check --update packages/aggregator-service

# Aggregator Console
./node_modules/.bin/npm-check --update packages/aggregator-console
