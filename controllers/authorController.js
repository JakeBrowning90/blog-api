require('dotenv').config();
const Author = require("../models/author");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Display list of all Authors
// exports.author_list = asyncHandler(async (req, res, next) => {
//   const allAuthors = await Author.find().sort({ last_name: 1 }).exec();
//   res.json(allAuthors);
// });

// READ one author by ID
exports.author_read = asyncHandler(async (req, res, next) => {
  const author = await Author.findById(req.params.id).exec();

  // TODO: Error route if none
  // if (author === null) {
  //   // No results.
  //   const err = new Error("Author not found");
  //   err.status = 404;
  //   return next(err);
  // }

  res.json(author);
});

// exports.author_create = asyncHandler(async (req, res, next) => {
//   const author = new Author({
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     email: req.body.email,
//     password: req.body.password,
//   });
  
//   await author.save();
//   res.json(author);
// });

exports.author_create = [
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("First name required")
    .isLength({ max: 20 })
    .withMessage("First name must not exceed 20 characters"),
  body("last_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Last name required")
    .isLength({ max: 20 })
    .withMessage("Last name must not exceed 20 characters"),
  body("email")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email address")
    .isLength({ max: 30 })
    .withMessage("Email must not exceed 30 characters")
    .custom(async value =>{
        const existingAuthor = await Author.findOne({ email: value });
        if (existingAuthor) {
            throw new Error('Email already in use.')
        }
    }),
  body("password")
    .trim()
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be between 8 and 20 characters"),
  body("confirm_password")
    .custom((value, { req }) => {
        return value === req.body.password;
    })
    .withMessage("Typed passwords do not match"),
    

  asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);

      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const author = new Author({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: hashedPassword,
      });

      if (!errors.isEmpty()) {
        res.json(errors.array());
      } else {
        await author.save();
        res.json(author);
      } 
  }) 
];

exports.author_update = asyncHandler(async (req, res, next) => {
  const author = new Author({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    _id: req.params.id,
  });

  await Author.findByIdAndUpdate(req.params.id, author);

  res.json(author);
});

exports.author_delete = asyncHandler(async (req, res, next) => {
  await Author.findByIdAndDelete(req.params.id);

  res.json('Deleted!');
});

exports.author_login = asyncHandler(async (req, res, next) => {
  jwt.sign({user: req.user}, process.env.SECRET_KEY, { expiresIn: '30m' }, (err, token) => {
    res.json({
      full_name: req.user.full_name,
      id: req.user._id,
      // Add "Bearer"?
      token: token,
    });
  });
})