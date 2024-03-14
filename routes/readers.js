const express = require('express');
const router = express.Router();

// Placeholder
router.get('/', function(req, res, next) {
  res.send('Read Reader');
});

// READ (Above)

// CREATE
router.post('/', function(req, res, next) {
    res.send('Create Reader');
  });
// UPDATE
router.put('/', function(req, res, next) {
    res.send('Update Reader');
  });
// DELETE
router.delete('/', function(req, res, next) {
    res.send('Delete Reader');
  });
module.exports = router;