const { DepositoProvincial } = require("../models/relaciones");
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
// Obtener todos los depósitos provinciales
const listarDepositosProvinciales = async (req, res) => {
	try {
		let depositosProv = await DepositoProvincial.findAll({
			raw: true,
		});
		res.render("depositoprovincial/viewDepositoProvincial", {
			depositosProv: depositosProv,
			rol: req.user.rol
		});
	} catch (error) {
		res.status(500).json({
			message: "Error al obtener los depósitos provinciales.",
		});
	}
};

// Muestra formulario de creacion de Deposito Provincial
const formDepProv = async (req, res) => {
	try {
		// Obtener provincias desde la API externa
		let provincias = [];
		const provinciasResponse = await axios.get('https://apis.datos.gob.ar/georef/api/provincias');
		provincias = provinciasResponse.data.provincias.map(provincia => provincia.nombre).sort((a, b) => a.localeCompare(b));
		res.render("depositoprovincial/formDepositoProvincial", {
			provincias: provincias,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error al crear un Deposito Provincial.",
		});
	}
};
// Crear un nuevo Deposito Provincial desde el Formulario
const createDepProv = async (req, res) => {
	try {
		const { direccion, provincia } = req.body;
		const deposito = await DepositoProvincial.create({
			direccion,
			provincia,
			activo: 1,
		});
		await createRegistro(
			req.user.idUsuario,
			"Deposito Provincial",
			deposito.dataValues.idDepositoProvincial,
			"Creacion"
		);
		await createRegistro(
			req.user.idUsuario,
			"Deposito Provincial",
			deposito.dataValues.idDepositoProvincial,
			"Alta"
		);
		req.flash("success", "Depósito Provincial creado exitosamente");
		res.redirect("/depositosprovinciales");
	} catch (error) {
		console.error("Error al insertar datos:", error);
		res.status(500).send(
			"Error al insertar datos en el Depósito Provincial"
		);
	}
};
// Editar Deposito Provincial por ID
const editDepProv = async (req, res) => {
	try {
		const depositoP = await DepositoProvincial.findByPk(req.params.id);

		let provincias = [];
		const provinciasResponse = await axios.get('https://apis.datos.gob.ar/georef/api/provincias');
		provincias = provinciasResponse.data.provincias.map(provincia => provincia.nombre).sort((a, b) => a.localeCompare(b));

		res.render("depositoprovincial/editDepositoProvincial", {
			depositoP: depositoP,
			provincias: provincias,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error al obtener el Deposito Provincial." + error.message,
		});
	}
};

// Actualizar un Depósito Provincial por su ID
const updateDepositoProvincial = async (req, res) => {
	try {
		const { direccion, provincia } = req.body;

		await DepositoProvincial.update(
			{ direccion, provincia },
			{
				where: { idDepositoProvincial: req.params.id },
			});
		await createRegistro(
			req.user.idUsuario,
			"Deposito Provincial",
			req.params.id,
			"Modificacion"
		);
		req.flash("success", "Depósito Provincial actualizado exitosamente.");
		res.redirect("/depositosprovinciales");
	} catch (error) {
		res.status(500).json({
			message: "Error al actualizar el depósito provincial.",
		});
	}
};

// Eliminar un depósito provincial por su ID
const deleteDepositoProvincial = async (req, res) => {
	try {
		await DepositoProvincial.destroy({
			where: {
				idDepositoProvincial: req.params.id,
			},
		});
		req.flash("success", "Depósito provincial eliminado exitosamente.");
		res.json({ success: true });
	} catch (error) {
		res.status(500).json({
			message: "Error al eliminar el depósito provincial.",
		});
	}
};

const bajaDepositoProvincial = async (req, res) => {
	try {
		await DepositoProvincial.update(
			{ activo: 0 },
			{
				where: {
					idDepositoProvincial: req.params.id,
				},
			}
		);
		await createRegistro(
			req.user.idUsuario,
			"Deposito Provincial",
			req.params.id,
			"Baja"
		);
		req.flash("success", "Depósito provincial dado de baja exitosamente.");
		res.json({ success: true });
	} catch (error) {
		console.error("Error al dar de baja el depósito provincial:", error);
		req.flash("error", "Error al dar de baja el depósito provincial.");
		res.status(500).json({ success: false, message: error.message });
	}
};

const altaDepositoProvincial = async (req, res) => {
	try {
		await DepositoProvincial.update(
			{ activo: 1 },
			{
				where: {
					idDepositoProvincial: req.params.id,
				},
			}
		);
		await createRegistro(
			req.user.idUsuario,
			"Deposito Provincial",
			req.params.id,
			"Alta"
		);
		req.flash("success", "Depósito provincial dado de alta exitosamente.");
		res.json({ success: true });
	} catch (error) {
		console.error("Error al dar de alta el depósito provincial:", error);
		req.flash("error", "Error al dar de alta el depósito provincial.");
		res.status(500).json({ success: false, message: error.message });
	}
};

module.exports = {
	getLocalidadesByProvinciaFromAPI,
	listarDepositosProvinciales,
	formDepProv,
	createDepProv,
	editDepProv,
	updateDepositoProvincial,
	deleteDepositoProvincial,
	bajaDepositoProvincial,
	altaDepositoProvincial,
};
