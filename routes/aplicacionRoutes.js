const express = require("express");
const router = express.Router();
const aplicacionController = require("../controllers/aplicacionController");

router.get("/", aplicacionController.listarAplicacion);
router.get("/crear", aplicacionController.formAplicacion);
router.post("/", aplicacionController.createAplicacion);
//router.get("/details/:id", aplicacionController.detailsCentroDeVacunacion);
router.get("/:id", aplicacionController.editAplicacion);
router.put("/:id", aplicacionController.updateAplicacion);
router.delete("/:id", aplicacionController.deleteAplicacion);
router.put("/:id/baja", aplicacionController.bajaAplicacion);
router.put("/:id/alta", aplicacionController.altaAplicacion);

module.exports = router;