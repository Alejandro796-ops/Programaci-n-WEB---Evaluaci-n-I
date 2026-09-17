const express = require('express');
const incidenciasRoutes = require('./routes/incidenciasRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/incidencias', incidenciasRoutes);

app.get('/', (req, res) => {
    res.json({ mensaje: "Bienvenido a la API de TechSupport S.A." });
});

app.listen(PORT, () => {
    console.log(` Servidor corriendo en http://localhost:${PORT}`);
});