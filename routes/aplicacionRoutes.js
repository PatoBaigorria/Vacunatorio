const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");
const {
  Aplicacion,
  Persona,
  AgenteDeSalud,
  LoteInterno,
} = require("../models/relaciones");
router.get("/", controllers.aplicacionController.listarAplicacion);
router.get("/alta", controllers.aplicacionController.crearAplicacion);
router.post("/", controllers.aplicacionController.createAplicacion);
router.get("/:id", controllers.aplicacionController.editarAplicacion);
router.put("/:id", controllers.aplicacionController.updateAplicacion);
router.delete("/:id", controllers.aplicacionController.deleteAplicacion);

/*Obtener la información completa de una aplicación por su ID
router.get("/aplicaciones/:id", async (req, res) => {
  try {
    const aplicacion = await Aplicacion.findByPk(req.params.id, {
      include: [Persona, AgenteDeSalud, LoteInterno],
    });

    if (!aplicacion) {
      return res.status(404).json({
        message: "Aplicación no encontrada."
      });
    }

    res.json(aplicacion);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener la información de la aplicación."
      });
  }
});*/

module.exports = router;