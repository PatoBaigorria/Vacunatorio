const {
  Laboratorio,
  LoteProveedor,
  LoteInterno,
  DepositoNacional,
  DepositoProvincial,
  CentroDeVacunacion,
} = require("../models/relaciones");

// Obtener todos los lotes internos
const getAllLotesInternos = async (req, res) => {
  try {
    const lotesInternos = await LoteInterno.findAll();
    const lotesProveedores = await LoteProveedor.findAll();
    const laboratorios = await Laboratorio.findAll();
    const depositosNacionales = await DepositoNacional.findAll();
    const depositosProvinciales = await DepositoProvincial.findAll();
    const centrosDeVacunaciones = await CentroDeVacunacion.findAll();
    res.render("loteinterno/viewLoteInterno", {
      lotesInternos: lotesInternos,
      lotesProveedores: lotesProveedores,
      laboratorios: laboratorios,
      depositosNacionales: depositosNacionales,
      depositosProvinciales: depositosProvinciales,
      centrosDeVacunacions: centrosDeVacunaciones,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los lotes internos."
    });
  }
};

const crearLoteInterno = async (req, res) => {
  try {
    const lotesInternos = await LoteInterno.findAll();
    const lotesProveedores = await LoteProveedor.findAll();
    const laboratorios = await Laboratorio.findAll();
    const depositosNacionales = await DepositoNacional.findAll();
    const depositosProvinciales = await DepositoProvincial.findAll();
    const centrosDeVacunaciones = await CentroDeVacunacion.findAll();
    res.render("loteinterno/formLoteInterno", {
      lotesInternos: lotesInternos,
      lotesProveedores: lotesProveedores,
      laboratorios: laboratorios,
      depositosNacionales: depositosNacionales,
      depositosProvinciales: depositosProvinciales,
      centrosDeVacunaciones: centrosDeVacunaciones,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el lote interno."
    });
  }
};

// Crear un nuevo lote interno
const createLoteInterno = async (req, res) => {
  try {
    let { numeroDeSerie, numeroDeLote, idLaboratorio, cantidadDeVacunas, fechaDeLlegadaDepositoNacional, idDepositoNacional, fechaDeSalidaDepositoNacional, fechaDeLlegadaDepositoProvincial, idDepositoProvincial, fechaDeSalidaDepositoProvincial, fechaDeLlegadaCentroDeVacunacion, idCentroDeVacunacion } = req.body;
    if (idDepositoNacional == '') {
      idDepositoNacional = null;
    }
    if (idDepositoProvincial == '') {
      idDepositoProvincial = null;
    }
    if (idCentroDeVacunacion == '') {
      idCentroDeVacunacion = null;
    }
    if (fechaDeLlegadaDepositoNacional === '') {
      fechaDeLlegadaDepositoNacional = null;
    }
    if (fechaDeSalidaDepositoNacional === '') {
      fechaDeSalidaDepositoNacional = null;
    }
    if (fechaDeLlegadaDepositoProvincial === '') {
      fechaDeLlegadaDepositoProvincial = null;
    }
    if (fechaDeSalidaDepositoProvincial === '') {
      fechaDeSalidaDepositoProvincial = null;
    }
    if (fechaDeLlegadaCentroDeVacunacion === '') {
      fechaDeLlegadaCentroDeVacunacion = null;
    }
    await LoteInterno.create({
      numeroDeSerie,
      numeroDeLote,
      idLaboratorio,
      cantidadDeVacunas,
      fechaDeLlegadaDepositoNacional,
      idDepositoNacional,
      fechaDeSalidaDepositoNacional,
      fechaDeLlegadaDepositoProvincial,
      idDepositoProvincial,
      fechaDeSalidaDepositoProvincial,
      fechaDeLlegadaCentroDeVacunacion,
      idCentroDeVacunacion
    });
    res.redirect("/lotesinternos");
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el lote interno. " + error.message
    });
  }
};

const getLoteInternoById = async (req, res) => {
  try {
    const loteInterno = await LoteInterno.findByPk(req.params.id);
    const lotesProveedores = await LoteProveedor.findAll();
    const laboratorios = await Laboratorio.findAll();
    const depositosNacionales = await DepositoNacional.findAll();
    const depositosProvinciales = await DepositoProvincial.findAll();
    const centrosDeVacunaciones = await CentroDeVacunacion.findAll();
    res.render("loteinterno/editLoteInterno", {
      loteInterno: loteInterno,
      lotesProveedores: lotesProveedores,
      laboratorios: laboratorios,
      depositosNacionales: depositosNacionales,
      depositosProvinciales: depositosProvinciales,
      centrosDeVacunaciones: centrosDeVacunaciones,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el lote interno.",
    });
  }
};

// Actualizar un lote interno por su ID
const updateLoteInterno = async (req, res) => {
  try {
    let { numeroDeSerie, numeroDeLote, idLaboratorio, cantidadDeVacunas, fechaDeLlegadaDepositoNacional, idDepositoNacional, fechaDeSalidaDepositoNacional, fechaDeLlegadaDepositoProvincial, idDepositoProvincial, fechaDeSalidaDepositoProvincial, fechaDeLlegadaCentroDeVacunacion, idCentroDeVacunacion } = req.body;
    if (idDepositoNacional == '') {
      idDepositoNacional = null;
    }
    if (idDepositoProvincial == '') {
      idDepositoProvincial = null;
    }
    if (idCentroDeVacunacion == '') {
      idCentroDeVacunacion = null;
    }
    if (fechaDeLlegadaDepositoNacional === '') {
      fechaDeLlegadaDepositoNacional = null;
    }
    if (fechaDeSalidaDepositoNacional === '') {
      fechaDeSalidaDepositoNacional = null;
    }
    if (fechaDeLlegadaDepositoProvincial === '') {
      fechaDeLlegadaDepositoProvincial = null;
    }
    if (fechaDeSalidaDepositoProvincial === '') {
      fechaDeSalidaDepositoProvincial = null;
    }
    if (fechaDeLlegadaCentroDeVacunacion === '') {
      fechaDeLlegadaCentroDeVacunacion = null;
    }
    await LoteInterno.update({
      numeroDeSerie,
      numeroDeLote,
      idLaboratorio,
      cantidadDeVacunas,
      fechaDeLlegadaDepositoNacional,
      idDepositoNacional,
      fechaDeSalidaDepositoNacional,
      fechaDeLlegadaDepositoProvincial,
      idDepositoProvincial,
      fechaDeSalidaDepositoProvincial,
      fechaDeLlegadaCentroDeVacunacion,
      idCentroDeVacunacion
    }, {
      where: {
        numeroDeSerie: req.params.id
      },
    });
    res.redirect("/lotesinternos");
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el lote interno. " + error.message
    });
  }
};

// Eliminar un lote interno por su ID
const deleteLoteInterno = async (req, res) => {
  try {
    await LoteInterno.destroy({
      where: {
        numeroDeSerie: req.params.id
      },
    });
    res.redirect("/lotesinternos");
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el lote interno."
    });
  }
};

// Obtener el lote proveedor asociado a un lote interno por su número de serie
/*const getLoteProveedorByLoteInternoSerie = async (req, res) => {
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
};*/

module.exports = {
  getAllLotesInternos,
  crearLoteInterno,
  createLoteInterno,
  getLoteInternoById,
  updateLoteInterno,
  deleteLoteInterno,
};