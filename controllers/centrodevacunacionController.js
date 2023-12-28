const { CentroDeVacunacion } = require("../models/relaciones");

// Obtener todos los centros de vacunación
const listarCentrosDeVacunacion = async (req, res) => {
  try {
    let centrosVac = await CentroDeVacunacion.findAll({
      raw: true
    });
    res.render("centrodevacunacion/viewCentroDeVacunacion", { centrosVac: centrosVac });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los Centros De Vacunacion." });
  }
};

// Muestra formulario de creacion de Centro de Vacunacion
const altaCentroVac = async (req, res) => {
  try {
    res.render("centrodevacunacion/formCentroDeVacunacion");
  } catch (error) {
    res.status(500).json({
      message: "Error al crear un Centro De Vacunacion.",
    });
  }
}
// Crear un nuevo Centro De Vacunacion desde el Formulario
const createCentroVac = async (req, res) => {
  try {
    const { longitud, latitud } = req.body;

    // Crear una nueva instancia de Centro De Vacunacion utilizando Sequelize
    await CentroDeVacunacion.create({
      longitud,
      latitud,
    });
    req.flash("success", "Centro de Vacunación creado exitosamente");
    res.redirect("/centrosdevacunacion");
  } catch (error) {
    console.error("Error al insertar datos:", error);
    res.status(500).send("Error al insertar datos en el Centro de Vacunacion");
  }
};
// Editar Centro de Vacunacion por ID
const editarCentroVac = async (req, res) => {
  try {
    const centroV = await CentroDeVacunacion.findByPk(req.params.id);
    res.render("centrodevacunacion/editCentroDeVacunacion", { centroV: centroV });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el Centro De Vacunacion." + error.message,
    });
  }
}

// Actualizar un Centro de Vacunacion por su ID
const updateCentroDeVacunacion = async (req, res) => {
  try {
    await CentroDeVacunacion.update(req.body,
      {
        where: { idCentroDeVacunacion: req.params.id, },
      }
    );
    req.flash('success', 'Centro de Vacunación actualizado exitosamente.');
    res.redirect("/centrosdevacunacion");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el centro de vacunacion." });
  }
};

// Eliminar un Centro de Vacunacion por su ID
const deleteCentroDeVacunacion = async (req, res) => {
  try {
    await CentroDeVacunacion.destroy({
      where: 
      {
        idCentroDeVacunacion: req.params.id,
      },
    });
    req.flash('success', 'Centro de Vacunación eliminado exitosamente.');
    res.json({success: true});
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al eliminar el centro de vacunacion."
      });
  }
};

module.exports = {
  listarCentrosDeVacunacion,
  altaCentroVac,
  createCentroVac,
  editarCentroVac,
  updateCentroDeVacunacion,
  deleteCentroDeVacunacion,
};