# Aggregator API for BloomTrace

### aggregator-service

This package contains the backend microservice with swagger API and no UI.
This service will connect to the queuing system and use CQRS for managing calls.

It uses NestJS backend

### aggregator-console

This is a service for presenting SPA / UI to the user.

It uses NestJS backend to build a frugal server to serve Angular SPA.
