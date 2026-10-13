const express = require('express');
const cursoRoutes = require('./routes/cursoRoutes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  const startMs = Date.now();
  res.on('finish', () => {
    const durationMs = Date.now() - startMs;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${durationMs}ms`);
  });
  next();
});

app.use('/api/cursos', cursoRoutes);

// Manejo de rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Ruta ${req.originalUrl} no encontrada en el servidor`
  });
});


app.use((err, req, res, next) => {
  console.error('Error no controlado:', err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Error interno del servidor',
    error: err.message
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor de Cursos ejecutándose en el puerto ${PORT}`);
});