const { CentroDeVacunacion } = require('../models/relaciones')
const {
	createRegistro
} = require('./registroController');

const listarCentrosDeVacunacion = async (req, res) => {
	try {
		//console.log("Hola "+ req.user.nombreUsuario);
		const centrosVac = await CentroDeVacunacion.findAll({ raw: true })
		res.render('centrodevacunacion/viewCentroDeVacunacion', {
			centrosVac: centrosVac,
		})
	} catch (error) {
		req.flash('error', `Hubo un error al intentar listar los centros de vacunación. ${error.message}`)
		res.json({ success: `Hubo un error al intentar listar los centros de vacunación. ${error.message}` });
	}
}

const formCentroVac = async (req, res) => {
	try {
		res.render('centrodevacunacion/formCentroDeVacunacion')
	} catch (error) {
		req.flash('error', `Hubo un error al intentar mostrar el formulario del centro de vacunación. ${error.message}`)
		res.json({ success: false })
	}
}

const createCentroVac = async (req, res) => {
	try {
		const { longitud, latitud } = req.body
		const centroDeVacunacion = await CentroDeVacunacion.create({
			longitud,
			latitud,
			activo: 1,
		})
		await createRegistro('Centro de vacunacion', centroDeVacunacion.dataValues.idCentroDeVacunacion, 'Creacion')
		await createRegistro('Centro de vacunacion', centroDeVacunacion.dataValues.idCentroDeVacunacion, 'Alta')
		req.flash('success', 'El centro de vacunación fue dado de alta exitosamente')
		res.redirect('/centrosdevacunacion')
	} catch (error) {
		req.flash('error', `Hubo un error al intentar dar de alta el centro de vacunación. ${error.message}`)
		res.json({ success: false })
	}
}

const editCentroVac = async (req, res) => {
	try {
		const centroV = await CentroDeVacunacion.findByPk(req.params.id)
		res.render('centrodevacunacion/editCentroDeVacunacion', { centroV: centroV })
	} catch (error) {
		req.flash('error', `Hubo un error al intentar editar el centro de vacunación. ${error.message}`)
		res.json({ success: false })
	}
}


const updateCentroDeVacunacion = async (req, res) => {
	try {
		await CentroDeVacunacion.update(req.body,
			{ where: { idCentroDeVacunacion: req.params.id, } }
		)
		await createRegistro('Centro de vacunacion', req.params.id, 'Modificacion')
		req.flash('success', 'El centro de vacunación fue actualizado exitosamente.')
		res.redirect('/centrosdevacunacion')
	} catch (error) {
		req.flash('error', `Hubo un error al intentar actualizar el centro de vacunación. ${error.message}`)
		res.json({ success: false })
	}
}


const deleteCentroDeVacunacion = async (req, res) => {
	try {
		await CentroDeVacunacion.destroy(
			{ where: { idCentroDeVacunacion: req.params.id } }
		)
		req.flash('success', 'El centro de vacunación fue eliminado exitosamente.')
		res.json({ success: true })
	} catch (error) {
		req.flash('error', `Hubo un error al intentar eliminar el centro de vacunación. ${error.message}`)
		res.json({ success: false })
	}
}

const bajaCentroDeVacunacion = async (req, res) => {
	try {
		await CentroDeVacunacion.update(
			{ activo: 0 },
			{
				where: {
					idCentroDeVacunacion: req.params.id,
				},
			}
		)
		await createRegistro('Centro de vacunacion', req.params.id, 'Baja')
		req.flash('success', 'El centro de vacunación dado de baja exitosamente.')
		res.json({ success: true })
	} catch (error) {
		req.flash('error', `Hubo un error al intentar dar de baja el centro de vacunación. ${error.message}`)
		res.json({ success: false })
	}
}

const altaCentroDeVacunacion = async (req, res) => {
	try {
		await CentroDeVacunacion.update(
			{ activo: 1 },
			{
				where: {
					idCentroDeVacunacion: req.params.id,
				},
			}
		)
		await createRegistro('Centro de vacunacion', req.params.id, 'Alta')
		req.flash('success', 'El centro de vacunación dado de alta exitosamente.')
		res.json({ success: true })
	} catch (error) {
		req.flash('error', `Hubo un error al intentar dar de baja el centro de vacunación. ${error.message}`)
		res.json({ success: false })
	}
}

module.exports = {
	listarCentrosDeVacunacion,
	formCentroVac,
	createCentroVac,
	editCentroVac,
	updateCentroDeVacunacion,
	deleteCentroDeVacunacion,
	bajaCentroDeVacunacion,
	altaCentroDeVacunacion
}