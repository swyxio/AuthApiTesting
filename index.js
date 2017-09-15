const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const {User} = require('./db.models.user')
const app = express();

// representative serialize/deserialize implementations but done with a dummy User
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) =>
  User.findById(id).then(user => done(null, user)).catch(done)
);
// logging middleware
app.use(morgan("dev"));
// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// session middleware with passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || "somesecret",
    // store: sessionStore, // if you want to use `connect-session-sequelize` go ahead but not relevant for this
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

// api routes
app.use("/api", require("./api"));

// we are intentionally not going to use app.listen because this repo is exclusively meant for testing
module.exports = app // exported for testing