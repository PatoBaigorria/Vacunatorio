const {
  DepositoProvincial
} = require("../models/relaciones");

// Obtener todos los depósitos provinciales
const listarDepositosProvinciales = async (req, res) => {
  try {
    let depositosProv = await DepositoProvincial.findAll();
    res.render("depositoprovincial/viewDepositoProvincial", { depositosProv: depositosProv });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los depósitos provinciales." });
  }
};

// Muestra formulario de creacion de Deposito Provincial
const mostrarFormularioCreacionDepProv = async (req, res) => {
  try {
    res.render("depositoprovincial/formDepositoProvincial");
  } catch (error) {
    res.status(500).json({
      message: "Error al crear un Deposito Provincial.",
    });
  }
}
// Crear un nuevo Deposito Provincial desde el Formulario
const crearDepProvDesdeFormulario = async (req, res) => {
  try {
    const { longitud, latitud } =
      req.body;

    // Crear una nueva instancia de Deposito Provincial utilizando Sequelize
    const nuevoDepProv = await DepositoProvincial.create({
      longitud,
      latitud,
    });

    console.log("Deposito Provincial creado:", nuevoDepProv);
    res.redirect("/depositosprovinciales");
  } catch (error) {
    console.error("Error al insertar datos:", error);
    res.status(500).send("Error al insertar datos en el Deposito Provincial");
  }
};
// Editar Deposito Provincial por ID
const editarDepProv = async (req, res) => {
  try {
    const depositoP = await DepositoProvincial.findByPk(req.params.id);
    res.render("depositoprovincial/editDepositoProvincial", { depositoP: depositoP });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el Deposito Provincial." + error.message,
    });
  }
}

// Actualizar un Depósito Provincial por su ID
const updateDepositoProvincial = async (req, res) => {
  try {
    await DepositoProvincial.update(req.body,
      {
        where: { idDepositoProvincial: req.params.id, },
      }
    );
    res.redirect("/depositosprovinciales");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el depósito provincial." });
  }
};

// Eliminar un depósito provincial por su ID
const deleteDepositoProvincial = async (req, res) => {
  try {
    await DepositoProvincial.destroy({
      where: {
        idDepositoProvincial: req.params.id,
      },
    });
    res.redirect("/depositosprovinciales");
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al eliminar el depósito provincial."
      });
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
  listarDepositosProvinciales,
  mostrarFormularioCreacionDepProv,
  crearDepProvDesdeFormulario,
  editarDepProv,
  updateDepositoProvincial,
  deleteDepositoProvincial,
  getLotesInternosByDepositoProvincialId,
};
