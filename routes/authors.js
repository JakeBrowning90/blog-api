const express = require('express');
const router = express.Router();
const passport = require("passport");

const authorController = require("../controllers/authorController");

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

// Login
router.post('/login', 
    passport.authenticate('local', {
        
    }), 
    authorController.author_login
);

module.exports = router;
