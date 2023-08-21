const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");
const {
  CentroDeVacunacion,
  LoteInterno
} = require("../models/relaciones");

// Ruta para obtener todos los centros de vacunación
router.get(
  "/",
  controllers.centroDeVacunacionController.getAllCentrosDeVacunacion
);

// Ruta para crear un nuevo centro de vacunación
router.post(
  "/",
  controllers.centroDeVacunacionController.createCentroDeVacunacion
);

// Ruta para obtener un centro de vacunación por su ID
/*router.get(
  "/:id",
  controllers.centroDeVacunacionController.getCentroDeVacunacionById
);*/

// Ruta para actualizar un centro de vacunación por su ID
router.put(
  "/:id",
  controllers.centroDeVacunacionController.updateCentroDeVacunacion
);

// Ruta para eliminar un centro de vacunación por su ID
router.delete(
  "/:id",
  controllers.centroDeVacunacionController.deleteCentroDeVacunacion
);

// Obtener todos los centros de vacunación
router.get("/centrosdevacunacion", async (req, res) => {
  try {
    const centrosDeVacunacion = await CentroDeVacunacion.findAll();
    res.json(centrosDeVacunacion);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener los centros de vacunación."
      });
  }
});

// Crear un nuevo centro de vacunación
router.post("/centrosdevacunacion", async (req, res) => {
  try {
    const nuevoCentroDeVacunacion = await CentroDeVacunacion.create(req.body);
    res.json(nuevoCentroDeVacunacion);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al crear el centro de vacunación."
      });
  }
});

// Actualizar un centro de vacunación por su ID
router.put("/centrosdevacunacion/:id", async (req, res) => {
  try {
    const centroDeVacunacionActualizado = await CentroDeVacunacion.update(
      req.body, {
        where: {
          id: req.params.id
        },
      }
    );
    res.json(centroDeVacunacionActualizado);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al actualizar el centro de vacunación."
      });
  }
});

// Eliminar un centro de vacunación por su ID
router.delete("/centrosdevacunacion/:id", async (req, res) => {
  try {
    await CentroDeVacunacion.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json({
      message: "Centro de vacunación eliminado correctamente."
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al eliminar el centro de vacunación."
      });
  }
});

// Obtener los lotes internos asociados a un centro de vacunación por su ID
router.get("/centrosdevacunacion/:id/lotesinternos", async (req, res) => {
  try {
    const centroDeVacunacion = await CentroDeVacunacion.findByPk(
      req.params.id, {
        include: [LoteInterno],
      }
    );

    if (!centroDeVacunacion) {
      return res
        .status(404)
        .json({
          message: "Centro de vacunación no encontrado."
        });
    }

    res.json(centroDeVacunacion.lotesinternos);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los lotes internos del centro de vacunación.",
    });
  }
});

module.exports = router;