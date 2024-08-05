const Blog = require('../Model/blogModel');

// Get blogs
const getblogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single blog
const getblog = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Post a new blog
const postblog = async (req, res) => {
    const blog = req.body;
    try {
        const newblog = await Blog.create(blog);
        res.status(200).json(newblog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a blog
const deleteblog = async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(200).json(blog);
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
    getblog,
    postblog,
    deleteblog,
    Updateblog
};
