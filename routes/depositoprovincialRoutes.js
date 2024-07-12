const express = require("express");
const router = express.Router();
const depositoProvincialController = require("../controllers/depositoProvincialController");
const authorize = require("../middleware/authorize");

router.get("/localidades/:provinciaNombre", authorize(["Super Admin"]), depositoProvincialController.getLocalidadesByProvinciaFromAPI);

router.get(
	"/",
	authorize(["Super Admin"]),
	depositoProvincialController.listarDepositosProvinciales
);
router.get(
	"/alta",
	authorize(["Super Admin"]),
	depositoProvincialController.formDepProv
);
router.post(
	"/",
	authorize(["Super Admin"]),
	depositoProvincialController.createDepProv
);
router.get(
	"/:id",
	authorize(["Super Admin"]),
	depositoProvincialController.editDepProv
);
router.put(
	"/:id",
	authorize(["Super Admin"]),
	depositoProvincialController.updateDepositoProvincial
);
router.delete(
	"/:id",
	authorize(["Super Admin"]),
	depositoProvincialController.deleteDepositoProvincial
);
router.put(
	"/:id/baja",
	authorize(["Super Admin"]),
	depositoProvincialController.bajaDepositoProvincial
);
router.put(
	"/:id/alta",
	authorize(["Super Admin"]),
	depositoProvincialController.altaDepositoProvincial
);

module.exports = router;
