// middlewares/getProvinciasFromAPI.js
const axios = require('axios');

async function getProvinciasFromAPI(req, res, next) {
    try {
        const response = await axios.get('https://apis.datos.gob.ar/georef/api/provincias');
        res.locals.provincias = response.data.provincias.map(provincia => provincia.nombre);
        next();
    } catch (error) {
        console.error('Error al obtener las provincias desde la API externa:', error);
        res.locals.provincias = [];
        next(); // Continúa con el siguiente middleware aunque haya error
    }
}

module.exports = getProvinciasFromAPI;
