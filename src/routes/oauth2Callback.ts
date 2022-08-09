const router = require('express').Router();
import passport from 'passport';

router.get('/github', 
  passport.authenticate('github', { 
    failureRedirect: "https://jewel-slinger.netlify.app/", 
    session: true , 
    failureMessage: true 
  }),
  function(req: any, res: any) {
    console.log("<--------callback from server github")
      // Successful authentication, redirect home.
     res.redirect("https://jewel-slinger.netlify.app/");
  }
);

router.get('/twitter', 
  passport.authenticate('twitter', { 
    failureRedirect: '/', 
    failureMessage: true 
  }),
  function(req: any, res: any) {
     res.redirect("https://jewel-slinger.netlify.app/");
  }
);

router.get('/google',
  passport.authenticate('google', { 
    failureRedirect: '/', 
    failureMessage: true 
  }),
function(req: any, res: any) {
    res.redirect("https://jewel-slinger.netlify.app/");
});


// app.get('/instagram', 
//   passport.authenticate('instagram', { failureRedirect: '/', failureMessage: true }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect("https://jewel-slinger.netlify.app/");
//   });