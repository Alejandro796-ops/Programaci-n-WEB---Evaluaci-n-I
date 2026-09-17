const express = require('express');
const router = express.Router();
const controller = require('../controllers/incidenciasController');

// GET - Lista todas las incidencias
router.get('/', controller.listarIncidencias);

// POST - Registra una nueva incidencia
router.post('/', controller.registrarIncidencia);

// GET - Obtener estadísticas
router.get('/estadisticas', controller.obtenerEstadisticas);

// GET - Clasificación automática
router.get('/:id/clasificacion', controller.clasificacionAutomatica);

// GET - Buscar por ID
router.get('/:id', controller.buscarPorId);

// PUT - Cambiar estado
router.put('/:id/estado', controller.cambiarEstado);

// DELETE - Eliminar
router.delete('/:id', controller.eliminarIncidencia);

module.exports = router;