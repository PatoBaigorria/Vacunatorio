const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");

router.get("/", controllers.aplicacionController.listarAplicacion);
router.get("/crear", controllers.aplicacionController.formAplicacion);
router.post("/", controllers.aplicacionController.createAplicacion);
router.get("/:id", controllers.aplicacionController.editAplicacion);
router.put("/:id", controllers.aplicacionController.updateAplicacion);
router.delete("/:id", controllers.aplicacionController.deleteAplicacion);
router.put("/:id/baja", controllers.aplicacionController.bajaAplicacion);
router.put("/:id/alta", controllers.aplicacionController.altaAplicacion);

module.exports = router;