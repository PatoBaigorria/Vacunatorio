const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");

router.get("/", controllers.aplicacionController.listarAplicacion);
router.get("/crear", controllers.aplicacionController.altaAplicacion);
router.post("/", controllers.aplicacionController.createAplicacion);
router.get("/:id", controllers.aplicacionController.editAplicacion);
router.put("/:id", controllers.aplicacionController.updateAplicacion);
router.delete("/:id", controllers.aplicacionController.deleteAplicacionFisica);
router.delete("/logica/:id", controllers.aplicacionController.deleteAplicacionLogica);

module.exports = router;