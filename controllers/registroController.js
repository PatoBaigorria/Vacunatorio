const { Registro, Usuario } = require("../models/relaciones");

const createRegistro = async (id, tabla, fila, accion) => {
	try {
		await Registro.create({
			idUsuario: id,
			idFila: fila,
			nombreDeTabla: tabla,
			tipoDeAccion: accion,
		});
	} catch (error) {
		console.log(error.message);
	}
};

const listarRegistros = async (req, res) => {
	try {
		const registros = await Registro.findAll({
			include: [{ model: Usuario, attributes: ["nombreUsuario"] }],
			order: [["fecha", "DESC"]],
		});
		res.render("registro/viewRegistro", {
			registros: registros,
		});
	} catch (error) {
		req.flash("error", "Error al obtener los registros. " + error.message);
	}
};

module.exports = {
	listarRegistros,
	createRegistro,
};
