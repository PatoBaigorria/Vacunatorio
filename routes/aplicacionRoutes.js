const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");
const {
  Aplicacion,
  Persona,
  AgenteDeSalud,
  LoteInterno,
} = require("../models/relaciones");

// Ruta para obtener todas las aplicaciones
router.get("/", controllers.aplicacionController.getAllAplicaciones);

// Ruta para crear una nueva aplicación
router.post("/", controllers.aplicacionController.createAplicacion);

// Ruta para obtener una aplicación por su ID
router.get("/:id", controllers.aplicacionController.getAplicacionById);

// Ruta para actualizar una aplicación por su ID
router.put("/:id", controllers.aplicacionController.updateAplicacion);

// Ruta para eliminar una aplicación por su ID
router.delete("/:id", controllers.aplicacionController.deleteAplicacion);

// Obtener todas las aplicaciones
router.get("/aplicaciones", async (req, res) => {
  try {
    const aplicaciones = await Aplicacion.findAll();
    res.json(aplicaciones);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las aplicaciones."
    });
  }
});

// Crear una nueva aplicación
router.post("/aplicaciones", async (req, res) => {
  try {
    const nuevaAplicacion = await Aplicacion.create(req.body);
    res.json(nuevaAplicacion);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear la aplicación."
    });
  }
});

// Actualizar una aplicación por su ID
router.put("/aplicaciones/:id", async (req, res) => {
  try {
    const aplicacionActualizada = await Aplicacion.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    res.json(aplicacionActualizada);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar la aplicación."
    });
  }
});

// Eliminar una aplicación por su ID
router.delete("/aplicaciones/:id", async (req, res) => {
  try {
    await Aplicacion.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json({
      message: "Aplicación eliminada correctamente."
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar la aplicación."
    });
  }
});

// Obtener la información completa de una aplicación por su ID
router.get("/aplicaciones/:id", async (req, res) => {
  try {
    const aplicacion = await Aplicacion.findByPk(req.params.id, {
      include: [Persona, AgenteDeSalud, LoteInterno],
    });

    if (!aplicacion) {
      return res.status(404).json({
        message: "Aplicación no encontrada."
      });
    }

    res.json(aplicacion);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener la información de la aplicación."
      });
  }
});

module.exports = router;