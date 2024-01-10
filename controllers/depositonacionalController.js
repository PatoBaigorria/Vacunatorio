const { DepositoNacional } = require("../models/relaciones");

// Obtener todos los depósitos nacionales
const listarDepositosNacionales = async (req, res) => {
  try {
    let depositosNac = await DepositoNacional.findAll({
      raw: true,
    });
    res.render("depositonacional/viewDepositoNacional", {
      depositosNac: depositosNac,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los depósitos nacionales." });
  }
};

// Muestra formulario de creacion de Deposito Nacional
const formDepNac = async (req, res) => {
  try {
    res.render("depositonacional/formDepositoNacional");
  } catch (error) {
    res.status(500).json({
      message: "Error al crear un Deposito Nacional.",
    });
  }
};
// Crear un nuevo Deposito Nacional desde el Formulario
const createDepNac = async (req, res) => {
  try {
    const { longitud, latitud } = req.body;

    // Crear una nueva instancia de Deposito Provincial utilizando Sequelize
    await DepositoNacional.create({
      longitud,
      latitud,
      activo: 1,
    });
    req.flash("success", "Depósito Nacional creado exitosamente");
    res.redirect("/depositosnacionales");
  } catch (error) {
    console.error("Error al insertar datos:", error);
    res.status(500).send("Error al insertar datos en el Deposito Nacional");
  }
};
// Editar Deposito Nacional por ID
const editDepNac = async (req, res) => {
  try {
    const depositoN = await DepositoNacional.findByPk(req.params.id);
    res.render("depositonacional/editDepositoNacional", {
      depositoN: depositoN,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el Deposito Nacional." + error.message,
    });
  }
};

// Actualizar un Depósito Nacional por su ID
const updateDepositoNacional = async (req, res) => {
  try {
    await DepositoNacional.update(req.body, {
      where: { idDepositoNacional: req.params.id },
    });
    req.flash("success", "Depósito Nacional actualizado exitosamente.");
    res.redirect("/depositosnacionales");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el depósito nacional." });
  }
};

// Eliminar un depósito provincial por su ID
const deleteDepositoNacional = async (req, res) => {
  try {
    await DepositoNacional.destroy({
      where: {
        idDepositoNacional: req.params.id,
      },
    });
    req.flash("success", "Depósito nacional eliminado exitosamente.");
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el depósito nacional.",
    });
  }
};

const bajaDepositoNacional = async (req, res) => {
  try {
    await DepositoNacional.update(
      { activo: 0 },
      {
        where: {
          idDepositoNacional: req.params.id,
        },
      }
    );
    req.flash("success", "Depósito nacional dado de baja exitosamente.");
    res.json({ success: true });
  } catch (error) {
    console.error("Error al dar de baja el depósito nacional:", error);
    req.flash("error", "Error al dar de baja el depósito nacional.");
    res.status(500).json({ success: false, message: error.message });
  }
};

const altaDepositoNacional = async (req, res) => {
  try {
    await DepositoNacional.update(
      { activo: 1 },
      {
        where: {
          idDepositoNacional: req.params.id,
        },
      }
    );
    req.flash("success", "Depósito nacional dado de alta exitosamente.");
    res.json({ success: true });
  } catch (error) {
    console.error("Error al dar de alta el depósito nacional:", error);
    req.flash("error", "Error al dar de alta el depósito nacional.");
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  listarDepositosNacionales,
  formDepNac,
  createDepNac,
  editDepNac,
  updateDepositoNacional,
  deleteDepositoNacional,
  bajaDepositoNacional,
  altaDepositoNacional,
};
