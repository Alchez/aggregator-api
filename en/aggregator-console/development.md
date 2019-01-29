# Server Development

Backend server for this service is very minimal. It interacts with authorization server and manages and stores user authentication/authorzation

### Backend

Once the server is setup and it has client credentials in settings after /setup, the service reads Authorization header of guarded requests.

Bearer token from header is introspected on authorization server and cached for future use if it is valid.

Guarded endpoints validates local token, or introspects and stores the valid token.

To start backend development run following from in `aggregator-console` package directory

```sh
npm run start:server
```

This will start nodemon and watch changes during development

`aggregator-console/server` is where source files of backend server are located.

### Frontend

Frontend is made using Angular and Angular Material.

to start the frontend development run the following from `aggregator-console` directory.

```sh
ng build --watch
```

this will build and watch the frontend angular app

`aggregator-console/src` is where source files of frontend anagular app is located.

Visit http://aggregator.localhost:8100 to start development (Note: `/etc/hosts` have to be configured)
