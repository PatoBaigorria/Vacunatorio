const { LoteProveedor, Laboratorio, LoteInterno } = require("../models/relaciones");
const { Op } = require("sequelize");
const sequelize = require("../database/db");
const moment = require('moment');
const axios = require('axios');

const generarReporteVacunasPorLaboratorio = async (req, res) => {
    const { fechaInicio, fechaFin } = req.query;
    const formattedFechaInicio = moment(fechaInicio).format('DD-MM-YYYY');
    const formattedFechaFin = moment(fechaFin).format('DD-MM-YYYY');

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
            reportData: reportData,
            fechaInicio: formattedFechaInicio,
            fechaFin: formattedFechaFin
        });
    } catch (error) {
        console.error("Error al generar el reporte:", error);
        res.status(500).json({ message: "Error al generar el reporte. Error: " + error.message });
    }
};

const formDatosReporte = (req, res) => {
    res.render('reportes/formVacunasPorLaboratorio');
}

const generarReportePersonasVacunadas = async (req, res) => {
    const query = `
        SELECT 
            lp.tipoDeVacuna,
            p.provincia,
            p.localidad,
            COUNT(DISTINCT a.DNIPaciente) AS cantidad_vacunados
        FROM 
            aplicacion a
        JOIN 
            persona p ON a.DNIPaciente = p.DNI
        JOIN 
            loteInterno li ON a.numeroDeSerie = li.numeroDeSerie
        JOIN 
            loteProveedor lp ON li.numeroDeLote = lp.numeroDeLote
        GROUP BY 
            lp.tipoDeVacuna, p.provincia, p.localidad
        ORDER BY 
            p.provincia, p.localidad, lp.tipoDeVacuna;
    `;

    try {
        const reportData = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });
        res.render('reportes/personasVacunadas', {
            reportData: reportData
        });
    } catch (error) {
        console.error("Error al generar el reporte:", error);
        res.status(500).json({ message: "Error al generar el reporte. Error: " + error.message });
    }
};

const formEnviosVacunasReporte = async (req, res) => {
    const provinciasResponse = await axios.get('https://apis.datos.gob.ar/georef/api/provincias');
    provincias = provinciasResponse.data.provincias.map(provincia => provincia.nombre).sort((a, b) => a.localeCompare(b));
    res.render('reportes/formEnviosVacunas', {
        provincias: provincias
    });
}
const generarReporteEnviosVacunas = async (req, res) => {
    const { fechaInicio, fechaFin, provincia, localidad, idCentroDeVacunacion } = req.query;
    let filtro = "";
    let valor = "";
    if (idCentroDeVacunacion != null && idCentroDeVacunacion != "") {
        filtro = "idCentroDeVacunacion";
        valor = idCentroDeVacunacion;
    } else if (localidad != null && localidad != "") {
        filtro = "localidad";
        valor = localidad;
    } else {
        filtro = "provincia";
        valor = provincia;
    }
    const formattedFechaInicio = moment(fechaInicio).format('DD-MM-YYYY');
    const formattedFechaFin = moment(fechaFin).format('DD-MM-YYYY');
    const query = `
        SELECT 
            CentroDeVacunacion.idCentroDeVacunacion,
            CentroDeVacunacion.localidad,
            CentroDeVacunacion.provincia,
            SUM(li.cantidadDeVacunasRestantes) AS cantidadDeVacunasTotales
        FROM 
            loteinterno AS li
        JOIN 
            centrodevacunacion AS CentroDeVacunacion ON li.idCentroDeVacunacion = CentroDeVacunacion.idCentroDeVacunacion
        WHERE 
            li.fechaDeLlegadaCentroDeVacunacion BETWEEN :fechaInicio AND :fechaFin
            AND CentroDeVacunacion.${filtro} = :valor
        ORDER BY 
            CentroDeVacunacion.idCentroDeVacunacion, CentroDeVacunacion.localidad, CentroDeVacunacion.provincia;
    `;

    try {
        const reportData = await sequelize.query(query, {
            replacements: { fechaInicio, fechaFin, valor },
            type: sequelize.QueryTypes.SELECT
        });
        console.log(reportData);
        res.render('reportes/enviosVacunas', {
            reportData,
            fechaInicio: formattedFechaInicio,
            fechaFin: formattedFechaFin,
            filtro,
            valor
        });
    } catch (error) {
        console.error("Error al generar el reporte:", error);
        res.status(500).json({ message: "Error al generar el reporte. Error: " + error.message });
    }
};


const generarReporteStockDisponibleDeVacunas = async (req, res) => {
    const query = `
        SELECT 
            lp.tipoDeVacuna,
            c.provincia, 
            SUM(li.cantidadDeVacunasRestantes) AS cantidadDeStockDisponible
        FROM 
            loteinterno li
        JOIN 
            centrodevacunacion c ON li.idCentroDeVacunacion = c.idCentroDeVacunacion
        JOIN 
            loteproveedor lp ON li.numeroDeLote = lp.numeroDeLote
        GROUP BY 
            lp.tipoDeVacuna,
            c.provincia  
        ORDER BY 
            lp.tipoDeVacuna,
            c.provincia;
    `;

    try {
        const reportData = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });
        res.render('reportes/stockDisponible', {
            reportData: reportData
        });
    } catch (error) {
        console.error("Error al generar el reporte:", error);
        res.status(500).json({ message: "Error al generar el reporte. Error: " + error.message });
    }
};




module.exports = {
    generarReporteVacunasPorLaboratorio,
    formDatosReporte,
    generarReportePersonasVacunadas,
    formEnviosVacunasReporte,
    generarReporteEnviosVacunas,
    generarReporteStockDisponibleDeVacunas,
};
