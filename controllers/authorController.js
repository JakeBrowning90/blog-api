const Author = require("../models/author");

// const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Display list of all Authors
exports.author_list = asyncHandler(async (req, res, next) => {
    const allAuthors = await Author.find().sort({ last_name: 1 }).exec();
    res.json(allAuthors);
  });

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

exports.create_author = asyncHandler(async (req, res, next) => {
  const author = new Author({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  });
  await author.save();
  res.json(author);
});