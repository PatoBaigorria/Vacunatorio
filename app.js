/*
- Corregir todas las tablas para que tengan menos columnas ✔ (Eze)
- Dividir las vistas por rol ✔ (Pato)
- Corregir el redireccionamiento para que muestre las acciones correspondientes ¿?
- Mover el perfil del usuario al nav ✔ (Pato)
- Corregir modificar Lote interno para que quede como alta lote interno ✔ (Eze)
- Modificar registro para que se refleje el usuario que realiza las acciones ✔ (Eze)
- Terminar de corregir alta aplicación ✔ (Eze)
- Hacer el controlador, las rutas y las vistas de registro ✔ (Pato)
- Roles: SuperAdmin, Gestor de compras, Operador de logística y Agente de salud (Todos)
- Hacer details de todas las vistas necesarias ✔ (Eze y Pato)
- Agregar modal en alta de aplicaciones que advierta al usuario que va a aplicar una vacuna vencida. ✔ (Eze y Pato)
- Verificar que las consultas de la realidad puedan hacerse en el proyecto ✔ (Eze y Pato)
- Verificar toda la lógica de las vistas de traslado
- Comparar que la fecha de llegada al depósito nacional sea posterior a la fecha de compra en LI
- No mostrar los campos que no tienen datos en detailsLI
- Validar que las aplicaciones solo puedan hacerse con LI que esten en CDV y que si tienen traslados tengan una fecha de llegada no nula
- Corregir el "is-valid" en la fecha de aplicación
- Arreglar la vista editar de aplicación
- Ordenar la lista de forma descendente de las siguientes tablas:
  - Lote proveedor
  - Lote interno
  - Depósito nacional
  - Depósito provincial
  - Centro de salud
  - Descarte
  - Personas por apellido
- Consultas:
  - ¿Las altas de aplicaciones, descartes, etc. serán dadas por un/a secretario/a o por el propio agente?
  - ¿Tiene sentido dar de baja un descarte o tiene más sentido eliminarlo? ¿Deberia poderse?
  - ¿Los reportes deben ser vistos por los usuarios correspondientes o solo deben verlo los "Super Admin"?
  - ¿Hace falta que agreguemos provincia y localidad en las entidades correspondientes para los reportes?
*/
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const override = require("method-override");
const passport = require("passport");
const db = require("./database/db");
exports.passport = passport;
require("./config/passportConfig");
const app = express();

// Configuraciones
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

// Configuración de body-parser y method-override
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(override("_method"));

const indexRouter = require("./routes/indexRoutes");
app.use(flash());
app.use(
  session({
    secret: "secreto", // Cambia esto por una cadena secreta para firmar las cookies
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Middleware para pasar datos de usuario a las vistas
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  next();
});

app.use("/", indexRouter);

// Verificar la conexión a la base de datos
db.authenticate()
  .then(() => {
    console.log("Conexión a la base de datos establecida correctamente");
    // Iniciar el servidor una vez que la conexión a la base de datos se haya establecido
    const port = 3000;
    app.listen(port, () => {
      console.log(`Servidor escuchando en el puerto ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });

/* catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});*/

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

exports.app = app;
