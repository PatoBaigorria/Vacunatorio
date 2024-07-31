const {
	Aplicacion,
	Persona,
	AgenteDeSalud,
	LoteInterno,
	LoteProveedor,
	CentroDeVacunacion,
} = require("../models/relaciones");

const { createRegistro } = require("./registroController");

const { Op } = require("sequelize");

const listarAplicacion = async (req, res) => {
	try {
		const usuario = req.user;
		console.log("Usuario logueado:", usuario);

		if (usuario.rol === "Super Admin") {
			console.log("El usuario es Super Admin.");
		} else {
			console.log("El usuario no es Super Admin.");
		}

		let aplicaciones;

		if (usuario.rol === "Super Admin") {
			aplicaciones = await Aplicacion.findAll({
				include: [
					{
						model: AgenteDeSalud,
						attributes: ["DNI"],
						include: [
							{
								model: Persona,
								attributes: ["DNI", "nombre", "apellido"],
							},
						],
					},
					{
						model: Persona,
						attributes: ["DNI", "nombre", "apellido"],
					},
					{
						model: LoteInterno,
						attributes: ["numeroDeSerie"],
					},
				],
			});
		} else {
			aplicaciones = await Aplicacion.findAll({
				include: [
					{
						model: AgenteDeSalud,
						attributes: ["DNI"],
						include: [
							{
								model: Persona,
								attributes: ["DNI", "nombre", "apellido"],
							},
						],
					},
					{
						model: Persona,
						attributes: ["DNI", "nombre", "apellido"],
						where: {
							provincia: usuario.provincia,
							localidad: usuario.localidad,
						},
					},
					{
						model: LoteInterno,
						attributes: ["numeroDeSerie"],
					},
				],
			});
		}

		console.log("Aplicaciones encontradas:", aplicaciones.length);
		res.render("aplicacion/viewAplicacion", { aplicaciones: aplicaciones });
	} catch (error) {
		console.error("Error al listar aplicaciones:", error);
		req.flash(
			"error",
			`Hubo un error al intentar listar las aplicaciones. ${error.message}`
		);
		res.json({ success: false, error: error.message });
	}
};





const formAplicacion = async (req, res) => {
	try {
		const lotes = await LoteInterno.findAll({
			include: [
				{
					model: CentroDeVacunacion,
					where: {
						idCentroDeVacunacion: { [Op.ne]: null },
						provincia: req.user.provincia,
						localidad: req.user.localidad
					},
					attributes: []
				},
				{ model: LoteProveedor, attributes: ["fechaDeVencimiento"] }
			],
			distinct: true
		});

		console.log("lotes:", lotes);

		// Obtener pacientes de la misma provincia y localidad que el usuario logueado
		const pacientes = await Persona.findAll({
			where: {
				provincia: req.user.provincia,
				localidad: req.user.localidad,
				ocupacion: "otro",
				activo: true
			},
			attributes: ["DNI", "nombre", "apellido"],
			distinct: true
		});

		// Obtener agentes de salud de la misma provincia y localidad que el usuario logueado
		const agentes = await Persona.findAll({
			where: {
				provincia: req.user.provincia,
				localidad: req.user.localidad,
				ocupacion: "agente de salud",
				activo: true
			},
			attributes: ["DNI", "nombre", "apellido"],
			distinct: true
		});
		console.log("Lotes:", lotes);
		console.log("Pacientes:", pacientes);
		console.log("Agentes:", agentes);

		// Renderizar el formulario con los datos obtenidos
		res.render("aplicacion/formAplicacion", {
			lotes: lotes,
			pacientes: pacientes,
			agentes: agentes
		});
	} catch (error) {
		req.flash(
			"error",
			`Hubo un error al intentar mostrar el formulario de la aplicación de la vacuna. ${error.message}`
		);
		res.json({ success: false, error: error.message });
	}
};

const createAplicacion = async (req, res) => {
	try {
		const { DNIPaciente, DNIAgente, numeroDeSerie, fechaDeAplicacion } =
			req.body;
		const aplicacion = await Aplicacion.create({
			DNIPaciente,
			DNIAgente,
			numeroDeSerie,
			fechaDeAplicacion,
			activo: 1,
		});
		await createRegistro(
			req.user.idUsuario,
			"Aplicacion",
			aplicacion.dataValues.idAplicacion,
			"Creacion"
		);
		await createRegistro(
			req.user.idUsuario,
			"Aplicacion",
			aplicacion.dataValues.idAplicacion,
			"Alta"
		);
		req.flash("success", "La aplicación fue creada exitosamente.");
		res.redirect("/aplicaciones");
	} catch (error) {
		req.flash(
			"error",
			`Hubo un error al intentar crear la aplicación. ${error.message}`
		);
		console.log(error.message);
		res.json({ success: false });
	}
};

