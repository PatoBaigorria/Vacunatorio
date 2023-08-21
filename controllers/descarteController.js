const { Descarte, Agentedesalud, Loteinterno } = require("../models/relaciones");

// Obtener todos los descartes
const getAllDescartes = async (req, res) => {
  try {
    const descartes = await Descarte.findAll();
    res.json(descartes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los descartes." });
  }
};

// Crear un nuevo descarte
const createDescarte = async (req, res) => {
  try {
    const nuevoDescarte = await Descarte.create(req.body);
    res.json(nuevoDescarte);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el descarte." });
  }
};

// Actualizar un descarte por su ID
const updateDescarte = async (req, res) => {
  try {
    const descarteActualizado = await Descarte.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(descarteActualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el descarte." });
  }
};

// Eliminar un descarte por su ID
const deleteDescarte = async (req, res) => {
  try {
    await Descarte.destroy({ where: { id: req.params.id } });
    res.json({ message: "Descarte eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el descarte." });
  }
};

// Obtener el agente de salud asociado a un descarte por su ID
const getAgenteDeSaludByDescarteId = async (req, res) => {
  try {
    const descarte = await Descarte.findByPk(req.params.id, {
      include: [Agentedesalud],
    });

    if (!descarte) {
      return res.status(404).json({ message: "Descarte no encontrado." });
    }

    res.json(descarte.agentedesalud);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el agente de salud asociado al descarte.",
    });
  }
};

// Obtener el lote interno asociado a un descarte por su ID
const getLoteInternoByDescarteId = async (req, res) => {
  try {
    const descarte = await Descarte.findByPk(req.params.id, {
      include: [Loteinterno],
    });

    if (!descarte) {
      return res.status(404).json({ message: "Descarte no encontrado." });
    }

    res.json(descarte.loteinterno);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el lote interno asociado al descarte.",
    });
  }
};
module.exports = {
  getAllDescartes,
  createDescarte,
  updateDescarte,
  deleteDescarte,
  getAgenteDeSaludByDescarteId,
  getLoteInternoByDescarteId,
};
