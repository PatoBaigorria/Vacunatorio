const express = require("express");
const router = express.Router();
const loteInternoController = require("../controllers/loteInternoController");

router.get("/", loteInternoController.listarLotesInternos);
router.get("/crear", loteInternoController.formLoteInterno);
router.post("/", loteInternoController.createLoteInterno);
router.get("/details/:id", loteInternoController.detailsLoteInterno);
router.get("/:id", loteInternoController.editLoteInterno);
router.put("/:id", loteInternoController.updateLoteInterno);
router.delete("/:id", loteInternoController.deleteLoteInterno);
router.put("/:id/baja", loteInternoController.bajaLoteInterno);
router.put("/:id/alta", loteInternoController.altaLoteInterno);

module.exports = router;