const Reader = require("../models/reader");

// const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const passport = require("passport");

const initializePassport = require('../passport-config');
initializePassport(
    passport, 
    // email => Reader.findOne({email: req.body.email}),
    email => users.find(user => user.email === req.body.email),
    id => users.find(user => user.id === id),
);

require('dotenv').config();
// exports.function_name = asyncHandler(async (req, res, next) => {

// });

exports.reader_list = asyncHandler(async (req, res, next) => {
    const allReaders = await Reader.find().exec();
    res.json(allReaders);
});

exports.reader_create = asyncHandler(async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const reader = new Reader({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hashedPassword,
            is_admin: false,
        });
        await reader.save();
        res.json(reader)
    } catch {
        res.json({message: "Error: Reader not created"})
    }
});

exports.reader_login = asyncHandler(async (req, res, next) => {
    const users = [req.body]// console.log(req.body);
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",

      })
    // await reader.save();
    // res.json(reader);
});

exports.reader_read = asyncHandler(async (req, res, next) => {
    const reader = await Reader.findById(req.params.id).exec();
    res.json(reader);
});

exports.reader_update = asyncHandler(async (req, res, next) => {
    const reader = new Reader({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        is_admin: false,
        _id: req.params.id,
      });
    
      await Reader.findByIdAndUpdate(req.params.id, reader);
      res.json(reader);
});

exports.reader_delete = asyncHandler(async (req, res, next) => {
    await Reader.findByIdAndDelete(req.params.id);
    res.json('Deleted Reader');
});