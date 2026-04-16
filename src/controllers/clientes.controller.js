const pool = require('../db/pool');

// GET /api/cliente
const getAll = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM cliente');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los cliente' });
  }
};

// GET /api/cliente/:id
const getById = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM cliente WHERE id = $1', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el cliente' });
  }
};

// POST /api/cliente
const create = async (req, res) => {
  const { nombre, email, telefono } = req.body;
  if (!nombre || !email) {
    return res.status(400).json({ error: 'Los campos nombre y email son obligatorios' });
  }
  try {
    const { rows } = await pool.query(
      'INSERT INTO cliente (nombre, email, telefono) VALUES ($1, $2, $3) RETURNING *',
      [nombre, email, telefono ?? null]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Ya existe un cliente con ese email' });
    }
    res.status(500).json({ error: 'Error al crear el cliente' });
  }
};

// PUT /api/cliente/:id
const update = async (req, res) => {
  const { nombre, email, telefono } = req.body;
  if (!nombre || !email) {
    return res.status(400).json({ error: 'Los campos nombre y email son obligatorios' });
  }
  try {
    const { rows } = await pool.query(
      'UPDATE cliente SET nombre = $1, email = $2, telefono = $3 WHERE id = $4 RETURNING *',
      [nombre, email, telefono ?? null, req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Ya existe un cliente con ese email' });
    }
    res.status(500).json({ error: 'Error al actualizar el cliente' });
  }
};

module.exports = { getAll, getById, create, update };
