const centrodevacunacion = require("../models/centrodevacunacion");
const sequelize = require("../database/db");
const { CentroDeVacunacion } = require("../models/relaciones");
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

const listarCentrosDeVacunacion = async (req, res) => {
	try {
		//console.log("Hola "+ req.user.nombreUsuario);
		const centrosVac = await CentroDeVacunacion.findAll({ raw: true });
		res.render("centrodevacunacion/viewCentroDeVacunacion", {
			centrosVac: centrosVac,
		});
	} catch (error) {
		req.flash(
			"error",
			`Hubo un error al intentar listar los centros de vacunación. ${error.message}`
		);
		res.json({
			success: `Hubo un error al intentar listar los centros de vacunación. ${error.message}`,
		});
	}
};

async function listarCentrosJSON(req, res) {
	const { provincia } = req.params;
	console.log("Provincia recibida: " + provincia);
	try {
		const centros = await sequelize.query(
			'SELECT idCentroDeVacunacion, direccion FROM CentroDeVacunacion WHERE provincia = :provincia',
			{
				replacements: { provincia: provincia },
				type: sequelize.QueryTypes.SELECT
			}
		);
		if (centros.length > 0) {
			console.log("Centros encontrados: ", centros);
			res.json({ success: true, data: centros });
		} else {
			console.log("No se encontraron centros de vacunación para la provincia seleccionada.");
			res.json({ success: false, message: "No se encontraron centros de vacunación para la provincia seleccionada." });
		}
	} catch (error) {
		console.error(`Error al listar centros de vacunación: ${error.message}`);
		res.status(500).json({ success: false, message: `Error al listar centros de vacunación: ${error.message}` });
	}
}


const formCentroVac = async (req, res) => {
	try {
		// Obtener provincias desde la API externa
		let provincias = [];
		const provinciasResponse = await axios.get('https://apis.datos.gob.ar/georef/api/provincias');
		provincias = provinciasResponse.data.provincias.map(provincia => provincia.nombre).sort((a, b) => a.localeCompare(b));

		// Obtener localidades de la primera provincia de la lista
		let localidades = [];
		if (provincias.length > 0) {
			const localidadesResponse = await axios.get(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${provincias[0]}`);
			localidades = localidadesResponse.data.localidades.map(localidad => localidad.nombre);
			localidades = localidades.map(localidad => localidad.trim());
			localidades.sort((a, b) => a.localeCompare(b));
			localidades.unshift("Selecciona una localidad");
		}


		res.render("centrodevacunacion/formCentroDeVacunacion", {
			provincias: provincias,
			localidades: localidades
		});
	} catch (error) {
		req.flash(
			"error",
			`Hubo un error al intentar mostrar el formulario del centro de vacunación. ${error.message}`
		);
		res.json({ success: false });
	}
};

const createCentroVac = async (req, res) => {
	try {
		const { direccion, localidad, provincia } = req.body;
		const centroDeVacunacion = await CentroDeVacunacion.create({
			direccion,
			localidad,
			provincia,
			activo: 1,
		});
		await createRegistro(
			req.user.idUsuario,
			"Centro de vacunacion",
			centroDeVacunacion.dataValues.idCentroDeVacunacion,
			"Creacion"
		);
		await createRegistro(
			req.user.idUsuario,
			"Centro de vacunacion",
			centroDeVacunacion.dataValues.idCentroDeVacunacion,
			"Alta"
		);
		req.flash(
			"success",
			"El centro de vacunación fue dado de alta exitosamente"
		);
		res.redirect("/centrosdevacunacion");
	} catch (error) {
		req.flash(
			"error",
			`Hubo un error al intentar dar de alta el centro de vacunación. ${error.message}`
		);
		res.json({ success: false });
	}
};

const detailsCentroVac = async (req, res) => {
	try {
		const centroV = await CentroDeVacunacion.findByPk(req.params.id);
		res.render("centrodevacunacion/detailsCentroDeVacunacion", {
			centroV: centroV,
		});
	} catch (error) {
		req.flash(
			"error",
			`Hubo un error al intentar editar el centro de vacunación. ${error.message}`
		);
		res.json({ success: false });
	}
};

const editCentroVac = async (req, res) => {
	try {
		const centroV = await CentroDeVacunacion.findByPk(req.params.id);

		let provincias = [];
		const provinciasResponse = await axios.get('https://apis.datos.gob.ar/georef/api/provincias');
		provincias = provinciasResponse.data.provincias.map(provincia => provincia.nombre).sort((a, b) => a.localeCompare(b));

		// Obtener localidades según la provincia del centro de vacunación
		let localidades = [];
		if (centroV.provincia) {
			const localidadesResponse = await axios.get(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${centroV.provincia}`);
			localidades = localidadesResponse.data.localidades.map(localidad => localidad.nombre).sort((a, b) => a.localeCompare(b));
		}

		res.render("centrodevacunacion/editCentroDeVacunacion", {
			centroV: centroV,
			provincias: provincias,
			localidades: localidades,
		});
	} catch (error) {
		req.flash(
			"error",
			`Hubo un error al intentar editar el centro de vacunación. ${error.message}`
		);
		res.json({ success: false });
	}
};


