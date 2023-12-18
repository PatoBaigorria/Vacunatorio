const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");


router.get("/", controllers.descarteController.listarDescartes);
router.get("/crear", controllers.descarteController.crearDescarte);
router.post("/", controllers.descarteController.createDescarte);
router.get("/:id", controllers.descarteController.editarDescarte);
router.put("/:id", controllers.descarteController.updateDescarte);
router.delete("/:id", controllers.descarteController.deleteDescarte);

module.exports = router;