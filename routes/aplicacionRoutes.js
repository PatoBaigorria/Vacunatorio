const express = require("express");
const router = express.Router();
const aplicacionController = require("../controllers/aplicacionController");
const authorize = require("../middleware/authorize");

router.get("/", authorize(['Super Admin', 'Agente de salud']), aplicacionController.listarAplicacion);
router.get("/crear", authorize(['Super Admin', 'Agente de salud']), aplicacionController.formAplicacion);
router.post("/", authorize(['Super Admin', 'Agente de salud']), aplicacionController.createAplicacion);
router.get("/:id", authorize(['Super Admin', 'Agente de salud']), aplicacionController.editAplicacion);
router.put("/:id", authorize(['Super Admin', 'Agente de salud']), aplicacionController.updateAplicacion);
router.delete("/:id", authorize(['Super Admin', 'Agente de salud']), aplicacionController.deleteAplicacion);
router.put("/:id/baja", authorize(['Super Admin', 'Agente de salud']), aplicacionController.bajaAplicacion);
router.put("/:id/alta", authorize(['Super Admin', 'Agente de salud']), aplicacionController.altaAplicacion);

module.exports = router;