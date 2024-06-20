const { DepositoProvincial } = require("../models/relaciones");
const { createRegistro } = require("./registroController");
// Obtener todos los depósitos provinciales
const listarDepositosProvinciales = async (req, res) => {
	try {
		let depositosProv = await DepositoProvincial.findAll({
			raw: true,
		});
		res.render("depositoprovincial/viewDepositoProvincial", {
			depositosProv: depositosProv,
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
		res.render("depositoprovincial/formDepositoProvincial");
	} catch (error) {
		res.status(500).json({
			message: "Error al crear un Deposito Provincial.",
		});
	}
};
// Crear un nuevo Deposito Provincial desde el Formulario
const createDepProv = async (req, res) => {
	try {
		const { longitud, latitud } = req.body;
		const deposito = await DepositoProvincial.create({
			longitud,
			latitud,
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
		res.render("depositoprovincial/editDepositoProvincial", {
			depositoP: depositoP,
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
		await DepositoProvincial.update(req.body, {
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
	listarDepositosProvinciales,
	formDepProv,
	createDepProv,
	editDepProv,
	updateDepositoProvincial,
	deleteDepositoProvincial,
	bajaDepositoProvincial,
	altaDepositoProvincial,
};
