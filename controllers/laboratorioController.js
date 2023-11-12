const {
  Laboratorio,
} = require("../models/relaciones");

// Obtener todos los laboratorios
const getAllLaboratorios = async (req, res) => {
  try {
    let laboratorios = await Laboratorio.findAll();
    res.render("laboratorio/viewLaboratorio", { laboratorios: laboratorios });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los laboratorios.",
    });
  }
};

const crearLaboratorio = async (req, res) => {
  try {
    res.render("laboratorio/formLaboratorio");
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el laboratorio.",
    });
  }
}
// Crear un nuevo laboratorio
const createLaboratorio = async (req, res) => {
  try {
    const { nombreLaboratorio, pais, email, telefono, longitud, latitud } =
      req.body;

    // Crear una nueva instancia de Laboratorio utilizando Sequelize
    const nuevoLaboratorio = await Laboratorio.create({
      nombreLaboratorio,
      pais,
      email,
      telefono,
      longitud,
      latitud,
    });

    console.log("Laboratorio creado:", nuevoLaboratorio);
    res.redirect("/laboratorios");
  } catch (error) {
    console.error("Error al insertar datos:", error);
    res.status(500).send("Error al insertar datos en el laboratorio");
  }
};

const getLaboratorioById = async (req, res) => {
  try {
    const laboratorio = await Laboratorio.findByPk(req.params.id);
    res.render("laboratorio/editLaboratorio", { laboratorio: laboratorio });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el laboratorio.",
    });
  }
}

// Actualizar un laboratorio por su ID
const updateLaboratorio = async (req, res) => {
  try {
    await Laboratorio.update(req.body, {
      where: {
        idLaboratorio: req.params.id,
      },
    });
    console.log("Se actualizo!!!!");
    res.redirect("/laboratorios");
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el laboratorio. " + error.message,
    });
  }
};

// Eliminar un laboratorio por su ID
const deleteLaboratorio = async (req, res) => {
  try {
    await Laboratorio.destroy({
      where: {
        idLaboratorio: req.params.id,
      },
    });
    res.redirect("/laboratorios");
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el laboratorio.",
    });
  }
};

module.exports = {
  getAllLaboratorios,
  crearLaboratorio,
  createLaboratorio,
  getLaboratorioById,
  updateLaboratorio,
  deleteLaboratorio,
};
