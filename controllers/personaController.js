const { ValidationErrorItemType } = require("sequelize");
const {
  Persona,
  Telefono,
  PatologiaBase,
  AgenteDeSalud,
} = require("../models/relaciones");
const { createRegistro } = require("./registroController");

const listarPersonas = async (req, res) => {
  try {
    const personas = await Persona.findAll({
      include: [
        { model: Telefono, attributes: ["celular1", "celular2"] },
        { model: PatologiaBase, attributes: ["patologiaBase"] },
        { model: AgenteDeSalud, attributes: ["matricula"] },
      ],
    });
    res.render("persona/viewPersona", {
      personas: personas,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las personas." });
  }
};

const formPersona = async (req, res) => {
  try {
    let agentes = await AgenteDeSalud.findAll();
    res.render("persona/formPersona", { agentes: agentes });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la persona." });
  }
};

const createPersona = async (req, res) => {
  try {
    const {
      DNI,
      nombre,
      apellido,
      fechaDeNacimiento,
      email,
      ocupacion,
      celular1,
      celular2,
      patologiaBase,
      genero,
      longitud,
      latitud,
    } = req.body;
    const matricula = parseFloat(req.body.matricula);
    const nulo = null;
    const existingPersona = await Persona.findByPk(DNI);
    const agentes = await AgenteDeSalud.findAll();

    if (existingPersona) {
      // Mostrar un mensaje flash indicando que la persona ya existe
      req.flash("error", "La persona ya existe en la base de datos.");
      // Redirigir al formulario de alta
      return res.redirect("/personas/alta");
    }

    if (agentes.map((agente) => agente.matricula).includes(matricula)) {
      // Mostrar un mensaje flash indicando que la persona ya existe
      req.flash("error", "El agente ya existe en la base de datos.");
      // Redirigir al formulario de alta
      return res.redirect("/personas/alta");
    }
    const persona = await Persona.create({
      DNI,
      nombre,
      apellido,
      email,
      fechaDeNacimiento,
      ocupacion,
      genero,
      longitud,
      latitud,
      activo: 1,
    });
    await createRegistro(req.user.idUsuario, "Persona", persona.dataValues.DNI, "Creacion");
    await createRegistro(req.user.idUsuario, "Persona", persona.dataValues.DNI, "Alta");
    if (ocupacion === "agente de salud") {
      await AgenteDeSalud.create({
        DNI,
        matricula,
      });
    } else if (ocupacion === "otro") {
      await AgenteDeSalud.create({
        DNI,
        nulo,
      });
    }
    if (celular1 !== "" && celular2 !== "") {
      await Telefono.create({
        DNI,
        celular1,
        celular2,
      });
    } else if (celular1 !== "" && celular2 === "") {
      await Telefono.create({
        DNI,
        celular1,
      });
    } else if (celular1 === "" && celular2 !== "") {
      await Telefono.create({
        DNI,
        celular2,
      });
    } else {
      await Telefono.create({
        DNI,
      });
    }
    await PatologiaBase.create({
      DNI,
      patologiaBase,
    });

    // Utiliza req.flash() para establecer el mensaje flash
    req.flash("success", "Persona creada exitosamente.");

    // Redirige a la vista de personas
    res.redirect("/personas");
  } catch (error) {
    // Manejar errores
    console.error(error);
    req.flash("error", "Error al crear la persona.");
    res.status(500).redirect("/personas/alta");
  }
};

const detailsPersona = async (req, res) => {
  try {
    const persona = await Persona.findByPk(req.params.id, {
      include: [
        { model: Telefono, attributes: ["celular1", "celular2"] },
        { model: PatologiaBase, attributes: ["patologiaBase"] },
        { model: AgenteDeSalud, attributes: ["matricula"] },
      ],
    });

    if (!persona) {
      // Si la persona no existe, responde con un error 404
      res.status(404).json({ message: "Persona no encontrada" });
    } else {
      // Si la persona existe, renderiza la vista de detalles
      res.render("persona/detailsPersona", { persona });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error interno del servidor. Error: " + error.message });
  }
};

const editPersona = async (req, res) => {
  try {
    const persona = await Persona.findByPk(req.params.id, {
      include: [
        { model: Telefono, attributes: ["celular1", "celular2"] },
        { model: PatologiaBase, attributes: ["patologiaBase"] },
        { model: AgenteDeSalud, attributes: ["matricula"] },
      ],
    });
    const agentesdesalud = await AgenteDeSalud.findAll();
    if (!persona) {
      // Manejar el caso donde no se encuentra la persona
      return res.status(404).render("error", {
        message: "Persona no encontrada",
      });
    }

    res.render("persona/editPersona", {
      persona: persona,
      agentesdesalud: agentesdesalud,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener la persona. " + error.message });
  }
};

// Actualizar una persona por su ID
const updatePersona = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      fechaDeNacimiento,
      email,
      ocupacion,
      celular1,
      celular2,
      patologiaBase,
      genero,
      longitud,
      latitud,
    } = req.body;
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
          matricula: matricula,
        },
        {
          where: {
            DNI: req.params.id,
          },
        }
      );
    } else if (ocupacion === "otro") {
      await AgenteDeSalud.update(
        {
          matricula: null,
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
    }
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
    await createRegistro(req.user.idUsuario, "Persona", req.params.id, "Modificacion");
    req.flash("success", "Persona actualizada exitosamente");
    res.redirect("/personas");
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar la persona.",
      error: error.message,
    });
  }
};

// Eliminar una persona por su ID
const deletePersona = async (req, res) => {
  try {
    await Telefono.destroy({ where: { DNI: req.params.id } });
    await PatologiaBase.destroy({ where: { DNI: req.params.id } });
    await AgenteDeSalud.destroy({ where: { DNI: req.params.id } });
    await Persona.destroy({ where: { DNI: req.params.id } });
    req.flash("success", "Persona eliminada correctamente.");
    res.json({ success: true }); // Enviar una respuesta JSON al cliente
  } catch (error) {
    req.flash("error", "Error al eliminar la persona. ", error.message);
  }
};

const bajaPersona = async (req, res) => {
  try {
    await Persona.update(
      { activo: 0 },
      {
        where: {
          DNI: req.params.id,
        },
      }
    );
    await createRegistro(req.user.idUsuario, "Persona", req.params.id, "Baja");
    req.flash("success", "Persona dada de baja exitosamente.");
    res.json({ success: true });
  } catch (error) {
    console.error("Error al dar de baja de la persona:", error);
    req.flash("error", "Error al dar de baja de la persona.");
    res.status(500).json({ success: false, message: error.message });
  }
};

const altaPersona = async (req, res) => {
  try {
    await Persona.update(
      { activo: 1 },
      {
        where: {
          DNI: req.params.id,
        },
      }
    );
    await createRegistro(req.user.idUsuario, "Persona", req.params.id, "Alta");
    req.flash("success", "Persona dada de alta exitosamente.");
    res.json({ success: true });
  } catch (error) {
    console.error("Error al dar de alta de la persona:", error);
    req.flash("error", "Error al dar de alta de la persona.");
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  listarPersonas,
  formPersona,
  createPersona,
  detailsPersona,
  editPersona,
  updatePersona,
  deletePersona,
  bajaPersona,
  altaPersona,
};
