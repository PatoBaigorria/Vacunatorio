const createError = require("http-errors");
const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const override = require("method-override");
//const { passport } = require("./config/passportConfig");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const Usuario = require("./models/usuario");
const db = require("./database/db");

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

// Configuración de Passport
//app.use(passport.initialize());
//app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "emailLogin",
      passwordField: "passwordLogin",
    },
    async (email, password, done) => {
      try {
        const usuario = await Usuario.findOne({ where: { email: email } });
        if (!usuario) {
          return done(null, false, { message: "Usuario no encontrado" });
        }
        const match = await bcrypt.compare(password, usuario.password);
        if (!match) {
          return done(null, false, { message: "Contraseña incorrecta" });
        }
        return done(null, usuario);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((usuario, done) => {
  console.log("SerializeUser");
  console.log("usuario: ", usuario.dataValues.email);
  done(null, usuario.dataValues.email);
});

passport.deserializeUser(async (idUsuario, done) => {
  try {
    const usuario = await Usuario.findByPk(idUsuario);
    done(null, usuario);
  } catch (error) {
    done(error);
  }
});

exports.passport = passport;
exports.check = check;
const indexRouter = require("./routes/indexRoutes");

app.use(
  session({
    secret: "secreto", // Cambia esto por una cadena secreta para firmar las cookies
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

console.log("passport en app: ");
console.log(passport);
// Configuración de express-flash
app.use(flash());

// Agrega las rutas a la aplicación
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

function check(req, res, next) {
  if (passport.authenticate()) {
    console.log("Estoy en check")
    return next();
  }
  res.redirect('/usuarios/viewUsuario')
}

module.exports = app;
