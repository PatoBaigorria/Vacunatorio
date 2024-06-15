const express = require("express");
const router = express.Router();
const loteProveedorController = require("../controllers/loteProveedorController");

router.get("/", loteProveedorController.listarLotesProveedores);
router.get("/alta", loteProveedorController.formLoteProveedor);
router.post("/", loteProveedorController.createLoteProveedor);
router.get("/:id", loteProveedorController.editLoteProveedor);
router.put("/:id", loteProveedorController.updateLoteProveedor);
router.delete("/:id", loteProveedorController.deleteLoteProveedor);
router.put("/:id/baja", loteProveedorController.bajaLoteProveedor);
router.put("/:id/alta", loteProveedorController.altaLoteProveedor);

module.exports = router;