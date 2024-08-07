const Blog = require('../Model/blogModel');
const mongoose = require('mongoose');

// Get blogs
const getblogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a user Created blog
const userBlogs = async (req, res) => {
    const user_id = req.user.id
    try {
        const blogs = await Blog.find({ user_id }).sort({ createdAt: -1 })
        res.status(200).json(blogs)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
// Get a single blog
const getblog = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such blog' });
        }
        const blog = await Blog.findById(id);
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Post a new blog
const postblog = async (req, res) => {
    const { title, content, author, img_url, body } = req.body;
    const emptyfields = [];
    if (!title) {
        emptyfields.push('title');
    }
    if (!content) {
        emptyfields.push('content');
    }
    if (!author) {
        emptyfields.push('author');
    }
    if (!img_url) {
        emptyfields.push('img_url');
    }
    if (!body) {
        emptyfields.push('body');
    }

    if (emptyfields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyfields });
    }

    try {
        const user_id = req.user._id;
        const newblog = await Blog.create({ title, content, author, img_url, body, user_id });
        res.status(200).json(newblog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a blog
const deleteblog = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Patch a blog
const Updateblog = async (req, res) => {
    const { id } = req.params;
    const { title, content, author, img_url, body } = req.body;
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, { title, content, author, img_url, body }, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getblogs,
    userBlogs,
    getblog,
    postblog,
    deleteblog,
    Updateblog
};
