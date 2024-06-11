const { Laboratorio } = require("../models/relaciones");
const {
	createRegistro
} = require('./registroController');
// Obtener todos los laboratorios
const listarLaboratorios = async (req, res) => {
	try {
		let laboratorios = await Laboratorio.findAll({
			raw: true,
		});
		res.render("laboratorio/viewLaboratorio", { laboratorios: laboratorios });
	} catch (error) {
		res.status(500).json({ message: "Error al obtener los laboratorios." });
	}
};
// Muestra formulario de creacion de Laboratorio
const formLaboratorio = async (req, res) => {
	try {
		let laboratorios = await Laboratorio.findAll({
			raw: true,
		});
		res.render("laboratorio/formLaboratorio", { laboratorios: laboratorios });
	} catch (error) {
		res.status(500).json({
			message: "Error al crear el laboratorio.",
		});
	}
};

const createLaboratorio = async (req, res) => {
	try {
		const { nombreLaboratorio, pais, email, telefono, longitud, latitud } =
			req.body;
		const existeLaboratorio = await Laboratorio.findOne({
			where: {
				nombreLaboratorio,
			},
		});

		if (existeLaboratorio) {
			req.flash("error", "Ya existe el laboratorio.");
			return res.redirect("/laboratorios/alta");
		}
		const laboratorio = await Laboratorio.create({
			nombreLaboratorio,
			pais,
			email,
			telefono,
			longitud,
			latitud,
			activo: 1,
		});
		console.log(req.user)
		await createRegistro(req.user.idUsuario, 'Laboratorio', laboratorio.dataValues.idLaboratorio, 'Creacion')
		await createRegistro(req.user.idUsuario, 'Laboratorio', laboratorio.dataValues.idLaboratorio, 'Alta')
		req.flash("success", "Laboratorio creado exitosamente");
		res.redirect("/laboratorios");
	} catch (error) {
		console.error(error);
		req.flash("error", "Error al crear el laboratorio.");
		res.status(500).redirect("/laboratorios/alta");
	}
};

const editLaboratorio = async (req, res) => {
	try {
		const laboratorio = await Laboratorio.findByPk(req.params.id);
		const laboratorios = await Laboratorio.findAll({ raw: true });
		res.render("laboratorio/editLaboratorio", {
			laboratorio: laboratorio,
			laboratorios: laboratorios,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error al obtener el laboratorio.",
		});
	}
};

// Actualizar un laboratorio por su ID
const updateLaboratorio = async (req, res) => {
	try {
		await Laboratorio.update(req.body, {
			where: {
				idLaboratorio: req.params.id,
			},
		});
		await createRegistro(req.user.idUsuario, 'Laboratorio', req.params.id, 'Modificacion')
		req.flash("success", "Laboratorio actualizado exitosamente.");
		res.redirect("/laboratorios");
	} catch (error) {
		res.status(500).json({
			message: "Error al actualizar el laboratorio. " + error.message,
		});
	}
};

// Eliminar un laboratorio por su ID
const deleteLaboratorio = async (req, res) => {
	try {
		await Laboratorio.destroy({
			where: {
				idLaboratorio: req.params.id,
			},
		});
		req.flash("success", "Laboratorio eliminado exitosamente.");
		res.json({ success: true });
	} catch (error) {
		req.flash("error", "Error al eliminar el laboratorio. ", error.message);
	}
};

const bajaLaboratorio = async (req, res) => {
	try {
		await Laboratorio.update(
			{ activo: 0 },
			{
				where: {
					idLaboratorio: req.params.id,
				},
			}
		);
		await createRegistro(req.user.idUsuario, 'Laboratorio', req.params.id, 'Baja')
		req.flash("success", "Laboratorio dado de baja exitosamente.");
		res.json({ success: true });
	} catch (error) {
		console.error("Error al dar de baja el laboratorio:", error);
		req.flash("error", "Error al dar de baja el laboratorio.");
		res.status(500).json({ success: false, message: error.message });
	}
};

const altaLaboratorio = async (req, res) => {
	try {
		await Laboratorio.update(
			{ activo: 1 },
			{
				where: {
					idLaboratorio: req.params.id,
				},
			}
		);
		await createRegistro(req.user.idUsuario, 'Laboratorio', req.params.id, 'Alta')
		req.flash("success", "Laboratorio dado de alta exitosamente.");
		res.json({ success: true });
	} catch (error) {
		console.error("Error al dar de alta el laboratorio:", error);
		req.flash("error", "Error al dar de alta el laboratorio.");
		res.status(500).json({ success: false, message: error.message });
	}
};

module.exports = {
	listarLaboratorios,
	formLaboratorio,
	createLaboratorio,
	editLaboratorio,
	updateLaboratorio,
	deleteLaboratorio,
	bajaLaboratorio,
	altaLaboratorio
};
