const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");

//Importacion del Controlador
router.get("/", controllers.laboratorioController.getAllLaboratorios);
router.post("/", controllers.laboratorioController.createLaboratorio);
router.get("/:id", controllers.laboratorioController.getLaboratorioById);
router.put("/:id", controllers.laboratorioController.updateLaboratorio);
router.delete("/:id", controllers.laboratorioController.deleteLaboratorio);

module.exports = router;