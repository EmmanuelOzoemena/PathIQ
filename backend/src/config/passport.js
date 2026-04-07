
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
// const AppleStrategy = require('passport-apple');
// const MicrosoftStrategy = require('passport-microsoft').Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require('@superfaceai/passport-twitter-oauth2').Strategy;
const Student = require('../models/studentModels')
const Guardian = require('../models/guardianModels')
const Admin = require('../models/adminModels')

require('dotenv').config();

// Authenticate with Google
passport.use(
    new GoogleStrategy({
        // options for the google strategy
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://api-pathiq.onrender.com/api/v1/oauth/google/callback",
        // callbackURL: "http://localhost:9000/api/v1/oauth/google/callback",

    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;
                let user = await Student.findOne({ email }) || await Guardian.findOne({ email }) || await Admin.findOne({ email });


                if (!user) {
                    // Create user if they don't exist
                    user = await Student.create({
                        name: profile.displayName,
                        email: email,
                        isVerified: true, // Google users are already verified
                        isloggedIn: true,
                        password: Math.random().toString(36).slice(-12),// Generate a random password since it's required but won't be used
                    }) || 
                    await Guardian.create({
                        name: profile.displayName,
                        email: email,
                        isVerified: true, // Google users are already verified
                        isloggedIn: true,
                        password: Math.random().toString(36).slice(-12),// Generate a random password since it's required but won't be used
                    }) || 
                    await Admin.create({
                        name: profile.displayName,
                        email: email,
                        isVerified: true, // Google users are already verified
                        isloggedIn: true,
                        password: Math.random().toString(36).slice(-12),// Generate a random password since it's required but won't be used
                    });

                }
                return done(null, user); // Passes user to the controller
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

// //     passport.use(
// //     new AppleStrategy(
// //         {
// //             clientID: process.env.APPLE_CLIENT_ID, // e.g., com.yourname.app.services
// //             teamID: process.env.APPLE_TEAM_ID,
// //             keyID: process.env.APPLE_KEY_ID,
// //             privateKeyLocation: "./config/authkey.p8", // Path to your downloaded .p8 file
// //             callbackURL: "/api/v1/auth/apple/callback",
// //             passReqToCallback: true,
// //         },
// //         async (req, accessToken, refreshToken, idToken, profile, done) => {
// //             try {
// //                 // IMPORTANT: Apple only sends the 'student' object (name/email) the VERY FIRST time 
// //                 // a student connects. You must handle the case where profile might be empty.
// //                 const email = idToken.email; 
// //                 let student = await student.findOne({ email });

// //                 if (!student) {
// //                     student = await student.create({
// //                         name: req.body.student ? JSON.parse(req.body.student).name : "Apple student",
// //                         email: email,
// //                         isVerified: true,
// //                         isloggedIn: true,
// //                         password: Math.random().toString(36).slice(-12),
// //                     });
// //                 }
// //                 return done(null, student);
// //             } catch (err) {
// //                 return done(err, null);
// //             }
// //         }
// //     )
// // );


// // // Authenticate with Microsoft
// // passport.use(new MicrosoftStrategy({
// //     clientID: process.env.MICROSOFT_CLIENT_ID,
// //     clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
// //     callbackURL: "/api/v1/auth/microsoft/redirect",
// //     scope: ["student.read"],
// //     tenant: "common", // Use 'common' for multi-tenant apps
// // },
// //     async (accessToken, refreshToken, profile, done) => {
// //         try {
// //             const email = profile.emails[0].value;

// //             let student = await student.findOne({ email });

// //             if (!student) {
// //                 student = await student.create({
// //                     name: profile.displayName,
// //                     email: email,
// //                     isVerified: true, // Microsoft verified accounts
// //                     isloggedIn: true,
// //                     password: Math.random().toString(36).slice(-12), // Random password since it's required but won't be used
// //                 });
// //             }
// //             return done(null, student);
// //         } catch (err) {
// //             return done(err, null);
// //         }
// //     }
// // )
// // );


// // // Authenticate with Facebook
// // passport.use(new FacebookStrategy({
// //     clientID: process.env.FACEBOOK_APP_ID,
// //     clientSecret: process.env.FACEBOOK_APP_SECRET,
// //     callbackURL: "/api/v1/auth/facebook/callback",
// //     profileFields: ['id', 'displayName', 'emails'] 
// // }, async (accessToken, refreshToken, profile, done) => {
// //     try {
// //         const email = profile.emails ? profile.emails[0].value : `${profile.id}@facebook.com`;
// //         let student = await student.findOne({ email });

// //         if (!student) {
// //             student = await student.create({
// //                 name: profile.displayName,
// //                 email: email,
// //                 isVerified: true,
// //                 isloggedIn: true,
// //                 password: Math.random().toString(36).slice(-12)
// //             });
// //         }
// //         return done(null, student);
// //     } catch (err) { return done(err, null); }
// // }));


// --- X (Twitter) Strategy ---
passport.use(
  new TwitterStrategy({
      clientID: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      clientType: 'confidential',
      callbackURL: 'https://api-pathiq.onrender.com/api/v1/oauth/x/callback',
    // callbackURL: 'http://localhost:9000/api/v1/oauth/x/callback',
      scope: ['users.read', 'tweet.read'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {

        let user = await Student.findOne({ twitterId: profile.id }) || await Guardian.findOne({ twitterId: profile.id }) || await Admin.findOne({ twitterId: profile.id });

        if (!user) {
            user = await Student.create({
            twitterId: profile.id,
            name: profile.displayName,
            email: profile.emails ? profile.emails[0].value : `${profile.id}@twitter.com`,
            isVerified: true,
            isloggedIn: true,
            password: Math.random().toString(36).slice(-12),
            uniqueCode: Math.random().toString(36).slice(-12)
        })
        || await Guardian.create({
            twitterId: profile.id,
            name: profile.displayName,
            email: profile.emails ? profile.emails[0].value : `${profile.id}@twitter.com`,
            isVerified: true,
            isloggedIn: true,
            password: Math.random().toString(36).slice(-12)
        })
        || await Admin.create({
            twitterId: profile.id,
            name: profile.displayName,
            email: profile.emails ? profile.emails[0].value : `${profile.id}@twitter.com`,
            isVerified: true,
            isloggedIn: true,
            password: Math.random().toString(36).slice(-12)
        });

        }
        return done(null, user);
      } catch (err) { 
        return done(err, null); 
      }
    }
  )
);

module.exports = passport
