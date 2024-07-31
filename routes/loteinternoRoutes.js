const express = require("express");
const router = express.Router();
const loteInternoController = require("../controllers/loteinternoController");
const authorize = require("../middleware/authorize");

router.get(
	"/lotesinternosJSON",
	authorize(["Super Admin", "Agente de salud"]),
	loteInternoController.listarLotesInternosJSON
);
router.get(
	"/",
	authorize(["Super Admin", "Gestor de compras"]),
	loteInternoController.listarLotesInternos
);
router.get(
	"/crear",
	authorize(["Super Admin", "Gestor de compras"]),
	loteInternoController.formLoteInterno
);
router.post(
	"/",
	authorize(["Super Admin", "Gestor de compras"]),
	loteInternoController.createLoteInterno
);
router.get(
	"/details/:id",
	authorize(["Super Admin", "Gestor de compras"]),
	loteInternoController.detailsLoteInterno
);
router.get(
	"/:id",
	authorize(["Super Admin", "Gestor de compras"]),
	loteInternoController.editLoteInterno
);
router.put(
	"/:id",
	authorize(["Super Admin", "Gestor de compras"]),
	loteInternoController.updateLoteInterno
);
router.delete(
	"/:id",
	authorize(["Super Admin", "Gestor de compras"]),
	loteInternoController.deleteLoteInterno
);
router.put(
	"/:id/baja",
	authorize(["Super Admin", "Gestor de compras"]),
	loteInternoController.bajaLoteInterno
);
router.put(
	"/:id/alta",
	authorize(["Super Admin", "Gestor de compras"]),
	loteInternoController.altaLoteInterno
);

module.exports = router;
