const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");
const AgenteDeSalud = require("../models/agentedesalud");
const Persona = require("../models/persona");
const Aplicacion = require("../models/aplicacion");

// Ruta para obtener todos los agentes de salud
router.get("/", controllers.agentedesaludController.getAllAgentesDeSalud);

// Ruta para crear un nuevo agente de salud
router.post("/", controllers.agentedesaludController.createAgenteDeSalud);

// Ruta para obtener un agente de salud por su ID
router.get("/:id", controllers.agentedesaludController.getAgenteDeSaludById);

// Ruta para actualizar un agente de salud por su ID
router.put("/:id", controllers.agentedesaludController.updateAgenteDeSalud);

// Ruta para eliminar un agente de salud por su ID
router.delete("/:id", controllers.agentedesaludController.deleteAgenteDeSalud);

// Obtener todos los agentes de salud
router.get("/agentesdesalud", async (req, res) => {
  try {
    const agentesDeSalud = await AgenteDeSalud.findAll();
    res.json(agentesDeSalud);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los agentes de salud."
    });
  }
});

// Crear un nuevo agente de salud
router.post("/agentesdesalud", async (req, res) => {
  try {
    const nuevoAgenteDeSalud = await AgenteDeSalud.create(req.body);
    res.json(nuevoAgenteDeSalud);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el agente de salud."
    });
  }
});

// Actualizar un agente de salud por su DNI
router.put("/agentesdesalud/:dni", async (req, res) => {
  try {
    const agenteDeSaludActualizado = await AgenteDeSalud.update(req.body, {
      where: {
        DNI: req.params.dni
      },
    });
    res.json(agenteDeSaludActualizado);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al actualizar el agente de salud."
      });
  }
});

// Eliminar un agente de salud por su DNI
router.delete("/agentesdesalud/:dni", async (req, res) => {
  try {
    await AgenteDeSalud.destroy({
      where: {
        DNI: req.params.dni
      }
    });
    res.json({
      message: "Agente de salud eliminado correctamente."
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el agente de salud."
    });
  }
});

// Obtener la persona asociada a un agente de salud por su DNI
router.get("/agentesdesalud/:dni/persona", async (req, res) => {
  try {
    const agenteDeSalud = await AgenteDeSalud.findByPk(req.params.dni, {
      include: [Persona],
    });

    if (!agenteDeSalud) {
      return res
        .status(404)
        .json({
          message: "Agente de salud no encontrado."
        });
    }

    res.json(agenteDeSalud.persona);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener la persona del agente de salud."
      });
  }
});

// Obtener las aplicaciones realizadas por un agente de salud por su DNI
router.get("/agentesdesalud/:dni/aplicaciones", async (req, res) => {
  try {
    const agenteDeSalud = await AgenteDeSalud.findByPk(req.params.dni, {
      include: [{
        model: Aplicacion,
        as: "aplicacionesAgentes",
      }, ],
    });

    if (!agenteDeSalud) {
      return res
        .status(404)
        .json({
          message: "Agente de salud no encontrado."
        });
    }

    res.json(agenteDeSalud.aplicacionesAgentes);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las aplicaciones del agente de salud.",
    });
  }
});

module.exports = router;