// Arreglo que simula una base de datos.
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

// Función para OBTENER todas las incidencias.
const getIncidencias = () => incidencias;

// Función para GUARDAR/ACTUALIZAR todo el arreglo.
const setIncidencias = (nuevoArray) => {
    incidencias = nuevoArray;
};

// Exportacion de funciones, algo asi como heredar un metodo en POO.
module.exports = { getIncidencias, setIncidencias };