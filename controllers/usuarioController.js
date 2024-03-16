const { Usuario, Rol } = require("../models/relaciones");
const {
	createRegistro
} = require('./registroController');
const listarUsuarios = async (req, res) => {
	try {
		const usuarios = await Usuario.findAll();
		res.render("usuario/login", {
			usuarios: usuarios,
		});
	} catch (error) {
		res.status(500).json({ message: "Error al obtener los usuarios." });
	}
};

const formUsuario = async (req, res) => {
	try {
		//let roles = await Rol.findAll();
		res.render("usuario/formUsuario");
	} catch (error) {
		res.status(500).json({ message: "Error al crear la usuario." });
	}
};

/*const createUsuario = async (req, res) => {
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
	const existingUsuario = await Usuario.findByPk(DNI);
	const agentes = await AgenteDeSalud.findAll();

	if (existingUsuario) {
	  // Mostrar un mensaje flash indicando que la usuario ya existe
	  req.flash("error", "La usuario ya existe en la base de datos.");
	  // Redirigir al formulario de alta
	  return res.redirect("/usuarios/alta");
	}

	if (agentes.map((agente) => agente.matricula).includes(matricula)) {
	  // Mostrar un mensaje flash indicando que la usuario ya existe
	  req.flash("error", "El agente ya existe en la base de datos.");
	  // Redirigir al formulario de alta
	  return res.redirect("/usuarios/alta");
	}
	const usuario = await Usuario.create({
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
	await createRegistro("usuario", Usuario.dataValues.DNI, "Creacion");
	await createRegistro("usuario", Usuario.dataValues.DNI, "Alta");
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
	req.flash("success", "usuario creada exitosamente.");

	// Redirige a la vista de usuarios
	res.redirect("/usuarios");
  } catch (error) {
	// Manejar errores
	console.error(error);
	req.flash("error", "Error al crear la usuario.");
	res.status(500).redirect("/usuarios/alta");
  }
};

const editUsuario = async (req, res) => {
  try {
	const usuario = await Usuario.findByPk(req.params.id, {
	  include: [
		{ model: Telefono, attributes: ["celular1", "celular2"] },
		{ model: PatologiaBase, attributes: ["patologiaBase"] },
		{ model: AgenteDeSalud, attributes: ["matricula"] },
	  ],
	});
	const agentesdesalud = await AgenteDeSalud.findAll();
	if (!usuario) {
	  // Manejar el caso donde no se encuentra la usuario
	  return res.status(404).render("error", {
		message: "Usuario no encontrada",
	  });
	}

	res.render("usuario/editUsuario", {
	  usuario: usuario,
	  agentesdesalud: agentesdesalud,
	});
  } catch (error) {
	res
	  .status(500)
	  .json({ message: "Error al obtener la usuario. " + error.message });
  }
};

// Actualizar una usuario por su ID
const updateUsuario = async (req, res) => {
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
	await Usuario.update(
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
	await createRegistro("usuario", req.params.id, "Modificacion");
	req.flash("success", "usuario actualizada exitosamente");
	res.redirect("/usuarios");
  } catch (error) {
	res.status(500).json({
	  message: "Error al actualizar la usuario.",
	  error: error.message,
	});
  }
};

// Eliminar una usuario por su ID
const deleteUsuario = async (req, res) => {
  try {
	await Telefono.destroy({ where: { DNI: req.params.id } });
	await PatologiaBase.destroy({ where: { DNI: req.params.id } });
	await AgenteDeSalud.destroy({ where: { DNI: req.params.id } });
	await Usuario.destroy({ where: { DNI: req.params.id } });
	req.flash("success", "Usuario eliminada correctamente.");
	res.json({ success: true }); // Enviar una respuesta JSON al cliente
  } catch (error) {
	req.flash("error", "Error al eliminar la usuario. ", error.message);
  }
};

const bajaUsuario = async (req, res) => {
  try {
	await Usuario.update(
	  { activo: 0 },
	  {
		where: {
		  DNI: req.params.id,
		},
	  }
	);
	await createRegistro("usuario", req.params.id, "Baja");
	req.flash("success", "Usuario dada de baja exitosamente.");
	res.json({ success: true });
  } catch (error) {
	console.error("Error al dar de baja de la usuario:", error);
	req.flash("error", "Error al dar de baja de la usuario.");
	res.status(500).json({ success: false, message: error.message });
  }
};

const altaUsuario = async (req, res) => {
  try {
	await Usuario.update(
	  { activo: 1 },
	  {
		where: {
		  DNI: req.params.id,
		},
	  }
	);
	await createRegistro("usuario", req.params.id, "Alta");
	req.flash("success", "Usuario dada de alta exitosamente.");
	res.json({ success: true });
  } catch (error) {
	console.error("Error al dar de alta de la usuario:", error);
	req.flash("error", "Error al dar de alta de la usuario.");
	res.status(500).json({ success: false, message: error.message });
  }
};*/


module.exports = {
	listarUsuarios,
	formUsuario
}