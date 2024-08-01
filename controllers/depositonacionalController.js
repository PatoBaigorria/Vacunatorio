const { DepositoNacional } = require("../models/relaciones");
const { createRegistro } = require("./registroController");
const axios = require('axios');

const getLocalidadesByProvinciaFromAPI = async (req, res) => {
	const { provinciaNombre } = req.params;
	try {
		const response = await axios.get(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${provinciaNombre}`);
		const localidades = response.data.localidades.map(localidad => localidad.nombre).sort((a, b) => a.localeCompare(b));
		res.json(localidades);
	} catch (error) {
		console.error('Error al obtener las localidades desde la API externa:', error);
		res.status(500).json({ error: 'Error al obtener las localidades' });
	}
};
// Obtener todos los depósitos nacionales
const listarDepositosNacionales = async (req, res) => {
	try {
		let depositosNac = await DepositoNacional.findAll({
			raw: true,
		});
		res.render("depositonacional/viewDepositoNacional", {
			depositosNac: depositosNac,
			rol: req.user.rol,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error al obtener los depósitos nacionales.",
		});
	}
};

// Muestra formulario de creacion de Deposito Nacional
const formDepNac = async (req, res) => {
	try {
		// Obtener provincias desde la API externa
		let provincias = [];
		const provinciasResponse = await axios.get('https://apis.datos.gob.ar/georef/api/provincias');
		provincias = provinciasResponse.data.provincias.map(provincia => provincia.nombre).sort((a, b) => a.localeCompare(b));
		res.render("depositonacional/formDepositoNacional", {
			provincias: provincias,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error al crear un Deposito Nacional.",
		});
	}
};
// Crear un nuevo Deposito Nacional desde el Formulario
const createDepNac = async (req, res) => {
	try {
		const { direccion, provincia } = req.body;

		// Crear una nueva instancia de Deposito Provincial utilizando Sequelize
		const deposito = await DepositoNacional.create({
			direccion,
			provincia,
			activo: 1,
		});
		await createRegistro(
			req.user.idUsuario,
			"Deposito Nacional",
			deposito.dataValues.idDepositoNacional,
			"Creacion"
		);
		await createRegistro(
			req.user.idUsuario,
			"Deposito Nacional",
			deposito.dataValues.idDepositoNacional,
			"Alta"
		);
		req.flash("success", "Depósito Nacional creado exitosamente");
		res.redirect("/depositosnacionales");
	} catch (error) {
		console.error("Error al insertar datos:", error);
		res.status(500).send("Error al insertar datos en el Deposito Nacional");
	}
};
3;
// Editar Deposito Nacional por ID
const editDepNac = async (req, res) => {
	try {
		const depositoN = await DepositoNacional.findByPk(req.params.id);

		let provincias = [];
		const provinciasResponse = await axios.get('https://apis.datos.gob.ar/georef/api/provincias');
		provincias = provinciasResponse.data.provincias.map(provincia => provincia.nombre).sort((a, b) => a.localeCompare(b));

		res.render("depositonacional/editDepositoNacional", {
			depositoN: depositoN,
			provincias: provincias,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error al obtener el Deposito Nacional." + error.message,
		});
	}
};

// Actualizar un Depósito Nacional por su ID
const updateDepositoNacional = async (req, res) => {
	try {
		const { direccion, provincia } = req.body;

		await DepositoNacional.update(
			{ direccion, provincia },
			{
				where: { idDepositoNacional: req.params.id },
			});
		await createRegistro(
			req.user.idUsuario,
			"Deposito Nacional",
			req.params.id,
			"Modificacion"
		);
		req.flash("success", "Depósito Nacional actualizado exitosamente.");
		res.redirect("/depositosnacionales");
	} catch (error) {
		res.status(500).json({
			message: "Error al actualizar el depósito nacional.",
		});
	}
};

// Eliminar un depósito provincial por su ID
const deleteDepositoNacional = async (req, res) => {
	try {
		await DepositoNacional.destroy({
			where: {
				idDepositoNacional: req.params.id,
			},
		});
		req.flash("success", "Depósito nacional eliminado exitosamente.");
		res.json({ success: true });
	} catch (error) {
		res.status(500).json({
			message: "Error al eliminar el depósito nacional.",
		});
	}
};

const bajaDepositoNacional = async (req, res) => {
	try {
		await DepositoNacional.update(
			{ activo: 0 },
			{
				where: {
					idDepositoNacional: req.params.id,
				},
			}
		);
		await createRegistro(
			req.user.idUsuario,
			"Deposito Nacional",
			req.params.id,
			"Baja"
		);
		req.flash("success", "Depósito nacional dado de baja exitosamente.");
		res.json({ success: true });
	} catch (error) {
		console.error("Error al dar de baja el depósito nacional:", error);
		req.flash("error", "Error al dar de baja el depósito nacional.");
		res.status(500).json({ success: false, message: error.message });
	}
};

const altaDepositoNacional = async (req, res) => {
	try {
		await DepositoNacional.update(
			{ activo: 1 },
			{
				where: {
					idDepositoNacional: req.params.id,
				},
			}
		);
		await createRegistro(
			req.user.idUsuario,
			"Deposito Nacional",
			req.params.id,
			"Alta"
		);
		req.flash("success", "Depósito nacional dado de alta exitosamente.");
		res.json({ success: true });
	} catch (error) {
		console.error("Error al dar de alta el depósito nacional:", error);
		req.flash("error", "Error al dar de alta el depósito nacional.");
		res.status(500).json({ success: false, message: error.message });
	}
};

module.exports = {
	getLocalidadesByProvinciaFromAPI,
	listarDepositosNacionales,
	formDepNac,
	createDepNac,
	editDepNac,
	updateDepositoNacional,
	deleteDepositoNacional,
	bajaDepositoNacional,
	altaDepositoNacional,
};
