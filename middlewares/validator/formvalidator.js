
const passwordValidator = require('password-validator')
const schema = new passwordValidator()

const emailValidator = require("email-validator")


schema
    .is().min(5 ,'Password must be at least 5 characters long')
    .is().max(15 ,'Password should not exceed 15 characters')
    // .has().uppercase()
    // .has().lowercase()
    // .has().digits()
    .has().not().spaces(0,'Password should not have spaces')


const formValidator = (email, password) => {
    const validatedPassword = schema.validate(password, { details: true })

    const validatedEmail = emailValidator.validate(email)

    if (validatedPassword[0] && validatedPassword[0].message) {
        return validatedPassword[0].message
    } else if (!validatedEmail) {
        return 'Please enter a valid email'
    } else {
        return true
    }
} 


module.exports = { formValidator }