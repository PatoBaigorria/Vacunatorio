const { Descarte, AgenteDeSalud, LoteInterno, Persona, CentroDeVacunacion } = require("../models/relaciones");
const { createRegistro } = require("./registroController");
const Op = require('sequelize').Op;

// Obtener todos los descartes
const listarDescartes = async (req, res) => {
    try {
        // Obtener la provincia y localidad del usuario logueado
        const userProvincia = req.user.provincia;
        const userLocalidad = req.user.localidad;

        // Obtener los LoteInterno que están en centros de vacunación en la misma provincia y localidad
        const lotesInternos = await LoteInterno.findAll({
            include: [
                {
                    model: CentroDeVacunacion,
                    attributes: ["provincia", "localidad"],
                    where: {
                        provincia: userProvincia,
                        localidad: userLocalidad
                    }
                }
            ],
            attributes: ["numeroDeSerie"]
        });

        // Obtener los números de serie de los lotes internos filtrados
        const numerosDeSerie = lotesInternos.map(lote => lote.numeroDeSerie);

        // Obtener los AgenteDeSalud en la misma provincia y localidad del usuario logueado
        const agentes = await AgenteDeSalud.findAll({
            include: [
                {
                    model: Persona,
                    attributes: ["DNI", "nombre", "apellido"],
                    where: {
                        provincia: userProvincia,
                        localidad: userLocalidad
                    }
                }
            ],
            attributes: ["DNI"]
        });

        // Obtener los DNI de los agentes filtrados
        const dniAgentes = agentes.map(agente => agente.DNI);

        // Obtener los descartes que están asociados a los lotes internos y agentes filtrados
        const descartes = await Descarte.findAll({
            include: [
                {
                    model: LoteInterno,
                    where: {
                        numeroDeSerie: numerosDeSerie
                    },
                    include: [
                        {
                            model: CentroDeVacunacion,
                            attributes: ["provincia", "localidad"],
                            where: {
                                provincia: userProvincia,
                                localidad: userLocalidad
                            }
                        }
                    ]
                },
                {
                    model: AgenteDeSalud,
                    where: {
                        DNI: dniAgentes
                    },
                    include: [
                        {
                            model: Persona,
                            attributes: ["DNI", "nombre", "apellido"],
                            where: {
                                provincia: userProvincia,
                                localidad: userLocalidad
                            }
                        }
                    ],
                    attributes: ["DNI"]
                }
            ]
        });

        res.render("descarte/viewDescarte", { descartes: descartes });
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los descartes. " + error.message
        });
    }
};


const formDescarte = async (req, res) => {
    try {
        // Obtener el usuario logueado (ajusta según cómo manejes la autenticación)
        const usuarioLogueado = req.user; // O el método que uses para obtener el usuario logueado

        // Obtener la localidad y provincia del usuario logueado
        const { localidad, provincia } = usuarioLogueado;

        // Obtener agentes de salud filtrados por la localidad y provincia
        const personas = await Persona.findAll({
            where: {
                ocupacion: 'agente de salud',
                localidad: localidad,
                provincia: provincia
            }
        });

        // Obtener lotes internos que llegaron al centro de vacunación, filtrados por la localidad y provincia
        const lotesInternos = await LoteInterno.findAll({
            where: {
                '$CentroDeVacunacion.localidad$': localidad,
                '$CentroDeVacunacion.provincia$': provincia,
                fechaDeLlegadaDepositoNacional: { [Op.ne]: null } // Solo lotes que llegaron
            },
            include: [{
                model: CentroDeVacunacion,
                required: true
            }]
        });

        // Listado de motivos de descarte
        const motivos = [
            'Vencida',
            'Rotura',
            'Pérdida de frío',
            'Contaminación'
        ];

        // Listado de empresas de descarte
        const empresas = [
            'Veolia',
            'Clean Harbors',
            'Waste Management',
            'Stericycle'
        ];

        // Renderizar el formulario con los datos filtrados
        res.render("descarte/formDescarte", {
            personas: personas,
            lotesInternos: lotesInternos,
            motivos: motivos,
            empresas: empresas
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los descartes. " + error.message,
        });
    }
};


// Crear un nuevo descarte
const createDescarte = async (req, res) => {
    try {
        const { DNIAgente, numeroDeSerie, empresaDescartante, motivo, cantidadDeVacunas, fechaDeDescarte } = req.body;

        const descarte = await Descarte.create({
            DNIAgente,
            numeroDeSerie,
            empresaDescartante,
            motivo,
            cantidadDeVacunas,
            fechaDeDescarte,
            activo: 1,
        });

        const loteEncontrado = await LoteInterno.findOne({
            where: { numeroDeSerie: numeroDeSerie },
        });
        if (loteEncontrado) {
            const vacunasTotales = loteEncontrado.cantidadDeVacunasRestantes - cantidadDeVacunas;
            await loteEncontrado.update({
                cantidadDeVacunasRestantes: vacunasTotales,
            });
        }
        await createRegistro(req.user.idUsuario, "Descarte", descarte.dataValues.idDescarte, "Creacion");
        await createRegistro(req.user.idUsuario, "Descarte", descarte.dataValues.idDescarte, "Alta");
        req.flash("success", "Descarte creado exitosamente.");
        res.redirect("/descartes");
    } catch (error) {
        console.error(error);
        req.flash("error", "Error al crear el descarte.");
        res.status(500).json({ message: "Error al crear el descarte." });
    }
};

