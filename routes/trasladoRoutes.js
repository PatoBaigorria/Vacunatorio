const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");
const {
  Traslado,
  LoteInterno,
  CentroDeVacunacion
} = require("../models/relaciones");

// Ruta para obtener todos los traslados
router.get("/", controllers.trasladoController.getAllTraslados);

// Ruta para crear un nuevo traslado
router.post("/", controllers.trasladoController.createTraslado);

// Ruta para obtener un traslado por su ID
//router.get("/:id", controllers.trasladoController.getTrasladoById);

// Ruta para actualizar un traslado por su ID
router.put("/:id", controllers.trasladoController.updateTraslado);

// Ruta para eliminar un traslado por su ID
router.delete("/:id", controllers.trasladoController.deleteTraslado);

// Obtener todos los traslados
router.get("/traslados", async (req, res) => {
  try {
    const traslados = await Traslado.findAll();
    res.json(traslados);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los traslados."
    });
  }
});

// Crear un nuevo traslado
router.post("/traslados", async (req, res) => {
  try {
    const nuevoTraslado = await Traslado.create(req.body);
    res.json(nuevoTraslado);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el traslado."
    });
  }
});

// Obtener los lotes internos asociados a un traslado por su ID
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
});

module.exports = router;