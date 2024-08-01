const express = require("express");
const router = express.Router();
const loteProveedorController = require("../controllers/loteproveedorController");
const authorize = require("../middleware/authorize");
const reporteController = require("../controllers/reporteController");

router.get("/reportes/vacunas-por-laboratorio", authorize(["Super Admin"]), reporteController.generarReporteVacunasPorLaboratorio);

router.get(
	"/",
	authorize(["Super Admin", "Gestor de compras"]),
	loteProveedorController.listarLotesProveedores
);
router.get(
	"/alta",
	authorize(["Gestor de compras"]),
	loteProveedorController.formLoteProveedor
);
router.post(
	"/",
	authorize(["Gestor de compras"]),
	loteProveedorController.createLoteProveedor
);
router.get(
	"/details/:id",
	authorize(["Super Admin", "Gestor de compras"]),
	loteProveedorController.detailsLoteProveedor
);
router.get(
	"/:id",
	authorize(["Gestor de compras"]),
	loteProveedorController.editLoteProveedor
);
router.put(
	"/:id",
	authorize(["Gestor de compras"]),
	loteProveedorController.updateLoteProveedor
);
router.delete(
	"/:id",
	authorize(["Gestor de compras"]),
	loteProveedorController.deleteLoteProveedor
);
router.put(
	"/:id/baja",
	authorize(["Gestor de compras"]),
	loteProveedorController.bajaLoteProveedor
);
router.put(
	"/:id/alta",
	authorize(["Gestor de compras"]),
	loteProveedorController.altaLoteProveedor
);

module.exports = router;
