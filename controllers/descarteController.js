const { Descarte, AgenteDeSalud, LoteInterno, Persona, CentroDeVacunacion, Usuario } = require("../models/relaciones");
const { createRegistro } = require("./registroController");
const Op = require('sequelize').Op;

// Obtener todos los descartes
const listarDescartes = async (req, res) => {
    try {
        let descartes;
        let rol = req.user.rol
        if (rol === 'Super Admin') {
            descartes = await Descarte.findAll({
                include: [{
                    model: Usuario,
                    attributes: ["apellido"],
                }],
                where: {
                    activo: 1,
                },
                raw: true
            });
        } else {
            descartes = await Descarte.findAll({
                include: [{
                    model: Usuario,
                    attributes: ["apellido"],
                }],
                where: {
                    activo: 1,
                    idUsuario: req.user.idUsuario
                },
                raw: true
            });

            console.log(descartes)
        }

        res.render("descarte/viewDescarte", { descartes: descartes, rol: rol });
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los descartes. " + error.message
        });
    }
};


const formDescarte = async (req, res) => {
    try {
        const lotesInternos = await LoteInterno.findAll({
            where: {
                '$CentroDeVacunacion.localidad$': req.user.localidad,
                '$CentroDeVacunacion.provincia$': req.user.provincia,
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
        const { numeroDeSerie, empresaDescartante, motivo, cantidadDeVacunas, fechaDeDescarte } = req.body;

        const descarte = await Descarte.create({
            idUsuario: req.user.idUsuario,
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
        const descarte = await Descarte.findByPk(req.params.id, {
            include: [{
                model: LoteInterno,
                attributes: ["numeroDeSerie", "cantidadDeVacunasRestantes", "fechaDeLlegadaCentroDeVacunacion"],
            }],
            raw: true
        });

        const empresas = ["Veolia", "Clean Harbors", "Waste Management", "Stericycle"];
        const motivos = ["Vencida", "Rotura", "Cadena Pérdida de Frío", "Contaminación"];

        res.render("descarte/editDescarte", {
            descarte: descarte,
            motivos: motivos,
            empresas: empresas,
            rol: req.user.rol,
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
        const { numeroDeSerie, empresaDescartante, motivo, cantidadDeVacunas, fechaDeDescarte } = req.body;

        console.log('Datos recibidos:', { numeroDeSerie, empresaDescartante, motivo, cantidadDeVacunas, fechaDeDescarte });

        const descarte = await Descarte.findByPk(req.params.id);

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
            const loteInterno = await LoteInterno.findOne({ where: { numeroDeSerie: descarte.numeroDeSerie } });
            const cantidadDeVacunasRest = loteInterno.cantidadDeVacunasRestantes + descarte.cantidadDeVacunas;
            await LoteInterno.update({
                cantidadDeVacunasRestantes: cantidadDeVacunasRest
            }, {
                where: {
                    numeroDeSerie: descarte.numeroDeSerie
                }
            });
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
