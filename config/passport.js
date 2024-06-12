const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

// Configurar Passport
passport.use(
  new LocalStrategy((username, password, done) => {
    // Aquí deberías buscar el usuario en tu base de datos
    // y comparar la contraseña usando bcrypt.compare
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas de autenticación
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// Middleware para verificar la autenticación
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
app.get("/logout", (req, res) => {
  req.logout(); // Desautenticar al usuario
  res.redirect("/"); // Redirigir a la página de inicio u otra página deseada
});
