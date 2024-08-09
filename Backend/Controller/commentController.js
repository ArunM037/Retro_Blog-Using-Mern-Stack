const Comment = require('../Model/commentModel');

// Get all comments for a specific blog post
const getcomments = async (req, res) => {
    const { Blog_id } = req.params;
    try {
        const comments = await Comment.find({ Blog_id }).sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single comment by its ID
const getcomment = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Post a new comment
const postcomment = async (req, res) => {
    const { Blog_id, author, Content } = req.body;
    const user_id = req.user.id;
    console.log(Blog_id, author, Content)
    console.log(user_id)
    try {
        const newcomment = await Comment.create({ Blog_id, user_id, author, content: Content });
        res.status(200).json(newcomment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a comment
const deletecomment = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const comment = await Comment.findByIdAndDelete(id);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a comment
const Updatecomment = async (req, res) => {
    const { Blog_id, author, content } = req.body;
    console.log(Blog_id, author, content)
    const { id } = req.params;
    console.log(id)
    const user_id = req.user.id;
    try {
        const updatedcomment = await Comment.findByIdAndUpdate(id, { Blog_id, user_id, author, content }, { new: true });
        if (!updatedcomment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        res.status(200).json(updatedcomment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getcomments,
    getcomment,
    postcomment,
    deletecomment,
    Updatecomment
};
