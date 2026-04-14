const pool = require('../db/pool');

// GET /api/clientes
const getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clientes');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los clientes' });
  }
};

// GET /api/clientes/:id
const getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el cliente' });
  }
};

// POST /api/clientes
const create = async (req, res) => {
  const { nombre, email, telefono } = req.body;
  if (!nombre || !email) {
    return res.status(400).json({ error: 'Los campos nombre y email son obligatorios' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO clientes (nombre, email, telefono) VALUES (?, ?, ?)',
      [nombre, email, telefono ?? null]
    );
    res.status(201).json({ id: result.insertId, nombre, email, telefono });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Ya existe un cliente con ese email' });
    }
    res.status(500).json({ error: 'Error al crear el cliente' });
  }
};

// PUT /api/clientes/:id
const update = async (req, res) => {
  const { nombre, email, telefono } = req.body;
  if (!nombre || !email) {
    return res.status(400).json({ error: 'Los campos nombre y email son obligatorios' });
  }
  try {
    const [result] = await pool.query(
      'UPDATE clientes SET nombre = ?, email = ?, telefono = ? WHERE id = ?',
      [nombre, email, telefono ?? null, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json({ id: Number(req.params.id), nombre, email, telefono });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Ya existe un cliente con ese email' });
    }
    res.status(500).json({ error: 'Error al actualizar el cliente' });
  }
};

module.exports = { getAll, getById, create, update };
