
const MongoClient = require('mongodb').MongoClient

const CONNECTION_STRING = "mongodb://127.0.0.1:27017/"
const DATABASE_NAME = 'todoappdb'
let db;

async function connectToDb() {
    if (db) return db
    try {
        const client = await MongoClient.connect(CONNECTION_STRING)
        console.log('Connected to DB...')
        db = await client.db(DATABASE_NAME)
        return db
    } catch (error) {
        console.error('failed to connect to DB', error)
        process.exit(1)
    }
}

module.exports = { connectToDb }