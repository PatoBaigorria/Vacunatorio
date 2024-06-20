const bcrypt = require("bcrypt");
const { Usuario } = require("../models/relaciones");
const { createRegistro } = require("./registroController");

const listarUsuarios = async (req, res) => {
	try {
		const usuarios = await Usuario.findAll();
		res.render("usuario/viewUsuario", {
			usuarios: usuarios,
		});
	} catch (error) {
		res.status(500).json({ message: "Error al obtener los usuarios." });
	}
};

const formUsuario = async (req, res) => {
	try {
		res.render("usuario/formUsuario");
	} catch (error) {
		res.status(500).json({ message: "Error al crear la usuario." });
	}
};

const createUsuario = async (req, res) => {
	try {
		const { rol, nombreUsuario, email, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 5);
		const usuario = await Usuario.create({
			rol,
			nombreUsuario,
			email,
			password: hashedPassword,
			activo: 1,
		});
		await createRegistro(
			req.user.idUsuario,
			"Usuario",
			usuario.dataValues.idUsuario,
			"Creacion"
		);
		await createRegistro(
			req.user.idUsuario,
			"Usuario",
			usuario.dataValues.idUsuario,
			"Alta"
		);

		req.flash("success", "Usuario creado exitosamente");
		res.redirect("/usuarios");
	} catch (error) {
		console.error("Error al crear el usuario:", error);
		req.flash("error", "Error al crear el usuario");
		res.redirect("/usuarios/alta");
	}
};

const editUsuario = async (req, res) => {
	try {
		const usuario = await Usuario.findByPk(req.params.id);
		res.render("usuario/editUsuario", {
			usuario: usuario,
		});
	} catch (error) {
		res.flash("error", "Error al obtener el usuario.");
	}
};

const updateUsuario = async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		req.body.password = hashedPassword;
		await Usuario.update(req.body, {
			where: {
				idUsuario: req.params.id,
			},
		});
		await createRegistro(
			req.user.idUsuario,
			"Usuario",
			req.params.id,
			"Modificacion"
		);
		req.flash("success", "Usuario actualizado exitosamente");
		res.redirect("/usuarios");
	} catch (error) {
		res.status(500).json({
			message: "Error al modificar al usuario. Error: " + error.message,
		});
		console.log(error.message);
		//res.redirect('/usuarios/' + req.params.id);
	}
};

const deleteUsuario = async (req, res) => {
	try {
		await Usuario.destroy({
			where: {
				idUsuario: req.params.id,
			},
		});
		await createRegistro(
			req.user.idUsuario,
			"Usuario",
			req.params.id,
			"Baja"
		);
		req.flash("success", "Usuario eliminado exitosamente");
	} catch (error) {
		req.flash("error", "Error al eliminar el usuario.");
		res.redirect("/usuarios/" + req.params.id);
	}
};

const altaUsuario = async (req, res) => {
	try {
		await Usuario.update(
			{ activo: 1 },
			{
				where: {
					idUsuario: req.params.id,
				},
			}
		);
		await createRegistro(
			req.user.idUsuario,
			"Usuario",
			req.params.id,
			"Alta"
		);
		req.flash("success", "Usuario dado de alta exitosamente");
		res.json({ success: true });
	} catch (error) {
		req.flash("error", "Error al dar de alta el usuario.");
		res.status(500).json({ success: false, message: error.message });
	}
};

const bajaUsuario = async (req, res) => {
	try {
		await Usuario.update(
			{ activo: 0 },
			{
				where: {
					idUsuario: req.params.id,
				},
			}
		);
		await createRegistro(
			req.user.idUsuario,
			"Usuario",
			req.params.id,
			"Baja"
		);
		req.flash("success", "Usuario dado de baja exitosamente");
		res.json({ success: true });
	} catch (error) {
		req.flash("error", "Error al dar de baja el usuario.");
		res.status(500).json({ success: false, message: error.message });
	}
};

module.exports = {
	listarUsuarios,
	formUsuario,
	createUsuario,
	editUsuario,
	updateUsuario,
	deleteUsuario,
	altaUsuario,
	bajaUsuario,
};
