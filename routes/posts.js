const express = require('express');
const router = express.Router();
const postController = require("../controllers/postController");

// READ all posts, 
// Get PUBLISHED posts
router.get('/', postController.post_list);
// Get ALL posts
router.get('/all', postController.post_list_all);

// CREATE
router.post('/', postController.post_create);

// READ one post
// May not be needed?
router.get('/:id', postController.post_read);

// READ one post's comments
router.get('/:id/comments', postController.post_read_comments);

// UPDATE
router.put('/:id', postController.post_update);

// DELETE
router.delete('/:id', postController.post_delete);
router.delete('/:id/comments', postController.post_comments_delete);

module.exports = router;