const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");

router.get("/", controllers.trasladoController.listarTraslados);
router.get("/crear", controllers.trasladoController.altaTraslado);
router.post("/", controllers.trasladoController.createTraslados);
router.get("/:id", controllers.trasladoController.editTraslado);
router.put("/:id", controllers.trasladoController.updateTraslado);
router.delete("/:id", controllers.trasladoController.deleteTrasladoFisica);
router.delete("/logica/:id", controllers.trasladoController.deleteTrasladoLogica);

module.exports = router;