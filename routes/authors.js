const express = require('express');
const router = express.Router();

const authorController = require("../controllers/authorController");

// READ all authors
// Don't need this, only one author
// router.get('/', authorController.author_list);

// CREATE author
// Remove this route after creating author
router.post('/', authorController.author_create);

// READ one author
// Don't need this except for login?
router.get('/:id', authorController.author_read);

// UPDATE author
// Don't need this?
router.put('/:id', authorController.author_update);

// DELETE author
// Don't need this?
router.delete('/:id', authorController.author_delete);

module.exports = router;
