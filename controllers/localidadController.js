const axios = require('axios');

exports.getLocalidadesPorProvincia = async (req, res) => {
    const { provinciaNombre } = req.params;
    try {
        const response = await axios.get(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${provinciaNombre}`);
        const localidades = response.data.localidades.map(localidad => localidad.nombre);
        res.json(localidades);
    } catch (error) {
        console.error('Error al obtener las localidades desde la API externa:', error);
        res.status(500).json({ error: 'Error al obtener las localidades' });
    }
};
