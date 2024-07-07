const Comment = require("../models/comment");
// const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// Get ALL comments (unneeded?)
// exports.comment_list = asyncHandler(async (req, res, next) => {
//   const allComments = await Comment.find().populate("reader").exec();
//   res.json(allComments);
// });

// Create new comment
exports.comment_create = asyncHandler(async (req, res, next) => {
  jwt.verify(req.token, "secretword", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const comment = new Comment({
        body: req.body.body,
        timestamp: Date.now(),
        user: req.body.user,
        post: req.body.post,
      });
      await comment.save().then((comment) => comment.populate("user"));
      res.json(comment);
    }
  });
});

// Get ONE comment
exports.comment_read = asyncHandler(async (req, res, next) => {
  jwt.verify(req.token, "secretword", async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const comment = await Comment.findById(req.params.id)
        .populate("user")
        .exec();
      res.json(comment);
    }
  });
});

// Update a comment (Unused now)
// exports.comment_update = asyncHandler(async (req, res, next) => {
//   const comment = new Comment({
//     body: req.body.body,
//     timestamp: Date.now(),
//     reader: req.body.reader,
//     post: req.body.post,
//     _id: req.params.id,
//   });
//   await Comment.findByIdAndUpdate(req.params.id, comment);
//   res.json(comment);
// });

exports.comment_delete = asyncHandler(async (req, res, next) => {
  jwt.verify(req.token, "secretword", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      await Comment.findByIdAndDelete(req.params.id);
      res.json("Deleted comment");
    }
  });
});
