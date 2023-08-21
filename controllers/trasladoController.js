const {
  Traslado,
  Loteinterno,
  Centrodevacunacion
} = require("../models/relaciones");

// Obtener todos los traslados
const getAllTraslados = async (req, res) => {
  try {
    const traslados = await Traslado.findAll();
    res.json(traslados);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los traslados."
    });
  }
};

// Crear un nuevo traslado
const createTraslado = async (req, res) => {
  try {
    const nuevoTraslado = await Traslado.create(req.body);
    res.json(nuevoTraslado);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el traslado."
    });
  }
};

// Actualizar un traslado por su ID
const updateTraslado = async (req, res) => {
  try {
    const trasladoActualizado = await Traslado.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    res.json(trasladoActualizado);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el traslado."
    });
  }
};

// Eliminar un traslado por su ID
const deleteTraslado = async (req, res) => {
  try {
    await Traslado.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json({
      message: "Traslado eliminado correctamente."
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el traslado."
    });
  }
};

// Obtener el lote interno asociado a un traslado por su ID
const getLoteInternoByTrasladoId = async (req, res) => {
  try {
    const traslado = await Traslado.findByPk(req.params.id, {
      include: [Loteinterno],
    });

    if (!traslado) {
      return res.status(404).json({
        message: "Traslado no encontrado."
      });
    }

    res.json(traslado.loteinterno);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el lote interno asociado al traslado.",
    });
  }
};

// Obtener el centro de vacunación asociado a un traslado por su ID
const getCentroDeVacunacionByTrasladoId = async (req, res) => {
  try {
    const traslado = await Traslado.findByPk(req.params.id, {
      include: [Centrodevacunacion],
    });

    if (!traslado) {
      return res.status(404).json({
        message: "Traslado no encontrado."
      });
    }

    res.json(traslado.centrodevacunacion);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el centro de vacunación asociado al traslado.",
    });
  }
};
module.exports = {
  getAllTraslados,
  createTraslado,
  updateTraslado,
  deleteTraslado,
  getLoteInternoByTrasladoId,
  getCentroDeVacunacionByTrasladoId,
};