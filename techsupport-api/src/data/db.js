// Arreglo en memoria a modo de base de datos
let incidencias = [
    {
        id: 1,
        titulo: "No funciona el internet",
        descripcion: "El cable de red está desconectado en la oficina 204",
        prioridad: "Alta",
        estado: "Pendiente",
        fecha: new Date().toISOString()
    },
    {
        id: 2,
        titulo: "Impresora no responde",
        descripcion: "La impresora del piso 3 no imprime documentos",
        prioridad: "Media",
        estado: "En proceso",
        fecha: new Date().toISOString()
    }
];

// Función para obtener todas las incidencias
const getIncidencias = () => incidencias;

// Función para agregar una nueva incidencia
const addIncidencia = (incidencia) => {
    incidencias.push(incidencia);
    return incidencia;
};

//Funcion para filtrar/eliminar
const setIncidencias = (nuevoArreglo) => {
    incidencias = nuevoArreglo;
};

// Exportacion de las funciones
module.exports = { getIncidencias, addIncidencia, setIncidencias };