const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");

router.get("/", controllers.loteProveedorController.listarLotesProveedores);
router.get("/alta", controllers.loteProveedorController.formLoteProveedor);
router.post("/", controllers.loteProveedorController.createLoteProveedor);
router.get("/:id", controllers.loteProveedorController.editLoteProveedor);
router.put("/:id", controllers.loteProveedorController.updateLoteProveedor);
router.delete("/:id", controllers.loteProveedorController.deleteLoteProveedor);
router.put("/:id/baja", controllers.loteProveedorController.bajaLoteProveedor);
router.put("/:id/alta", controllers.loteProveedorController.altaLoteProveedor);
module.exports = router;