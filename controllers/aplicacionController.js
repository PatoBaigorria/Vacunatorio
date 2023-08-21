const {
  Aplicacion,
  Persona,
  Agentedesalud,
  Loteinterno,
} = require("../models/relaciones");

// Obtener todas las aplicaciones
const getAllAplicaciones = async (req, res) => {
  try {
    const aplicaciones = await Aplicacion.findAll();
    res.json(aplicaciones);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las aplicaciones." });
  }
};

// Crear una nueva aplicación
const createAplicacion = async (req, res) => {
  try {
    const nuevaAplicacion = await Aplicacion.create(req.body);
    res.json(nuevaAplicacion);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la aplicación." });
  }
};

// Actualizar una aplicación por su ID
const updateAplicacion = async (req, res) => {
  try {
    const aplicacionActualizada = await Aplicacion.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(aplicacionActualizada);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la aplicación." });
  }
};

// Eliminar una aplicación por su ID
const deleteAplicacion = async (req, res) => {
  try {
    await Aplicacion.destroy({ where: { id: req.params.id } });
    res.json({ message: "Aplicación eliminada correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la aplicación." });
  }
};

// Obtener información completa de una aplicación por su ID
const getAplicacionById = async (req, res) => {
  try {
    const aplicacion = await Aplicacion.findByPk(req.params.id, {
      include: [Persona, Agentedesalud, Loteinterno],
    });

    if (!aplicacion) {
      return res.status(404).json({ message: "Aplicación no encontrada." });
    }

    res.json(aplicacion);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener la información de la aplicación." });
  }
};
module.exports = {
  getAllAplicaciones,
  createAplicacion,
  updateAplicacion,
  deleteAplicacion,
  getAplicacionById,
};
