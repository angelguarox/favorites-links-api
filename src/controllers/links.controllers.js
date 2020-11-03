const pool = require('../database/database');

const allLinks = async (req, res) => {
	const links = await pool.query('select * from links where user_id = ?', [req.user.id]);
	res.render('links/list', {links});
};

const renderLinks = (req, res) => {
	res.render('links/add');
};

const addLink = async (req, res) => {
	const {title, url, description} = req.body;
	const newLink = {title, url, description, user_id: req.user.id};
	await pool.query('insert into links set ?', [newLink]);
	req.flash('success', 'Link saved successfully');
	res.redirect('/links/');
};

const deleteLink = async (req, res) => {
	const {id} = req.params;
	await pool.query('delete from links where id = ?', [id]);
	req.flash('success', 'Link deleted successfully');
	res.redirect('/links/');
};

const editLinkGet = async (req, res) => {
	const {id} = req.params;
	const links = await pool.query('select * from links where id = ?', [id]);
	req.flash('success', 'Link edited successfully');
	res.render('links/edit', {link: links[0]});
};

const editLinkPost = async (req, res) => {
	const {id} = req.params;
	const {title, url, description} = req.body;
	const newLink = {title, url, description};
	await pool.query('update links set ? where id = ?', [newLink, id]);
	req.flash('success', 'Link updated successfully');
	res.redirect('/links/');
};

module.exports = {allLinks, renderLinks, addLink, deleteLink, editLinkGet, editLinkPost};