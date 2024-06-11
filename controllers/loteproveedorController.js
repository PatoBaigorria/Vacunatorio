const { LoteProveedor, Laboratorio } = require("../models/relaciones");
const { createRegistro } = require("./registroController");
// Obtener todos los lotes proveedores
const listarLotesProveedores = async (req, res) => {
  try {
    const lotesProveedores = await LoteProveedor.findAll({
      include: [{ model: Laboratorio, attributes: ["nombreLaboratorio"] }],
    });
	console.log(lotesProveedores)

    res.render("loteproveedor/viewLoteProveedor", {
      lotesProveedores: lotesProveedores,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los lotes proveedores.",
    });
  }
};

const formLoteProveedor = async (req, res) => {
  try {
    const laboratorios = await Laboratorio.findAll();
    res.render("loteproveedor/formLoteProveedor", {
      laboratorios: laboratorios,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el lote proveedor.",
    });
  }
};

// Crear un nuevo lote proveedor
const createLoteProveedor = async (req, res) => {
  try {
    const {
      idLaboratorio,
      tipoDeVacuna,
      nombreComercial,
      cantidadDeLotesInternos,
      fechaDeFabricacion,
      fechaDeVencimiento,
      fechaDeCompra,
    } = req.body;
    const lote = await LoteProveedor.create({
      idLaboratorio,
      tipoDeVacuna,
      nombreComercial,
      cantidadDeLotesInternos,
      fechaDeFabricacion,
      fechaDeVencimiento,
      fechaDeCompra,
      activo: 1,
    });
    await createRegistro(
      "Lote proveeedor",
      lote.dataValues.numeroDeLote,
      "Creacion"
    );
    await createRegistro(
      "Lote proveeedor",
      lote.dataValues.numeroDeLote,
      "Alta"
    );
    req.flash("success", "Lote Proveedor creado exitosamente.");
    res.redirect("/lotesproveedores");
  } catch (error) {
    req.flash("error", "Error al crear el lote proveedor. ", error.message);
    res.redirect("/lotesproveedores/alta");
  }
};

const editLoteProveedor = async (req, res) => {
  try {
    const loteProveedor = await LoteProveedor.findByPk(req.params.id);
    const laboratorios = await Laboratorio.findAll();
    res.render("loteproveedor/editLoteProveedor", {
      loteProveedor: loteProveedor,
      laboratorios: laboratorios,
    });
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
        numeroDeLote: req.params.id,
      },
    });
    await createRegistro("Lote proveedor", req.params.id, "Modificacion");
    req.flash("success", "Lote Proveedor actualizado exitosamente.");
    res.redirect("/lotesproveedores");
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el lote proveedor.",
    });
  }
};

// Eliminar un lote proveedor por su ID
const deleteLoteProveedor = async (req, res) => {
  try {
    await LoteProveedor.destroy({
      where: {
        numeroDeLote: req.params.id,
      },
    });
    req.flash("success", "Lote Proveedor eliminado exitosamente.");
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el lote proveedor." });
  }
};

const bajaLoteProveedor = async (req, res) => {
  try {
    await LoteProveedor.update(
      { activo: 0 },
      {
        where: {
          numeroDeLote: req.params.id,
        },
      }
    );
    await createRegistro("Lote proveedor", req.params.id, "Baja");
    req.flash("success", "Lote proveedor dado de baja exitosamente.");
    res.json({ success: true });
  } catch (error) {
    console.error("Error al dar de baja el lote proveedor:", error);
    req.flash("error", "Error al dar de baja el lote proveedor.");
    res.status(500).json({ success: false, message: error.message });
  }
};

const altaLoteProveedor = async (req, res) => {
  try {
    await LoteProveedor.update(
      { activo: 1 },
      {
        where: {
          numeroDeLote: req.params.id,
        },
      }
    );
    await createRegistro("Lote proveedor", req.params.id, "Alta");
    req.flash("success", "Lote proveedor dado de alta exitosamente.");
    res.json({ success: true });
  } catch (error) {
    console.error("Error al dar de alta el lote proveedor:", error);
    req.flash("error", "Error al dar de alta el lote proveedor.");
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  listarLotesProveedores,
  formLoteProveedor,
  createLoteProveedor,
  editLoteProveedor,
  updateLoteProveedor,
  deleteLoteProveedor,
  bajaLoteProveedor,
  altaLoteProveedor,
};
