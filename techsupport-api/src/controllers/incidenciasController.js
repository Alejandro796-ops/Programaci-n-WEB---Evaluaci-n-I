const { getIncidencias, addIncidencia } = require('../data/db');

// 1. Listar todas las incidencias
const listarIncidencias = (req, res) => {
    const incidencias = getIncidencias();
    res.status(200).json(incidencias);
};

// 2. Registrar una nueva incidencia
const registrarIncidencia = (req, res) => {
    const { titulo, descripcion, prioridad } = req.body;

    // Condicion de Validación: Todos los campos son obligatorios
    if (!titulo || !descripcion || !prioridad) {
        return res.status(400).json({ 
            error: "Todos los campos son obligatorios: titulo, descripcion, prioridad" 
        });
    }

    // Condicion de Validación: No se permiten cadenas vacías
    if (titulo.trim() === "" || descripcion.trim() === "") {
        return res.status(400).json({ 
            error: "No se permiten cadenas vacías" 
        });
    }

    // Condicion de validación: Prioridad solo puede ser Alta, Media o Baja
    const prioridadesValidas = ["Alta", "Media", "Baja"];
    if (!prioridadesValidas.includes(prioridad)) {
        return res.status(400).json({ 
            error: "Prioridad solo puede ser: Alta, Media o Baja" 
        });
    }

    // Creacion de nueva incidencia
    const incidencias = getIncidencias();
    const nuevaIncidencia = {
        id: incidencias.length > 0 ? Math.max(...incidencias.map(i => i.id)) + 1 : 1,
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        prioridad: prioridad,
        estado: "Pendiente", // Estado por defecto
        fecha: new Date().toISOString()
    };

    // Agregar al arreglo
    addIncidencia(nuevaIncidencia);

    res.status(201).json({
        mensaje: "Incidencia registrada con éxito",
        incidencia: nuevaIncidencia
    });
};

module.exports = { listarIncidencias, registrarIncidencia };