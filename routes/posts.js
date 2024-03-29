const express = require('express');
const router = express.Router();

const postController = require("../controllers/postController");

// Placeholder
// router.get('/', function(req, res, next) {
//   res.send('Show all Posts');
// });

// READ all posts
router.get('/', postController.post_list);

// CREATE
router.post('/', postController.post_create);

// READ one post
router.get('/:id', postController.post_read);

// READ one post with comments
router.get('/:id/comments', postController.post_read_comments);

// UPDATE
router.put('/:id', postController.post_update);

// DELETE
router.delete('/:id', postController.post_delete);

module.exports = router;