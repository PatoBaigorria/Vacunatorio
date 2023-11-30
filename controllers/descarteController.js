const { Descarte, AgenteDeSalud, LoteInterno, Persona } = require("../models/relaciones");

// Obtener todos los descartes
const getAllDescartes = async (req, res) => {
  try {
    const Descartes = await Descarte.findAll(
      {
        include: [{
          model: AgenteDeSalud,
          attributes: ['DNI'],  // Puedes incluir solo los atributos necesarios de AgenteDeSalud si es necesario
          include: [{
            model: Persona,
            attributes: ['DNI', 'nombre', 'apellido']
          }]
        }
        ]
      }
    );
    console.log(Descartes); // Imprimir los datos
    res.render("descarte/viewDescarte", { Descartes: Descartes });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los descartes. " + error.message });
  }
};

const altaDescartes = async (req, res) => {
  const personas = await Persona.findAll();
  const lotesInternos = await LoteInterno.findAll();
  res.render("descarte/formDescarte", { personas: personas, lotesInternos: lotesInternos });
};

// Crear un nuevo descarte
const createDescarte = async (req, res) => {
  try {
    const nuevoDescarte = await Descarte.create(req.body);
    res.redirect('/descartes')
  } catch (error) {
    res.status(500).json({ message: "Error al crear el descarte." });
  }
};

const editDescarteById = async (req, res) => {
  try {
    const descarte = await Descarte.findByPk(req.params.id);
    const personas = await Persona.findAll();
    const lotesInternos = await LoteInterno.findAll();
    res.render("descarte/editDescarte", { descarte: descarte, personas: personas, lotesInternos: lotesInternos });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el descarte." });
  }
}

// Actualizar un descarte por su ID
const updateDescarte = async (req, res) => {
  try {
    const descarteActualizado = await Descarte.update(req.body, {
      where: { idDescarte: req.params.id },
    });
    res.redirect('/descartes');
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el descarte. " + error.message });
  }
};

// Eliminar un descarte por su ID
const deleteDescarte = async (req, res) => {
  try {
    await Descarte.destroy({ where: { idDescarte: req.params.id } });
    res.json({ message: "Descarte eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el descarte." });
  }
};

// Obtener el agente de salud asociado a un descarte por su ID

module.exports = {
  getAllDescartes,
  altaDescartes,
  editDescarteById,
  createDescarte,
  updateDescarte,
  deleteDescarte,
};
