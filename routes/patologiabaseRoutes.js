const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");
const {
  PatologiaBase,
  Persona
} = require("../models/relaciones");

// Ruta para obtener todas las patologías base
router.get("/", controllers.patologiaBaseController.getAllPatologiasBase);

// Ruta para crear una nueva patología base
router.post("/", controllers.patologiaBaseController.createPatologiaBase);

// Ruta para obtener una patología base por su ID
//router.get("/:id", controllers.patologiaBaseController.getPatologiaBaseById);

// Ruta para actualizar una patología base por su ID
router.put("/:id", controllers.patologiaBaseController.updatePatologiaBase);

// Ruta para eliminar una patología base por su ID
router.delete("/:id", controllers.patologiaBaseController.deletePatologiaBase);

// Obtener todas las patologías base
router.get("/patologiasbase", async (req, res) => {
  try {
    const patologiasBase = await PatologiaBase.findAll();
    res.json(patologiasBase);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las patologías base."
    });
  }
});

// Crear una nueva patología base
router.post("/patologiasbase", async (req, res) => {
  try {
    const nuevaPatologiaBase = await PatologiaBase.create(req.body);
    res.json(nuevaPatologiaBase);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear la patología base."
    });
  }
});

// Actualizar una patología base por su ID
router.put("/patologiasbase/:id", async (req, res) => {
  try {
    const patologiaBaseActualizada = await PatologiaBase.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    res.json(patologiaBaseActualizada);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar la patología base."
    });
  }
});

// Eliminar una patología base por su ID
router.delete("/patologiasbase/:id", async (req, res) => {
  try {
    await PatologiaBase.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json({
      message: "Patología base eliminada correctamente."
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar la patología base."
    });
  }
});

// Obtener las personas asociadas a una patología base por su ID
router.get("/patologiasbase/:id/personas", async (req, res) => {
  try {
    const patologiaBase = await PatologiaBase.findByPk(req.params.id, {
      include: [Persona],
    });

    if (!patologiaBase) {
      return res.status(404).json({
        message: "Patología base no encontrada."
      });
    }

    res.json(patologiaBase.personas);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las personas asociadas a la patología base.",
    });
  }
});

module.exports = router;