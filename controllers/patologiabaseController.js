const { Patologiabase, Persona } = require("../models/relaciones");

// Obtener todas las patologías base
const getAllPatologiasBase = async (req, res) => {
  try {
    const patologiasBase = await Patologiabase.findAll();
    res.json(patologiasBase);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las patologías base." });
  }
};

// Crear una nueva patología base
const createPatologiaBase = async (req, res) => {
  try {
    const nuevaPatologiaBase = await Patologiabase.create(req.body);
    res.json(nuevaPatologiaBase);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la patología base." });
  }
};

// Actualizar una patología base por su ID
const updatePatologiaBase = async (req, res) => {
  try {
    const patologiaBaseActualizada = await Patologiabase.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(patologiaBaseActualizada);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la patología base." });
  }
};

// Eliminar una patología base por su ID
const deletePatologiaBase = async (req, res) => {
  try {
    await Patologiabase.destroy({ where: { id: req.params.id } });
    res.json({ message: "Patología base eliminada correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la patología base." });
  }
};

// Obtener la persona asociada a una patología base por su ID
const getPersonaByPatologiaBaseId = async (req, res) => {
  try {
    const patologiaBase = await Patologiabase.findByPk(req.params.id, {
      include: [Persona],
    });

    if (!patologiaBase) {
      return res.status(404).json({ message: "Patología base no encontrada." });
    }

    res.json(patologiaBase.persona);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener la persona asociada a la patología base.",
    });
  }
};
module.exports = {
  getAllPatologiasBase,
  createPatologiaBase,
  updatePatologiaBase,
  deletePatologiaBase,
  getPersonaByPatologiaBaseId,
};
