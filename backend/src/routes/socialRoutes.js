const express = require("express");
const socialRoute = express.Router();
const passport = require("passport");
const socialController = require("../controllers/socialController");

// Redirect the user to Google
socialRoute.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
// Google sends the user back to this URL
socialRoute.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/google",
  }),
  socialController.loginWithOauth, //calls the controller logic
);

// --- Facebook Routes ---
socialRoute.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] }),
);
socialRoute.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: "/facebook",
  }),
  socialController.loginWithOauth, //calls the controller logic
);

// --- X (Twitter) Routes ---
socialRoute.get("/x", passport.authenticate("twitter"));
socialRoute.get(
  "/x/callback",
  passport.authenticate("twitter", {
    session: false,
    failureRedirect: "/x",
  }),
  socialController.loginWithOauth, //calls the controller logic
);



module.exports = socialRoute;