const createAplicacionJSON = async (req, res) => {
	try {
		const { DNIPaciente, DNIAgente, numeroDeSerie, fechaDeAplicacion } =
			req.body;
		const aplicacion = await Aplicacion.create({
			DNIPaciente,
			DNIAgente,
			numeroDeSerie,
			fechaDeAplicacion,
			activo: 1,
		});
		await createRegistro(
			req.user.idUsuario,
			"Aplicacion",
			aplicacion.dataValues.idAplicacion,
			"Creacion"
		);
		await createRegistro(
			req.user.idUsuario,
			"Aplicacion",
			aplicacion.dataValues.idAplicacion,
			"Alta"
		);
		res.status(200).json({ flash: 'La aplicación fue registrada exitosamente.' })
	} catch (error) {
		req.flash(
			"error",
			`Hubo un error al intentar crear la aplicación. ${error.message}`
		);
		console.log(error.message);
		res.json({ success: false });
	}
};

const editAplicacion = async (req, res) => {
	try {
		const aplicacion = await Aplicacion.findByPk(req.params.id);

		if (!aplicacion) {
			req.flash("error", "No se encontró la aplicación especificada.");
			return res.redirect("/aplicaciones");
		}

		const lotes = await LoteInterno.findAll();

		const pacientes = await Persona.findAll({
			where: {
				provincia: req.user.provincia,
				localidad: req.user.localidad,
				ocupacion: "otro",
				activo: true
			},
			attributes: ["DNI", "nombre", "apellido"]
		});

		const agentes = await Persona.findAll({
			where: {
				provincia: req.user.provincia,
				localidad: req.user.localidad,
				ocupacion: "agente de salud",
				activo: true
			},
			attributes: ["DNI", "nombre", "apellido"]
		});

		res.render("aplicacion/editAplicacion", {
			aplicacion,
			lotes,
			pacientes,
			agentes
		});
	} catch (error) {
		req.flash(
			"error",
			`Hubo un error al intentar editar la aplicación. ${error.message}`
		);
		res.json({ success: false, error: error.message });
	}
};







const updateAplicacion = async (req, res) => {
	try {
		Aplicacion.update(req.body, {
			where: { idAplicacion: req.params.id },
		});
		await createRegistro(
			req.user.idUsuario,
			"Aplicacion",
			req.params.id,
			"Modificacion"
		);
		req.flash(
			"success",
			"La aplicación de la vacuna fue actualizada exitosamente."
		);
		res.redirect("/aplicaciones");
	} catch (error) {
		req.flash(
			"error",
			`Hubo un error al intentar actualizar la aplicación de la vacuna. ${error.message}`
		);
		res.json({ success: false });
	}
};

const deleteAplicacion = async (req, res) => {
	try {
		await Aplicacion.destroy({
			where: { idAplicacion: req.params.id },
		});
		req.flash(
			"success",
			"La aplicación de la vacuna fue eliminada exitosamente."
		);
		res.json({ success: true });
	} catch (error) {
		req.flash(
			"error",
			`Hubo un error al intentar eliminar la aplicación. ${error.message}`
		);
		res.json({ success: false });
	}
};

const bajaAplicacion = async (req, res) => {
	try {
		await Aplicacion.update(
			{ activo: 0 },
			{ where: { idAplicacion: req.params.id } }
		);
		await createRegistro(
			req.user.idUsuario,
			"Aplicacion",
			req.params.id,
			"Baja"
		);
		req.flash("success", "La aplicación fue dada de baja exitosamente.");
		res.json({ success: true });
	} catch (error) {
		req.flash(
			"error",
			`Hubo un error al intentar dar de baja la aplicación. ${error.message}`
		);
		res.json({ success: false });
	}
};

const altaAplicacion = async (req, res) => {
	try {
		await Aplicacion.update(
			{ activo: 1 },
			{ where: { idAplicacion: req.params.id } }
		);
		await createRegistro(
			req.user.idUsuario,
			"Aplicacion",
			req.params.id,
			"Alta"
		);
		req.flash("success", "La aplicación fue dada de alta exitosamente.");
		res.json({ success: true });
	} catch (error) {
		req.flash(
			"error",
			`Hubo un error al intentar dar de alta la aplicación. ${error.message}`
		);
		res.json({ success: false });
	}
};

module.exports = {
	listarAplicacion,
	formAplicacion,
	createAplicacion,
	createAplicacionJSON,
	editAplicacion,
	updateAplicacion,
	deleteAplicacion,
	bajaAplicacion,
	altaAplicacion,
};
