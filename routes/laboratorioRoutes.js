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
	authorize(["Gestor de compras"]),
	laboratorioController.formLaboratorio
);
router.get(
	'/laboratoriosJSON',
	authorize(["Gestor de compras"]),
	laboratorioController.listarLaboratoriosPorJSON
);
router.post(
	"/",
	authorize(["Gestor de compras"]),
	laboratorioController.createLaboratorio
);
router.get(
	"/details/:id",
	authorize(["Super Admin", "Gestor de compras"]),
	laboratorioController.detailsLaboratorio
);
router.get(
	"/:id",
	authorize(["Gestor de compras"]),
	laboratorioController.editLaboratorio
);
router.put(
	"/:id",
	authorize(["Gestor de compras"]),
	laboratorioController.updateLaboratorio
);
router.get(
	'/laboratorioJSON/:nombre',
	authorize(["Gestor de compras"]),
	laboratorioController.listarLaboratorioPorJSON
);
router.delete(
	"/:id",
	authorize(["Gestor de compras"]),
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
