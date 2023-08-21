const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");
const {
  Descarte
} = require("../models/relaciones");

// Ruta para obtener todos los descartes
router.get("/", controllers.descarteController.getAllDescartes);

// Ruta para crear un nuevo descarte
router.post("/", controllers.descarteController.createDescarte);

// Ruta para obtener un descarte por su ID
//router.get("/:id", controllers.descarteController.getDescarteById);

// Ruta para actualizar un descarte por su ID
router.put("/:id", controllers.descarteController.updateDescarte);

// Ruta para eliminar un descarte por su ID
router.delete("/:id", controllers.descarteController.deleteDescarte);

// Obtener todos los descartes
router.get("/descartes", async (req, res) => {
  try {
    const descartes = await Descarte.findAll();
    res.json(descartes);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los descartes."
    });
  }
});

// Crear un nuevo descarte
router.post("/descartes", async (req, res) => {
  try {
    const nuevoDescarte = await Descarte.create(req.body);
    res.json(nuevoDescarte);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el descarte."
    });
  }
});

// Actualizar un descarte por su ID
router.put("/descartes/:id", async (req, res) => {
  try {
    const descarteActualizado = await Descarte.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    res.json(descarteActualizado);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el descarte."
    });
  }
});

// Eliminar un descarte por su ID
router.delete("/descartes/:id", async (req, res) => {
  try {
    await Descarte.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json({
      message: "Descarte eliminado correctamente."
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el Descarte."
    });
  }
});

module.exports = router;