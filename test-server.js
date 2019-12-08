
const path = require("path")
const express = require("express")
const compression = require("compression")
const port = 4100
const app = express()

app.use(compression())
app.use(express.static("src"));

app.listen(port, () => console.log(`Listening on port ${port}`))
