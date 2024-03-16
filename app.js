const createError = require("http-errors");
const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/indexRoutes");
const bodyParser = require("body-parser");
const override = require("method-override");
const sessionConfig = require("./config/sessionConfig");
const app = express();

app.use(session(sessionConfig));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(override("_method"));

// Configuración de express-flash
app.use(flash());

// Configuración de express-session
app.use(
	session({
		secret: "tu_secreto",
		resave: false,
		saveUninitialized: true,
	})
);

// Configuraciones
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

// Agrega las rutas a la aplicación
app.use("/", indexRouter);

// Importa módulo de configuración de la base de datos
const db = require("./database/db");
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
