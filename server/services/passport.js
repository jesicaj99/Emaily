const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

//serialize and deserialize encode user ID inside the cookie
passport.serializeUser((user, done) => {
  // take our user model and put info into the cookie
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // put it back out and turn it back into a user
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy( // Can also do facebook startagies
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    // refactor with async await
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // we already have a record with the given profileID
        done(null, existingUser);
      } else {
        // we dont have a user record with this ID, make a new record
        const user = await new User({ googleId: profile.id }).save()
        done(null, user)
      }
    }
  )
);
