const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");


// Ruta para obtener todos los traslados
router.get("/", controllers.trasladoController.listarTraslados);
router.get("/crear", controllers.trasladoController.mostrarFormularioCreacionTraslado);
router.post("/", controllers.trasladoController.crearTrasladosDesdeFormulario);
router.get("/:id", controllers.trasladoController.editarTraslado);
router.put("/:id", controllers.trasladoController.updateTraslado);
router.delete("/:id", controllers.trasladoController.deleteTraslado);

// Ruta para obtener un traslado por su ID
//router.get("/:id", controllers.trasladoController.getTrasladoById);


// Obtener los lotes internos asociados a un traslado por su ID
/*
router.get("/traslados/:id/lotesinternos", async (req, res) => {
  try {
    const traslado = await Traslado.findByPk(req.params.id, {
      include: [LoteInterno],
    });

    if (!traslado) {
      return res.status(404).json({
        message: "Traslado no encontrado."
      });
    }

    res.json(traslado.lotesinternos);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener los lotes internos del traslado."
      });
  }
});

// Obtener los centros de vacunación asociados a un traslado por su ID
router.get("/traslados/:id/centrosdevacunacion", async (req, res) => {
  try {
    const traslado = await Traslado.findByPk(req.params.id, {
      include: [CentroDeVacunacion],
    });

    if (!traslado) {
      return res.status(404).json({
        message: "Traslado no encontrado."
      });
    }

    res.json(traslado.centrosdevacunacion);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los centros de vacunación del traslado.",
    });
  }
});*/

module.exports = router;