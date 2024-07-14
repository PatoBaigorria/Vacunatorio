const { LoteProveedor, Laboratorio, LoteInterno } = require("../models/relaciones");
const { Op } = require("sequelize");
const sequelize = require("../database/db"); // Asegúrate de que esto esté importado

const generarReporteVacunasPorLaboratorio = async (req, res) => {
    const { fechaInicio, fechaFin } = req.query;
    const query = `
        SELECT 
            Laboratorio.nombreLaboratorio, 
            SUM(Loteproveedor.cantidadDeLotesInternos * Loteinterno.cantidadDeVacunasTotales) AS cantidadDeVacunasTotales
        FROM 
            loteproveedor AS Loteproveedor
        JOIN 
            loteinterno AS Loteinterno ON Loteproveedor.numeroDeLote = Loteinterno.numeroDeLote
        JOIN 
            laboratorio AS Laboratorio ON Loteproveedor.idLaboratorio = Laboratorio.idLaboratorio
        WHERE 
            Loteproveedor.fechaDeCompra BETWEEN :fechaInicio AND :fechaFin
        GROUP BY 
            Laboratorio.nombreLaboratorio;
    `;

    try {
        const reportData = await sequelize.query(query, {
            replacements: { fechaInicio, fechaFin },
            type: sequelize.QueryTypes.SELECT
        });
        res.render('reportes/vacunasPorLaboratorio', {
            reportData: reportData
        });
    } catch (error) {
        console.error("Error al generar el reporte:", error);
        res.status(500).json({ message: "Error al generar el reporte. Error: " + error.message });
    }
};

const formDatosReporte = (req, res) => {
    res.render('reportes/formVacunasPorLaboratorio');
}

module.exports = {
    generarReporteVacunasPorLaboratorio,
    formDatosReporte,
};
