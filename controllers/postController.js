const Post = require("../models/post");
const Comment = require("../models/comment");
// const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// exports.function_name = asyncHandler(async (req, res, next) => {
// });

exports.post_list = asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find({is_published: true}).sort({ timestamp: -1 }).populate('user').exec();
    res.json(allPosts);
});

exports.post_list_all = asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find().sort({ timestamp: -1 }).populate('user').exec();
    res.json(allPosts);
});

exports.post_create = asyncHandler(async (req, res, next) => {
    console.log(req.body);

    const post = new Post({
        title: req.body.title,
        subtitle: req.body.subtitle,
        body: req.body.body,
        user: req.body.user,
        timestamp:  Date.now(),
        is_published: req.body.is_published, 
    });
    await post.save();
    res.json(post);
});

exports.post_read = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id).populate('user').exec();
    res.json(post);
});

// Get all comments for a given post
exports.post_read_comments = asyncHandler(async (req, res, next) => {
    const comments = await Comment.find({post: req.params.id}).populate('user').exec();
    res.json(comments);
});

// Include last updated field?
exports.post_update = asyncHandler(async (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        subtitle: req.body.subtitle,
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