const express = require('express');
const router = express.Router();

const authorController = require("../controllers/authorController");

// Placeholder
// router.get('/', function(req, res, next) {
//   res.send('Read Author');
// });

// READ all authors
router.get('/', authorController.author_list);

// CREATE
// router.post('/', function(req, res, next) {
//   res.send('Create Author');
// });
router.post('/', authorController.author_create);

// READ one author
router.get('/:id', authorController.author_read);

// UPDATE
// router.put('/', function(req, res, next) {
//   res.send('Update Author');
// });

router.put('/:id', authorController.author_update);

// DELETE
router.delete('/', function(req, res, next) {
  res.send('Delete Author');
});

module.exports = router;
