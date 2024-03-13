// authMiddleware.js

function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    // El usuario está autenticado, permite el acceso a la siguiente ruta
    next();
  } else {
    // El usuario no está autenticado, redirige a la página de inicio
    res.redirect("/");
  }
}

module.exports = isAuthenticated;
