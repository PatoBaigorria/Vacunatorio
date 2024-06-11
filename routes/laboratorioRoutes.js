const express = require("express");
const router = express.Router();
const laboratorioController = require("../controllers/laboratorioController");

router.get("/", laboratorioController.listarLaboratorios);
router.get("/alta", laboratorioController.formLaboratorio);
router.post("/", laboratorioController.createLaboratorio);
//router.get("/details/:id", laboratorioController.detailsCentroDeVacunacion);
router.get("/:id", laboratorioController.editLaboratorio);
router.put("/:id", laboratorioController.updateLaboratorio);
router.delete("/:id", laboratorioController.deleteLaboratorio);
router.put("/:id/baja", laboratorioController.bajaLaboratorio);
router.put("/:id/alta", laboratorioController.altaLaboratorio);

module.exports = router;