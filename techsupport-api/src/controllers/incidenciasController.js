const { getIncidencias, addIncidencia, setIncidencias } = require('../data/db');

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

// 3. Buscar Incidencia por ID
const buscarPorId = (req, res) => {
    const id = parseInt(req.params.id);
    const incidencias = getIncidencias();


    const incidencia = incidencias.find(inc => inc.id === id);

    if (!incidencia) {
        return res.status(404).json({ error: "Incidencia no encontrada" });
    }

    res.status(200).json(incidencia);
};

// 4. Cambiar Estado de Incidencia
const cambiarEstado = (req, res) => {
    const id = parseInt(req.params.id);
    const { nuevoEstado } = req.body;
    const incidencias = getIncidencias();


    const incidencia = incidencias.find(inc => inc.id === id);
    if (!incidencia) {
        return res.status(404).json({ error: "Incidencia no encontrada" });
    }

    //Uso de switch
    let estadoValido = false;
    switch (nuevoEstado) {
        case "Pendiente":
        case "En proceso":
        case "Resuelto":
        case "Cancelado":
            estadoValido = true;
            break;
        default:
            estadoValido = false;
    }

    if (!estadoValido) {
        return res.status(400).json({ 
            error: "Estado no válido. Debe ser: Pendiente, En proceso, Resuelto o Cancelado" 
        });
    }

    // Actualizacion del estado
    incidencia.estado = nuevoEstado;

    res.status(200).json({ 
        mensaje: "Estado actualizado correctamente", 
        incidencia 
    });
};

// 5. Eliminar Incidencia
const eliminarIncidencia = (req, res) => {
    const id = parseInt(req.params.id);
    let incidencias = getIncidencias();

    // Verifica si el archivo existe o no
    const existe = incidencias.find(inc => inc.id === id);
    if (!existe) {
        return res.status(404).json({ error: "Incidencia no encontrada" });
    }

    // Uso de .filter() para crear un nuevo arreglo sin la incidencia eliminada
    const nuevoArreglo = incidencias.filter(inc => inc.id !== id);
    
    setIncidencias(nuevoArreglo);

    res.status(200).json({ 
        mensaje: "Incidencia eliminada con éxito",
        incidenciasRestantes: nuevoArreglo.length 
    });
};

// Exportacion de funciones
module.exports = { 
    listarIncidencias, 
    registrarIncidencia,
    buscarPorId,
    cambiarEstado,
    eliminarIncidencia
};