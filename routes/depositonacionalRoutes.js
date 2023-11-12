const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");

//Importacion del Controlador
router.get("/", controllers.depositoNacionalController.listarDepositosNacionales);
router.get("/crear", controllers.depositoNacionalController.mostrarFormularioCreacionDepNac);
router.post("/", controllers.depositoNacionalController.crearDepNacDesdeFormulario);
router.get("/:id", controllers.depositoNacionalController.editarDepNac);
router.put("/:id", controllers.depositoNacionalController.updateDepositoNacional);
router.delete("/:id", controllers.depositoNacionalController.deleteDepositoNacional);

// Obtener los lotes internos asociados a un depósito nacional por su ID
router.get("/depositosnacionales/:id/lotesinternos", async (req, res) => {
  try {
    const depositoNacional = await DepositoNacional.findByPk(req.params.id, {
      include: [LoteInterno],
    });

    if (!depositoNacional) {
      return res
        .status(404)
        .json({
          message: "Depósito nacional no encontrado."
        });
    }

    res.json(depositoNacional.lotesinternos);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los lotes internos del depósito nacional.",
    });
  }
});

module.exports = router;