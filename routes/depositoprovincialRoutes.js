const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");
const {
  DepositoProvincial,
  LoteInterno
} = require("../models/relaciones");

// Ruta para obtener todos los depósitos provinciales
router.get(
  "/",
  controllers.depositoProvincialController.getAllDepositosProvinciales
);

// Ruta para crear un nuevo depósito provincial
router.post(
  "/",
  controllers.depositoProvincialController.createDepositoProvincial
);

// Ruta para obtener un depósito provincial por su ID
/*router.get(
  "/:id",
  controllers.depositoProvincialController.getDepositoProvincialById
);*/

// Ruta para actualizar un depósito provincial por su ID
router.put(
  "/:id",
  controllers.depositoProvincialController.updateDepositoProvincial
);

// Ruta para eliminar un depósito provincial por su ID
router.delete(
  "/:id",
  controllers.depositoProvincialController.deleteDepositoProvincial
);

// Obtener todos los depósitos provinciales
router.get("/depositosprovinciales", async (req, res) => {
  try {
    const depositosProvinciales = await DepositoProvincial.findAll();
    res.json(depositosProvinciales);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener los depósitos provinciales."
      });
  }
});

// Crear un nuevo depósito provincial
router.post("/depositosprovinciales", async (req, res) => {
  try {
    const nuevoDepositoProvincial = await DepositoProvincial.create(req.body);
    res.json(nuevoDepositoProvincial);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el depósito provincial."
    });
  }
});

// Actualizar un depósito provincial por su ID
router.put("/depositosprovinciales/:id", async (req, res) => {
  try {
    const depositoProvincialActualizado = await DepositoProvincial.update(
      req.body, {
        where: {
          id: req.params.id
        },
      }
    );
    res.json(depositoProvincialActualizado);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al actualizar el depósito provincial."
      });
  }
});

// Eliminar un depósito provincial por su ID
router.delete("/depositosprovinciales/:id", async (req, res) => {
  try {
    await DepositoProvincial.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json({
      message: "Depósito provincial eliminado correctamente."
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al eliminar el depósito provincial."
      });
  }
});

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