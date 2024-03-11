const { Registro } = require("../models/relaciones");

const createRegistro = async (tabla, fila, accion) => {
    try {
        await Registro.create({
            idFila: fila,
            nombreDeTabla: tabla,
            tipoDeAccion: accion,
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    createRegistro,
};
