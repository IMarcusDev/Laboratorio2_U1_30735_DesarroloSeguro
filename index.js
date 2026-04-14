require('dotenv').config();
const express = require('express');

const hotelesRoutes   = require('./src/routes/hoteles.routes');
const clientesRoutes  = require('./src/routes/clientes.routes');
const reservasRoutes  = require('./src/routes/reservas.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/hoteles',  hotelesRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/reservas', reservasRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
