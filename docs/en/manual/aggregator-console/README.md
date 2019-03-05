# Aggregator Console Development

### Setup Backing Services

#### Standard setup

Install mongodb locally using your OS specific installation for MongoDB.

#### Docker setup

Run following command as docker allowed user or root to start mongodb container.

```sh
docker run -d --name mongo -p 27017:27017 mongo
```

In both setup cases start backing services before app development starts.

### Setup Environment

`.env` file for initializing following variables needs to be setup in project root to configure environment. This file is ignored by git.

```
DB_HOST=localhost
DB_NAME=aggregator-console
```

### Setup hosts file

add `127.0.0.1 aggregator.localhost` in `/etc/hosts` file or hosts file of your operating system.

### Setup server with POST request

Add Client using Infrastructure console to obtain clientId, clientSecret. Use these credentials to setup the server. Visit https://staging-admin.castlecraft.in if you wish to use this sandbox instead of local setup.

Add following Callback URLs

- http://aggregator.localhost:8100/index.html
- http://aggregator.localhost:8100/silent-refresh.html

start local server

```sh
cd [git-repo-root]/packages/aggretator-console
npm run start:server
```

fire the following request

```
curl -d "appURL=http://aggregator.localhost:8100" \
    -d "authServerURL=http://staging-accounts.localhost:3000" \
    -d "clientId=6ff7dc34-2501-4281-bf8c-31929ed0f19c" \
    -d "clientSecret=05f966d683147329fbba11145482472188a19a11e6702c9aec54d86e42113b36" \
    -X POST http://aggregator.localhost:8100/setup \
    -H "Content-Type: application/x-www-form-urlencoded"
```

Note : If a POST request with no or invalid body is sent to `http://aggregator.localhost:8100/setup` error response will specify required fields.

Sample response

```
Response 201
```

Login to Aggregtor console `http://aggregator.localhost:8100` to use admin UI.
