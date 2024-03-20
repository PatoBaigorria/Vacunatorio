const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");
const Usuario = require('../models/usuario')
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

// Ruta de la página de inicio (pública)
router.get("/", (req, res) => {
	res.render("index");
});

// login route
router.post("/login", async (req, res) => {
	const email = req.body.emailLogin;
	const pass = req.body.passwordLogin
	console.log(email);
	console.log(pass);
	const usuario = await Usuario.findOne({where: { email: email }});
	if (usuario) {
    // compara password del usuario con password hasheado en la BD
    const validPassword = await bcrypt.compare(pass, usuario.password);
    if (validPassword) {
      res.status(200).json({
        message: "Usuario Autenticado",
      });
      //configurar la session para no autenticar en cada requerimiento
    } else {
      res.status(400).json({ error: "Password Inválido" });
    }
  } else {
    res.status(401).json({
      error: "El usuario no existe",
    });
  }
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
