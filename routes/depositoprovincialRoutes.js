const express = require("express");
const router = express.Router();
const depositoProvincialController = require("../controllers/depositoProvincialController");

router.get("/", depositoProvincialController.listarDepositosProvinciales);
router.get("/alta", depositoProvincialController.formDepProv);
router.post("/", depositoProvincialController.createDepProv);
//router.get("/details/:id", depositoProvincialController.detailsCentroDeVacunacion);
router.get("/:id", depositoProvincialController.editDepProv);
router.put("/:id", depositoProvincialController.updateDepositoProvincial);
router.delete("/:id", depositoProvincialController.deleteDepositoProvincial);
router.put("/:id/baja", depositoProvincialController.bajaDepositoProvincial);
router.put("/:id/alta", depositoProvincialController.altaDepositoProvincial);

module.exports = router;