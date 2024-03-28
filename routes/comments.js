const express = require('express');
const router = express.Router();

const commentController = require("../controllers/commentController");

// READ all comments
// Don't need this route
router.get('/', commentController.comment_list);

// CREATE
router.post('/', commentController.comment_create);

// READ one comment
router.get('/:id', commentController.comment_read);

// UPDATE
router.put('/:id', commentController.comment_update);

// DELETE
router.delete('/:id', commentController.comment_delete);

module.exports = router;