const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");
const authorize = require("../middleware/authorize");

router.get(
	"/",
	authorize(["Super Admin"]),
	controllers.usuarioController.listarUsuarios
);
router.get("/profile", (req, res) => {
	res.render("usuario/profile", { user: req.user });
});
router.get(
	"/alta",
	authorize(["Super Admin"]),
	controllers.usuarioController.formUsuario
);
router.post(
	"/",
	authorize(["Super Admin"]),
	controllers.usuarioController.createUsuario
);
router.get(
	"/:id",
	authorize(["Super Admin"]),
	controllers.usuarioController.editUsuario
);
router.put(
	"/:id",
	authorize(["Super Admin"]),
	controllers.usuarioController.updateUsuario
);
router.delete(
	"/:id",
	authorize(["Super Admin"]),
	controllers.usuarioController.deleteUsuario
);
router.put(
	"/:id/baja",
	authorize(["Super Admin"]),
	controllers.usuarioController.bajaUsuario
);
router.put(
	"/:id/alta",
	authorize(["Super Admin"]),
	controllers.usuarioController.altaUsuario
);

module.exports = router;
