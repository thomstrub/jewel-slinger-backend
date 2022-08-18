import passport from "passport";
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const InstagramStrategy = require('passport-instagram').Strategy;
const TwitterStrategy = require('passport-twitter');
const GitHubStrategy = require('passport-github');

import User from '../models/User';
import {IUser, IMongoDBUser} from '../types';

//type alias using union types
type PassportCallback = (err: Error | null, obj: IMongoDBUser | IUser | null)=>void;

// ________________________________Google Strategy
passport.use(new GoogleStrategy({
    clientID: `${process.env.CLIENT_ID}`,
    clientSecret: `${process.env.CLIENT_SECRET}`,
    callbackURL: '/oauth2/redirect/google',
    scope: [ 'profile' ],
    state: true
  },

  function verify(accessToken: any, refreshToken: any, profile: any, cb: PassportCallback) {
    console.log("verify function running");
    User.findOne({googleId: profile.id}, async (err: Error, doc: IMongoDBUser) => {
      console.log("Mongo Function Firing!")
      if(err){
        return cb(err, null);
      }
      console.log("No err!")
      if(!doc){
        //create a record
        const newUser = new User({
          googleId: profile.id,
          username: profile.displayName
        });
        await newUser.save();
        cb(null, newUser);
      } else {
        cb(null, doc);
      }
    })
    }
  ));

// ________________________________Instagram Strategy

// passport.use(new InstagramStrategy({
//     clientID: `${process.env.INSTAGRAM_ID}`,
//     clientSecret: '${process.env.INSTAGRAM_SECRET}',
//     callbackURL: "/oauth2/redirect/instagram"
//   },
//   function(accessToken: any, refreshToken: any, profile: any, done: any) {
    // User.findOne({googleId: profile.id}, async (err: Error, doc: IUser) => {
    //   console.log("Mongo Function Firing!")
    //   if(err){
    //     return done(err, null);
    //   }
    //   console.log("No err!")
    //   if(!doc){
    //     //create a record
    //     const newUser = new User({
    //       instagramId: profile.id,
    //       username: profile.displayName
    //     });
    //     await newUser.save();
    //     console.log("newUser saved<------")
    //   }
    // })
    
//       console.log(profile, "<---------profile--------")
//     done(null, profile);
      
//   }
// ));
  
// ________________________________Twitter Strategy

passport.use(new TwitterStrategy({
    consumerKey: `${process.env.TWITTER_ID}`,
    consumerSecret: `${process.env.TWITTER_SECRET}`,
    callbackURL: "/oauth2/redirect/twitter"
  },
  function(token: any, tokenSecret: any, profile: any, cb: PassportCallback) {
    User.findOne({twitterId: profile.id}, async (err: Error, doc: IMongoDBUser) => {
      console.log("Mongo Function Firing!")
      if(err){
        return cb(err, null);
      }
      console.log("No err!")
      if(!doc){
        //create a record
        const newUser = new User({
         twitterId: profile.id,
          username: profile.displayName
        });
        await newUser.save();
        cb(null, newUser);
        console.log("newUser saved<------")
      } else {
        cb(null, doc);
      }
    })
  }
));

// ________________________________GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: `${process.env.GITHUB_ID}`,
    clientSecret: `${process.env.GITHUB_SECRET}`,
    callbackURL: "/oauth2/redirect/github",
    state: true
  },
  function(accessToke: any, refreshToken: any, profile: any, cb: PassportCallback) {

    User.findOne({githubId: profile.id}, async (err: Error, doc: IMongoDBUser) => {
      console.log("Mongo Function Firing!")
      if(err){
        return cb(err, null);
      }
      console.log("No err!")
      if(!doc){
        console.log("create user firing");
        //create a record
        const newUser = new User({
          githubId: profile.id,
          username: profile.displayName
        });
        await newUser.save();
        cb(null, newUser);
        console.log("newUser saved<------")
      } 
      console.log(doc, " <-------- doc");
      cb(null, doc);
      
    })
  }
));

passport.serializeUser((user: any, done: any) => {
    return done(null, user._id);
});
  
passport.deserializeUser((id: any, done: any) => {
    User.findById(id, (err: Error, doc:any) => {
      return done(null, doc);
    })
});