const detailsDescarte = async (req, res) => {
    try {
        // Obtener la provincia y localidad del usuario logueado
        const userProvincia = req.user.provincia;
        const userLocalidad = req.user.localidad;

        // Buscar el descarte por ID
        const descarte = await Descarte.findByPk(req.params.id, {
            include: [
                {
                    model: LoteInterno,
                    include: [
                        {
                            model: CentroDeVacunacion,
                            attributes: ["provincia", "localidad"],
                            where: {
                                provincia: userProvincia,
                                localidad: userLocalidad
                            }
                        }
                    ],
                    attributes: ["numeroDeSerie"]
                },
                {
                    model: AgenteDeSalud,
                    include: [
                        {
                            model: Persona,
                            attributes: ["nombre", "apellido"],
                            where: {
                                provincia: userProvincia,
                                localidad: userLocalidad
                            }
                        }
                    ],
                    attributes: ["DNI"]
                }
            ]
        });

        if (!descarte) {
            return res.status(404).json({
                message: "Descarte no encontrado."
            });
        }

        res.render("descarte/detailsDescarte", { descarte: descarte });
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener el descarte. Error: " + error.message
        });
    }
};


const editDescarte = async (req, res) => {
    try {
        const { provincia, localidad } = req.user; // Suponiendo que req.user tiene la información del usuario logueado

        const descarte = await Descarte.findByPk(req.params.id);

        // Filtrar agentes de salud según la localidad y provincia del usuario logueado
        const agentesDeSalud = await Persona.findAll({
            where: {
                ocupacion: 'agente de salud',
                provincia: provincia,
                localidad: localidad,
                activo: 1
            }
        });

        // Filtrar lotes internos según la localidad y provincia del usuario logueado
        const lotesInternos = await LoteInterno.findAll({
            include: [{
                model: CentroDeVacunacion,
                where: {
                    provincia: provincia,
                    localidad: localidad
                }
            }],
            where: {
                activo: 1
            }
        });
        console.log(agentesDeSalud)
        const empresas = ["Veolia", "Clean Harbors", "Waste Management", "Stericycle"];
        const motivos = ["Vencida", "Rotura", "Cadena Pérdida de Frío", "Contaminación"];

        res.render("descarte/editDescarte", {
            descarte: descarte,
            personas: agentesDeSalud,
            lotesInternos: lotesInternos,
            motivos: motivos,
            empresas: empresas,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener el descarte. Error: " + error.message,
        });
    }
};


// Actualizar un descarte por su ID
const updateDescarte = async (req, res) => {
    try {
        const { DNIAgente, numeroDeSerie, empresaDescartante, motivo, cantidadDeVacunas, fechaDeDescarte } = req.body;

        console.log('Datos recibidos:', { DNIAgente, numeroDeSerie, empresaDescartante, motivo, cantidadDeVacunas, fechaDeDescarte });

        if (!DNIAgente) {
            throw new Error('DNIAgente es obligatorio');
        }

        // Validar que el agente de salud existe en la tabla
        const agente = await AgenteDeSalud.findOne({ where: { DNI: DNIAgente } });
        if (!agente) {
            throw new Error('El DNIAgente no existe en la tabla agente de salud');
        }

        const descarte = await Descarte.findByPk(req.params.id);
        if (!descarte) {
            throw new Error('Descarte no encontrado');
        }

        descarte.DNIAgente = DNIAgente;
        descarte.numeroDeSerie = numeroDeSerie;
        descarte.empresaDescartante = empresaDescartante;
        descarte.motivo = motivo;
        descarte.cantidadDeVacunas = cantidadDeVacunas;
        descarte.fechaDeDescarte = fechaDeDescarte;

        await descarte.save();
        await createRegistro(
			req.user.idUsuario,
			"Descarte",
			req.params.id,
			"Modificacion"
		);
        req.flash(
			"success",
			"El descarte de la vacuna fue actualizada exitosamente.");

        // Redirigir a la vista de descartes
        res.redirect('/descartes');
    } catch (error) {
        console.error('Error al actualizar el descarte:', error);
        res.status(500).json({ message: `Error al actualizar el descarte. Error: ${error.message}` });
    }
};

  
  
  

// Eliminar un descarte por su ID
const deleteDescarte = async (req, res) => {
    try {
        const descarte = await Descarte.findByPk(req.params.id);
        if (descarte) {
            await descarte.destroy();
            await createRegistro(req.user.idUsuario, "Descarte", req.params.id, "Eliminacion");
            req.flash("success", "Descarte de Vacuna eliminada exitosamente.");
            res.json({ success: true });
        } else {
            res.status(404).json({ message: "Descarte no encontrado." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el descarte. " + error.message });
    }
};

module.exports = {
    listarDescartes,
    formDescarte,
    createDescarte,
    detailsDescarte,
    editDescarte,
    updateDescarte,
    deleteDescarte,
};
