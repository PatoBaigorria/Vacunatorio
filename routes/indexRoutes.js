const express = require("express");
//const bcrypt = require("bcrypt");
const router = express.Router();
//const passport = require("passport");
//const Usuario = require("../models/usuario");
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
//const { passport } = require('../config/passportConfig');

const { passport } = require("../app");
// Ruta de la página de inicio (pública)
router.get("/", (req, res) => {
  res.render("index");
});

// login route
router.post("/login", passport.authenticate("local", {
	successRedirect: "/usuarios/profile",
	successMessage: "logueado",
	successFlash: true,
    failureRedirect: "/",
    failureFlash: true,
  }));

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

router.use("/aplicaciones", aplicacionRoutes);
router.use("/centrosdevacunacion", centrodevacunacionRoutes);
router.use("/depositosnacionales", depositonacionalRoutes);
router.use("/depositosprovinciales", depositoprovincialRoutes);
router.use("/descartes", descarteRoutes);
router.use("/laboratorios", laboratorioRoutes);
router.use("/lotesinternos", loteinternoRoutes);
router.use("/lotesproveedor", loteproveedorRoutes);
router.use("/personas", personaRoutes);
router.use("/traslados", trasladoRoutes);
router.use("/usuarios", usuarioRoutes);

// Rutas protegidas (requieren autenticación)
/*router.get("/aplicaciones", isAuthenticated, (req, res) => {
	router.use("/aplicaciones", aplicacionRoutes);
});

router.get("/centrosdevacunacion", isAuthenticated, (req, res) => {
	router.use("/centrosdevacunacion", centrodevacunacionRoutes);
});

router.get("/depositosnacionales", isAuthenticated, (req, res) => {
	router.use("/depositosnacionales", depositonacionalRoutes);
})

router.get("/depositosprovinciales", isAuthenticated, (req, res) => {
	router.use("/depositosprovinciales", depositoprovincialRoutes);
})

router.get("/descartes", isAuthenticated, (req, res) => {
	router.use("/descartes", descarteRoutes);
})

router.get("/laboratorios", isAuthenticated, (req, res) => {
	router.use("/laboratorios", laboratorioRoutes);
})

router.get("/lotesinternos", isAuthenticated, (req, res) => {
	router.use("/lotesinternos", loteinternoRoutes);
})

router.get("/lotesproveedor", isAuthenticated, (req, res) => {
	router.use("/lotesproveedor", loteproveedorRoutes);
})

router.get("/personas", isAuthenticated, (req, res) => {
	router.use("/personas", personaRoutes);
})

router.get("/traslados", isAuthenticated, (req, res) => {
	router.use("/traslados", trasladoRoutes);
})

router.get("/usuarios", isAuthenticated, (req, res) => {
	router.use("/usuarios", usuarioRoutes);
})*/

module.exports = router;
