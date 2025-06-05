# SafetyApp

## Environment Variables

Create a `.env` file in the `Server` directory with the following variables:

```
MONGO_URI=<your-mongodb-uri>
SERVER_PORT=<port-to-run-the-server>
BASE_SERVER_URL=<base-server-url>
CLIENT_PORT=<client-port>
SESSION_SECRET=<session-secret-key>
```

`SESSION_SECRET` is used by the server to sign session cookies. Make sure it is a
strong, unique value.
