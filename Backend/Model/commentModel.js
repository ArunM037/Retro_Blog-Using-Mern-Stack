const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// initialize Comment schema

const commentSchema = new Schema({
    Blog_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
}, { timestamps: true, collection: "comment" });

module.exports = mongoose.model('Comment', commentSchema)