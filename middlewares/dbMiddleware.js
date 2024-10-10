
const {connectToDb} = require('../DBsetup/config')

const dbMiddleware = async (req, res, next) => {
    try {
        const db = await connectToDb()
        req.db = db
        next()
    } catch (error) {
        console.log('Failed to connect to DB', error)
        res.status(500).send('Database connection error')
    }
}

module.exports = dbMiddleware