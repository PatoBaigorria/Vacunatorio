const express = require("express");
const router = express.Router();
const descarteController = require("../controllers/descarteController");
const authorize = require("../middleware/authorize");

router.get(
	"/",
	authorize(["Super Admin", "Operador de logistica", "Agente de salud"]),
	descarteController.listarDescartes
);
router.get(
	"/crear",
	authorize(["Super Admin", "Operador de logistica", "Agente de salud"]),
	descarteController.formDescarte
);
router.post(
	"/",
	authorize(["Super Admin", "Operador de logistica", "Agente de salud"]),
	descarteController.createDescarte
);
router.get(
	"/details/:id",
	authorize(["Super Admin", "Operador de logistica", "Agente de salud"]),
	descarteController.detailsDescarte
);
router.get(
	"/:id",
	authorize(["Super Admin", "Operador de logistica", "Agente de salud"]),
	descarteController.editDescarte
);
router.put(
	"/:id",
	authorize(["Super Admin", "Operador de logistica", "Agente de salud"]),
	descarteController.updateDescarte
);
router.delete(
	"/:id",
	authorize(["Super Admin", "Operador de logistica", "Agente de salud"]),
	descarteController.deleteDescarte
);
router.put(
	"/:id/baja",
	authorize(["Super Admin", "Operador de logistica", "Agente de salud"]),
	descarteController.bajaDescarte
);
router.put(
	"/:id/alta",
	authorize(["Super Admin", "Operador de logistica", "Agente de salud"]),
	descarteController.altaDescarte
);

module.exports = router;
