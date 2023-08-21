const {
  Telefono,
  Persona
} = require("../models/relaciones");

// Obtener todos los teléfonos
const getAllTelefonos = async (req, res) => {
  try {
    const telefonos = await Telefono.findAll();
    res.json(telefonos);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los teléfonos."
    });
  }
};

// Crear un nuevo teléfono
const createTelefono = async (req, res) => {
  try {
    const nuevoTelefono = await Telefono.create(req.body);
    res.json(nuevoTelefono);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el teléfono."
    });
  }
};

// Actualizar un teléfono por su ID
const updateTelefono = async (req, res) => {
  try {
    const telefonoActualizado = await Telefono.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    res.json(telefonoActualizado);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el teléfono."
    });
  }
};

// Eliminar un teléfono por su ID
const deleteTelefono = async (req, res) => {
  try {
    await Telefono.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json({
      message: "Teléfono eliminado correctamente."
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el teléfono."
    });
  }
};

// Obtener la persona asociada a un teléfono por su ID
const getPersonaByTelefonoId = async (req, res) => {
  try {
    const telefono = await Telefono.findByPk(req.params.id, {
      include: [Persona],
    });

    if (!telefono) {
      return res.status(404).json({
        message: "Teléfono no encontrado."
      });
    }

    res.json(telefono.persona);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener la persona asociada al teléfono."
      });
  }
};
module.exports = {
  getAllTelefonos,
  createTelefono,
  updateTelefono,
  deleteTelefono,
  getPersonaByTelefonoId,
};