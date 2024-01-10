const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");

router.get("/", controllers.depositoProvincialController.listarDepositosProvinciales);
router.get("/alta", controllers.depositoProvincialController.formDepProv);
router.post("/", controllers.depositoProvincialController.createDepProv);
router.get("/:id", controllers.depositoProvincialController.editDepProv);
router.put("/:id", controllers.depositoProvincialController.updateDepositoProvincial);
router.delete("/:id", controllers.depositoProvincialController.deleteDepositoProvincial);
router.put("/:id/baja", controllers.depositoProvincialController.bajaDepositoProvincial);
router.put("/:id/alta", controllers.depositoProvincialController.altaDepositoProvincial);

module.exports = router;