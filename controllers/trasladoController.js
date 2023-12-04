const {
  Traslado,
  LoteInterno,
  CentroDeVacunacion
} = require("../models/relaciones");

// Obtener todos los traslados
const listarTraslados = async (req, res) => {
  try {
    const traslados = await Traslado.findAll({
      raw: true
    });
    const lotesInternos = await LoteInterno.findAll({
      raw: true
    });
    const centrosDeVacunacion = await CentroDeVacunacion.findAll({
      raw: true
    });
    res.render("traslado/viewTraslado", {
      traslados: traslados,
      lotesInternos: lotesInternos,
      centrosDeVacunacion: centrosDeVacunacion
    })
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los traslados."
    });
  }
};

// Muestra formulario de creacion de Traslado
const altaTraslado = async (req, res) => {
  try {
    const lotesInternos = await LoteInterno.findAll();
    const centrosDeVacunacion = await CentroDeVacunacion.findAll();
    res.render("traslado/formTraslado", {
      lotesInternos: lotesInternos,
      centrosDeVacunacion: centrosDeVacunacion,
    });
    
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el traslado."
    });
  }
};

const createTraslados = async (req, res) => {
  try {
    const { numeroDeSerie, idCentroDeVacunacion, fechaDeSalida, fechaDeLlegada } = req.body;
    await Traslado.create({
      numeroDeSerie, 
      idCentroDeVacunacion, 
      fechaDeSalida, 
      fechaDeLlegada
    });
    req.flash("success", "Traslado creado exitosamente");
    res.redirect("/traslados");
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el traslado. " + error.message
    });
  }
};
// Editar Traslado por ID
const editarTraslado = async (req, res) => {
  try {
    const traslado = await Traslado.findByPk(req.params.id);
    const lotesInternos = await LoteInterno.findAll();
    const centrosDeVacunacion = await CentroDeVacunacion.findAll();
    res.render("traslado/editTraslado", { 
      traslado: traslado,
      lotesInternos: lotesInternos,
      centrosDeVacunacion: centrosDeVacunacion});
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el Traslado." + error.message,
    });
  }
}
// Actualizar un traslado por su ID
const updateTraslado = async (req, res) => {
  try {
    await Traslado.update(req.body, {
      where: {
        idTraslado: req.params.id
      },
    });
    res.redirect("/traslados");
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el traslado." + error.message
    });
  }
};

// Eliminar un traslado por su ID
const deleteTraslado = async (req, res) => {
  try {
    await Traslado.destroy({
      where: {
        idTraslado: req.params.id
      }
    });
    req.flash('success', 'Traslado eliminado exitosamente.');
    res.json({success:true});
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el traslado." + error.message
    });
  }
};

module.exports = {
  listarTraslados,
  altaTraslado,
  createTraslados,
  editarTraslado,
  updateTraslado,
  deleteTraslado,
};