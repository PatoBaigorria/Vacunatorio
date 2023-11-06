const {
  LoteInterno,
  LoteProveedor,
  CentroDeVacunacion,
  Aplicacion,
  Descarte,
} = require("../models/relaciones");

// Obtener todos los lotes internos
const getAllLotesInternos = async (req, res) => {
  try {
    const lotesInternos = await LoteInterno.findAll();
    res.json(lotesInternos);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los lotes internos."
    });
  }
};

// Crear un nuevo lote interno
const createLoteInterno = async (req, res) => {
  try {
    const nuevoLoteInterno = await LoteInterno.create(req.body);
    res.json(nuevoLoteInterno);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el lote interno."
    });
  }
};

// Actualizar un lote interno por su ID
const updateLoteInterno = async (req, res) => {
  try {
    const loteInternoActualizado = await LoteInterno.update(req.body, {
      where: {
        numeroDeSerie: req.params.numeroDeSerie
      },
    });
    res.json(loteInternoActualizado);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el lote interno."
    });
  }
};

// Eliminar un lote interno por su ID
const deleteLoteInterno = async (req, res) => {
  try {
    await LoteInterno.destroy({
      where: {
        numeroDeSerie: req.params.numeroDeSerie
      },
    });
    res.json({
      message: "Lote interno eliminado correctamente."
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el lote interno."
    });
  }
};

// Obtener el lote proveedor asociado a un lote interno por su número de serie
const getLoteProveedorByLoteInternoSerie = async (req, res) => {
  try {
    const loteInterno = await LoteInterno.findByPk(req.params.numeroDeSerie, {
      include: [LoteProveedor],
    });

    if (!loteInterno) {
      return res.status(404).json({
        message: "Lote interno no encontrado."
      });
    }

    res.json(loteInterno.loteproveedor);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el lote proveedor asociado al lote interno.",
    });
  }
};

// Obtener el centro de vacunación asociado a un lote interno por su número de serie
const getCentroDeVacunacionByLoteInternoSerie = async (req, res) => {
  try {
    const loteInterno = await LoteInterno.findByPk(req.params.numeroDeSerie, {
      include: [CentroDeVacunacion],
    });

    if (!loteInterno) {
      return res.status(404).json({
        message: "Lote interno no encontrado."
      });
    }

    res.json(loteInterno.centrodevacunacion);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el centro de vacunación asociado al lote interno.",
    });
  }
};

// Obtener las aplicaciones asociadas a un lote interno por su número de serie
const getAplicacionesByLoteInternoSerie = async (req, res) => {
  try {
    const loteInterno = await LoteInterno.findByPk(req.params.numeroDeSerie, {
      include: [Aplicacion],
    });

    if (!loteInterno) {
      return res.status(404).json({
        message: "Lote interno no encontrado."
      });
    }

    res.json(loteInterno.aplicacions);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las aplicaciones asociadas al lote interno.",
    });
  }
};

// Obtener los descartes asociados a un lote interno por su número de serie
const getDescartesByLoteInternoSerie = async (req, res) => {
  try {
    const loteInterno = await LoteInterno.findByPk(req.params.numeroDeSerie, {
      include: [Descarte],
    });

    if (!loteInterno) {
      return res.status(404).json({
        message: "Lote interno no encontrado."
      });
    }

    res.json(loteInterno.Descarte);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los descartes asociados al lote interno.",
    });
  }
};
module.exports = {
  getAllLotesInternos,
  createLoteInterno,
  updateLoteInterno,
  deleteLoteInterno,
  getLoteProveedorByLoteInternoSerie,
  getCentroDeVacunacionByLoteInternoSerie,
  getAplicacionesByLoteInternoSerie,
  getDescartesByLoteInternoSerie,
};