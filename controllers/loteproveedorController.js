const { LoteProveedor, Laboratorio } = require("../models/relaciones");
const { detailsPersona } = require("./personaController");
const { createLoteInternoDesdeProveedor } = require("./loteInternoController");
const { createRegistro } = require("./registroController");


// Obtener el reporte de vacunas compradas por cada laboratorio en un rango de fechas
const reporteVacunasPorLaboratorio = async (req, res) => {
	try {
		const { fechaInicio, fechaFin } = req.query;

		// Verificar que las fechas se proporcionaron
		if (!fechaInicio || !fechaFin) {
			return res.status(400).json({
				message: "Debe proporcionar una fecha de inicio y una fecha de fin."
			});
		}

		// Consultar la base de datos
		const reportes = await LoteProveedor.findAll({
			where: {
				fechaDeCompra: {
					[Op.between]: [new Date(fechaInicio), new Date(fechaFin)]
				}
			},
			attributes: [
				[sequelize.fn('sum', sequelize.col('cantidadDeLotesInternos')), 'totalVacunas'],
			],
			include: [
				{
					model: Laboratorio,
					attributes: ["nombreLaboratorio"]
				}
			],
			group: ["Laboratorio.idLaboratorio"]
		});

		res.render("reporteVacunas", {
			reportes: reportes,
			fechaInicio: fechaInicio,
			fechaFin: fechaFin,
		});
	} catch (error) {
		console.error("Error al generar el reporte de vacunas:", error);
		res.status(500).json({
			message: "Error al generar el reporte de vacunas."
		});
	}
};

const listarLotesProveedores = async (req, res) => {
	try {
		const lotesProveedores = await LoteProveedor.findAll({
			include: [
				{ model: Laboratorio, attributes: ["nombreLaboratorio"] },
			],
		});
		console.log(lotesProveedores);
		res.render("loteproveedor/viewLoteProveedor", {
			lotesProveedores: lotesProveedores,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error al obtener los lotes proveedores.",
		});
	}
};

const formLoteProveedor = async (req, res) => {
	try {
		const laboratorios = await Laboratorio.findAll();
		res.render("loteproveedor/formLoteProveedor", {
			laboratorios: laboratorios,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error al crear el lote proveedor.",
		});
	}
};

// Crear un nuevo lote proveedor
const createLoteProveedor = async (req, res) => {
	try {
		const { ventana } = req.query;
		const {
			idLaboratorio,
			tipoDeVacuna,
			nombreComercial,
			cantidadDeLotesInternos,
			fechaDeFabricacion,
			fechaDeVencimiento,
			fechaDeCompra,
			cantidadDeVacunasPorLoteInterno
		} = req.body;
		const lote = await LoteProveedor.create({
			idLaboratorio,
			tipoDeVacuna,
			nombreComercial,
			cantidadDeLotesInternos,
			fechaDeFabricacion,
			fechaDeVencimiento,
			fechaDeCompra,
			activo: 1,
		});
		if(ventana==='true'){
			let arregloDeLotes = []
			for(i=0;i<cantidadDeLotesInternos;i++){
				arregloDeLotes.push({
					numeroDeLote: lote.dataValues.numeroDeLote,
					idLaboratorio: idLaboratorio,
					cantidadDeVacunasTotales: cantidadDeVacunasPorLoteInterno,
					cantidadDeVacunasRestantes: cantidadDeVacunasPorLoteInterno,
					fechaDeLlegadaDepositoNacional: null,
					idDepositoNacional: null,
					fechaDeSalidaDepositoNacional: null,
					fechaDeLlegadaDepositoProvincial: null,
					idDepositoProvincial: null,
					fechaDeSalidaDepositoProvincial: null,
					fechaDeLlegadaCentroDeVacunacion: null,
					idCentroDeVacunacion: null,
					activo: 1,
				})
			}
			await createLoteInternoDesdeProveedor(req,arregloDeLotes);
		}
		await createRegistro(
			req.user.idUsuario,
			"Lote proveeedor",
			lote.dataValues.numeroDeLote,
			"Creacion"
		);
		await createRegistro(
			req.user.idUsuario,
			"Lote proveeedor",
			lote.dataValues.numeroDeLote,
			"Alta"
		);
		if(ventana==='true'){
			res.send(`
                <html>
                    <body>
                        <script>
                                window.close();
                        </script>
                    </body>
                </html>`
			);
		} else {
			req.flash("success", "Lote Proveedor creado exitosamente.");
			res.redirect("/lotesproveedores");
		}
	} catch (error) {
		console.log(error);
		console.log(error.message);
		req.flash("error", "Error al crear el lote proveedor. ", error.message);
		res.redirect("/lotesproveedores/alta");
	}
};

