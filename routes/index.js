const express = require('express');
const router = express.Router();

// Placeholder homepage? 
// Probably don't need this on back end
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Blog Backend' });
});

module.exports = router;
