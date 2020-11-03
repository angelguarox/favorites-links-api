const express = require('express');
const ctrl = require('../controllers/index.controllers');

const router = express.Router();

router.get('/', ctrl.index);

module.exports = router;