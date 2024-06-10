const express = require("express");
const router = express.Router();
const centroDeVacunacionController = require("../controllers/centroDeVacunacionController");

router.get("/", centroDeVacunacionController.listarCentrosDeVacunacion);
router.get("/alta", centroDeVacunacionController.formCentroVac);
router.post("/", centroDeVacunacionController.createCentroVac);
router.get("/:id", centroDeVacunacionController.editCentroVac);
router.put("/:id", centroDeVacunacionController.updateCentroDeVacunacion);
router.delete("/:id", centroDeVacunacionController.deleteCentroDeVacunacion);
router.put("/:id/baja", centroDeVacunacionController.bajaCentroDeVacunacion);
router.put("/:id/alta", centroDeVacunacionController.altaCentroDeVacunacion);

module.exports = router;