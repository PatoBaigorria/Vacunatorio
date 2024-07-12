const axios = require('axios');

exports.getProvincias = async (req, res) => {
    try {
        const response = await axios.get('https://apis.datos.gob.ar/georef/api/provincias');
        const provincias = response.data.provincias.map(provincia => provincia.nombre);
        res.json(provincias);
    } catch (error) {
        console.error('Error al obtener las provincias desde la API externa:', error);
        res.status(500).json({ error: 'Error al obtener las provincias' });
    }
};
