const pool = require('../db/pool');

// GET /api/reserva
const getAll = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT r.*, h.nombre AS hotel_nombre, c.nombre AS cliente_nombre
      FROM reserva r
      JOIN hoteles h ON r.hotel_id = h.id
      JOIN clientes c ON r.cliente_id = c.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las reservas' });
  }
};

// GET /api/reserva/:id
const getById = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT r.*, h.nombre AS hotel_nombre, c.nombre AS cliente_nombre
      FROM reserva r
      JOIN hoteles h ON r.hotel_id = h.id
      JOIN clientes c ON r.cliente_id = c.id
      WHERE r.id = $1
    `, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la reserva' });
  }
};

// POST /api/reserva
const create = async (req, res) => {
  const { fecha_entrada, fecha_salida, num_huespedes, hotel_id, cliente_id } = req.body;
  if (!fecha_entrada || !fecha_salida || !hotel_id || !cliente_id) {
    return res.status(400).json({
      error: 'Los campos fecha_entrada, fecha_salida, hotel_id y cliente_id son obligatorios',
    });
  }
  try {
    const { rows } = await pool.query(
      `INSERT INTO reserva (fecha_entrada, fecha_salida, num_huespedes, hotel_id, cliente_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [fecha_entrada, fecha_salida, num_huespedes ?? 1, hotel_id, cliente_id]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === '23503') {
      return res.status(400).json({ error: 'El hotel_id o cliente_id proporcionado no existe' });
    }
    res.status(500).json({ error: 'Error al crear la reserva' });
  }
};

// PUT /api/reserva/:id
const update = async (req, res) => {
  const { fecha_entrada, fecha_salida, num_huespedes, hotel_id, cliente_id } = req.body;
  if (!fecha_entrada || !fecha_salida || !hotel_id || !cliente_id) {
    return res.status(400).json({
      error: 'Los campos fecha_entrada, fecha_salida, hotel_id y cliente_id son obligatorios',
    });
  }
  try {
    const { rows } = await pool.query(
      `UPDATE reserva
       SET fecha_entrada = $1, fecha_salida = $2, num_huespedes = $3, hotel_id = $4, cliente_id = $5
       WHERE id = $6 RETURNING *`,
      [fecha_entrada, fecha_salida, num_huespedes ?? 1, hotel_id, cliente_id, req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.json(rows[0]);
  } catch (err) {
    if (err.code === '23503') {
      return res.status(400).json({ error: 'El hotel_id o cliente_id proporcionado no existe' });
    }
    res.status(500).json({ error: 'Error al actualizar la reserva' });
  }
};

module.exports = { getAll, getById, create, update };
