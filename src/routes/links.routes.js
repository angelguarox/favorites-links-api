const express = require('express');
const {isLoggedIn} = require('../lib/auth');
const ctrl = require('../controllers/links.controllers');

const router = express.Router();

router.get('/links/', isLoggedIn, ctrl.allLinks);

router.get('/links/add', isLoggedIn, ctrl.renderLinks);

router.post('/links/add', isLoggedIn, ctrl.addLink);

router.get('/links/delete/:id', isLoggedIn, ctrl.deleteLink);

router.get('/links/edit/:id', isLoggedIn, ctrl.editLinkGet);

router.post('/links/edit/:id', isLoggedIn, ctrl.editLinkPost);

module.exports = router;