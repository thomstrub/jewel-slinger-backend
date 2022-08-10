const router = require('express').Router();
import passport from 'passport';
const authControl = require('../controllers/auth');
const itemControl = require('../controllers/item');

router.post('/', authControl.isLoggedIn, itemControl.index);


module.exports = router;