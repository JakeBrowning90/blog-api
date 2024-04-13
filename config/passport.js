const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const Reader = require("../models/reader");

passport.use(
    new LocalStrategy(async (username, password, done) => {
      console.log("Authenticating...")
      try {
        const user = await Reader.findOne({ email: username });
        if (!user) {
          console.log("Incorrect user")
          return done(null, false, { message: "Incorrect email" });
        };
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          console.log("Incorrect password")
          return done(null, false, { message: "Incorrect password" })
        }
        // console.log(user._id);
        return done(null, user);
      } catch(err) {
        console.log('There was an error');
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