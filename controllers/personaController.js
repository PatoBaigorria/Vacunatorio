const { Persona, Telefono, PatologiaBase, AgenteDeSalud } = require("../models/relaciones");

// Controlador para mostrar el formulario de ingreso de datos de persona

// Obtener todas las personas
const listarPersonas = async (req, res) => {
  try {
    const Personas = await Persona.findAll();
    const Telefonos = await Telefono.findAll();
    const PatologiasBases = await PatologiaBase.findAll();
    const AgentesDeSalud = await AgenteDeSalud.findAll();
    res.render("persona/viewPersona", {
      Personas: Personas,
      Telefonos: Telefonos,
      PatologiasBases: PatologiasBases,
      AgentesDeSalud: AgentesDeSalud
    })
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las personas." });
  }
};

const mostrarFormularioCrearPersona = async (req, res) => {
  try {
    res.render("persona/formPersona");
  } catch (error) {
    res.status(500).json({ message: "Error al crear la persona." });
  }
};

const crearPersonaDesdeFormulario = async (req, res) => {
  try {
    const { DNI, nombre, apellido, fechaDeNacimiento, email, ocupacion, celular1, celular2, patologiaBase, matricula, genero, longitud, latitud } = req.body;
    await Persona.create({
      DNI,
      nombre,
      apellido,
      email,
      fechaDeNacimiento,
      ocupacion,
      genero,
      longitud,
      latitud
    });
    if (ocupacion === "agente de salud") {
      await AgenteDeSalud.create({
        DNI,
        matricula
      });
    }

    if (celular1 !== "" && celular2 !== "") {
      await Telefono.create({
        DNI,
        celular1,
        celular2
      });
    } else if (celular1 !== "" && celular2 === "") {
      await Telefono.create({
        DNI,
        celular1
      });
    } else if (celular1 === "" && celular2 !== "") {
      await Telefono.create({
        DNI,
        celular2
      });
    };
    if (patologiaBase !== "") {
      await PatologiaBase.create({
        DNI,
        patologiaBase
      });
    }
    res.redirect("/personas");
  } catch (error) {
    res.status(500).json({ message: "Error al crear la persona.", error: error.message });
  }
}

const editarPersona = async (req, res) => {
  try {
    const persona = await Persona.findByPk(req.params.id);
    const telefono = await Telefono.findByPk(req.params.id);
    const patologiabase = await PatologiaBase.findByPk(req.params.id);
    const agentedesalud = await AgenteDeSalud.findByPk(req.params.id);
    if (!persona) {
      // Manejar el caso donde no se encuentra la persona
      return res.status(404).render("error", {
        message: "Persona no encontrada",
      });
    }

    res.render("persona/editPersona", {
      persona: persona,
      telefono: telefono,
      patologiabase: patologiabase,
      agentedesalud: agentedesalud
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la persona. " + error.message });
  }
};


// Actualizar una persona por su ID
const updatePersona = async (req, res) => {
  try {
    const { DNI, nombre, apellido, fechaDeNacimiento, email, ocupacion, celular1, celular2, patologiaBase, genero, longitud, latitud } = req.body;
    const matricula = parseFloat(req.body.matricula);
    await Persona.update(
      {
        nombre: nombre,
        apellido: apellido,
        email: email,
        fechaDeNacimiento: fechaDeNacimiento,
        ocupacion: ocupacion,
        genero: genero,
        longitud: longitud,
        latitud: latitud,
      },
      {
        where: {
          DNI: req.params.id,
        },
      }
    );
    if (ocupacion === "agente de salud") {
      await AgenteDeSalud.update(
        {
          DNI: DNI,
          matricula: matricula,
        },
        {
          where: {
            DNI: req.params.id,
          },
        }
      );
    }

    if (celular1 !== "" && celular2 !== "") {
      await Telefono.update(
        {
          celular1: celular1,
          celular2: celular2,
        },
        {
          where: {
            DNI: req.params.id,
          },
        }
      );
    } else if (celular1 !== "" && celular2 === "") {
      await Telefono.update(
        {
          celular1: celular1,
          celular2: null,
        },
        {
          where: {
            DNI: req.params.id,
          },
        }
      );
    } else if (celular1 === "" && celular2 !== "") {
      await Telefono.update(
        {
          celular1: null,
          celular2: celular2,
        },
        {
          where: {
            DNI: req.params.id,
          },
        }
      );
    } else {
      await Telefono.update(
        {
          celular1: null,
          celular2: null,
        },
        {
          where: {
            DNI: req.params.id,
          },
        }
      );
    };
    if (patologiaBase !== "") {
      await PatologiaBase.update(
        {
          patologiaBase: patologiaBase,
        },
        {
          where: {
            DNI: req.params.id,
          },
        }
      );
    }
    res.redirect("/personas");
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la persona.", error: error.message });
  }
};

// Eliminar una persona por su ID
const deletePersona = async (req, res) => {
  try {
    await Telefono.destroy({ where: { DNI: req.params.id } });
    await PatologiaBase.destroy({ where: { DNI: req.params.id } });
    await AgenteDeSalud.destroy({ where: { DNI: req.params.id } });
    await Persona.destroy({ where: { DNI: req.params.id } });
    res.redirect("/personas");
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la persona." });
  }
};
module.exports = {
  listarPersonas,
  mostrarFormularioCrearPersona,
  crearPersonaDesdeFormulario,
  editarPersona,
  updatePersona,
  deletePersona,
  //mostrarFormulario,
};
