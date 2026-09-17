const express = require('express');
const router = express.Router();
const controller = require('../controllers/incidenciasController');

// GET /api/incidencias - Lista todas las incidencias
router.get('/', controller.listarIncidencias);

// POST /api/incidencias - Registra una nueva incidencia
router.post('/', controller.registrarIncidencia);

module.exports = router;