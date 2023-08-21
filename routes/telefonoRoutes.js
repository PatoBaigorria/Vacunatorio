const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");
const {
  Telefono,
  Persona
} = require("../models/relaciones");

// Ruta para obtener todos los teléfonos
router.get("/", controllers.telefonoController.getAllTelefonos);

// Ruta para crear un nuevo teléfono
router.post("/", controllers.telefonoController.createTelefono);

// Ruta para obtener un teléfono por su ID
//router.get("/:id", controllers.telefonoController.getTelefonoById);

// Ruta para actualizar un teléfono por su ID
router.put("/:id", controllers.telefonoController.updateTelefono);

// Ruta para eliminar un teléfono por su ID
router.delete("/:id", controllers.telefonoController.deleteTelefono);

// Obtener todos los teléfonos
router.get("/telefonos", async (req, res) => {
  try {
    const telefonos = await Telefono.findAll();
    res.json(telefonos);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los teléfonos."
    });
  }
});

// Crear un nuevo teléfono
router.post("/telefonos", async (req, res) => {
  try {
    const nuevoTelefono = await Telefono.create(req.body);
    res.json(nuevoTelefono);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el teléfono."
    });
  }
});

// Actualizar un teléfono por su ID
router.put("/telefonos/:id", async (req, res) => {
  try {
    const telefonoActualizado = await Telefono.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    res.json(telefonoActualizado);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el teléfono."
    });
  }
});

// Eliminar un teléfono por su ID
router.delete("/telefonos/:id", async (req, res) => {
  try {
    await Telefono.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json({
      message: "Teléfono eliminado correctamente."
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el teléfono."
    });
  }
});

// Obtener la persona asociada a un teléfono por su ID
router.get("/telefonos/:id/persona", async (req, res) => {
  try {
    const telefono = await Telefono.findByPk(req.params.id, {
      include: [Persona],
    });

    if (!telefono) {
      return res.status(404).json({
        message: "Teléfono no encontrado."
      });
    }

    res.json(telefono.persona);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener la persona asociada al teléfono."
      });
  }
});

module.exports = router;