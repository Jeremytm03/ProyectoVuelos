// routes/usuario.js
const express = require('express');
const sql = require('mssql');
const dbConfig = require('../dbConfig');

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query('SELECT * FROM Usuario');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Validar los datos (puedes usar una biblioteca de validación como 'validator')

    // Insertar el nuevo usuario en la base de datos
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input('Username', sql.NVarChar, username)
      .input('Password', sql.NVarChar, password)
      .input('Email', sql.NVarChar, email)
      .query('INSERT INTO Usuario (Username, Password, Email) VALUES (@Username, @Password, @Email)');

    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para actualizar un usuario por su ID
router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, password, email } = req.body;

    // Validar los datos y verificar si el usuario existe en la base de datos

    // Actualizar la información del usuario
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input('UserId', sql.Int, userId)
      .input('Username', sql.NVarChar, username)
      .input('Password', sql.NVarChar, password)
      .input('Email', sql.NVarChar, email)
      .query('UPDATE Usuario SET Username = @Username, Password = @Password, Email = @Email WHERE ID = @UserId');

    res.status(200).json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para eliminar un usuario por su ID
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Verificar si el usuario existe en la base de datos

    // Eliminar el usuario
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input('UserId', sql.Int, userId)
      .query('DELETE FROM Usuario WHERE ID = @UserId');

    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
});

module.exports = router;
