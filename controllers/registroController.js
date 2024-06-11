const { Registro } = require("../models/relaciones");

exports.createRegistro = async (id, tabla, fila, accion) => {
    try {
        await Registro.create({
            idUsuario: id,
            idFila: fila,
            nombreDeTabla: tabla,
            tipoDeAccion: accion,
        })
    } catch (error) {
        console.log(error.message);
    }
}
