const express = require("express");
const router = express.Router();
const laboratorioController = require("../controllers/laboratorioController");
const authorize = require("../middleware/authorize");

router.get(
	"/",
	authorize(["Super Admin", "Gestor de compras"]),
	laboratorioController.listarLaboratorios
);
router.get(
	"/alta",
	authorize(["Super Admin", "Gestor de compras"]),
	laboratorioController.formLaboratorio
);
router.post(
	"/",
	authorize(["Super Admin", "Gestor de compras"]),
	laboratorioController.createLaboratorio
);
router.get(
	"/details/:id",
	authorize(["Super Admin", "Gestor de compras"]),
	laboratorioController.detailsLaboratorio
);
router.get(
	"/:id",
	authorize(["Super Admin", "Gestor de compras"]),
	laboratorioController.editLaboratorio
);
router.put(
	"/:id",
	authorize(["Super Admin", "Gestor de compras"]),
	laboratorioController.updateLaboratorio
);
router.get(
	'/laboratorioJSON/:nombre',
	authorize(["Super Admin", "Gestor de compras"]),
	laboratorioController.listarLaboratorioPorJSON
);
router.delete(
	"/:id",
	authorize(["Super Admin", "Gestor de compras"]),
	laboratorioController.deleteLaboratorio
);
router.put(
	"/:id/baja",
	authorize(["Super Admin", "Gestor de compras"]),
	laboratorioController.bajaLaboratorio
);
router.put(
	"/:id/alta",
	authorize(["Super Admin", "Gestor de compras"]),
	laboratorioController.altaLaboratorio
);

module.exports = router;
