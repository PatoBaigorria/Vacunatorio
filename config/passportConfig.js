const { passport } = require("../app");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const usuario = require("../models/usuario");

function usuarioPorEmail(email) {
	return usuario.findOne({ where: { email: email }, raw: true });
}

function usuarioPorId(id) {
	return usuario.findOne({ where: { idUsuario: id }, raw: true });
}

(() => {
	const autenticarUsuario = async (email, password, done) => {
		const user = await usuarioPorEmail(email);
		try {
			if (user == null) {
				return done(null, false, {
					message: "no existe usuario con ese email",
				});
			}
			if (await bcrypt.compare(password, user.password)) {
				return done(null, user);
			} else {
				return done(null, false, { message: "contraseña incorrecta" });
			}
		} catch (error) {
			return done(error);
		}
	};
	passport.use(
		new LocalStrategy(
			{ usernameField: "emailLogin", passwordField: "passwordLogin" },
			autenticarUsuario
		)
	);
	passport.serializeUser((user, done) => done(null, user.idUsuario));
	passport.deserializeUser(async (idUsuario, done) => {
		return done(null, await usuarioPorId(idUsuario));
	});
})();
