const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authorize");
const aplicacionRoutes = require("./aplicacionRoutes");
const centrodevacunacionRoutes = require("./centrodevacunacionRoutes");
const depositonacionalRoutes = require("./depositonacionalRoutes");
const depositoprovincialRoutes = require("./depositoprovincialRoutes");
const descarteRoutes = require("./descarteRoutes");
const laboratorioRoutes = require("./laboratorioRoutes");
const localidadRoutes = require("./localidadRoutes");
const loteinternoRoutes = require("./loteinternoRoutes");
const loteproveedorRoutes = require("./loteproveedorRoutes");
const personaRoutes = require("./personaRoutes");
const provinciaRoutes = require("./provinciaRoutes");
const trasladoRoutes = require("./trasladoRoutes");
const registroRoutes = require("./registroRoutes");
const usuarioRoutes = require("./usuarioRoutes");
const reporteRoutes = require("./reporteRoutes");

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
		successRedirect: "/",
		successMessage: "logueado",
		successFlash: true,
		failureRedirect: "/",
		failureFlash: true,
	})
);

router.get("/logout", (req, res) => {
	req.logout((err) => {
		// Proporciona una función callback para errores
		if (err) {
			console.error("Error durante el cierre de sesión:", err);
			return res.redirect("/login"); // O maneja el error de otra manera
		}
		res.redirect("/"); // Redirecciona a la página de inicio después del cierre de sesión exitoso
	});
});

// Rutas protegidas (requieren autenticación)
router.use(
	"/aplicaciones",
	isAuthenticated,
	authorize(["Super Admin", "Agente de salud"]),
	aplicacionRoutes
);
router.use(
	"/centrosdevacunacion",
	isAuthenticated,
	authorize(["Super Admin"]),
	centrodevacunacionRoutes
);
router.use(
	"/depositosnacionales",
	isAuthenticated,
	authorize(["Super Admin", "Operador de logistica"]),
	depositonacionalRoutes
);
router.use(
	"/depositosprovinciales",
	isAuthenticated,
	authorize(["Super Admin"]),
	depositoprovincialRoutes
);
router.use(
	"/descartes",
	isAuthenticated,
	authorize(["Super Admin", "Operador de logistica", "Agente de salud"]),
	descarteRoutes
);
router.use(
	"/laboratorios",
	isAuthenticated,
	authorize(["Super Admin", "Gestor de compras"]),
	laboratorioRoutes
);
router.use(
	"/lotesinternos",
	isAuthenticated,
	authorize(["Super Admin", "Gestor de compras", "Operador de logistica", "Agente de salud"]),
	loteinternoRoutes
);
router.use(
	"/lotesproveedores",
	isAuthenticated,
	authorize(["Super Admin", "Gestor de compras", "Operador de logistica"]),
	loteproveedorRoutes
);
router.use(
	"/personas",
	isAuthenticated,
	authorize(["Super Admin", "Agente de salud"]),
	personaRoutes
);
router.use(
	"/traslados",
	isAuthenticated,
	authorize(["Super Admin", "Operador de logistica", "Agente de salud"]),
	trasladoRoutes
);
router.use(
	"/registros",
	isAuthenticated,
	authorize(["Super Admin"]),
	registroRoutes
);
router.use(
	"/usuarios",
	isAuthenticated,
	authorize(["Super Admin"]),
	usuarioRoutes
);
router.use(
	"/provincia",
	isAuthenticated,
	authorize(["Super Admin"]),
	provinciaRoutes // Rutas de Provincia
);

router.use(
	"/localidad",
	isAuthenticated,
	authorize(["Super Admin"]),
	localidadRoutes // Rutas de Localidad
);
router.use(
	"/reportes", isAuthenticated,
	authorize(["Super Admin"]), reporteRoutes)

module.exports = router;
