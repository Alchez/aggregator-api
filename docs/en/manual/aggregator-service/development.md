# Server Development

Backend server for this service is where all the business logic resides. It interacts with authorization server and manages and stores user authentication/authorzation. It also fires the requests to third party api and logs the queue(s).

Registered clients have to be stored on this server to allow them to make requests.

### Backend

Once the server is setup and it has client credentials in settings after /setup, the service reads Authorization header of guarded requests.

Bearer token from header is introspected on authorization server and cached for future use if it is valid.

Guarded endpoints validates local token, or introspects and stores the valid token.

To start backend development run following from in `aggregator-service` package directory

```sh
npm run start:server
```

This will start nodemon and watch changes during development

`aggregator-service/src` is where source files of backend server are located.

Visit http://aggregator.localhost:7100 to start development (Note: `/etc/hosts` have to be configured)
