const { Registro } = require("../models/relaciones");

exports.createRegistro = async (tabla, fila, accion) => {
    try {
        await Registro.create({
            idUsuario: 1,
            idFila: fila,
            nombreDeTabla: tabla,
            tipoDeAccion: accion,
        })
    } catch (error) {
        console.log(error.message);
    }
}
