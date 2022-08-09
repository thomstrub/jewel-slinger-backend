const router = require('express').Router();
import passport from 'passport';
const authControl = require('../controllers/auth');

router.get('/logout', authControl.isLoggedIn, authControl.logout);

router.get('/getuser', authControl.isLoggedIn, authControl.getUser)

//passport routes

router.get('/login/github', passport.authenticate('github'));

router.get('/login/twitter', passport.authenticate('twitter'));

router.get('/login/google', passport.authenticate('google'));

// app.get('/auth/login/instagram', passport.authenticate('instagram', {scope: ['profile'] }));
