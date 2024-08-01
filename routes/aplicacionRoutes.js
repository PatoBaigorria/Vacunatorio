const express = require("express");
const router = express.Router();
const aplicacionController = require("../controllers/aplicacionController");
const authorize = require("../middleware/authorize");

router.get(
	"/",
	authorize(["Super Admin", "Agente de salud"]),
	aplicacionController.listarAplicacion
);
router.get(
	"/crear",
	authorize(["Agente de salud"]),
	aplicacionController.formAplicacion
);
router.post(
	"/",
	authorize(["Agente de salud"]),
	aplicacionController.createAplicacion
);
router.post(
	"/createJSON",
	authorize(["Agente de salud"]),
	aplicacionController.createAplicacionJSON
);
router.get(
	"/:id",
	authorize(["Agente de salud"]),
	aplicacionController.editAplicacion
);
router.put(
	"/:id",
	authorize(["Agente de salud"]),
	aplicacionController.updateAplicacion
);
router.delete(
	"/:id",
	authorize(["Agente de salud"]),
	aplicacionController.deleteAplicacion
);
router.put(
	"/:id/baja",
	authorize(["Agente de salud"]),
	aplicacionController.bajaAplicacion
);
router.put(
	"/:id/alta",
	authorize(["Agente de salud"]),
	aplicacionController.altaAplicacion
);

module.exports = router;
