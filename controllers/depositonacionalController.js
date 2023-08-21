const { Depositonacional, Loteinterno } = require("../models/relaciones");

// Obtener todos los depósitos nacionales
const getAllDepositosNacionales = async (req, res) => {
  try {
    const depositosNacionales = await Depositonacional.findAll();
    res.json(depositosNacionales);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los depósitos nacionales." });
  }
};

// Crear un nuevo depósito nacional
const createDepositoNacional = async (req, res) => {
  try {
    const nuevoDepositoNacional = await Depositonacional.create(req.body);
    res.json(nuevoDepositoNacional);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el depósito nacional." });
  }
};

// Actualizar un depósito nacional por su ID
const updateDepositoNacional = async (req, res) => {
  try {
    const depositoNacionalActualizado = await Depositonacional.update(
      req.body,
      {
        where: { id: req.params.id },
      }
    );
    res.json(depositoNacionalActualizado);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el depósito nacional." });
  }
};

// Eliminar un depósito nacional por su ID
const deleteDepositoNacional = async (req, res) => {
  try {
    await Depositonacional.destroy({ where: { id: req.params.id } });
    res.json({ message: "Depósito nacional eliminado correctamente." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el depósito nacional." });
  }
};

// Obtener los lotes internos asociados a un depósito nacional por su ID
const getLotesInternosByDepositoNacionalId = async (req, res) => {
  try {
    const depositoNacional = await Depositonacional.findByPk(req.params.id, {
      include: [Loteinterno],
    });

    if (!depositoNacional) {
      return res
        .status(404)
        .json({ message: "Depósito nacional no encontrado." });
    }

    res.json(depositoNacional.lotesinternos);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los lotes internos del depósito nacional.",
    });
  }
};
module.exports = {
  getAllDepositosNacionales,
  createDepositoNacional,
  updateDepositoNacional,
  deleteDepositoNacional,
  getLotesInternosByDepositoNacionalId,
};
