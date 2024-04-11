require('dotenv').config();
const Reader = require("../models/reader");

// const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// exports.function_name = asyncHandler(async (req, res, next) => {

// });

exports.reader_list = asyncHandler(async (req, res, next) => {
    const allReaders = await Reader.find().exec();
    res.json(allReaders);
});

exports.reader_create = [
  body("email")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email address")
    .isLength({ max: 30 })
    .withMessage("Email must not exceed 30 characters")
    .custom(async value =>{
        const existingReader = await Reader.findOne({ email: value });
        if (existingReader) {
            throw new Error('Email already in use.')
        }
    }),
  asyncHandler(async (req, res, next) => {

      const errors = validationResult(req);

      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const reader = new Reader({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: hashedPassword,
          is_admin: false,
      });

      if (!errors.isEmpty()) {
        res.json(errors);
      } else {
        await reader.save();
        res.json(reader);
      } 


  }) 
];

exports.reader_login = asyncHandler(async (req, res, next) => {
  // console.log(req.user);
  res.json(req.user);
   
  // jwt.sign({user: req.user}, process.env.SECRET_KEY, (err, token) => {
  //   res.json({
  //     token: token
  //   });
  // });
})


exports.reader_logout = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
        return next(err);
      }
  });
  console.log("Logged out!");
  res.json("Logged out!");
})

exports.reader_current = asyncHandler(async (req, res, next) => {
  if(req.user){
    res.json(req.user);
  } else {
    res.json('No user logged in');
  }
})

// exports.reader_login = [
//   passport.authenticate("local", {
//     successRedirect: "/success",
//     failureRedirect: "/failure"
//   })
//  ]

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

exports.reader_protected = asyncHandler(async (req, res, next) => {
  res.json('Protected content');
});