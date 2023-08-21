const {
  Agentedesalud
} = require("../models/relaciones");

// Obtener todos los agentes de salud
const getAllAgentesDeSalud = async (req, res) => {
  try {
    const agentesDeSalud = await Agentedesalud.findAll();
    res.json(agentesDeSalud);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los agentes de salud."
    });
  }
};

// Crear un nuevo agente de salud
const createAgenteDeSalud = async (req, res) => {
  try {
    const nuevoAgenteDeSalud = await Agentedesalud.create(req.body);
    res.json(nuevoAgenteDeSalud);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el agente de salud."
    });
  }
};

// Actualizar un agente de salud por su ID
const updateAgenteDeSalud = async (req, res) => {
  try {
    const agenteDeSaludActualizado = await Agentedesalud.update(req.body, {
      where: {
        id: req.params.id
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
};

// Eliminar un agente de salud por su ID
const deleteAgenteDeSalud = async (req, res) => {
  try {
    await Agentedesalud.destroy({
      where: {
        id: req.params.id
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
};

const getAgenteDeSaludById = async (req, res) => {
  try {
    const agentesDeSalud = await Agentedesalud.find(0);
    res.json(agentesDeSalud);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los agentes de salud."
    });
  }
};
module.exports = {
  getAllAgentesDeSalud,
  createAgenteDeSalud,
  updateAgenteDeSalud,
  deleteAgenteDeSalud,
  getAgenteDeSaludById,
};