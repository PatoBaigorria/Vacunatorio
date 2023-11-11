const express = require("express");
const router = express.Router();
//var aut = require("../middleware/auth");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
// Ruta para mostrar todos los formularios
router.get("/Altas/formAgenteDeSalud", (req, res) => {
  res.render("formAgenteDeSalud");
});

router.get("/Altas/formAplicacion", (req, res) => {
  res.render("formAplicacion");
});

router.get("/Altas/formCentroDeVacunacion", (req, res) => {
  res.render("formCentroDeVacunacion");
});

router.get("/Altas/formDepositoNacional", (req, res) => {
  res.render("formDepositoNacional");
});

router.get("/Altas/formDepositoProvincial", (req, res) => {
  res.render("formDepositoProvincial");
});

router.get("/Altas/formDescarte", (req, res) => {
  res.render("formDescarte");
});

router.get("/Altas/formLaboratorio", (req, res) => {
  res.render("formLaboratorio");
});

router.get("/Altas/formLoteInterno", (req, res) => {
  res.render("formLoteInterno");
});
router.get("/Altas/formLoteProveedor", (req, res) => {
  res.render("formLoteProveedor");
});

router.get("/Altas/formPatologiaBase", (req, res) => {
  res.render("formPatologiaBase");
});

router.get("/Altas/formPersona", (req, res) => {
  res.render("formPersona");
});

router.get("/Altas/formTelefono", (req, res) => {
  res.render("formTelefono");
});

router.get("/Altas/formTraslado", (req, res) => {
  res.render("formTraslado");
});

// Importar los archivos de rutas específicos
const agentedesaludRoutes = require("./agentedesaludRoutes");
const aplicacionRoutes = require("./aplicacionRoutes");
const centrodevacunacionRoutes = require("./centrodevacunacionRoutes");
const depositonacionalRoutes = require("./depositonacionalRoutes");
const depositoprovincialRoutes = require("./depositoprovincialRoutes");
const descarteRoutes = require("./descarteRoutes");
const laboratorioRoutes = require("./laboratorioRoutes");
const loteinternoRoutes = require("./loteinternoRoutes");
const loteproveedorRoutes = require("./loteproveedorRoutes");
const patologiabaseRoutes = require("./patologiabaseRoutes");
const personaRoutes = require("./personaRoutes");
const telefonoRoutes = require("./telefonoRoutes");
const trasladoRoutes = require("./trasladoRoutes");

// Configurar las rutas principales
router.use("/agentesdesalud", agentedesaludRoutes);
router.use("/aplicaciones", aplicacionRoutes);
router.use("/centrosdevacunaciones", centrodevacunacionRoutes);
router.use("/depositosnacionales", depositonacionalRoutes);
router.use("/depositosprovinciales", depositoprovincialRoutes);
router.use("/descartes", descarteRoutes);
router.use("/laboratorios", laboratorioRoutes);
router.use("/lotesinternos", loteinternoRoutes);
router.use("/lotesproveedores", loteproveedorRoutes);
router.use("/patologiasbases", patologiabaseRoutes);
router.use("/personas", personaRoutes);
router.use("/telefonos", telefonoRoutes);
router.use("/traslados", trasladoRoutes);

module.exports = router;
