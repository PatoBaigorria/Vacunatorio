const express = require('express');
const router = express.Router();
const provinciaController = require('../controllers/provinciaController');
const authorize = require("../middleware/authorize");
const getProvinciasFromAPI = require("../middleware/getProvinciasFromAPI");

router.get('/provincias', authorize(["Super Admin"]), getProvinciasFromAPI, provinciaController.getProvincias);

module.exports = router;
