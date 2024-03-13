const express = require("express");
const router = express.Router();
const isAuthenticated = require("../auth");
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

// Rutas protegidas (requieren autenticación)
router.get("/aplicaciones", isAuthenticated, (req, res) => {
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
})

module.exports = router;
