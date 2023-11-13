const {
  Traslado,
  LoteInterno,
  CentroDeVacunacion
} = require("../models/relaciones");

// Obtener todos los traslados
const listarTraslados = async (req, res) => {
  try {
    const traslados = await Traslado.findAll();
    const lotesInternos = await LoteInterno.findAll();
    const centrosDeVacunacion = await CentroDeVacunacion.findAll();
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
const mostrarFormularioCreacionTraslado = async (req, res) => {
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
// Crear un nuevo Traslado desde el Formulario
const crearTrasladosDesdeFormulario = async (req, res) => {
  try {
    const { numeroDeSerie, idCentroDeVacunacion, fechaDeSalida, fechaDeLlegada } = req.body;
    await Traslado.create({
      numeroDeSerie, 
      idCentroDeVacunacion, 
      fechaDeSalida, 
      fechaDeLlegada
    });

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
    res.redirect("/traslados");
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el traslado." + error.message
    });
  }
};
/*
// Obtener el lote interno asociado a un traslado por su ID
const getLoteInternoByTrasladoId = async (req, res) => {
  try {
    const traslado = await Traslado.findByPk(req.params.id, {
      include: [Loteinterno],
    });

    if (!traslado) {
      return res.status(404).json({
        message: "Traslado no encontrado."
      });
    }

    res.json(traslado.loteinterno);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el lote interno asociado al traslado.",
    });
  }
};

// Obtener el centro de vacunación asociado a un traslado por su ID
const getCentroDeVacunacionByTrasladoId = async (req, res) => {
  try {
    const traslado = await Traslado.findByPk(req.params.id, {
      include: [Centrodevacunacion],
    });

    if (!traslado) {
      return res.status(404).json({
        message: "Traslado no encontrado."
      });
    }

    res.json(traslado.centrodevacunacion);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el centro de vacunación asociado al traslado.",
    });
  }
};*/
module.exports = {
  listarTraslados,
  mostrarFormularioCreacionTraslado,
  crearTrasladosDesdeFormulario,
  editarTraslado,
  updateTraslado,
  deleteTraslado,
};