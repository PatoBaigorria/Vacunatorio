const express = require("express");
const router = express.Router();
const trasladoController = require("../controllers/trasladoController");

router.get("/", trasladoController.listarTraslados);
router.get("/crear", trasladoController.altaTraslado);
router.post("/", trasladoController.createTraslados);
router.get("/:id", trasladoController.editTraslado);
router.put("/:id", trasladoController.updateTraslado);
router.delete("/:id", trasladoController.deleteTrasladoFisica);
router.delete("/logica/:id", trasladoController.deleteTrasladoLogica);

module.exports = router;