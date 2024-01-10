const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");

router.get("/", controllers.descarteController.listarDescartes);
router.get("/crear", controllers.descarteController.formDescarte);
router.post("/", controllers.descarteController.createDescarte);
router.get("/:id", controllers.descarteController.editDescarte);
router.put("/:id", controllers.descarteController.updateDescarte);
router.delete("/:id", controllers.descarteController.deleteDescarte);
router.put("/:id/baja", controllers.descarteController.bajaDescarte);
router.put("/:id/alta", controllers.descarteController.altaDescarte);

module.exports = router;