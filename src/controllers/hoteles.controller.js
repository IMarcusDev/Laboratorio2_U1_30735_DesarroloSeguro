const pool = require('../db/pool');

// GET /api/hoteles
const getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM hoteles');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los hoteles' });
  }
};

// GET /api/hoteles/:id
const getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM hoteles WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Hotel no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el hotel' });
  }
};

// POST /api/hoteles
const create = async (req, res) => {
  const { nombre, direccion, estrellas, telefono } = req.body;
  if (!nombre || !direccion) {
    return res.status(400).json({ error: 'Los campos nombre y direccion son obligatorios' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO hoteles (nombre, direccion, estrellas, telefono) VALUES (?, ?, ?, ?)',
      [nombre, direccion, estrellas ?? null, telefono ?? null]
    );
    res.status(201).json({ id: result.insertId, nombre, direccion, estrellas, telefono });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el hotel' });
  }
};

// PUT /api/hoteles/:id
const update = async (req, res) => {
  const { nombre, direccion, estrellas, telefono } = req.body;
  if (!nombre || !direccion) {
    return res.status(400).json({ error: 'Los campos nombre y direccion son obligatorios' });
  }
  try {
    const [result] = await pool.query(
      'UPDATE hoteles SET nombre = ?, direccion = ?, estrellas = ?, telefono = ? WHERE id = ?',
      [nombre, direccion, estrellas ?? null, telefono ?? null, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Hotel no encontrado' });
    res.json({ id: Number(req.params.id), nombre, direccion, estrellas, telefono });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el hotel' });
  }
};

module.exports = { getAll, getById, create, update };
