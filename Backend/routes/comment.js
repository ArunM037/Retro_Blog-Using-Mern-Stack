const express = require('express');
const router = express.Router();
const { getcomments, getcomment, postcomment, deletecomment, Updatecomment } = require('../Controller/commentController');
const requireAuth = require('../Middleware/requireAuth');


//secure routes
router.use(requireAuth)

// Get all comments
router.get('/:Blog_id', getcomments)
//Get a single comment
router.get('/:Post_id/:Blog_id', getcomment)
//Post a new comment
router.post('/', postcomment)
//Delete a comment
router.delete('/:id', deletecomment)
//Update a comment
router.patch('/:id', Updatecomment)

module.exports = router