const detailsLoteProveedor = async (req, res) => {
	try {
		const loteProveedor = await LoteProveedor.findByPk(req.params.id, {
			include: [
				{ model: Laboratorio, attributes: ["nombreLaboratorio"] },
			],
		});

		// Verificar que el lote proveedor exista
		if (!loteProveedor) {
			req.flash("error", "Lote proveedor no encontrado.");
			return res.redirect("/lotesproveedores");
		}

		const laboratorios = await Laboratorio.findAll();

		res.render("loteproveedor/detailsLoteProveedor", {
			loteProveedor: loteProveedor,
			laboratorios: laboratorios,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error al obtener el lote proveedor.",
		});
	}
};

const editLoteProveedor = async (req, res) => {
	try {
		const loteProveedor = await LoteProveedor.findByPk(req.params.id, {
			include: [
				{ model: Laboratorio, attributes: ["nombreLaboratorio"] },
			],
		});

		// Verificar que los datos estén presentes
		if (!loteProveedor) {
			req.flash("error", "Lote proveedor no encontrado.");
			return res.redirect("/lotesproveedores");
		}

		const laboratorios = await Laboratorio.findAll();

		res.render("loteproveedor/editLoteProveedor", {
			loteProveedor: loteProveedor,
			laboratorios: laboratorios,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error al obtener el lote proveedor.",
		});
	}
};

// Actualizar un lote proveedor por su ID
const updateLoteProveedor = async (req, res) => {
	try {
		await LoteProveedor.update(req.body, {
			where: {
				numeroDeLote: req.params.id,
			},
		});
		await createRegistro(
			req.user.idUsuario,
			"Lote proveedor",
			req.params.id,
			"Modificacion"
		);
		req.flash("success", "Lote Proveedor actualizado exitosamente.");
		res.redirect("/lotesproveedores");
	} catch (error) {
		res.status(500).json({
			message: "Error al actualizar el lote proveedor.",
		});
	}
};

// Eliminar un lote proveedor por su ID
const deleteLoteProveedor = async (req, res) => {
	try {
		await LoteProveedor.destroy({
			where: {
				numeroDeLote: req.params.id,
			},
		});
		req.flash("success", "Lote Proveedor eliminado exitosamente.");
		res.json({ success: true });
	} catch (error) {
		res.status(500).json({
			message: "Error al eliminar el lote proveedor.",
		});
	}
};

const bajaLoteProveedor = async (req, res) => {
	try {
		await LoteProveedor.update(
			{ activo: 0 },
			{
				where: {
					numeroDeLote: req.params.id,
				},
			}
		);
		await createRegistro(
			req.user.idUsuario,
			"Lote proveedor",
			req.params.id,
			"Baja"
		);
		req.flash("success", "Lote proveedor dado de baja exitosamente.");
		res.json({ success: true });
	} catch (error) {
		console.error("Error al dar de baja el lote proveedor:", error);
		req.flash("error", "Error al dar de baja el lote proveedor.");
		res.status(500).json({ success: false, message: error.message });
	}
};

const altaLoteProveedor = async (req, res) => {
	try {
		await LoteProveedor.update(
			{ activo: 1 },
			{
				where: {
					numeroDeLote: req.params.id,
				},
			}
		);
		await createRegistro(
			req.user.idUsuario,
			"Lote proveedor",
			req.params.id,
			"Alta"
		);
		req.flash("success", "Lote proveedor dado de alta exitosamente.");
		res.json({ success: true });
	} catch (error) {
		console.error("Error al dar de alta el lote proveedor:", error);
		req.flash("error", "Error al dar de alta el lote proveedor.");
		res.status(500).json({ success: false, message: error.message });
	}
};

module.exports = {
	listarLotesProveedores,
	formLoteProveedor,
	createLoteProveedor,
	detailsLoteProveedor,
	editLoteProveedor,
	updateLoteProveedor,
	deleteLoteProveedor,
	bajaLoteProveedor,
	altaLoteProveedor,
	reporteVacunasPorLaboratorio,
};
