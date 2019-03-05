# Overview

- These are microservices. It needs authorization server and optionally other services from [building blocks](https://gitlab.com/castlecraft/building-blocks) already setup
- Aggregator Service is the core backend API. It serves the api aggregator service ReST API
- Aggregator Console is the Admin UI Frontend for interacting with Aggregator Service

# Installation

Install Docker and Docker compose

Install Infrastructure using [building blocks](https://gitlab.com/castlecraft/building-blocks)

If you don't wish to setup building blocks locally for development, use the demo hosted service.

Login to https://staging-admin.castlecraft.in

with username `admin@example.com` and password `admin`. Add a OAuth Client for development here.

For production setup on kubernetes use helm-charts provided

For development setup follow :

- Install nvm / nodejs and install latest node and globally installed prerequesites. (latest nodejs prefered for development)

```sh
npm i @angular/cli @nestjs/cli typescript lerna -g
```

- Clone repo and change to the cloned directory

```sh
git clone https://github.com/DigiThinkIT/aggregator-api
cd aggregator-api
```

- Install dependencies and bootstrap dependencies of internal packages

```sh
npm i
lerna bootstrap
```

# TypeScript API Documentation

* [Aggregator Service]({{ book.docUrl }}/api/aggregator-service/)
* [Aggregator Console Server]({{ book.docUrl }}/api/aggregator-console-server/)
* [Aggregator Console Client]({{ book.docUrl }}/api/aggregator-console-client/)

# Structure and Setup

## Building Blocks Microservices

- Authorization Server (Required)
- Infrastructure Console (Optional to manage root privileges)
- Communication Server (Optional to fire emails and SMS, uses RabbitMQ)
- Identity Provider (Optional to allow users to manage their profile)

## Aggregator API Microservices
- Aggregator Service (Required, aggregation API)
- Aggregator Console (Required, Admin console for developers)

## Directory structure of lerna monorepo

- It is root of lerna monorepo
- Root contains scripts, docs, packages and helm-charts
- Packages are 2 nodejs packages viz. aggregator-console and aggregator-service
- Docs are built using gitbook and typedoc
