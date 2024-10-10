
const { connectToDb } = require('../../DBsetup/config')
const todos = 'todos'
const jwt = require('jsonwebtoken')
require('dotenv').config()

const privateKey = process.env.PRIVATE_KEY

const signToken = (email) => {
    const token = jwt.sign({
        data: email
    }, privateKey, { expiresIn: '7d' })
    return token
}

const authenticateToken = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        console.log('no token');
        return res.json({ message: 'Access denied' })
    }
    try {
        console.log('trying')
        const tokenData = jwt.verify(token, privateKey)
        // const mongoConnection = await connectToDb()
        const user = await req.db.collection(todos).findOne({ email: tokenData.data })
        req.user = user
        console.log('tokenData',tokenData)
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' })
    }
}


module.exports = { signToken, authenticateToken }