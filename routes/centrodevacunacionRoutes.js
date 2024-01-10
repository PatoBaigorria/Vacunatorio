const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");

router.get("/", controllers.centroDeVacunacionController.listarCentrosDeVacunacion);
router.get("/alta", controllers.centroDeVacunacionController.formCentroVac);
router.post("/", controllers.centroDeVacunacionController.createCentroVac);
router.get("/:id", controllers.centroDeVacunacionController.editCentroVac);
router.put("/:id", controllers.centroDeVacunacionController.updateCentroDeVacunacion);
router.delete("/:id", controllers.centroDeVacunacionController.deleteCentroDeVacunacion);
router.put("/:id/baja", controllers.centroDeVacunacionController.bajaCentroDeVacunacion);
router.put("/:id/alta", controllers.centroDeVacunacionController.altaCentroDeVacunacion);

module.exports = router;