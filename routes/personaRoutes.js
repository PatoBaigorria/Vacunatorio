const express = require("express");
const router = express.Router();
const personaController = require("../controllers/personaController");

router.get("/", personaController.listarPersonas);
router.get("/alta", personaController.formPersona);
router.post("/", personaController.createPersona);
router.get("/details/:id", personaController.detailsPersona);
router.get("/:id", personaController.editPersona);
router.put("/:id", personaController.updatePersona);
router.delete("/:id", personaController.deletePersona);
router.put("/:id/baja", personaController.bajaPersona);
router.put("/:id/alta", personaController.altaPersona);

module.exports = router;