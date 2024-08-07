const express = require('express');
const router = express.Router();
const { getblogs, userBlogs, getblog, postblog, deleteblog, Updateblog } = require('../Controller/blogController');
const requireAuth = require('../Middleware/requireAuth');

//require all Auth
router.use(requireAuth)

//Get a blog
router.get('/', getblogs)
// Get a user Created blog
router.get('/user', userBlogs)
//Get a single blog
router.get('/:id', getblog)
//Post a new blog
router.post('/', postblog)
//Delete a blog
router.delete('/:id', deleteblog)
//Update a blog
router.patch('/:id', Updateblog)

module.exports = router