const Author = require("../models/author");

// const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

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

exports.author_create = asyncHandler(async (req, res, next) => {
  const author = new Author({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  });
  
  await author.save();
  res.json(author);
});

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