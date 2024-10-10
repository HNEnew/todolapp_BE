const express = require("express")
const app = express()
require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 4000
const dbMiddleware = require('./middlewares/dbMiddleware')
const routes = require('./routes')
const cookieParser = require('cookie-parser')
const path = require('path');

app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use(dbMiddleware)
app.use('/', routes)

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
   console.log(path.join(__dirname, 'build', 'index.html'),path.join(__dirname, 'build'));

 });

try {
    app.listen(port, () => {
        console.log(`server listening on port ${port}..`)
    })
} catch (error) {
    console.error(error)
}
