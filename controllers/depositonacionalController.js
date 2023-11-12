const { DepositoNacional } = require("../models/relaciones");

// Obtener todos los depósitos nacionales
const listarDepositosNacionales = async (req, res) => {
  try {
    let depositosNac = await DepositoNacional.findAll();
    res.render("depositonacional/viewDepositoNacional", { depositosNac: depositosNac });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los depósitos nacionales." });
  }
};

// Muestra formulario de creacion de Deposito Nacional
const mostrarFormularioCreacionDepNac = async (req, res) => {
  try {
    res.render("depositonacional/formDepositoNacional");
  } catch (error) {
    res.status(500).json({
      message: "Error al crear un Deposito Nacional.",
    });
  }
}
// Crear un nuevo Deposito Nacional desde el Formulario
const crearDepNacDesdeFormulario = async (req, res) => {
  try {
    const { longitud, latitud } =
      req.body;

    // Crear una nueva instancia de Deposito Provincial utilizando Sequelize
    const nuevoDepNac = await DepositoNacional.create({
      longitud,
      latitud,
    });

    console.log("Deposito Nacionañ creado:", nuevoDepNac);
    res.redirect("/depositosnacionales");
  } catch (error) {
    console.error("Error al insertar datos:", error);
    res.status(500).send("Error al insertar datos en el Deposito Nacional");
  }
};
// Editar Deposito Nacional por ID
const editarDepNac = async (req, res) => {
  try {
    const depositoN = await DepositoNacional.findByPk(req.params.id);
    res.render("depositonacional/editDepositoNacional", { depositoN: depositoN });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el Deposito Nacional." + error.message,
    });
  }
}

// Actualizar un Depósito Nacional por su ID
const updateDepositoNacional = async (req, res) => {
  try {
    await DepositoNacional.update(req.body,
      {
        where: { idDepositoNacional: req.params.id, },
      }
    );
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
    res.redirect("/depositosnacionales");
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al eliminar el depósito nacional."
      });
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
  listarDepositosNacionales,
  mostrarFormularioCreacionDepNac,
  crearDepNacDesdeFormulario,
  editarDepNac,
  updateDepositoNacional,
  deleteDepositoNacional,
  getLotesInternosByDepositoNacionalId,
};
