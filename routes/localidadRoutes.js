const express = require("express");
const router = express.Router();
const localidadController = require("../controllers/localidadController");
const authorize = require("../middleware/authorize");
const getLocalidadesByProvinciaFromAPI = require("../middleware/getLocalidadesByProvinciaFromAPI");

router.get('/localidades/:provinciaNombre', authorize(["Super Admin"]), getLocalidadesByProvinciaFromAPI, localidadController.getLocalidadesPorProvincia);

module.exports = router;
