const { ValidationErrorItemType } = require("sequelize");
const {
	Persona,
	Telefono,
	PatologiaBase,
	AgenteDeSalud,
} = require("../models/relaciones");
const { createRegistro } = require("./registroController");

const axios = require('axios');
const getLocalidadesByProvinciaFromAPI = async (req, res) => {
    const { provinciaNombre } = req.params;
    try {
        const response = await axios.get(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${provinciaNombre}`);
        const localidades = response.data.localidades.map(localidad => localidad.nombre);
        res.json(localidades);
    } catch (error) {
        console.error('Error al obtener las localidades desde la API externa:', error);
        res.status(500).json({ error: 'Error al obtener las localidades' });
    }
};


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
        // Obtener agentes
        let agentes = await AgenteDeSalud.findAll();

        // Obtener provincias desde la API externa
        let provincias = [];
        const provinciasResponse = await axios.get('https://apis.datos.gob.ar/georef/api/provincias');
        provincias = provinciasResponse.data.provincias.map(provincia => provincia.nombre); // Ajusta según la estructura de la respuesta

        // Inicializar localidades como un array vacío
        let localidades = [];

        // Renderizar la vista formPersona con los agentes, provincias y localidades (vacías inicialmente)
        res.render("persona/formPersona", {
            agentes: agentes,
            provincias: provincias,
            localidades: localidades
        });
    } catch (error) {
        console.error("Error al crear la persona:", error);
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
			direccion,
			localidad,
			provincia,
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
			direccion,
			localidad,
			provincia,
			longitud,
			latitud,
			activo: 1,
		});
		await createRegistro(
			req.user.idUsuario,
			"Persona",
			persona.dataValues.DNI,
			"Creacion"
		);
		await createRegistro(
			req.user.idUsuario,
			"Persona",
			persona.dataValues.DNI,
			"Alta"
		);
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
		// Si la persona existe, renderiza la vista de detalles
		res.render("persona/detailsPersona", { persona });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Error interno del servidor. Error: " + error.message,
		});
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

        if (!persona) {
            return res.status(404).render("error", {
                message: "Persona no encontrada",
            });
        }

        // Obtener provincias desde la API externa
        let provincias = [];
        const provinciasResponse = await axios.get('https://apis.datos.gob.ar/georef/api/provincias');
        provincias = provinciasResponse.data.provincias.map(provincia => provincia.nombre); // Ajusta según la estructura de la respuesta

        // Obtener localidades de la persona desde la API externa o de tu base de datos
        let localidadesPersona = [];
        const localidadesPersonaResponse = await axios.get(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${persona.provincia}`);
        localidadesPersona = localidadesPersonaResponse.data.localidades.map(localidad => localidad.nombre); // Ajusta según la estructura de la respuesta

        // Obtener listado de localidades según la provincia seleccionada
        let localidades = [];
        if (persona.provincia) {
            const localidadesResponse = await axios.get(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${persona.provincia}`);
            localidades = localidadesResponse.data.localidades.map(localidad => localidad.nombre); // Ajusta según la estructura de la respuesta
        }

        res.render("persona/editPersona", {
            persona: persona,
            provincias: provincias,
            localidades: localidades,
            localidadesPersona: localidadesPersona,
        });
    } catch (error) {
        console.error("Error al obtener la persona. ", error);
        res.status(500).json({
            message: "Error al obtener la persona.",
            error: error.message,
        });
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
			direccion,
			localidad,
			provincia,
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
				direccion: direccion,
				localidad: localidad,
				provincia: provincia,
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
		await createRegistro(
			req.user.idUsuario,
			"Persona",
			req.params.id,
			"Modificacion"
		);
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
		await createRegistro(
			req.user.idUsuario,
			"Persona",
			req.params.id,
			"Baja"
		);
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
		await createRegistro(
			req.user.idUsuario,
			"Persona",
			req.params.id,
			"Alta"
		);
		req.flash("success", "Persona dada de alta exitosamente.");
		res.json({ success: true });
	} catch (error) {
		console.error("Error al dar de alta de la persona:", error);
		req.flash("error", "Error al dar de alta de la persona.");
		res.status(500).json({ success: false, message: error.message });
	}
};

module.exports = {
	getLocalidadesByProvinciaFromAPI,
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
