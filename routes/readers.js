const express = require('express');
const router = express.Router();

const readerController = require("../controllers/readerController");

// Placeholder
// router.get('/', function(req, res, next) {
//   res.send('Show all Posts');
// });

// READ all readers
// router.get('/', readerController.reader_list);

// CREATE new reader
router.post('/', readerController.reader_create);

// router.get('/', readerController.reader_list);

// Login
router.post('/login', readerController.reader_login);

// READ one reader
router.get('/:id', readerController.reader_read);

// UPDATE
router.put('/:id', readerController.reader_update);

// DELETE
router.delete('/:id', readerController.reader_delete);

module.exports = router;