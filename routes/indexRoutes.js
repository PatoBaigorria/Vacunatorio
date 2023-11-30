const express = require("express");
const router = express.Router();
//var aut = require("../middleware/auth");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});


// Importar los archivos de rutas específicos
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

// Configurar las rutas principales
router.use("/aplicaciones", aplicacionRoutes);
router.use("/centrosdevacunacion", centrodevacunacionRoutes);
router.use("/depositosnacionales", depositonacionalRoutes);
router.use("/depositosprovinciales", depositoprovincialRoutes);
router.use("/descartes", descarteRoutes);
router.use("/laboratorios", laboratorioRoutes);
router.use("/lotesinternos", loteinternoRoutes);
router.use("/lotesproveedores", loteproveedorRoutes);
router.use("/personas", personaRoutes);
router.use("/traslados", trasladoRoutes);

module.exports = router;
