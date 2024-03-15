const express = require('express');
const router = express.Router();

const commentController = require("../controllers/commentController");

// Placeholder
// router.get('/', function(req, res, next) {
//   res.send('Show all Posts');
// });

// READ all readers
router.get('/', commentController.comment_list);

// CREATE
router.post('/', commentController.comment_create);

// READ one reader
router.get('/:id', commentController.comment_read);

// UPDATE
router.put('/:id', commentController.comment_update);

// DELETE
router.delete('/:id', commentController.comment_delete);

module.exports = router;