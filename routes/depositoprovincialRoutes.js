const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");

//Importacion del Controlador
router.get("/", controllers.depositoProvincialController.listarDepositosProvinciales);
router.get("/crear", controllers.depositoProvincialController.mostrarFormularioCreacionDepProv);
router.post("/", controllers.depositoProvincialController.crearDepProvDesdeFormulario);
router.get("/:id", controllers.depositoProvincialController.editarDepProv);
router.put("/:id", controllers.depositoProvincialController.updateDepositoProvincial);
router.delete("/:id", controllers.depositoProvincialController.deleteDepositoProvincial);
  
// Obtener los lotes internos asociados a un depósito provincial por su ID
router.get("/depositosprovinciales/:id/lotesinternos", async (req, res) => {
  try {
    const depositoProvincial = await DepositoProvincial.findByPk(
      req.params.id, {
        include: [LoteInterno],
      }
    );

    if (!depositoProvincial) {
      return res
        .status(404)
        .json({
          message: "Depósito provincial no encontrado."
        });
    }

    res.json(depositoProvincial.lotesinternos);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los lotes internos del depósito provincial.",
    });
  }
});

module.exports = router;