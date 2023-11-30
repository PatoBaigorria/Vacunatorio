const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");

// Ruta para obtener todos los descartes
router.get("/", controllers.descarteController.getAllDescartes);
// Ruta para el formulario que crea un nuevo descarte
router.get("/alta", controllers.descarteController.altaDescartes);
// Ruta para crear un nuevo descarte
router.post("/", controllers.descarteController.createDescarte);
// Ruta para obtener un descarte por su ID
router.get("/:id", controllers.descarteController.editDescarteById);
// Ruta para actualizar un descarte por su ID
router.put("/:id", controllers.descarteController.updateDescarte);
// Ruta para eliminar un descarte por su ID
router.delete("/:id", controllers.descarteController.deleteDescarte);

module.exports = router;