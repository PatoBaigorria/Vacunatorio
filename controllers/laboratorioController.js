const {
  Laboratorio,
  Loteproveedor,
  Loteinterno,
} = require("../models/relaciones");

// Obtener todos los laboratorios
const getAllLaboratorios = async (req, res) => {
  try {
    const laboratorios = await Laboratorio.findAll();
    console.log(laboratorios);
    res.json(laboratorios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los laboratorios." });
  }
};

// Crear un nuevo laboratorio
const createLaboratorio = async (req, res) => {
  try {
    const nuevoLaboratorio = await Laboratorio.create(req.body);
    res.json(nuevoLaboratorio);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el laboratorio." });
  }
};

// Actualizar un laboratorio por su ID
const updateLaboratorio = async (req, res) => {
  try {
    const laboratorioActualizado = await Laboratorio.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(laboratorioActualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el laboratorio." });
  }
};

// Eliminar un laboratorio por su ID
const deleteLaboratorio = async (req, res) => {
  try {
    await Laboratorio.destroy({ where: { id: req.params.id } });
    res.json({ message: "Laboratorio eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el laboratorio." });
  }
};

// Obtener los lotes proveedores asociados a un laboratorio por su ID
const getLotesProveedoresByLaboratorioId = async (req, res) => {
  try {
    const laboratorio = await Laboratorio.findByPk(req.params.id, {
      include: [Loteproveedor],
    });

    if (!laboratorio) {
      return res.status(404).json({ message: "Laboratorio no encontrado." });
    }

    res.json(laboratorio.loteproveedores);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los lotes proveedores del laboratorio.",
    });
  }
};

// Obtener los lotes internos asociados a un laboratorio por su ID
const getLotesInternosByLaboratorioId = async (req, res) => {
  try {
    const laboratorio = await Laboratorio.findByPk(req.params.id, {
      include: [Loteinterno],
    });

    if (!laboratorio) {
      return res.status(404).json({ message: "Laboratorio no encontrado." });
    }

    res.json(laboratorio.loteinternos);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los lotes internos del laboratorio.",
    });
  }
};
module.exports = {
  getAllLaboratorios,
  createLaboratorio,
  updateLaboratorio,
  deleteLaboratorio,
  getLotesProveedoresByLaboratorioId,
  getLotesInternosByLaboratorioId,
};
