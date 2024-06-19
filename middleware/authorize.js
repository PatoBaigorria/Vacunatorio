// Middleware de Autorización
function authorize(roles = []) {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    if (!req.isAuthenticated() || !roles.includes(req.user.rol)) {
      req.flash("error", "Acceso denegado"); 
      return res.redirect("/"); 
    }
    next();
  };
}

module.exports = authorize;
