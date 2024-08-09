
const MongoClient = require('mongodb').MongoClient



const CONNECTION_STRING="mongodb://127.0.0.1:27017/"
const DATABASE_NAME='todoappdb'
let database;


async function connectToDb(){
    try {
        const client = await MongoClient.connect(CONNECTION_STRING)
            
            console.log('connected to DB...')
            // const todolist = await database.collection('todos').find().toArray()
            return client.db(DATABASE_NAME)
    } catch (error) {
        console.error('failed to connect to DB',error)
        process.exit(1)
    }
}

module.exports = {connectToDb}