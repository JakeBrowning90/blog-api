const express = require('express');
const router = express.Router();

const readerController = require("../controllers/readerController");

// READ all readers
// Don't need this for assignment
router.get('/', readerController.reader_list);

// CREATE new reader fron registration
router.post('/', readerController.reader_create);

// READ one reader
// Nead this for login?
router.get('/:id', readerController.reader_read);

// UPDATE
// Don't need this?
router.put('/:id', readerController.reader_update);

// DELETE
// Don't need this?
router.delete('/:id', readerController.reader_delete);

// Login
router.post('/login', readerController.reader_login);

module.exports = router;