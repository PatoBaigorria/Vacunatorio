const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");
const {
  DepositoNacional,
  LoteInterno
} = require("../models/relaciones");

// Ruta para obtener todos los depósitos nacionales
router.get(
  "/",
  controllers.depositoNacionalController.getAllDepositosNacionales
);

// Ruta para crear un nuevo depósito nacional
router.post("/", controllers.depositoNacionalController.createDepositoNacional);

// Ruta para obtener un depósito nacional por su ID
/*router.get(
  "/:id",
  controllers.depositoNacionalController.getDepositoNacionalById
);*/

// Ruta para actualizar un depósito nacional por su ID
router.put(
  "/:id",
  controllers.depositoNacionalController.updateDepositoNacional
);

// Ruta para eliminar un depósito nacional por su ID
router.delete(
  "/:id",
  controllers.depositoNacionalController.deleteDepositoNacional
);

// Obtener todos los depósitos nacionales
router.get("/depositosnacionales", async (req, res) => {
  try {
    const depositosNacionales = await DepositoNacional.findAll();
    res.json(depositosNacionales);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener los depósitos nacionales."
      });
  }
});

// Crear un nuevo depósito nacional
router.post("/depositosnacionales", async (req, res) => {
  try {
    const nuevoDepositoNacional = await DepositoNacional.create(req.body);
    res.json(nuevoDepositoNacional);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el depósito nacional."
    });
  }
});

// Actualizar un depósito nacional por su ID
router.put("/depositosnacionales/:id", async (req, res) => {
  try {
    const depositoNacionalActualizado = await DepositoNacional.update(
      req.body, {
        where: {
          id: req.params.id
        },
      }
    );
    res.json(depositoNacionalActualizado);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al actualizar el depósito nacional."
      });
  }
});

// Eliminar un depósito nacional por su ID
router.delete("/depositosnacionales/:id", async (req, res) => {
  try {
    await DepositoNacional.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json({
      message: "Depósito nacional eliminado correctamente."
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al eliminar el depósito nacional."
      });
  }
});

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