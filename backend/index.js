const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const connectToMongo = require('./db');

connectToMongo();   // Function imported from "db" to connect to MongoDB

const app = express();
const port = 8080 || process.env.REACT_APP_HOST_URL;

app.use(bodyParser.json())
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://jubilant-carnival-r4xw7xg7x6q525x65-5173.app.github.dev',
    'https://jubilant-carnival-r4xw7xg7x6q525x65-5173.app.github.dev/login',
    'https://znotebook.vercel.app'
  ],
  credentials: true,
}));

app.get('/', (req, res) => res.json({ 'message': 'Hello world' }).status(200))
app.listen(port, () => console.log(`Listening on http://localhost:${port}`))

app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

console.log("Service account (partial):", {
  type: serviceAccount.type,
  project_id: serviceAccount.project_id,
  client_email: serviceAccount.client_email,
  private: serviceAccount.private_key,
});
