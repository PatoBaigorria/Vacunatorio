const {
  LoteProveedor,
  Laboratorio,
} = require("../models/relaciones");

// Obtener todos los lotes proveedores
const getAllLotesProveedores = async (req, res) => {
  try {
    const lotesProveedores = await LoteProveedor.findAll();
    const laboratorios = await Laboratorio.findAll();
    res.render("loteproveedor/viewLoteProveedor", { lotesProveedores: lotesProveedores, laboratorios: laboratorios });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los lotes proveedores."
    });
  }
};

const crearLoteProveedor = async (req, res) => {
  try {
    const laboratorios = await Laboratorio.findAll();
    res.render("loteproveedor/formLoteProveedor", { laboratorios: laboratorios });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el lote proveedor.",
    });
  }
};

// Crear un nuevo lote proveedor
const createLoteProveedor = async (req, res) => {
  try {
    const { numeroDeLote, idLaboratorio, tipoDeVacuna, nombreComercial, cantidadDeLotesInternos, fechaDeFabricacion, fechaDeVencimiento, fechaDeCompra } = req.body;
    await LoteProveedor.create({
      numeroDeLote,
      idLaboratorio,
      tipoDeVacuna,
      nombreComercial,
      cantidadDeLotesInternos,
      fechaDeFabricacion,
      fechaDeVencimiento,
      fechaDeCompra
    });
    res.redirect("/lotesproveedores");
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el lote de proveedor."
    });
  }
};

const getLoteProveedorById = async (req, res) => {
  try {
    const loteProveedor = await LoteProveedor.findByPk(req.params.numeroDeLote, req.params.idLaboratorio);
    res.render("lotesproveedores/editLoteProveedor", { loteProveedor: loteProveedor });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el lote proveedor.",
    });
  }
};

// Actualizar un lote proveedor por su ID
const updateLoteProveedor = async (req, res) => {
  try {
    await LoteProveedor.update(req.body, {
      where: {
        numeroDeLote: req.params.numeroDeLote,
        idLaboratorio: req.params.id
      },
    });
    res.redirect("/lotesproveedores");
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el lote proveedor."
    });
  }
};

// Eliminar un lote proveedor por su ID
const deleteLoteProveedor = async (req, res) => {
  try {
    await LoteProveedor.destroy({
      where: {
        numeroDeLote: req.params.numeroDeLote,
        idLaboratorio: req.params.idLaboratorio
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

/*
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
};*/

module.exports = {
  getAllLotesProveedores,
  createLoteProveedor,
  crearLoteProveedor,
  updateLoteProveedor,
  deleteLoteProveedor,
  getLoteProveedorById
};