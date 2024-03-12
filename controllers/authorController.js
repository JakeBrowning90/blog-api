const Author = require("../models/author");

// const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Display list of all Authors.
exports.author_list = asyncHandler(async (req, res, next) => {
    const allAuthors = await Author.find().sort({ last_name: 1 }).exec();
    res.send(allAuthors);
  });