const express = require("express");
const router = express.Router();
const depositoNacionalController = require("../controllers/depositoNacionalController");

router.get("/", depositoNacionalController.listarDepositosNacionales);
router.get("/alta", depositoNacionalController.formDepNac);
router.post("/", depositoNacionalController.createDepNac);
//router.get("/details/:id", depositoNacionalController.detailsCentroDeVacunacion);
router.get("/:id", depositoNacionalController.editDepNac);
router.put("/:id", depositoNacionalController.updateDepositoNacional);
router.delete("/:id", depositoNacionalController.deleteDepositoNacional);
router.put("/:id/baja", depositoNacionalController.bajaDepositoNacional);
router.put("/:id/alta", depositoNacionalController.altaDepositoNacional);

module.exports = router;