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