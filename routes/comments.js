const express = require('express');
const router = express.Router();
// const passport = require("passport");

const commentController = require("../controllers/commentController");

function verifyToken(req, res, next) {
    console.log(req.headers);

    // get auth header value
    const bearerHeader = req.headers['authorization'];
    // console.log(bearerHeader);

    if (typeof bearerHeader !== 'undefined') {
        // const bearer = bearerHeader.split(' ');
        // const bearerToken = bearer[1];
        // req.token = bearerToken;
        req.token = bearerHeader;

        next();
    } else {
      res.sendStatus(403);
      // res.json({message: 'Login required'})
    }
  } 

// READ all comments
// Don't need this route
router.get('/', commentController.comment_list);

// CREATE
router.post('/', verifyToken, commentController.comment_create);

// READ one comment
router.get('/:id', commentController.comment_read);

// UPDATE
router.put('/:id', commentController.comment_update);

// DELETE
router.delete('/:id', commentController.comment_delete);

module.exports = router;