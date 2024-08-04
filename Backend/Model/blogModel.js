const mongoose = require('mongoose');

// initialize schema
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    img_url: {
        type: String,
        required: true
    }
}, { timestamps: true, collection: "Blog" })

module.exports = mongoose.model('Blog', blogSchema)