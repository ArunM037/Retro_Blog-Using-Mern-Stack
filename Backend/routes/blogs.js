const express = require('express');
const router = express.Router();
const { getblogs, getblog, postblog, deleteblog, Updateblog } = require('../Controller/blogController')



//Get a blog
router.get('/', getblogs)
//Get a single blog
router.get('/:id', getblog)
//Post a new blog
router.post('/', postblog)
//Delete a blog
router.delete('/:id', deleteblog)
//Update a blog
router.patch('/:id', Updateblog)

module.exports = router