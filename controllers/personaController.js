const { Persona } = require("../models/relaciones");

// Controlador para mostrar el formulario de ingreso de datos de persona
function mostrarFormulario(req, res) {
  res.render("formulario");
}

// Obtener todas las personas
const getAllPersonas = async (req, res) => {
  try {
    const personas = await Persona.findAll();
    res.json(personas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las personas." });
  }
};

// Crear una nueva persona
const createPersona = async (req, res) => {
  try {
    const nuevaPersona = await Persona.create(req.body);
    res.json(nuevaPersona);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la persona." });
  }
};

// Actualizar una persona por su ID
const updatePersona = async (req, res) => {
  try {
    const personaActualizada = await Persona.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(personaActualizada);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la persona." });
  }
};

// Eliminar una persona por su ID
const deletePersona = async (req, res) => {
  try {
    await Persona.destroy({ where: { id: req.params.id } });
    res.json({ message: "Persona eliminada correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la persona." });
  }
};
module.exports = {
  getAllPersonas,
  createPersona,
  updatePersona,
  deletePersona,
  mostrarFormulario,
};
