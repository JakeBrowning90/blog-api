const Post = require("../models/post");
const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.post_list = asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find({is_published: true}).sort({ createdAt: -1 }).populate('user').exec();
    res.json(allPosts);
});

exports.post_list_all = asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find().sort({ createdAt: -1 }).populate('user').exec();
    res.json(allPosts);
});


exports.post_create = [
    body("title")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Title cannot be blank")
        .isLength({ max: 100 })
        .withMessage("Title must not exceed 100 characters"),
    body("subtitle")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Subtitle cannot be blank")
        .isLength({ max: 100 })
        .withMessage("Subtitle must not exceed 100 characters"),
    body("body")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Body cannot be blank")
        .isLength({ max: 12000 })
        .withMessage("Body must not exceed 12000 characters"),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const post = new Post({
            title: req.body.title,
            subtitle: req.body.subtitle,
            body: req.body.body,
            user: req.body.user,
            // timestamp:  Date.now(),
            is_published: req.body.is_published, 
        });
        
        if (!errors.isEmpty()) {
            res.json(errors.array());
        } else {
            await post.save();
            res.json(post);
        }
    })
]

// Get a single post
exports.post_read = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id).populate('user').exec();
    if (post == null) {
        res.sendStatus(404);
    }
    res.json(post);
});

// Get all comments for a given post
exports.post_read_comments = asyncHandler(async (req, res, next) => {
    const comments = await Comment.find({post: req.params.id}).populate('user').exec();
    res.json(comments);
});

// Update a post (createdAt timestamp stays the same)
exports.post_update = asyncHandler(async (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        subtitle: req.body.subtitle,
        body: req.body.body,
        author: req.body.author,
        // timestamp:  Date.now(),
        is_published: req.body.is_published, 
        _id: req.params.id,
    });

    await Post.findByIdAndUpdate(req.params.id, post);

    res.json(post);
});

exports.post_delete = asyncHandler(async (req, res, next) => {
    await Post.findByIdAndDelete(req.params.id);

    res.json('Deleted post');
});

exports.post_comments_delete = asyncHandler(async (req, res, next) => {
    await Comment.deleteMany({post: req.params.id});

    res.json('Deleted post comments');
});
