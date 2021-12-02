const express = require('express');
const router = express.Router();
const User = require('../models/user');
const users = require('../controllers/users')
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const passport = require('passport');

// Register Routes
// Grouping those routes having the same path "/register":
// router.get('/register', users.renderRegisterForm);
// router.post('/register', catchAsync(users.register));
router.route('/register')
    .get(users.renderRegisterForm)
    .post(catchAsync(users.register))

// Login Routes
// Grouping those routes having the same path "/login":
// router.get('/login', users.renderLoginForm);
// router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect:'/login'}), users.login)
router.route('/login')
    .get(users.renderLoginForm)
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect:'/login'}), users.login)

// logout
router.get('/logout', users.logout);

module.exports = router;