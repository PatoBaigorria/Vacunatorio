const express = require("express");
const router = express.Router();
const registroController = require("../controllers/registroController");
const authorize = require("../middleware/authorize");

router.get("/", authorize(['Super Admin']), registroController.listarRegistros);
module.exports = router;