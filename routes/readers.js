const express = require('express');
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

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
router.post('/login', passport.authenticate('local'), readerController.reader_login);

//TEST logout
router.post('/logout', readerController.reader_logout);

//TEST show logged in user
router.post('/current', readerController.reader_current);

//TEST ROUTE for JWT
router.post('/protected', readerController.reader_protected);

module.exports = router;