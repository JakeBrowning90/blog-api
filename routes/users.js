const express = require('express');
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userController");

// CREATE new user fron registration
router.post('/', userController.user_create);

// READ one user
// Need this for login?
router.get('/:id', userController.user_read);

// UPDATE
// Use this to update isAuthor?
router.put('/:id', userController.user_update);

// DELETE
// Don't need this now?
// router.delete('/:id', userController.user_delete);

// Login
router.post('/login', 
    passport.authenticate('local', {
        // failureMessage: true
    }), 
    userController.user_login
);

//TEST logout
// router.post('/logout', userController.user_logout);

//TEST show logged in user
// router.post('/current', userController.user_current);

//TEST ROUTE for JWT
// router.post('/protected', userController.user_protected);

module.exports = router;