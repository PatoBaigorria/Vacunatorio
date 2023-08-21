const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");
const {
  LoteProveedor
} = require("../models/relaciones");

// Ruta para obtener todos los lotes proveedores
router.get("/", controllers.loteProveedorController.getAllLotesProveedores);

// Ruta para crear un nuevo lote proveedor
router.post("/", controllers.loteProveedorController.createLoteProveedor);

// Ruta para obtener un lote proveedor por su ID
//router.get("/:id", controllers.loteProveedorController.getLoteProveedorById);

// Ruta para actualizar un lote proveedor por su ID
router.put("/:id", controllers.loteProveedorController.updateLoteProveedor);

// Ruta para eliminar un lote proveedor por su ID
router.delete("/:id", controllers.loteProveedorController.deleteLoteProveedor);

// Obtener todos los lotes de proveedores
router.get("/lotesproveedores", async (req, res) => {
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
  try {
    const nuevoLoteProveedor = await LoteProveedor.create(req.body);
    res.json(nuevoLoteProveedor);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el lote de proveedor."
    });
  }
});

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
});

module.exports = router;