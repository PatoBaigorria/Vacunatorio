const { Laboratorio } = require("../models/relaciones");

// Obtener todos los laboratorios
const listarLaboratorios = async (req, res) => {
	try {
		let laboratorios = await Laboratorio.findAll({
			raw: true
		});

		res.render("laboratorio/viewLaboratorio", { laboratorios: laboratorios });
	} catch (error) {
		res.status(500).json({ message: "Error al obtener los laboratorios.", });
	}
};
// Muestra formulario de creacion de Laboratorio
const altaLaboratorio = async (req, res) => {
	try {
		let laboratorios = await Laboratorio.findAll({
			raw: true
		});
		res.render("laboratorio/formLaboratorio", { laboratorios: laboratorios });
	} catch (error) {
		res.status(500).json({
			message: "Error al crear el laboratorio.",
		});
	}
}

const createLaboratorio = async (req, res) => {
	try {
		const { nombreLaboratorio, pais, email, telefono, longitud, latitud } = req.body;
		const existeLaboratorio = await Laboratorio.findOne({
			where: {
				nombreLaboratorio,
			},
		});

		if (existeLaboratorio) {
			req.flash('error', 'Ya existe el laboratorio.');
			return res.redirect("/laboratorios/alta");
		}
		await Laboratorio.create({
			nombreLaboratorio,
			pais,
			email,
			telefono,
			longitud,
			latitud,
		});
		req.flash('success', 'Laboratorio creado exitosamente');
		res.redirect("/laboratorios");
	} catch (error) {
		console.error(error);
		req.flash('error', 'Error al crear el laboratorio.');
		res.status(500).redirect("/laboratorios/alta");
	}
};

const editLaboratorio = async (req, res) => {
	try {
		const laboratorio = await Laboratorio.findByPk(req.params.id);
		const laboratorios = await Laboratorio.findAll({ raw: true });
		res.render("laboratorio/editLaboratorio", { laboratorio: laboratorio, laboratorios: laboratorios });
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
		console.log("Se actualizo!!!!");
		req.flash('success', 'Laboratorio actualizado exitosamente.');
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
		req.flash('success', 'Laboratorio eliminado exitosamente.');
	} catch (error) {
		req.flash('error', 'Error al eliminar el laboratorio. ', error.message);
	}
};

module.exports = {
	listarLaboratorios,
	altaLaboratorio,
	createLaboratorio,
	editLaboratorio,
	updateLaboratorio,
	deleteLaboratorio,
};
