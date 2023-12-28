const {
  LoteProveedor,
  Laboratorio,
} = require("../models/relaciones");

// Obtener todos los lotes proveedores
const listarLotesProveedores = async (req, res) => {
  try {
    const lotesProveedores = await LoteProveedor.findAll(
      { include: [{ model: Laboratorio, attributes: ['nombreLaboratorio', 'pais', 'email', 'telefono', 'longitud', 'latitud'] }] }
    );

    const successMessages = req.flash('success');
    const errorMessages = req.flash('error');
    
    res.render("loteproveedor/viewLoteProveedor", { 
      lotesProveedores: lotesProveedores, 
      messages: { 
        success: successMessages, 
        error: errorMessages
    }
   });
     
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los lotes proveedores."
    });
  }
};

const crearLoteProveedor = async (req, res) => {
  try {
    const laboratorios = await Laboratorio.findAll();
    res.render("loteproveedor/formLoteProveedor", { laboratorios: laboratorios });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el lote proveedor.",
    });
  }
};

// Crear un nuevo lote proveedor
const createLoteProveedor = async (req, res) => {
  try {
    const { numeroDeLote, idLaboratorio, tipoDeVacuna, nombreComercial, cantidadDeLotesInternos, fechaDeFabricacion, fechaDeVencimiento, fechaDeCompra } = req.body;
    await LoteProveedor.create({
      numeroDeLote,
      idLaboratorio,
      tipoDeVacuna,
      nombreComercial,
      cantidadDeLotesInternos,
      fechaDeFabricacion,
      fechaDeVencimiento,
      fechaDeCompra
    });
    req.flash('success', 'Lote Proveedor creado exitosamente.');
    res.redirect("/lotesproveedores");
  } catch (error) {
    req.flash('error', 'Error al crear el lote proveedor.');
    res.status(500).json({
      message: "Error al crear el lote de proveedor." + error.message
    });
  }
};

const editarLoteProveedor = async (req, res) => {
  try {
    const loteProveedor = await LoteProveedor.findByPk(req.params.id);
    const laboratorios = await Laboratorio.findAll();
    const vacunas = ['Tuberculosis', 'Meningitis-Neumonía', 'Difteria-Tétanos-Hepatitis B', 'Antipoliomelítica', 
    'Sarampión-Rubéola-Paperas', 'Rotavirus', 'Meningococo', 'Antigripal', 'Hepatitis A', 'Varicela', 'HPV']
    const nombComercial = ['BCG', 'Neumococo Conjugada', 'Quíntuple', 'IPV', 'Triple Viral', 'Triple Bacteriana Celular',
    'Triple Bacteriana Acelular', 'Influenzae b', 'Doble Bacteriana', 'Virus Papiloma Humano'] 
    res.render("loteproveedor/editLoteProveedor", { loteProveedor: loteProveedor, laboratorios: laboratorios, vacunas: vacunas, nombComercial: nombComercial });
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
        numeroDeLote: req.params.id
      },
    });
    req.flash('success', 'Lote Proveedor actualizado exitosamente.');
    res.redirect("/lotesproveedores");
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el lote proveedor."
    });
  }
};

// Eliminar un lote proveedor por su ID
const deleteLoteProveedor = async (req, res) => {
  try {
    await LoteProveedor.destroy({
      where: {
        numeroDeLote: req.params.id,
      }
    });
    req.flash('success', 'Lote Proveedor eliminado exitosamente.');
    res.json({success:true});
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el lote proveedor." });
  }
};

module.exports = {
  listarLotesProveedores,
  createLoteProveedor,
  crearLoteProveedor,
  updateLoteProveedor,
  deleteLoteProveedor,
  editarLoteProveedor
};