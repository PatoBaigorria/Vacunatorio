const express = require("express");
const router = express.Router();
const centroDeVacunacionController = require("../controllers/centroDeVacunacionController");
const authorize = require("../middleware/authorize");

router.get("/", authorize(['Super Admin']), centroDeVacunacionController.listarCentrosDeVacunacion);
router.get("/alta", authorize(['Super Admin']), centroDeVacunacionController.formCentroVac);
router.post("/", authorize(['Super Admin']), centroDeVacunacionController.createCentroVac);
router.get("/:id", authorize(['Super Admin']), centroDeVacunacionController.editCentroVac);
router.put("/:id", authorize(['Super Admin']), centroDeVacunacionController.updateCentroDeVacunacion);
router.delete("/:id", authorize(['Super Admin']), centroDeVacunacionController.deleteCentroDeVacunacion);
router.put("/:id/baja", authorize(['Super Admin']), centroDeVacunacionController.bajaCentroDeVacunacion);
router.put("/:id/alta", authorize(['Super Admin']), centroDeVacunacionController.altaCentroDeVacunacion);

module.exports = router;