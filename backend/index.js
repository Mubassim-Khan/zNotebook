const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express()
const port = 8080 || process.env.HOST_URL

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => res.json({'message': 'Hello world'}).status(200))
app.listen(port, () => console.log(`Listening on http://localhost:${port}`))

app.use("/api/auth", require("./routes/auth"))