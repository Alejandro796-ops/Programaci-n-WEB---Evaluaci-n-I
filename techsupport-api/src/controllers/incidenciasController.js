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

// 6. Estadisticas
const obtenerEstadisticas = (req, res) => {
    const incidencias = getIncidencias();

    const porEstado = incidencias.reduce((acc, incidencia) => {
        acc[incidencia.estado] = (acc[incidencia.estado] || 0) + 1;
        return acc;
    }, {});

    const porPrioridad = incidencias.reduce((acc, incidencia) => {
        acc[incidencia.prioridad] = (acc[incidencia.prioridad] || 0) + 1;
        return acc;
    }, {});

    const resueltas = incidencias.filter(inc => inc.estado === "Resuelto").length;

    const pendientes = incidencias.filter(inc => inc.estado === "Pendiente").length;

    const total = incidencias.length;
    const porcentajeResolucion = total > 0 ? (resueltas / total) * 100 : 0;

    res.status(200).json({
        totalIncidencias: total,
        porEstado,
        porPrioridad,
        resueltas,
        pendientes,
        porcentajeResolucion: `${porcentajeResolucion.toFixed(2)}%`
    });
};

// 7. Clasificación
const clasificacionAutomatica = (req, res) => {
    const id = parseInt(req.params.id);
    const incidencias = getIncidencias();
    
    const incidencia = incidencias.find(inc => inc.id === id);
    
    if (!incidencia) {
        return res.status(404).json({ error: "Incidencia no encontrada" });
    }

    let clasificacion = {};
    
    switch (incidencia.prioridad) {
        case "Alta":
            clasificacion = {
                id: incidencia.id,
                titulo: incidencia.titulo,
                prioridad: incidencia.prioridad,
                nivelUrgencia: 1,
                categoria: "Crítico",
                tiempoRespuestaHoras: 2,
                descripcionNivel: "Requiere atención inmediata",
                equipoAsignado: "Soporte Nivel 3"
            };
            break;
            
        case "Media":
            clasificacion = {
                id: incidencia.id,
                titulo: incidencia.titulo,
                prioridad: incidencia.prioridad,
                nivelUrgencia: 2,
                categoria: "Importante",
                tiempoRespuestaHoras: 8,
                descripcionNivel: "Debe ser atendido en el día",
                equipoAsignado: "Soporte Nivel 2"
            };
            break;
            
        case "Baja":
            clasificacion = {
                id: incidencia.id,
                titulo: incidencia.titulo,
                prioridad: incidencia.prioridad,
                nivelUrgencia: 3,
                categoria: "Normal",
                tiempoRespuestaHoras: 24,
                descripcionNivel: "Puede esperar hasta 24 horas",
                equipoAsignado: "Soporte Nivel 1"
            };
            break;
            
        default:
            clasificacion = {
                id: incidencia.id,
                titulo: incidencia.titulo,
                prioridad: incidencia.prioridad,
                nivelUrgencia: 4,
                categoria: "Sin clasificar",
                tiempoRespuestaHoras: 48,
                descripcionNivel: "Prioridad no reconocida",
                equipoAsignado: "Pendiente de asignación"
            };
    }

    res.status(200).json(clasificacion);
};

// Exportacion de funciones
module.exports = { 
    listarIncidencias, 
    registrarIncidencia,
    buscarPorId,
    cambiarEstado,
    eliminarIncidencia,
    obtenerEstadisticas,
    clasificacionAutomatica
};