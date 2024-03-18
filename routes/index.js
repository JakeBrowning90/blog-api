const express = require('express');
const router = express.Router();

// Placeholder homepage?
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Blog Backend' });
});

module.exports = router;
