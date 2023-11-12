const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");

//Importacion del Controlador
router.get("/", controllers.laboratorioController.listarLaboratorios);
router.get("/crear", controllers.laboratorioController.mostrarFormularioCreacionLaboratorio);
router.post("/", controllers.laboratorioController.crearLaboratorioDesdeFormulario);
router.get("/:id", controllers.laboratorioController.editarLaboratorio);
router.put("/:id", controllers.laboratorioController.updateLaboratorio);
router.delete("/:id", controllers.laboratorioController.deleteLaboratorio);

module.exports = router;