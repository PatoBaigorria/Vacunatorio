const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");

router.get("/", controllers.loteInternoController.listarLotesInternos);
router.get("/crear", controllers.loteInternoController.formLoteInterno);
router.post("/", controllers.loteInternoController.createLoteInterno);
router.get("/:id", controllers.loteInternoController.editLoteInterno);
router.put("/:id", controllers.loteInternoController.updateLoteInterno);
router.delete("/:id", controllers.loteInternoController.deleteLoteInterno);
router.put("/:id/baja", controllers.loteInternoController.bajaLoteInterno);
router.put("/:id/alta", controllers.loteInternoController.altaLoteInterno);

module.exports = router;