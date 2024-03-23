const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const usuario = await Usuario.findOne({ where: { email: email } });
        if (!usuario) {
          return done(null, false, { message: "Usuario no encontrado" });
        }
        const match = await bcrypt.compare(password, usuario.password);
        if (!match) {
          return done(null, false, { message: "Contraseña incorrecta" });
        }
        return done(null, usuario);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((usuario, done) => {
  done(null, usuario.email);
});

passport.deserializeUser(async (idUsuario, done) => {
  try {
    const usuario = await Usuario.findByPk(idUsuario);
    done(null, usuario);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
