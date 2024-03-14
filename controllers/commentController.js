const Comment = require("../models/comment");

// const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// exports.function_name = asyncHandler(async (req, res, next) => {

// });

exports.comment_list = asyncHandler(async (req, res, next) => {
    const allComments = await Post.find().exec();
    res.json(allComments);
});

exports.comment_create = asyncHandler(async (req, res, next) => {
    const comment = new Comment({
        // TODO
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
        timestamp:  Date.now(),
        is_published: false, 
    });
    await comment.save();
    res.json(comment);
});

exports.comment_read = asyncHandler(async (req, res, next) => {
    const comment = await Comment.findById(req.params.id).exec();
  
    res.json(comment);
});

exports.comment_update = asyncHandler(async (req, res, next) => {
    
    res.json('Update a comment!');
});

exports.comment_delete = asyncHandler(async (req, res, next) => {
    
    res.json('Delete a comment!');
});