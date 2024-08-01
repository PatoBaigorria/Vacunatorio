const express = require("express");
const router = express.Router();
const trasladoController = require("../controllers/trasladoController");
const authorize = require("../middleware/authorize");

router.get("/", authorize(["Super Admin", "Operador de logistica", "Agente de salud"]), trasladoController.listarTraslados);
router.get("/trasladosJSON", authorize(["Operador de logistica", "Agente de salud"]), trasladoController.listarTrasladosJSON);
router.get("/crear", authorize(["Operador de logistica", "Agente de salud"]), trasladoController.altaTraslado);
router.put("/:id/alta", authorize(["Operador de logistica", "Agente de salud"]), trasladoController.altaLogicaTraslado);
router.put("/:id/baja", authorize(["Operador de logistica", "Agente de salud"]), trasladoController.bajaTraslado);
router.post("/", authorize(["Operador de logistica", "Agente de salud"]), trasladoController.createTraslados);
router.get("/:id", authorize(["Operador de logistica", "Agente de salud"]), trasladoController.editTraslado);
router.put("/:id", authorize(["Operador de logistica", "Agente de salud"]), trasladoController.updateTraslado);
router.delete("/:id", authorize(["Operador de logistica", "Agente de salud"]), trasladoController.deleteTrasladoFisica);


module.exports = router;
