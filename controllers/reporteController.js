const { LoteProveedor, Laboratorio } = require("../models/relaciones");
const { Op } = require("sequelize");
const sequelize = require("sequelize"); // Asegúrate de que esto esté importado

const generarReporteVacunasPorLaboratorio = async (req, res) => {
    const { fechaInicio, fechaFin } = req.query;

    try {
        const reportData = await LoteProveedor.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('cantidadDeLotesInternos')), 'totalVacunas'],
            ],
            include: [
                {
                    model: Laboratorio,
                    attributes: ['nombreLaboratorio']
                }
            ],
            where: {
                fechaDeCompra: {
                    [Op.between]: [fechaInicio, fechaFin]
                }
            },
            group: ['Laboratorio.idLaboratorio'] // Cambia a idLaboratorio para evitar problemas
        });

        res.render('reportes/vacunasPorLaboratorio', {
            reportData: reportData,
            fechaInicio: fechaInicio,
            fechaFin: fechaFin
        });
    } catch (error) {
        console.error("Error al generar el reporte:", error);
        res.status(500).json({ message: "Error al generar el reporte." });
    }
};
const formDatosReporte = (req, res) => {
    
    res.render('reportes/formVacunasPorLaboratorio');
}

module.exports = {
    generarReporteVacunasPorLaboratorio,
    formDatosReporte,
};
