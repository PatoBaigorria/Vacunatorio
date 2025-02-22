const express = require("express");
const router = express.Router();
const personaController = require("../controllers/personaController");
const authorize = require("../middleware/authorize");

router.get('/localidades/:provinciaNombre', authorize(["Super Admin"]), personaController.getLocalidadesByProvinciaFromAPI);
router.get(
	"/",
	authorize(["Super Admin", "Agente de salud"]),
	personaController.listarPersonas
);
router.get(
	"/alta",
	authorize(["Agente de salud"]),
	personaController.formPersona
);
router.get(
	"/personasJSON",
	authorize(["Agente de salud"]),
	personaController.listarPersonasJSON
);
router.get(
	"/agentesJSON",
	authorize(["Agente de salud"]),
	personaController.listarAgentesJSON
);
router.post(
	"/",
	authorize(["Agente de salud"]),
	personaController.createPersona
);
router.get(
	"/details/:id",
	authorize(["Super Admin", "Agente de salud"]),
	personaController.detailsPersona
);
router.get(
	"/:id",
	authorize(["Agente de salud"]),
	personaController.editPersona
);
router.put(
	"/:id",
	authorize(["Agente de salud"]),
	personaController.updatePersona
);
router.delete(
	"/:id",
	authorize(["Agente de salud"]),
	personaController.deletePersona
);
router.put(
	"/:id/baja",
	authorize(["Agente de salud"]),
	personaController.bajaPersona
);
router.put(
	"/:id/alta",
	authorize(["Agente de salud"]),
	personaController.altaPersona
);

module.exports = router;
