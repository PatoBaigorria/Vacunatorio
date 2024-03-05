const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");

router.get("/", controllers.usuarioController.listarUsuarios);




module.exports = router;