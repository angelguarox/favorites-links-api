const pool = require('../database');
const chalk = require('chalk');
const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../lib/auth');


router.get('/', isLoggedIn, async (req, res) => {
	const links = await pool.query('select * from links where user_id = ?', [req.user.id]);
	console.log(chalk.green(links));
	res.render('links/list', {links});
});

router.get('/add', isLoggedIn, (req, res) => {
	res.render('links/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
	const {title, url, description} = req.body;
	const newLink = {title, url, description, user_id: req.user.id};
	console.log(chalk.green(newLink));
	await pool.query('insert into links set ?', [newLink]);
	req.flash('success', 'Link saved successfully');
	res.redirect('/links');
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
	const {id} = req.params;
	console.log(chalk.green('Your was deleted: ', id));
	await pool.query('delete from links where id = ?', [id]);
	req.flash('success', 'Link deleted successfully');
	res.redirect('/links');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
	const {id} = req.params;
	console.log(chalk.green('Your was edited: ', id));
	const links = await pool.query('select * from links where id = ?', [id]);
	req.flash('success', 'Link edited successfully');
	res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
	const {id} = req.params;
	const {title, url, description} = req.body;
	const newLink = {title, url, description};
	console.log(chalk.green('Your was edited: ', id, newLink));
	await pool.query('update links set ? where id = ?', [newLink, id]);
	req.flash('success', 'Link updated successfully');
	res.redirect('/links');
});

module.exports = router;