const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");
const { Laboratorio } = require("../models/relaciones");

//Importacion del Controlador
router.get("/", controllers.laboratorioController.getAllLaboratorios);
router.post("/", controllers.laboratorioController.createLaboratorio);
//router.get("/:id", controllers.laboratorioController.getLaboratorioById);
router.put("/:id", controllers.laboratorioController.updateLaboratorio);
router.delete("/:id", controllers.laboratorioController.deleteLaboratorio);

// Obtener todos los laboratorios
router.get("/laboratorios", async (req, res) => {
  try {
    const laboratorios = await Laboratorio.findAll();
    res.json(laboratorios);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los laboratorios.",
    });
  }
});

// Crear un nuevo laboratorio
router.post("/laboratorios", async (req, res) => {
  try {
    const nuevoLaboratorio = await Laboratorio.create(req.body);
    res.json(nuevoLaboratorio);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el laboratorio.",
    });
  }
});

// Actualizar un laboratorio por su ID
router.put("/laboratorios/:id", async (req, res) => {
  try {
    const laboratorioActualizado = await Laboratorio.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(laboratorioActualizado);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el laboratorio.",
    });
  }
});

// Eliminar un laboratorio por su ID
router.delete("/laboratorios/:id", async (req, res) => {
  try {
    await Laboratorio.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Laboratorio eliminado correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el laboratorio.",
    });
  }
});

module.exports = router;
