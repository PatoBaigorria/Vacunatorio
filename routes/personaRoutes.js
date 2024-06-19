const express = require("express");
const router = express.Router();
const personaController = require("../controllers/personaController");
const authorize = require("../middleware/authorize");

router.get("/", authorize(['Super Admin', 'Agente de salud']), personaController.listarPersonas);
router.get("/alta", authorize(['Super Admin', 'Agente de salud']), personaController.formPersona);
router.post("/", authorize(['Super Admin', 'Agente de salud']), personaController.createPersona);
router.get("/details/:id", authorize(['Super Admin', 'Agente de salud']), personaController.detailsPersona);
router.get("/:id", authorize(['Super Admin', 'Agente de salud']), personaController.editPersona);
router.put("/:id", authorize(['Super Admin', 'Agente de salud']), personaController.updatePersona);
router.delete("/:id", authorize(['Super Admin', 'Agente de salud']), personaController.deletePersona);
router.put("/:id/baja", authorize(['Super Admin', 'Agente de salud']), personaController.bajaPersona);
router.put("/:id/alta", authorize(['Super Admin', 'Agente de salud']), personaController.altaPersona);

module.exports = router;