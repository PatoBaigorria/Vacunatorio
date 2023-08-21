const {
  Depositoprovincial,
  Loteinterno
} = require("../models/relaciones");

// Obtener todos los depósitos provinciales
const getAllDepositosProvinciales = async (req, res) => {
  try {
    const depositosProvinciales = await Depositoprovincial.findAll();
    res.json(depositosProvinciales);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los depósitos provinciales." });
  }
};

// Crear un nuevo depósito provincial
const createDepositoProvincial = async (req, res) => {
  try {
    const nuevoDepositoProvincial = await Depositoprovincial.create(req.body);
    res.json(nuevoDepositoProvincial);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el depósito provincial." });
  }
};

// Actualizar un depósito provincial por su ID
const updateDepositoProvincial = async (req, res) => {
  try {
    const depositoProvincialActualizado = await Depositoprovincial.update(
      req.body,
      {
        where: { id: req.params.id },
      }
    );
    res.json(depositoProvincialActualizado);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el depósito provincial." });
  }
};

// Eliminar un depósito provincial por su ID
const deleteDepositoProvincial = async (req, res) => {
  try {
    await Depositoprovincial.destroy({ where: { id: req.params.id } });
    res.json({ message: "Depósito provincial eliminado correctamente." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el depósito provincial." });
  }
};

// Obtener los lotes internos asociados a un depósito provincial por su ID
const getLotesInternosByDepositoProvincialId = async (req, res) => {
  try {
    const depositoProvincial = await Depositoprovincial.findByPk(
      req.params.id,
      {
        include: [Loteinterno],
      }
    );

    if (!depositoProvincial) {
      return res
        .status(404)
        .json({ message: "Depósito provincial no encontrado." });
    }

    res.json(depositoProvincial.lotesinternos);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los lotes internos del depósito provincial.",
    });
  }
};
module.exports = {
  getAllDepositosProvinciales,
  createDepositoProvincial,
  updateDepositoProvincial,
  deleteDepositoProvincial,
  getLotesInternosByDepositoProvincialId,
};
