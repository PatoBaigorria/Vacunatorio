const {
  Loteproveedor,
  Laboratorio,
  Loteinterno
} = require("../models/relaciones");

// Obtener todos los lotes proveedores
const getAllLotesProveedores = async (req, res) => {
  try {
    const lotesProveedores = await Loteproveedor.findAll();
    res.json(lotesProveedores);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener los lotes proveedores."
      });
  }
};

// Crear un nuevo lote proveedor
const createLoteProveedor = async (req, res) => {
  try {
    const nuevoLoteProveedor = await Loteproveedor.create(req.body);
    res.json(nuevoLoteProveedor);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el lote proveedor."
    });
  }
};

// Actualizar un lote proveedor por su ID
const updateLoteProveedor = async (req, res) => {
  try {
    const loteProveedorActualizado = await Loteproveedor.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    res.json(loteProveedorActualizado);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el lote proveedor."
    });
  }
};

// Eliminar un lote proveedor por su ID
const deleteLoteProveedor = async (req, res) => {
  try {
    await Loteproveedor.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json({
      message: "Lote proveedor eliminado correctamente."
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el lote proveedor."
    });
  }
};

// Obtener el laboratorio asociado a un lote proveedor por su ID
const getLaboratorioByLoteProveedorId = async (req, res) => {
  try {
    const loteProveedor = await Loteproveedor.findByPk(req.params.id, {
      include: [Laboratorio],
    });

    if (!loteProveedor) {
      return res.status(404).json({
        message: "Lote proveedor no encontrado."
      });
    }

    res.json(loteProveedor.laboratorio);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el laboratorio asociado al lote proveedor.",
    });
  }
};

// Obtener los lotes internos asociados a un lote proveedor por su ID
const getLotesInternosByLoteProveedorId = async (req, res) => {
  try {
    const loteProveedor = await Loteproveedor.findByPk(req.params.id, {
      include: [Loteinterno],
    });

    if (!loteProveedor) {
      return res.status(404).json({
        message: "Lote proveedor no encontrado."
      });
    }

    res.json(loteProveedor.loteinternos);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los lotes internos del lote proveedor.",
    });
  }
};
module.exports = {
  getAllLotesProveedores,
  createLoteProveedor,
  updateLoteProveedor,
  deleteLoteProveedor,
  getLaboratorioByLoteProveedorId,
  getLotesInternosByLoteProveedorId,
};