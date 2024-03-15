const Post = require("../models/post");

// const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// exports.function_name = asyncHandler(async (req, res, next) => {

// });

exports.post_list = asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find().exec();
    res.json(allPosts);
});

exports.post_create = asyncHandler(async (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
        timestamp:  Date.now(),
        is_published: false, 
    });
    await post.save();
    res.json(post);
});

exports.post_read = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id).exec();
  
    res.json(post);
});

exports.post_update = asyncHandler(async (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
        timestamp:  Date.now(),
        is_published: false, 
        _id: req.params.id,
    });

    await Post.findByIdAndUpdate(req.params.id, post);

    res.json(post);
});

exports.post_delete = asyncHandler(async (req, res, next) => {
    await Post.findByIdAndDelete(req.params.id);

    res.json('Deleted post');
});