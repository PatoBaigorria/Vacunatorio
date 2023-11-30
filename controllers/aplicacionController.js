const {
  Aplicacion,
  Persona,
  AgenteDeSalud,
  LoteInterno,
} = require("../models/relaciones");

// Obtener todas las aplicaciones
const listarAplicacion = async (req, res) => {
  try {
    const aplicacion = await Aplicacion.findAll(
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
    res.render("aplicacion/viewAplicacion", { aplicacion: aplicacion });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las aplicaciones.", error: error.message });
  }
};

const crearAplicacion = async (req, res) => {
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
    res.status(500).json({ message: "Error al crear la persona.", error: error.message });
  }
}

// Crear una nueva aplicación
const createAplicacion = async (req, res) => {
  try {
    await Aplicacion.create(req.body);
    res.redirect("/aplicaciones");
  } catch (error) {
    res.status(500).json({ message: "Error al crear la aplicación." });
  }
};
// Obtener información completa de una aplicación por su ID
const editarAplicacion = async (req, res) => {
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
    res.redirect('/aplicaciones');
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la aplicación. " + error.message });
  }
};

// Eliminar una aplicación por su ID
const deleteAplicacion = async (req, res) => {
  try {
    await Aplicacion.destroy({
      where: {
        idAplicacion: req.params.id
      }
    });
    res.redirect("/aplicaciones");
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la aplicación." });
  }
};



module.exports = {
  listarAplicacion,
  crearAplicacion,
  createAplicacion,
  editarAplicacion,
  updateAplicacion,
  deleteAplicacion,

};