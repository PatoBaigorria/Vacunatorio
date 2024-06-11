const express = require("express");
const router = express.Router();
const aplicacionRoutes = require("./aplicacionRoutes");
const centrodevacunacionRoutes = require("./centrodevacunacionRoutes");
const depositonacionalRoutes = require("./depositonacionalRoutes");
const depositoprovincialRoutes = require("./depositoprovincialRoutes");
const descarteRoutes = require("./descarteRoutes");
const laboratorioRoutes = require("./laboratorioRoutes");
const loteinternoRoutes = require("./loteinternoRoutes");
const loteproveedorRoutes = require("./loteproveedorRoutes");
const personaRoutes = require("./personaRoutes");
const trasladoRoutes = require("./trasladoRoutes");
const usuarioRoutes = require("./usuarioRoutes");

const { passport } = require("../app");

// Middleware para verificar si el usuario está autenticado
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

// Middleware para añadir el estado de autenticación a todas las vistas
function addAuthenticationStatus(req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
}

// Usar el middleware globalmente
router.use(addAuthenticationStatus);

// Ruta de la página de inicio (pública)
router.get("/", (req, res) => {
  res.render("index");
});

// Login route
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/usuarios/profile",
    successMessage: "logueado",
    successFlash: true,
    failureRedirect: "/",
    failureFlash: true,
  })
);

router.get("/usuarios/viewUsuario", function (req, res, next) {
  passport.authenticate("local", function (err, user, info, status) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/signin");
    }
    res.redirect("/usuarios/viewUsuario");
  })(req, res, next);
});

// Rutas protegidas (requieren autenticación)
router.use("/aplicaciones", isAuthenticated, aplicacionRoutes);
router.use("/centrosdevacunacion", isAuthenticated, centrodevacunacionRoutes);
router.use("/depositosnacionales", isAuthenticated, depositonacionalRoutes);
router.use("/depositosprovinciales", isAuthenticated, depositoprovincialRoutes);
router.use("/descartes", isAuthenticated, descarteRoutes);
router.use("/laboratorios", isAuthenticated, laboratorioRoutes);
router.use("/lotesinternos", isAuthenticated, loteinternoRoutes);
router.use("/lotesproveedores", isAuthenticated, loteproveedorRoutes);
router.use("/personas", isAuthenticated, personaRoutes);
router.use("/traslados", isAuthenticated, trasladoRoutes);
router.use("/usuarios", isAuthenticated, usuarioRoutes);

module.exports = router;
