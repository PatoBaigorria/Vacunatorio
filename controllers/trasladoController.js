const {
	Traslado,
	LoteInterno,
	CentroDeVacunacion,
} = require("../models/relaciones");
const { createRegistro } = require("./registroController");

// Obtener todos los traslados
const listarTraslados = async (req, res) => {
	try {
		const usuario = req.user;

		let traslados;

		if (usuario.rol === "Super Admin") {
			traslados = await Traslado.findAll({
				raw: true,
			});
		} else {
			traslados = await Traslado.findAll({
				include: [{
					model: CentroDeVacunacion,
					where: { provincia: usuario.provincia },
					attributes: [] // No incluir atributos de CentroDeVacunacion en el resultado
				}],
				raw: true
			});
		}
		res.render("traslado/viewTraslado", {
			traslados: traslados,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error al obtener los traslados. Error: " + error.message,
		});
	}
};

// Muestra formulario de creacion de Traslado
const altaLogicaTraslado = async (req, res) => {
	try {
		await Traslado.update(
			{
				activo: 1,
			},
			{
				where: {
					idTraslado: req.params.id,
				},
			}
		);
		await createRegistro(
			req.user.idUsuario,
			"Traslado",
			req.params.id,
			"Alta"
		);
		req.flash("success", "Traslado dado de alta exitosamente.");
		res.json({ success: true });
	} catch (error) {
		console.error("Error al dar de alta el traslado:", error);
		req.flash("error", "Error al dar de alta el traslado.");
		res.status(500).json({ success: false, message: error.message });
	}
};

// Muestra formulario de creacion de Traslado
const altaTraslado = async (req, res) => {
	try {
		const lotesInternos = await LoteInterno.findAll({
			include: [{
				model: CentroDeVacunacion,
				where: { provincia: req.user.provincia, localidad: req.user.localidad },
			}],
			raw: true
		});

		const centrosDeVacunacion = await CentroDeVacunacion.findAll({
			where: { provincia: req.user.provincia },
			raw: true
		});
		res.render("traslado/formTraslado", {
			lotesInternos: lotesInternos,
			centrosDeVacunacion: centrosDeVacunacion,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error al crear el traslado.",
		});
	}
};

const listarTrasladosJSON = async (req, res) => {
	try {
		const traslados = await Traslado.findAll({
			raw: true,
		});
		res.json(traslados);
	} catch (error) {
		res.status(500).json({
			message: "Error al obtener los traslados. Error: " + error.message,
		});
	}
}

const createTraslados = async (req, res) => {
	try {
		const { numeroDeSerie, idCentroDeVacunacion, fechaDeSalida, fechaDeLlegada } = req.body;
		const traslado = await Traslado.create({
			numeroDeSerie,
			idCentroDeVacunacion,
			fechaDeSalida,
			fechaDeLlegada,
			activo: 1,
		});


		if (fechaDeLlegada !== "") {
			const loteEncontrado = await LoteInterno.findOne({
				where: { numeroDeSerie: numeroDeSerie },
			});
			if (loteEncontrado) {
				await loteEncontrado.update({
					idCentroDeVacunacion: idCentroDeVacunacion,
				});
			}
		}

		await createRegistro(
			req.user.idUsuario,
			"Traslado",
			traslado.dataValues.idTraslado,
			"Creacion"
		);
		await createRegistro(
			req.user.idUsuario,
			"Traslado",
			traslado.dataValues.idTraslado,
			"Alta"
		);
		req.flash("success", "Traslado creado exitosamente");
		res.redirect("/traslados");
	} catch (error) {
		res.status(500).json({
			message: "Error al crear el traslado: " + error,
		});
	}
};

// Editar Traslado por ID
const editTraslado = async (req, res) => {
	try {
		const traslado = await Traslado.findByPk(req.params.id);
		const lotesInternos = await LoteInterno.findAll();
		const centrosDeVacunacion = await CentroDeVacunacion.findAll();

		if (!traslado) {
			req.flash('error', 'Traslado no encontrado.');
			return res.redirect('/traslados');
		}

		res.render("traslado/editTraslado", {
			traslado: traslado,
			lotesInternos: lotesInternos,
			centrosDeVacunacion: centrosDeVacunacion,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error al obtener el Traslado: " + error.message,
		});
	}
};



// Actualizar un traslado por su ID
const updateTraslado = async (req, res) => {
	try {
		await Traslado.update(req.body, {
			where: {
				idTraslado: req.params.id,
			},
		});
		const { numeroDeSerie, idCentroDeVacunacion } = req.body;
		let fechaDeLlegada = req.body.fechaDeLlegada;
		if (fechaDeLlegada != null) {
			const loteEncontrado = await LoteInterno.findOne({
				where: { numeroDeSerie: numeroDeSerie },
			});
			if (loteEncontrado) {
				await loteEncontrado.update({
					idCentroDeVacunacion: idCentroDeVacunacion,
				});
			}
		}
		await createRegistro(
			req.user.idUsuario,
			"Traslado",
			req.params.id,
			"Modificacion"
		);
		req.flash("success", "Traslado de lote actualizado exitosamente.");
		res.redirect("/traslados");
	} catch (error) {
		res.status(500).json({
			message: "Error al actualizar el traslado." + error.message,
		});
	}
};

// Eliminar un traslado por su ID
const deleteTrasladoFisica = async (req, res) => {
	try {
		await Traslado.destroy({
			where: {
				idTraslado: req.params.id,
			},
		});
		req.flash("success", "Traslado eliminado exitosamente.");
		res.json({ success: true });
	} catch (error) {
		res.status(500).json({
			message: "Error al eliminar el traslado." + error.message,
		});
	}
};

const bajaTraslado = async (req, res) => {
	try {
		await Traslado.update(
			{
				activo: 0,
			},
			{
				where: {
					idTraslado: req.params.id,
				},
			}
		);
		await createRegistro(
			req.user.idUsuario,
			"Traslado",
			req.params.id,
			"Baja"
		);
		req.flash("success", "Traslado dado de baja exitosamente.");
		res.json({ success: true });
	} catch (error) {
		res.status(500).json({ message: "Error al dar de baja el traslado." });
	}
};

module.exports = {
	listarTraslados,
	listarTrasladosJSON,
	altaLogicaTraslado,
	altaTraslado,
	createTraslados,
	editTraslado,
	updateTraslado,
	deleteTrasladoFisica,
	bajaTraslado,
};
