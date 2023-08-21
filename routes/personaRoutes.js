const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");
const {
  Persona,
  Telefono,
  PatologiaBase,
  AgenteDeSalud,
  Aplicacion,
} = require("../models/relaciones");

// Ruta para obtener todas las personas
router.get("/", controllers.personaController.getAllPersonas);

// Ruta para crear una nueva persona
router.post("/", controllers.personaController.createPersona);

// Ruta para obtener una persona por su ID
//router.get("/:id", controllers.personaController.getPersonaById);

// Ruta para actualizar una persona por su ID
router.put("/:id", controllers.personaController.updatePersona);

// Ruta para eliminar una persona por su ID
router.delete("/:id", controllers.personaController.deletePersona);

// Obtener todas las personas
router.get("/personas", async (req, res) => {
  try {
    const personas = await Persona.findAll();
    res.json(personas);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las personas."
    });
  }
});

// Crear una nueva persona
router.post("/personas", async (req, res) => {
  try {
    const nuevaPersona = await Persona.create(req.body);
    res.json(nuevaPersona);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear la persona."
    });
  }
});

// Actualizar una persona por su DNI
router.put("/personas/:dni", async (req, res) => {
  try {
    const personaActualizada = await Persona.update(req.body, {
      where: {
        DNI: req.params.dni
      },
    });
    res.json(personaActualizada);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar la persona."
    });
  }
});

// Eliminar una persona por su DNI
router.delete("/personas/:dni", async (req, res) => {
  try {
    await Persona.destroy({
      where: {
        DNI: req.params.dni
      }
    });
    res.json({
      message: "Persona eliminada correctamente."
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar la persona."
    });
  }
});

// Obtener los teléfonos de una persona por su DNI
router.get("/personas/:dni/telefonos", async (req, res) => {
  try {
    const persona = await Persona.findByPk(req.params.dni, {
      include: [Telefono],
    });

    if (!persona) {
      return res.status(404).json({
        message: "Persona no encontrada."
      });
    }

    res.json(persona.telefonos);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener los teléfonos de la persona."
      });
  }
});

// Obtener las patologías base de una persona por su DNI
router.get("/personas/:dni/patologiasbase", async (req, res) => {
  try {
    const persona = await Persona.findByPk(req.params.dni, {
      include: [PatologiaBase],
    });

    if (!persona) {
      return res.status(404).json({
        message: "Persona no encontrada."
      });
    }

    res.json(persona.patologiasbases);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener las patologías base de la persona."
      });
  }
});

// Obtener el agente de salud asociado a una persona por su DNI
router.get("/personas/:dni/agentedesalud", async (req, res) => {
  try {
    const persona = await Persona.findByPk(req.params.dni, {
      include: [AgenteDeSalud],
    });

    if (!persona) {
      return res.status(404).json({
        message: "Persona no encontrada."
      });
    }

    res.json(persona.agentedesalud);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener el agente de salud de la persona."
      });
  }
});

// Obtener las aplicaciones asociadas a una persona por su DNI
router.get("/personas/:dni/aplicaciones", async (req, res) => {
  try {
    const persona = await Persona.findByPk(req.params.dni, {
      include: [Aplicacion],
    });

    if (!persona) {
      return res.status(404).json({
        message: "Persona no encontrada."
      });
    }

    res.json(persona.aplicaciones);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener las aplicaciones de la persona."
      });
  }
});

module.exports = router;