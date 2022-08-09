import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
const cookieParser = require('cookie-parser');

dotenv.config();

// create the Express app
const app = express();
const port = process.env.PORT || 4000;

//Connection to Mongo DB
require('./config/database');
// Connection to Passport 
require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

//require routes
const authRoutes = require('./routes/auth');
const oauth2CallbackRoutes = require('./routes/oauth2Callback');


app.use(express.json());
app.use(cors({origin:"https://jewel-slinger.netlify.app", credentials: true}));
app.use(cookieParser());

app.set("trust proxy", 1);

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7 // One Week
    }
  })
);




// ------------------------------------- ROUTES ------------------------

// -------Google 

// app.get('/auth/login/google', passport.authenticate('google', {scope: ['profile'] }));

// app.get('/oauth2/redirect/google',
// passport.authenticate('google', { failureRedirect: '/', failureMessage: true }),
// function(req, res) {
//     res.redirect("https://jewel-slinger.netlify.app/");
// });

// --------- Insta

// app.get('/auth/login/instagram', passport.authenticate('instagram', {scope: ['profile'] }));

// app.get('/oauth2/redirect/instagram', 
//   passport.authenticate('instagram', { failureRedirect: '/', failureMessage: true }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect("https://jewel-slinger.netlify.app/");
//   });

// -------- Twitter  
// app.get('/auth/login/twitter', passport.authenticate('twitter'));

// app.get('/oauth2/redirect/twitter', 
//   passport.authenticate('twitter', { failureRedirect: '/', failureMessage: true }),
//   function(req, res) {
//       // Successful authentication, redirect home.
//      res.redirect("https://jewel-slinger.netlify.app/");
//   });

// ------- GitHub  

// app.get('/auth/login/github', passport.authenticate('github'));

// app.get('/oauth2/redirect/github', 
//   passport.authenticate('github', { failureRedirect: "https://jewel-slinger.netlify.app/", session: true , failureMessage: true }),
//   function(req, res) {
//     console.log("<--------callback from server github")
//       // Successful authentication, redirect home.
//      res.redirect("https://jewel-slinger.netlify.app/");
//   });

// app.get("/auth/getuser", (req, res) => {
//   // console.log(req, "req from context request");
//   if(req.user){
//     res.send(req.user);
//   }else{
//     console.log("no user from /getuser");
//   }
  
// })

// app.get('/auth/logout', function(req, res, next) {
//   if(req.user){
//     console.log("logout route firing");
//     req.logout(function(err) {
//       if (err) { return next(err); }
//       res.send("done");
//     });
//   } else {
//     throw new Error("User previously logged out.");
//   }

// });

app.use('/auth', authRoutes);
app.use('./oauth2/redirect', oauth2CallbackRoutes);

app.get('/', (req, res) => {
    res.send('Hello f Internet');
  });
  
  app.listen(port, () => {
    console.log(`[server]: Server is now ~~~~ running at https://localhost:${port}`);
  });
  