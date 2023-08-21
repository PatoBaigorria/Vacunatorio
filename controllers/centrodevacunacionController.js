const {
  Centrodevacunacion
} = require("../models/relaciones");

// Obtener todos los centros de vacunación
const getAllCentrosDeVacunacion = async (req, res) => {
  try {
    const centrosDeVacunacion = await Centrodevacunacion.findAll();
    res.json(centrosDeVacunacion);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener los centros de vacunación."
      });
  }
};

// Crear un nuevo centro de vacunación
const createCentroDeVacunacion = async (req, res) => {
  try {
    const nuevoCentroDeVacunacion = await Centrodevacunacion.create(req.body);
    res.json(nuevoCentroDeVacunacion);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al crear el centro de vacunación."
      });
  }
};

// Actualizar un centro de vacunación por su ID
const updateCentroDeVacunacion = async (req, res) => {
  try {
    const centroDeVacunacionActualizado = await Centrodevacunacion.update(
      req.body, {
        where: {
          id: req.params.id
        },
      }
    );
    res.json(centroDeVacunacionActualizado);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al actualizar el centro de vacunación."
      });
  }
};

// Eliminar un centro de vacunación por su ID
const deleteCentroDeVacunacion = async (req, res) => {
  try {
    await Centrodevacunacion.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json({
      message: "Centro de vacunación eliminado correctamente."
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al eliminar el centro de vacunación."
      });
  }
};

module.exports = {
  getAllCentrosDeVacunacion,
  createCentroDeVacunacion,
  updateCentroDeVacunacion,
  deleteCentroDeVacunacion,
};