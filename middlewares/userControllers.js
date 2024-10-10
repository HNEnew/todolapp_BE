
const bcrypt = require('bcrypt')
const saltrounds = 10
const todos = 'todos'
const { formValidator } = require('./validator/formvalidator')
const { signToken } = require('./token/token')

const signupController = async (req, res) => {
    try {
        const { username, email, password } = req.body.userdata
        const validatedData = formValidator(email, password)
        if (validatedData === true) {
            const ifUserExist = await req.db.collection(todos).findOne({ email: email })
            if (ifUserExist) {
                res.json({ message: 'Already have an account in this email' })
            } else {
                const hashedPassword = await bcrypt.hash(password, saltrounds)
                const result = await req.db.collection(todos).insertOne({ username, email, password: hashedPassword, todolist: ['Get Started...'] })
                if (result.insertedId) {
                    res.json({ succes: 'Account created succesfully.Please login to start.' })
                } else {
                    res.json({ message: 'Some error occured..' })
                }
            }
        } else {
            res.json({ message: validatedData })
        }
    } catch (error) {
        console.log(error)
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body.userdata
        const result = await req.db.collection(todos).findOne({ email: email })
        if (result && result.password) {
            const isMatch = await bcrypt.compare(password, result.password)
            if (isMatch) {
                const token = signToken(email)
                res.cookie('token', token, {
                    httpOnly: true,
                    sameSite: 'None',
                    secure: true
                })
                res.json({ message: 'Logged in succesfully', user: result })
            }
        } else {
            res.json({ message: 'Invalid username or password' })
        }
    } catch (error) {
        console.log(error)
    }
}

const logoutController = (req, res) => {
    res.clearCookie('token')
    console.log('logout controller called');
    const token = req.cookies.token
    console.log(token)
    res.json({ succes: 'Logged out' })
}

module.exports = { signupController, loginController, logoutController }