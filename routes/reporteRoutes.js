const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');
const authorize = require("../middleware/authorize");


router.get('/vacunas-por-laboratorio', authorize(["Super Admin"]), reporteController.generarReporteVacunasPorLaboratorio);
router.get('/form-vacunas-por-laboratorio', authorize(["Super Admin"]), reporteController.formDatosReporte);
router.get('/personasvacunadas', authorize(["Super Admin"]), reporteController.generarReportePersonasVacunadas);

module.exports = router;
