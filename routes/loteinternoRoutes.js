const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");

// Ruta para obtener todos los lotes internos
router.get("/", controllers.loteInternoController.getAllLotesInternos);
router.get("/crear", controllers.loteInternoController.crearLoteInterno);
router.post("/", controllers.loteInternoController.createLoteInterno);
router.get("/:id", controllers.loteInternoController.getLoteInternoById);
router.put("/:id", controllers.loteInternoController.updateLoteInterno);
router.delete("/:id", controllers.loteInternoController.deleteLoteInterno);

// Obtener todos los lotes internos
/*router.get("/lotesinternos", async (req, res) => {
  try {
    const lotesInternos = await LoteInterno.findAll();
    res.json(lotesInternos);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los lotes internos."
    });
  }
});

// Crear un nuevo lote interno
router.post("/lotesinternos", async (req, res) => {
  try {
    const nuevoLoteInterno = await LoteInterno.create(req.body);
    res.json(nuevoLoteInterno);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el lote interno."
    });
  }
});

// Actualizar un lote interno por su ID
router.put("/lotesinternos/:id", async (req, res) => {
  try {
    const loteInternoActualizado = await LoteInterno.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    res.json(loteInternoActualizado);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el lote interno."
    });
  }
});

// Eliminar un lote interno por su ID
router.delete("/lotesinternos/:id", async (req, res) => {
  try {
    await LoteInterno.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json({
      message: "Lote interno eliminado correctamente."
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el lote interno."
    });
  }
});*/

module.exports = router;