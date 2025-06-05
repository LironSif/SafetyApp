# SafetyApp

SafetyApp is a web application with a React front-end and an Express/MongoDB backend.

## Prerequisites
- Node.js 18 or later
- npm

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd SafetyApp
   ```
2. **Install dependencies**
   ```bash
   cd Server && npm install
   cd ../Client && npm install
   ```
3. **Configure environment variables**
   Create a `.env` file inside the `Server` directory with the following values:
   ```
   MONGO_URI=<your-mongodb-uri>
   SERVER_PORT=<port-to-run-the-server>
   BASE_SERVER_URL=<base-server-url>
   CLIENT_PORT=<client-port>
   SESSION_SECRET=<session-secret-key>
   ```
   `SESSION_SECRET` is used by the server to sign session cookies. Make sure it is a strong, unique value.
4. **Run the application**
   ```bash
   # in one terminal
   cd Server && npm start

   # in another terminal
   cd Client && npm run dev
   ```
   The client will start on `http://localhost:5173` by default.


