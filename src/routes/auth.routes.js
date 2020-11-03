const express = require('express');
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth');
const ctrl = require('../controllers/auth.controllers');

const router = express.Router();

router.get('/auth/signup', isNotLoggedIn, ctrl.signupGet);

router.post('/auth/signup', isNotLoggedIn, ctrl.signupPost);

router.get('/auth/signin', isNotLoggedIn, ctrl.signinGet);

router.post('/auth/signin', isNotLoggedIn, ctrl.signinPost);

router.get('/auth/profile', isLoggedIn, ctrl.profile);

router.get('/auth/logout', isLoggedIn, ctrl.logout);

module.exports = router;