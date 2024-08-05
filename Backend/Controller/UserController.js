const user = require('../Model/userModel')
const jwt = require('jsonwebtoken')

//create a token 
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRETE, { expiresIn: '3d' })
}

//login user 

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const User = await user.login(email, password)
        //token
        const token = createToken(User._id)
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//signup user
const signupUser = async (req, res) => {
    const { Username, email, password } = req.body

    try {
        const User = await user.signup(Username, email, password)
        //token
        const token = createToken(User._id)
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    loginUser,
    signupUser
}