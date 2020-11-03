const passport = require('passport');

const signupGet = (req, res) => {
	res.render('auth/signup');
};

const signupPost = passport.authenticate('local.signup', {
	successRedirect: '/auth/signin',
	failureRedirect: '/auth/signup',
	failureFlash: true
});

const signinGet = (req, res) => {
	res.render('auth/signin');
};

const signinPost = (req, res, next) => {
	passport.authenticate('local.signin', {
		successRedirect: '/auth/profile',
		failureRedirect: '/auth/signin',
		failureFlash: true
	})(req, res, next);
};

const profile = (req, res) => {
	res.render('profile');
};

const logout = (req, res) => {
	req.logOut();
	res.redirect('/auth/signin');
};

module.exports = {signupGet, signupPost, signinGet, signinPost, profile, logout};