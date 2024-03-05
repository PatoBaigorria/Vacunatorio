const {
	Aplicacion,
	Persona,
	AgenteDeSalud,
	LoteInterno,
	LoteProveedor,
} = require('../models/relaciones')

const listarAplicacion = async (req, res) => {
	try {
		const aplicaciones = await Aplicacion.findAll({
			include: [
				{
					model: AgenteDeSalud,
					attributes: ['DNI'], 
					include: [
						{
							model: Persona, attributes: ['DNI', 'nombre', 'apellido'],
						}
					]
				},
				{
					model: Persona, attributes: ['DNI', 'nombre', 'apellido'],
				},
				{
					model: LoteInterno, attributes: ['numeroDeSerie'],
				},
			],
		})
		res.render('aplicacion/viewAplicacion', { aplicaciones: aplicaciones })
	} catch (error) {
		req.flash('error', `Hubo un error al intentar listar las aplicaciones. ${error.message}`)
		res.json({ success: false})
	}
}

const formAplicacion = async (req, res) => {
	try {
		const lotes = await LoteInterno.findAll({
			include: [{ model: LoteProveedor, attributes: ['fechaDeVencimiento'] }],
		})
			const personas = await Persona.findAll({
			include: [{ model: AgenteDeSalud, attributes: ['matricula'] }],
		})
		res.render('aplicacion/formAplicacion', {
			lotes: lotes,
			personas: personas,
		})
	} catch (error) {
		req.flash('error', `Hubo un error al intentar mostrar el formulario de la aplicación de la vacuna. ${error.message}`)
		res.json({ success: false})
	}
}

const createAplicacion = async (req, res) => {
  	try {
		const { DNIPaciente, DNIAgente, numeroDeSerie, fechaDeAplicacion } = req.body
		await Aplicacion.create({
			DNIPaciente,
			DNIAgente,
			numeroDeSerie,
			fechaDeAplicacion,
			activo: 1,
		})
		req.flash('success', 'La aplicación fue creada exitosamente.')
		res.redirect('/aplicaciones')
  	} catch (error) {
		req.flash('error', `Hubo un error al intentar crear la aplicación. ${error.message}`)
		res.json({ success: false})
	}
}

const editAplicacion = async (req, res) => {
	try {
		const aplicacion = await Aplicacion.findByPk(req.params.id)
		const lotes = await LoteInterno.findAll()
		const personas = await Persona.findAll({
			include: [{ model: AgenteDeSalud, attributes: ['matricula'] }],
		})
		res.render('aplicacion/editAplicacion', {
			aplicacion: aplicacion,
			lotes: lotes,
			personas: personas,
		})
	} catch (error) {
		req.flash('error', `Hubo un error al intentar editar la aplicación. ${error.message}`)
		res.json({ success: false})
	}
}

const updateAplicacion = async (req, res) => {
	try {
		Aplicacion.update(req.body, {
			where: { idAplicacion: req.params.id },
		})
		req.flash('success', 'La aplicación de la vacuna fue actualizada exitosamente.')
		res.redirect('/aplicaciones')
	} catch (error) {
		req.flash('error', `Hubo un error al intentar actualizar la aplicación de la vacuna. ${error.message}`)
		res.json({ success: false})
	}
}

const deleteAplicacion = async (req, res) => {
	try {
		await Aplicacion.destroy({
			where: { idAplicacion: req.params.id },
		})
		req.flash('success', 'La aplicación de la vacuna fue eliminada exitosamente.')
		res.json({ success: true })
	} catch (error) {
		req.flash('error', `Hubo un error al intentar eliminar la aplicación. ${error.message}`)
		res.json({ success: false})
	}
}

const bajaAplicacion = async (req, res) => {
	try {
			await Aplicacion.update(
				{ activo: 0 },
				{ where: { idAplicacion: req.params.id }}
			)
			req.flash('success', 'La aplicación fue dada de baja exitosamente.')
			res.json({ success: true })
	} catch (error) {
		req.flash('error', `Hubo un error al intentar dar de baja la aplicación. ${error.message}`)
		res.json({ success: false})
	}
}

const altaAplicacion = async (req, res) => {
	try {
		await Aplicacion.update(
			{ activo: 1 },
			{ where: { idAplicacion: req.params.id }, }
		)
		req.flash('success', 'La aplicación fue dada de alta exitosamente.')
		res.json({ success: true })
	} catch (error) {
		req.flash('error', `Hubo un error al intentar dar de alta la aplicación. ${error.message}`)
		res.json({ success: false})
	}
}

module.exports = {
	listarAplicacion,
	formAplicacion,
	createAplicacion,
	editAplicacion,
	updateAplicacion,
	deleteAplicacion,
	bajaAplicacion,
	altaAplicacion
}
