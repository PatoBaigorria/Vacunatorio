const express = require("express");
const router = express.Router();
const loteInternoController = require("../controllers/loteinternoController");
const authorize = require("../middleware/authorize");

router.get(
	"/lotesinternosJSON",
	authorize(["Agente de salud"]),
	loteInternoController.listarLotesInternosJSON
);
router.get(
	"/",
	authorize(["Super Admin", "Gestor de compras"]),
	loteInternoController.listarLotesInternos
);
router.get(
	"/crear",
	authorize(["Gestor de compras"]),
	loteInternoController.formLoteInterno
);
router.post(
	"/",
	authorize(["Gestor de compras"]),
	loteInternoController.createLoteInterno
);
router.get(
	"/details/:id",
	authorize(["Super Admin", "Gestor de compras"]),
	loteInternoController.detailsLoteInterno
);
router.get(
	"/:id",
	authorize(["Gestor de compras"]),
	loteInternoController.editLoteInterno
);
router.put(
	"/:id",
	authorize(["Gestor de compras"]),
	loteInternoController.updateLoteInterno
);
router.delete(
	"/:id",
	authorize(["Gestor de compras"]),
	loteInternoController.deleteLoteInterno
);
router.put(
	"/:id/baja",
	authorize(["Gestor de compras"]),
	loteInternoController.bajaLoteInterno
);
router.put(
	"/:id/alta",
	authorize(["Gestor de compras"]),
	loteInternoController.altaLoteInterno
);

module.exports = router;
