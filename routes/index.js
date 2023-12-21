// routes/index.js
const express = require('express');
const usuariosRouter = require('./usuarios.js');  
const authRouter = require('./auth.js');  

const router = express.Router();

// Agrega esta línea para que Express pueda parsear el cuerpo de las solicitudes
router.use(express.json());

// Ajusta las rutas según tu estructura
router.use('/usuarios', usuariosRouter);
router.use('/auth', authRouter);

module.exports = router;
