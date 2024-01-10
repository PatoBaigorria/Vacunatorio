const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");

router.get("/", controllers.personaController.listarPersonas);
router.get("/alta", controllers.personaController.formPersona);
router.post("/", controllers.personaController.createPersona);
router.get("/:id", controllers.personaController.editPersona);
router.put("/:id", controllers.personaController.updatePersona);
router.delete("/:id", controllers.personaController.deletePersona);
router.put("/:id/baja", controllers.personaController.bajaPersona);
router.put("/:id/alta", controllers.personaController.altaPersona);

module.exports = router;