const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");

router.get("/", controllers.personaController.listarPersonas);
router.get("/alta", controllers.personaController.altaPersona);
router.post("/dni", controllers.personaController.dni);
router.post("/", controllers.personaController.createPersona);
router.get("/:id", controllers.personaController.editPersona);
router.put("/:id", controllers.personaController.updatePersona);
router.delete("/:id", controllers.personaController.deletePersona);


module.exports = router;