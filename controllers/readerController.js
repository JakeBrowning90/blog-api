require('dotenv').config();
const Reader = require("../models/reader");

// const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
    new LocalStrategy(async (username, password, done) => {
      console.log("Authenticating...")
      try {
        const user = await Reader.findOne({ email: username });
        if (!user) {
          console.log("Incorrect user")
           return done(null, false, { message: "Incorrect username" });
        };
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          console.log("Incorrect password")
          return done(null, false, { message: "Incorrect password" })
        }
        return done(null, user);
      } catch(err) {
        return done(err);
      };
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await Reader.findById(id);
      done(null, user);
    } catch(err) {
      done(err);
    };
  });
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

exports.reader_login = [
    // res.json(req.body);
    passport.authenticate("local", {
      successRedirect: "/success",
      failureRedirect: "/failure"
    })
    // await reader.save();
    // res.json(reader);
  ]

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