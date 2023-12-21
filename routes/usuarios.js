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
    const {
      codigo,
      nombre,
      primer_apellido,
      segundo_apellido,
      correo_electronico,
      nombre_usuario,
      contrasena,
      rol,
    } = req.body;

    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input('Codigo', sql.Int, codigo)
      .input('Nombre', sql.NVarChar, nombre)
      .input('PrimerApellido', sql.NVarChar, primer_apellido)
      .input('SegundoApellido', sql.NVarChar, segundo_apellido)
      .input('CorreoElectronico', sql.NVarChar, correo_electronico)
      .input('NombreUsuario', sql.NVarChar, nombre_usuario)
      .input('Contrasena', sql.NVarChar, contrasena)
      .input('Rol', sql.Int, rol)
      .query(
        'INSERT INTO Usuario (codigo, nombre, primer_apellido, segundo_apellido, correo_electronico, nombre_usuario, contrasena, rol) ' +
          'VALUES (@Codigo, @Nombre, @PrimerApellido, @SegundoApellido, @CorreoElectronico, @NombreUsuario, @Contrasena, @Rol)'
      );

    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para actualizar un usuario por su código
router.put('/:codigo', async (req, res) => {
  try {
    const {
      nombre,
      primer_apellido,
      segundo_apellido,
      correo_electronico,
      nombre_usuario,
      contrasena,
      rol,
    } = req.body;

    const codigo = req.params.codigo;

    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input('Nombre', sql.NVarChar, nombre)
      .input('PrimerApellido', sql.NVarChar, primer_apellido)
      .input('SegundoApellido', sql.NVarChar, segundo_apellido)
      .input('CorreoElectronico', sql.NVarChar, correo_electronico)
      .input('NombreUsuario', sql.NVarChar, nombre_usuario)
      .input('Contrasena', sql.NVarChar, contrasena)
      .input('Rol', sql.Int, rol)
      .input('Codigo', sql.Int, codigo)
      .query(
        'UPDATE Usuario SET nombre = @Nombre, primer_apellido = @PrimerApellido, ' +
          'segundo_apellido = @SegundoApellido, correo_electronico = @CorreoElectronico, ' +
          'nombre_usuario = @NombreUsuario, contrasena = @Contrasena, rol = @Rol ' +
          'WHERE codigo = @Codigo'
      );

    res.status(200).json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para eliminar un usuario por su código
router.delete('/:codigo', async (req, res) => {
  try {
    const codigo = req.params.codigo;

    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input('Codigo', sql.Int, codigo)
      .query('DELETE FROM Usuario WHERE codigo = @Codigo');

    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
});

module.exports = router;
