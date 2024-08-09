const express = require("express")
const app = express()
require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 4000
const connectToDb = require('./DBsetup/config')
const routes = require('./routes')

app.use(cors())
app.use(express.json())

app.use('/', routes)

try {
    app.listen(port, () => {
        console.log(`server listening on port ${port}..`)
    })
} catch (error) {
    console.error(error)
}
