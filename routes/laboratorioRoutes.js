const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");

router.get("/",controllers.laboratorioController.listarLaboratorios);
router.get("/alta",controllers.laboratorioController.formLaboratorio);
router.post("/",controllers.laboratorioController.createLaboratorio);
router.get("/:id",controllers.laboratorioController.editLaboratorio);
router.put("/:id",controllers.laboratorioController.updateLaboratorio);
router.delete("/:id",controllers.laboratorioController.deleteLaboratorio);
router.put("/:id/baja",controllers.laboratorioController.bajaLaboratorio);
router.put("/:id/alta",controllers.laboratorioController.altaLaboratorio);

module.exports = router;