const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");

// Importación del controlador
router.get("/", controllers.loteProveedorController.getAllLotesProveedores);
router.get("/crear", controllers.loteProveedorController.crearLoteProveedor);
router.post("/", controllers.loteProveedorController.createLoteProveedor);
router.get("/:id/:id", controllers.loteProveedorController.getLoteProveedorById);
router.put("/:id/:id", controllers.loteProveedorController.updateLoteProveedor);
router.delete("/:id/:id", controllers.loteProveedorController.deleteLoteProveedor);
/*router.get("/lotesproveedores", async (req, res) => {
  try {
    const lotesProveedores = await LoteProveedor.findAll();
    res.json(lotesProveedores);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener los lotes de proveedores."
      });
  }
});

// Crear un nuevo lote de proveedor
router.post("/lotesproveedores", async (req, res) => {
  );

// Actualizar un lote de proveedor por su ID
router.put("/lotesproveedores/:id", async (req, res) => {
  try {
    const loteProveedorActualizado = await LoteProveedor.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    res.json(loteProveedorActualizado);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al actualizar el lote de proveedor."
      });
  }
});

// Eliminar un lote de proveedor por su ID
router.delete("/lotesproveedores/:id", async (req, res) => {
  try {
    await LoteProveedor.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json({
      message: "Lote de proveedor eliminado correctamente."
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al eliminar el lote de proveedor."
      });
  }
});*/

module.exports = router;