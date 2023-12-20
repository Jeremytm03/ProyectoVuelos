const express = require('express');
const usuarios = require('./usuarios.js');
const auth = require('./auth.js');

const router = express.Router();

router.use('/usuarios', usuarios);
router.use('auth', auth);

module.exports = router;
