const router = require('express').Router();
import passport from 'passport';
const authControl = require('../controllers/auth');
const itemControl = require('../controllers/item');

router.get('/', authControl.isLoggedIn, itemControl.index);


module.exports = router;