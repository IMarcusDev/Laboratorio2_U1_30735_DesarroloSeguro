const pool = require('../db/pool');

// GET /api/hotel
const getAll = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM hotel');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los hotel' });
  }
};

// GET /api/hotel/:id
const getById = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM hotel WHERE id = $1', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Hotel no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el hotel' });
  }
};

// POST /api/hotel
const create = async (req, res) => {
  const { nombre, direccion, estrellas, telefono } = req.body;
  if (!nombre || !direccion) {
    return res.status(400).json({ error: 'Los campos nombre y direccion son obligatorios' });
  }
  try {
    const { rows } = await pool.query(
      'INSERT INTO hotel (nombre, direccion, estrellas, telefono) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, direccion, estrellas ?? null, telefono ?? null]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el hotel' });
  }
};

// PUT /api/hotel/:id
const update = async (req, res) => {
  const { nombre, direccion, estrellas, telefono } = req.body;
  if (!nombre || !direccion) {
    return res.status(400).json({ error: 'Los campos nombre y direccion son obligatorios' });
  }
  try {
    const { rows } = await pool.query(
      'UPDATE hotel SET nombre = $1, direccion = $2, estrellas = $3, telefono = $4 WHERE id = $5 RETURNING *',
      [nombre, direccion, estrellas ?? null, telefono ?? null, req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Hotel no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el hotel' });
  }
};

module.exports = { getAll, getById, create, update };
