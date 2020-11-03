const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const mysqlstore = require('express-mysql-session');
const passport = require('passport');
const helpers = require('../lib/handlebars');
const indexRoutes = require('../routes/index.routes');
const authRoutes = require('../routes/auth.routes');
const linksRoutes = require('../routes/links.routes');
const {server, database} = require('../lib/keys');
const libPassport = require('../lib/passport');

const app = express();

libPassport;

app.set('port', server.port);
app.set('views', path.join(__dirname, '../views'));
app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	layoutsDir: path.join(app.get('views'), 'layouts'),
	partialsDir: path.join(app.get('views'), 'partials'),
	extname: '.hbs',
	helpers: helpers
}));
app.set('view engine', '.hbs');

app.use(session({
	secret: 'favoriteslinkssession',
	resave: false,
	saveUninitialized: false,
	store: new mysqlstore(database)
}));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
	app.locals.success = req.flash('success');
	app.locals.message = req.flash('message');
	app.locals.user = req.user;
	next();
});

app.use(indexRoutes);
app.use(authRoutes);
app.use(linksRoutes);

app.use(express.static(path.join(__dirname, '../public')));

module.exports = app;