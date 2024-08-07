const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

// Initialize Schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true, collection: "user" });

// Check if email already exists and signup
userSchema.statics.signup = async function (username, email, password) {
    // Validation
    if (!username || !email || !password) {
        throw new Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
        throw new Error('Email is not valid');
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error('Password not strong enough');
    }
    const exists = await this.findOne({ email });
    if (exists) {
        throw new Error('Email already exists');
    }
    // Generate hash and salt password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create new user document
    const user = await this.create({ username, email, password: hash });
    return user;
}

// Static login method
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw new Error('All fields must be filled');
    }
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('Incorrect email');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error('Incorrect password');
    }
    return user;
}

module.exports = mongoose.model('User', userSchema);
