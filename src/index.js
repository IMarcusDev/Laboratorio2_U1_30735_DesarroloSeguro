require('dotenv').config();
const express = require('express');

const hotelesRoutes   = require('./routes/hoteles.routes');
const clientesRoutes  = require('./routes/clientes.routes');
const reservasRoutes  = require('./routes/reservas.routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/api/hoteles',  hotelesRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/reservas', reservasRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
