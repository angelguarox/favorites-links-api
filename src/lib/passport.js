const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database/database');
const helpers = require('./helpers');

passport.use('local.signup', new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true
}, async (req, username, password, done) => {
	const {fullname} = req.body;
	const newUser = {
		fullname,
		username,
		password
	};
	newUser.password = await helpers.encryptPassword(password);
	const resultUser = await pool.query('insert into users set ?', [newUser]);
	newUser.id = resultUser.insertId;
	return done(null, newUser);
}));

passport.use('local.signin', new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true
}, async (req, username, password, done) => {
	const rows = await pool.query('select * from users where username = ?', [username]);
	if(rows.length > 0){
		const user = rows[0];
		const validPassword = await helpers.matchPassword(password, user.password);
		if(validPassword){
			done(null, user, req.flash('success', 'Welcome, ' + user.username));
		}
		else{
			done(null, false, req.flash('message', 'Incorrect password'));
		}
	}
	else{
		return done(null, false, req.flash('message', 'Username does not exists'));
	}
}));

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const rows = await pool.query('select * from users where id = ?', [id]);
	done(null, rows[0]);
});