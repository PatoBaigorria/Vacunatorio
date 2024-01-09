const {
  Aplicacion,
  Persona,
  AgenteDeSalud,
  LoteInterno,
} = require("../models/relaciones");

// Obtener todas las aplicaciones
const listarAplicacion = async (req, res) => {
  try {
    const aplicaciones = await Aplicacion.findAll(
      {
        include: [{
          model: AgenteDeSalud,
          attributes: ['DNI'],  // Puedes incluir solo los atributos necesarios de AgenteDeSalud si es necesario
          include: [{
            model: Persona,
            attributes: ['DNI', 'nombre', 'apellido']
          }]
        },
        {
          model: Persona,
          attributes: ['DNI', 'nombre', 'apellido']
        },
        {
          model: LoteInterno,
          attributes: ['numeroDeSerie'],
        }
        ]
      }
    );
    res.render("aplicacion/viewAplicacion", { aplicaciones: aplicaciones });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las aplicaciones.", error: error.message });
  }
};

const altaAplicacion = async (req, res) => {
  try {
    const lotes = await LoteInterno.findAll();
    const personas = await Persona.findAll();
    const agentes = await AgenteDeSalud.findAll();
    res.render("aplicacion/formAplicacion", {
      lotes: lotes,
      personas: personas,
      agentes: agentes,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la aplicación.", error: error.message });
  }
}

// Crear una nueva aplicación
const createAplicacion = async (req, res) => {
  try {
    const { DNIPaciente, DNIAgente, numeroDeSerie, fechaDeAplicacion } = req.body;
    await Aplicacion.create({
      DNIPaciente,
      DNIAgente,
      numeroDeSerie,
      fechaDeAplicacion
    });
    req.flash('success', 'Aplicación creada exitosamente.');
    res.redirect("/aplicaciones");
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error al crear la aplicación.');
    res.status(500).json({ message: "Error al crear la aplicación." });
  }
};

const editAplicacion = async (req, res) => {
  try {
    const aplicacion = await Aplicacion.findByPk(req.params.id);
    const lotes = await LoteInterno.findAll();
    const personas = await Persona.findAll();
    const agentes = await AgenteDeSalud.findAll();
    res.render("aplicacion/editAplicacion", {
      aplicacion: aplicacion,
      lotes: lotes,
      personas: personas,
      agentes: agentes
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener la información de la aplicación." });
  }
};

// Actualizar una aplicación por su ID
const updateAplicacion = async (req, res) => {
  try {
    Aplicacion.update(req.body, {
      where: { idAplicacion: req.params.id },
    });
    req.flash('success', 'Aplicación de Vacuna actualizada exitosamente.');
    res.redirect('/aplicaciones');
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la aplicación. " + error.message });
  }
};

// Eliminar una aplicación por su ID
const deleteAplicacion = async (req, res) => {
  try {
    await Aplicacion.destroy({
      where:
      {
        idAplicacion: req.params.id
      },
    });
    req.flash('success', 'Aplicación de Vacuna eliminada exitosamente.');
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la aplicación." });
  }
};



module.exports = {
  listarAplicacion,
  altaAplicacion,
  createAplicacion,
  editAplicacion,
  updateAplicacion,
  deleteAplicacion
};