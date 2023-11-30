const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");

//Importacion del Controlador
router.get("/", controllers.centroDeVacunacionController.listarCentrosDeVacunacion);
router.get("/alta", controllers.centroDeVacunacionController.altaCentroVac);
router.post("/", controllers.centroDeVacunacionController.createCentroVac);
router.get("/:id", controllers.centroDeVacunacionController.editarCentroVac);
router.put("/:id", controllers.centroDeVacunacionController.updateCentroDeVacunacion);
router.delete("/:id", controllers.centroDeVacunacionController.deleteCentroDeVacunacion);

/* Obtener los lotes internos asociados a un centro de vacunación por su ID
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
});*/

module.exports = router;