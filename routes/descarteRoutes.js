const express = require("express");
const router = express.Router();
const descarteController = require("../controllers/descarteController");

router.get("/", descarteController.listarDescartes);
router.get("/crear", descarteController.formDescarte);
router.post("/", descarteController.createDescarte);
router.get("/:id", descarteController.editDescarte);
router.put("/:id", descarteController.updateDescarte);
router.delete("/:id", descarteController.deleteDescarte);
router.put("/:id/baja", descarteController.bajaDescarte);
router.put("/:id/alta", descarteController.altaDescarte);

module.exports = router;