const Comment = require("../models/comment");
// const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// exports.function_name = asyncHandler(async (req, res, next) => {
// });

// Get ALL comments (unneeded?)
exports.comment_list = asyncHandler(async (req, res, next) => {
    const allComments = await Comment.find().populate('reader').exec();
    res.json(allComments);
});

exports.comment_create = asyncHandler(async (req, res, next) => {
    jwt.verify(req.token, 'secretword', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const comment = new Comment({
                // TODO
                body: req.body.body,
                timestamp: Date.now(),
                reader: req.body.reader,
                post: req.body.post,
            });
            await comment.save();
            res.json(comment);
        }
    })
});

// Get ONE comment
exports.comment_read = asyncHandler(async (req, res, next) => {
    const comment = await Comment.findById(req.params.id).exec();
  
    res.json(comment);
});

exports.comment_update = asyncHandler(async (req, res, next) => {
    const comment = new Comment({
        body: req.body.body,
        timestamp:  Date.now(),
        reader: req.body.reader,
        post: req.body.post,
        _id: req.params.id,
    });

    await Comment.findByIdAndUpdate(req.params.id, comment);

    res.json(comment);
});

exports.comment_delete = asyncHandler(async (req, res, next) => {
    await Comment.findByIdAndDelete(req.params.id);

    res.json('Deleted comment');
});