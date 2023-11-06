const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
// Importar modelos
const {
  Persona,
  AgenteDeSalud,
  CentroDeVacunacion,
  Laboratorio,
  Telefono,
  LoteProveedor,
  PatologiaBase,
  DepositoNacional,
  DepositoProvincial,
  Aplicacion,
  LoteInterno,
  Descarte,
  Traslado,
} = require("./models/relaciones");

const app = express();

// Configuracion de pug
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

// Agrega las rutas a la aplicación
app.use("/", indexRouter);

// Importa módulo de configuración de la base de datos
const db = require("./database/db");
//const { AgenteDeSalud, CentroDeVacunacion } = require("./models/relaciones");

db.authenticate()
  .then(() => {
    console.log("Conexión a la base de datos establecida correctamente");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });

//Iniciar Servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

//Ruta para mostrar los formularios
app.get("/", (req, res) => {
  res.render("index", {});
});
app.get("/guardar-agentedesalud", async (req, res) => {
  try {
    const personas = await Persona.findAll();
    res.render("formAgenteDeSalud", { personas });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener el Agente de Salud");
  }
});
app.get("/guardar-aplicacion", async (req, res) => {
  try {
    const personas = await Persona.findAll();
    const lotesInternos = await LoteInterno.findAll();
    res.render("formAplicacion", { personas, lotesInternos });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener una Aplicación");
  }
});
app.get("/formCentroDeVacunacion", (req, res) => {
  res.render("formCentroDeVacunacion");
});
app.get("/formDepositoNacional", (req, res) => {
  res.render("formDepositoNacional");
});
app.get("/formDepositoProvincial", (req, res) => {
  res.render("formDepositoProvincial");
});
app.get("/guardar-descarte", async (req, res) => {
  try {
    const personas = await Persona.findAll();
    const lotesInternos = await LoteInterno.findAll();
    res.render("formDescarte", { personas, lotesInternos });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener un Descarte");
  }
});
app.get("/formLaboratorio", (req, res) => {
  res.render("formLaboratorio");
});
app.get("/guardar-loteinterno", async (req, res) => {
  try {
    const laboratorios = await Laboratorio.findAll();
    const lotesProveedores = await LoteProveedor.findAll();
    const depositosNacionales = await DepositoNacional.findAll();
    const depositosProvinciales = await DepositoProvincial.findAll();
    const centrosDeVacunacion = await CentroDeVacunacion.findAll();
    res.render("formLoteInterno", {
      laboratorios,
      lotesProveedores,
      depositosNacionales,
      depositosProvinciales,
      centrosDeVacunacion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los lotes internos");
  }
});
app.get("/guardar-loteproveedor", async (req, res) => {
  try {
    const laboratorios = await Laboratorio.findAll(); // Obtener todos los laboratorios
    res.render("formLoteProveedor", { laboratorios });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los lotes proveedores");
  }
});
app.get("/formPersona", (req, res) => {
  res.render("formPersona");
});
app.get("/guardar-telefono", async (req, res) => {
  try {
    const personas = await Persona.findAll();
    res.render("formTelefono", { personas });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener el Telefono de una Persona");
  }
});
app.get("/guardar-patologiabase", async (req, res) => {
  try {
    const personas = await Persona.findAll();
    res.render("formPatologiaBase", { personas });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener una Patología de una Persona");
  }
});
app.get("/guardar-traslado", async (req, res) => {
  try {
    const centrosDeVacunacion = await CentroDeVacunacion.findAll();
    const lotesInternos = await LoteInterno.findAll();
    res.render("formTraslado", { centrosDeVacunacion, lotesInternos });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener un Traslado");
  }
});
//GUARDAR DATOS DE LOS FORMULARIOS EN LA BASE DE DATOS

//                      PERSONA
app.post("/guardar-persona", async (req, res) => {
  try {
    const {
      DNI,
      nombre,
      apellido,
      email,
      fechadenacimiento,
      ocupacion,
      genero,
      longitud,
      latitud,
    } = req.body;
    const personaExistente = await Persona.findOne({ where: { DNI } });
    if (personaExistente) {
      return res.render("formPersona", {
        mensaje: "El DNI ya existe. Por favor, ingrese uno nuevo.",
      });
    }
    let nuevoRegistro;

    if (ocupacion === "agente") {
      const { matricula } = req.body;
      nuevoRegistro = await AgenteDeSalud.create({
        DNI,
        matricula,
      });
    } else {
      nuevoRegistro = await Persona.create({
        DNI,
        nombre,
        apellido,
        email,
        fechadenacimiento,
        ocupacion,
        genero,
        longitud,
        latitud,
      });
    }
    console.log("Persona creada:", nuevoRegistro);
    res.redirect("/"); // Redirige a la página principal o a donde quieras
  } catch (error) {
    console.error("Error al insertar datos:", error);
    res.status(500).send("Error al insertar datos");
  }
});

//                 AGENTE DE SALUD
app.post("/guardar-agentedesalud", async (req, res) => {
  try {
    const { DNI, matricula } = req.body;

    // Crear una nueva instancia de Agente utilizando Sequelize
    const nuevoAgente = await AgenteDeSalud.create({
      DNI,
      matricula,
    });

    console.log("Agente creado:", nuevoAgente);
    res.redirect("/"); // Redirige a la página principal o a donde quieras
  } catch (error) {
    console.error("Error al insertar datos:", error);
    res.status(500).send("Error al insertar datos");
  }
});
//                 APLICACION
app.post("/guardar-aplicacion", async (req, res) => {
  try {
    const { DNIPaciente, DNIAgente, numeroDeSerie, fechaDeAplicacion } =
      req.body;

    // Crear una nueva instancia de Aplicacion utilizando Sequelize
    const nuevaAplicacion = await Aplicacion.create({
      DNIPaciente,
      DNIAgente,
      numeroDeSerie,
      fechaDeAplicacion,
    });

    console.log("Aplicacion creada:", nuevaAplicacion);
    res.redirect("/"); // Redirige a la página principal o a donde quieras
  } catch (error) {
    console.error("Error al insertar datos:", error);
    res.status(500).send("Error al insertar datos");
  }
});
//                 DESCARTE
app.post("/guardar-descarte", async (req, res) => {
  try {
    const {
      DNIAgente,
      numeroDeSerie,
      empresaDescartante,
      motivo,
      cantidadDeVacunas,
      fechaDeDescarte,
    } = req.body;

    // Crear una nueva instancia de Aplicacion utilizando Sequelize
    const nuevoDescarte = await Descarte.create({
      DNIAgente,
      numeroDeSerie,
      empresaDescartante,
      motivo,
      cantidadDeVacunas,
      fechaDeDescarte,
    });

    console.log("Descarte creada:", nuevoDescarte);
    res.redirect("/"); // Redirige a la página principal o a donde quieras
  } catch (error) {
    console.error("Error al insertar datos:", error);
    res.status(500).send("Error al insertar datos");
  }
});
//                      TRASLADO
app.post("/guardar-traslado", async (req, res) => {
  try {
    const {
      numeroDeSerie,
      idCentroDeVacunacion,
      fechaDeSalida,
      fechaDeLlegada,
    } = req.body;

    // Crear una nueva instancia de Traslado utilizando Sequelize
    const nuevoTraslado = await Traslado.create({
      numeroDeSerie,
      idCentroDeVacunacion,
      fechaDeSalida,
      fechaDeLlegada,
    });

    console.log("Traslado creado:", nuevoTraslado);
    res.redirect("/"); // Redirige a la página principal o a donde quieras
  } catch (error) {
    console.error("Error al insertar datos:", error);
    res.status(500).send("Error al insertar datos");
  }
});

//                  CENTRO DE VACUNACION
app.post("/guardar-centrovacunacion", async (req, res) => {
  try {
    const { longitud, latitud } = req.body;

    // Crear una nueva instancia de Centro utilizando Sequelize
    const nuevoCentro = await CentroDeVacunacion.create({
      longitud,
      latitud,
    });

    console.log("Centro creado:", nuevoCentro);
    res.redirect("/"); // Redirige a la página principal o a donde quieras
  } catch (error) {
    console.error("Error al insertar datos:", error);
    res.status(500).send("Error al insertar datos");
  }
});
//                       LABORATORIO
app.post("/guardar-laboratorio", async (req, res) => {
  try {
    const { nombreLaboratorio, pais, email, telefono, longitud, latitud } =
      req.body;

    // Crear una nueva instancia de Laboratorio utilizando Sequelize
    const nuevoLaboratorio = await Laboratorio.create({
      nombreLaboratorio,
      pais,
      email,
      telefono,
      longitud,
      latitud,
    });

    console.log("Laboratorio creado:", nuevoLaboratorio);
    res.redirect("/"); // Redirige a la página principal o a donde quieras
  } catch (error) {
    console.error("Error al insertar datos:", error);
    res.status(500).send("Error al insertar datos en el laboratorio");
  }
});
//                    LOTE PROVEEDOR
app.post("/guardar-loteproveedor", async (req, res) => {
  try {
    const {
      numeroDeLote,
      idLaboratorio,
      tipoDeVacuna,
      nombreComercial,
      cantidadDeLotesInternos,
      fechaDeFabricacion,
      fechaDeVencimiento,
      fechaDeCompra,
    } = req.body;

    // Crear una nueva instancia de Lote Proveedor utilizando Sequelize
    console.log("Creando lote");
    const nuevoLoteProveedor = await LoteProveedor.create({
      numeroDeLote,
      idLaboratorio,
      tipoDeVacuna,
      nombreComercial,
      cantidadDeLotesInternos,
      fechaDeFabricacion,
      fechaDeVencimiento,
      fechaDeCompra,
    });

    console.log("Lote Proveedor creado:", nuevoLoteProveedor);
    res.redirect("/"); // Redirige a la página principal o a donde quieras
  } catch (error) {
    console.error("Error al insertar datos:", error);
    res.status(500).send("Error al insertar datos en el lote proveedor");
  }
});
//                  DEPOSITO NACIONAL
app.post("/guardar-depositonacional", async (req, res) => {
  try {
    const { longitud, latitud } = req.body;

    // Crear una nueva instancia de Centro utilizando Sequelize
    const nuevoDepNacional = await DepositoNacional.create({
      longitud,
      latitud,
    });

    console.log("Deposito Nacional creado:", nuevoDepNacional);
    res.redirect("/"); // Redirige a la página principal o a donde quieras
  } catch (error) {
    console.error("Error al insertar datos:", error);
    res.status(500).send("Error al insertar datos");
  }
});
//                  DEPOSITO PROVINCIAL
app.post("/guardar-depositoprovincial", async (req, res) => {
  try {
    const { longitud, latitud } = req.body;

    // Crear una nueva instancia de Centro utilizando Sequelize
    const nuevoDepProvincial = await DepositoProvincial.create({
      longitud,
      latitud,
    });

    console.log("Deposito Provincial creado:", nuevoDepProvincial);
    res.redirect("/"); // Redirige a la página principal o a donde quieras
  } catch (error) {
    console.error("Error al insertar datos:", error);
    res.status(500).send("Error al insertar datos");
  }
});
//                  LOTE INTERNO
app.post("/guardar-loteinterno", async (req, res) => {
  // Convertir fechas vacías a null
  if (req.body.idDepositoNacional == '') {
    req.body.idDepositoNacional = null;
  }
  if (req.body.idDepositoProvincial == '') {
    req.body.idDepositoProvincial = null;
  }
  if (req.body.idCentroDeVacunacion == '') {
    req.body.idCentroDeVacunacion = null;
  }
  if (req.body.fechaDeLlegadaDepositoNacional === '') {
    req.body.fechaDeLlegadaDepositoNacional = null;
  }
  if (req.body.fechaDeSalidaDepositoNacional === '') {
    req.body.fechaDeSalidaDepositoNacional = null;
  }
  if (req.body.fechaDeLlegadaDepositoProvincial === '') {
    req.body.fechaDeLlegadaDepositoProvincial = null;
  }
  if (req.body.fechaDeSalidaDepositoProvincial === '') {
    req.body.fechaDeSalidaDepositoProvincial = null;
  }
  if (req.body.fechaDeLlegadaCentroDeVacunacion === '') {
    req.body.fechaDeLlegadaCentroDeVacunacion = null;
  }
  try {
    const {
      numeroDeSerie,
      numeroDeLote,
      idLaboratorio,
      cantidadDeVacunas,
      fechaDeLlegadaDepositoNacional,
      idDepositoNacional,
      fechaDeSalidaDepositoNacional,
      fechaDeLlegadaDepositoProvincial,
      idDepositoProvincial,
      fechaDeSalidaDepositoProvincial,
      fechaDeLlegadaCentroDeVacunacion,
      idCentroDeVacunacion,
    } = req.body;

    // Crear una nueva instancia de Lote Interno utilizando Sequelize
    const nuevoLoteInterno = await LoteInterno.create({
      numeroDeSerie,
      numeroDeLote,
      idLaboratorio,
      cantidadDeVacunas,
      fechaDeLlegadaDepositoNacional,
      idDepositoNacional,
      fechaDeSalidaDepositoNacional,
      fechaDeLlegadaDepositoProvincial,
      idDepositoProvincial,
      fechaDeSalidaDepositoProvincial,
      fechaDeLlegadaCentroDeVacunacion,
      idCentroDeVacunacion,
    });

    console.log("Lote Interno creado:", nuevoLoteInterno);
    res.redirect("/"); // Redirige a la página principal o a donde quieras
  } catch (error) {
    console.error("Error al insertar datos en la tabla LI:", error);
    res.status(500).send("Error al insertar datos en la tabla LI:" + error);
  }
});
//                   TELEFONOS
app.post("/guardar-telefono", async (req, res) => {
  try {
    const { DNI, celular1, celular2 } = req.body;

    // Crear una nueva instancia de Telefono utilizando Sequelize
    const nuevoTelefono = await Telefono.create({
      DNI,
      celular1,
      celular2,
    });

    console.log("Telefono creado:", nuevoTelefono);
    res.redirect("/"); // Redirige a la página principal o a donde quieras
  } catch (error) {
    console.error("Error al insertar datos:", error);
    res.status(500).send("Error al insertar datos");
  }
});
//                 PATOLOGIA BASE
app.post("/guardar-patologiabase", async (req, res) => {
  try {
    const { DNI, patologiaBase } = req.body;

    // Crear una nueva instancia de Patologia Base utilizando Sequelize
    const nuevaPatologia = await PatologiaBase.create({
      DNI,
      patologiaBase,
    });

    console.log("Patologia creada:", nuevaPatologia);
    res.redirect("/"); // Redirige a la página principal o a donde quieras
  } catch (error) {
    console.error("Error al insertar datos:", error);
    res.status(500).send("Error al insertar datos");
  }
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

require("./models/relaciones");

module.exports = app;
