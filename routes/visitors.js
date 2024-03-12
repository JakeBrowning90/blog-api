const express = require('express');
const router = express.Router();

// Placeholder
router.get('/', function(req, res, next) {
  res.send('Read Visitor');
});

// READ (Above)

// CREATE
router.post('/', function(req, res, next) {
    res.send('Create Visitor');
  });
// UPDATE
router.put('/', function(req, res, next) {
    res.send('Update Visitor');
  });
// DELETE
router.delete('/', function(req, res, next) {
    res.send('Delete Visitor');
  });
module.exports = router;