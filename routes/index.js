const express = require('express');
const router = express.Router();

// Placeholder homepage? 
// Probably don't need this on back end
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Blog Backend' });
});

router.get('/success', function(req, res, next) {
  res.render('success', { title: 'Success' });
});

router.get('/failure', function(req, res, next) {
  res.render('failure', { title: 'Failure' });
});

module.exports = router;
