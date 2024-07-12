// middlewares/getLocalidadesByProvinciaFromAPI.js
const axios = require('axios');

async function getLocalidadesByProvinciaFromAPI(req, res, next) {
    const { provinciaNombre } = req.params;
    try {
        const response = await axios.get(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${provinciaNombre}`);
        res.locals.localidades = response.data.localidades.map(localidad => localidad.nombre);
        next();
    } catch (error) {
        console.error('Error al obtener las localidades desde la API externa:', error);
        res.locals.localidades = [];
        next(); // Continúa con el siguiente middleware aunque haya error
    }
}

module.exports = getLocalidadesByProvinciaFromAPI;
