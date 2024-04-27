require('dotenv').config();
const User = require("../models/user");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// exports.function_name = asyncHandler(async (req, res, next) => {

// });

exports.user_list = asyncHandler(async (req, res, next) => {
    const allUsers = await User.find().exec();
    res.json(allUsers);
});

exports.user_create = [
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
        const existingUser = await User.findOne({ email: value });
        if (existingUser) {
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
      const user = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: hashedPassword,
          isAuthor: false,
      });

      if (!errors.isEmpty()) {
        res.json(errors.array());
      } else {
        await user.save();
        res.json(user);
      } 
  }) 
];

exports.user_login = asyncHandler(async (req, res, next) => {
  jwt.sign({user: req.user}, process.env.SECRET_KEY, { expiresIn: '30m' }, (err, token) => {
    res.json({
      full_name: req.user.full_name,
      id: req.user._id,
      isAuthor: req.user.isAuthor,
      // Add "Bearer"?
      token: token,
    });
  });
})

exports.user_logout = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
        return next(err);
      }
  });
  res.json("Logged out!");
})

// Testing route
exports.user_current = asyncHandler(async (req, res, next) => {
  if(req.user){
    res.json(req.user);
  } else {
    res.json('No user logged in');
  }
})

exports.user_read = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id).exec();
    res.json(user);
});

exports.user_update = asyncHandler(async (req, res, next) => {
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        isAuthor: true,
        _id: req.params.id,
      });
    
      await User.findByIdAndUpdate(req.params.id, user);
      res.json(user);
});

// exports.user_delete = asyncHandler(async (req, res, next) => {
//     await User.findByIdAndDelete(req.params.id);
//     res.json('Deleted Reader');
// });

// exports.user_protected = asyncHandler(async (req, res, next) => {
//   res.json('Protected content');
// });