const Reader = require("../models/reader");

// const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// exports.function_name = asyncHandler(async (req, res, next) => {

// });

exports.reader_list = asyncHandler(async (req, res, next) => {
    const allReaders = await Reader.find().exec();
    res.json(allReaders);
});

exports.reader_create = asyncHandler(async (req, res, next) => {
    const reader = new Reader({
        //TODO 
    });
    await reader.save();
    res.json(reader);
});

exports.reader_read = asyncHandler(async (req, res, next) => {
    const reader = await Reader.findById(req.params.id).exec();
  
    res.json(reader);
});

exports.reader_update = asyncHandler(async (req, res, next) => {
    
    res.json('Update a reader!');
});

exports.reader_delete = asyncHandler(async (req, res, next) => {
    
    res.json('Delete a reader!');
});