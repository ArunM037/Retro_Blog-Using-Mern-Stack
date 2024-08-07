const User = require('../Model/userModel');
const jwt = require('jsonwebtoken');

// Create a token 
const createToken = (_id, username) => {
    return jwt.sign({ _id, username }, process.env.SECRETE, { expiresIn: '3d' });
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id, user.username);
        res.status(200).json({ email: user.email, username: user.username, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Signup user
const signupUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.signup(username, email, password);
        const token = createToken(user._id, user.username);
        res.status(200).json({ email, username: user.username, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    loginUser,
    signupUser
};
