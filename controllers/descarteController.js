const { Descarte, AgenteDeSalud, LoteInterno, Persona } = require("../models/relaciones");

// Obtener todos los descartes
const listarDescartes = async (req, res) => {
  try {
    const descartes = await Descarte.findAll(
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
    res.render("descarte/viewDescarte", { descartes: descartes });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los descartes. " + error.message });
  }
};

const altaDescarte = async (req, res) => {
  try {
    const personas = await Persona.findAll();
    const lotesInternos = await LoteInterno.findAll();
    res.render("descarte/formDescarte", {
      personas: personas,
      lotesInternos: lotesInternos
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los descartes. " + error.message });
  }
};

// Crear un nuevo descarte
const createDescarte = async (req, res) => {
  try {
    const { DNIAgente, numeroDeSerie, empresaDescartante, motivo, cantidadDeVacunas, fechaDeDescarte } = req.body;
    await Descarte.create({
      DNIAgente,
      numeroDeSerie,
      empresaDescartante,
      motivo,
      cantidadDeVacunas,
      fechaDeDescarte
    });
    req.flash('success', 'Descarte creado exitosamente.');
    res.redirect('/descartes');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error al crear el descarte.');
    res.status(500).json({ message: "Error al crear el descarte." });
  }
};

const editDescarte = async (req, res) => {
  try {
    const descarte = await Descarte.findByPk(req.params.id);
    const personas = await Persona.findAll();
    const lotesInternos = await LoteInterno.findAll();
    const empresas = ['Veolia', 'Clean Harbors', 'Waste Management', 'Stericycle']
    const motivos = ['Vencida', 'Rotura', 'Cadena Pérdida de Frío', 'Contaminación']
    res.render("descarte/editDescarte", { descarte: descarte, personas: personas, lotesInternos: lotesInternos, motivos: motivos, empresas: empresas });
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
    req.flash('success', 'Descarte de Vacunas actualizado exitosamente.');
    res.redirect('/descartes');
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el descarte. " + error.message });
  }
};

// Eliminar un descarte por su ID
const deleteDescarte = async (req, res) => {
  try {
    await Descarte.destroy({
      where:
      {
        idDescarte: req.params.id
      },
    });
    req.flash('success', 'Descarte de Vacuna eliminada exitosamente.');
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el descarte." });
  }
};

module.exports = {
  listarDescartes,
  altaDescarte,
  createDescarte,
  editDescarte,
  updateDescarte,
  deleteDescarte,
};