const updateCentroDeVacunacion = async (req, res) => {
	try {
		const { direccion, provincia, localidad } = req.body;

		await CentroDeVacunacion.update(
			{ direccion, provincia, localidad },
			{ where: { idCentroDeVacunacion: req.params.id } }
		);

		await createRegistro(
			req.user.idUsuario,
			"Centro de vacunacion",
			req.params.id,
			"Modificacion"
		);

		req.flash(
			"success",
			"El centro de vacunación fue actualizado exitosamente."
		);
		res.redirect("/centrosdevacunacion");
	} catch (error) {
		req.flash(
			"error",
			`Hubo un error al intentar actualizar el centro de vacunación. ${error.message}`
		);
		res.json({ success: false });
	}
};


const deleteCentroDeVacunacion = async (req, res) => {
	try {
		await CentroDeVacunacion.destroy({
			where: { idCentroDeVacunacion: req.params.id },
		});
		req.flash(
			"success",
			"El centro de vacunación fue eliminado exitosamente."
		);
		res.json({ success: true });
	} catch (error) {
		req.flash(
			"error",
			`Hubo un error al intentar eliminar el centro de vacunación. ${error.message}`
		);
		res.json({ success: false });
	}
};

const bajaCentroDeVacunacion = async (req, res) => {
	try {
		await CentroDeVacunacion.update(
			{ activo: 0 },
			{
				where: {
					idCentroDeVacunacion: req.params.id,
				},
			}
		);
		await createRegistro(
			req.user.idUsuario,
			"Centro de vacunacion",
			req.params.id,
			"Baja"
		);
		req.flash(
			"success",
			"El centro de vacunación dado de baja exitosamente."
		);
		res.json({ success: true });
	} catch (error) {
		req.flash(
			"error",
			`Hubo un error al intentar dar de baja el centro de vacunación. ${error.message}`
		);
		res.json({ success: false });
	}
};

const altaCentroDeVacunacion = async (req, res) => {
	try {
		await CentroDeVacunacion.update(
			{ activo: 1 },
			{
				where: {
					idCentroDeVacunacion: req.params.id,
				},
			}
		);
		await createRegistro(
			req.user.idUsuario,
			"Centro de vacunacion",
			req.params.id,
			"Alta"
		);
		req.flash(
			"success",
			"El centro de vacunación dado de alta exitosamente."
		);
		res.json({ success: true });
	} catch (error) {
		req.flash(
			"error",
			`Hubo un error al intentar dar de baja el centro de vacunación. ${error.message}`
		);
		res.json({ success: false });
	}
};

module.exports = {
	getLocalidadesByProvinciaFromAPI,
	listarCentrosDeVacunacion,
	listarCentrosJSON,
	formCentroVac,
	createCentroVac,
	detailsCentroVac,
	editCentroVac,
	updateCentroDeVacunacion,
	deleteCentroDeVacunacion,
	bajaCentroDeVacunacion,
	altaCentroDeVacunacion,
};
