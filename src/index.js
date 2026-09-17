const express = require('express');

const incidenciasRoutes = require('./routes/incidenciasRoutes');

const app = express();

//Puerto donde correra el server.
const PORT = 3000;

app.use(express.json());

app.use('/api/incidencias', incidenciasRoutes);

/* Ruta de prueba, creada meramente para verificar 
que hasta este punto todo funciona correctamente*/
app.get('/', (req, res) => {
    res.json({ 
        mensaje: "Bienvenido a la API de TechSupport S.A.",
        estado: "Funcionando correctamente"
    });
});

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📋 Endpoint de prueba: http://localhost:${PORT}/`);
    console.log(` API de incidencias: http://localhost:${PORT}/api/incidencias`);
});