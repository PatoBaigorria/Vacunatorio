const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");
const {check} = require('../app')
router.get("/", controllers.usuarioController.listarUsuarios);
router.get('/profile', check, (req, res) => {
	console.log("Estoy en profile: ")
	console.log(req.user);
	res.render("usuario/profile", { user: req.user });
})
router.get("/alta", controllers.usuarioController.formUsuario);
router.post("/", controllers.usuarioController.createUsuario);
router.get("/:id", controllers.usuarioController.editUsuario);
router.put("/:id", controllers.usuarioController.updateUsuario);
router.delete("/:id", controllers.usuarioController.deleteUsuario);
router.put("/:id/baja", controllers.usuarioController.bajaUsuario);
router.put("/:id/alta", controllers.usuarioController.altaUsuario);


module.exports = router;