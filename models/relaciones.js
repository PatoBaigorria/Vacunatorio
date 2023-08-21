/*const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("vacunatorio2", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
*/

const sequelize = require("../database/db");
const Agentedesalud = require("./agentedesalud");
const Aplicacion = require("./aplicacion");
const Centrodevacunacion = require("./centrodevacunacion");
const Depositonacional = require("./depositonacional");
const Depositoprovincial = require("./depositoprovincial");
const Descarte = require("./descarte");
const Laboratorio = require("./laboratorio");
const Loteinterno = require("./loteinterno");
const Loteproveedor = require("./loteproveedor");
const Patologiabase = require("./patologiabase");
const Persona = require("./persona");
const Telefono = require("./telefono");
const Traslado = require("./traslado");

// Relaciones entre los modelos

Laboratorio.hasMany(Loteproveedor, {
  foreignKey: "idLaboratorio",
});

Loteproveedor.belongsTo(Laboratorio, {
  foreignKey: "idLaboratorio",
});

Loteproveedor.hasMany(Loteinterno, {
  foreignKey: "numeroDeLote",
});
Loteinterno.belongsTo(Loteproveedor, {
  foreignKey: "numeroDeLote",
});

Loteproveedor.hasMany(Loteinterno, {
  foreignKey: "idLaboratorio",
});
Loteinterno.belongsTo(Loteproveedor, {
  foreignKey: "idLaboratorio",
});

Depositonacional.hasMany(Loteinterno, {
  foreignKey: "idDepositoNacional",
});

Depositoprovincial.hasMany(Loteinterno, {
  foreignKey: "idDepositoProvincial",
});

Centrodevacunacion.hasMany(Loteinterno, {
  foreignKey: "idCentroDeVacunacion",
});

Loteinterno.belongsTo(Depositonacional, {
  foreignKey: "idDepositoNacional",
});

Loteinterno.belongsTo(Depositoprovincial, {
  foreignKey: "idDepositoProvincial",
});

Loteinterno.belongsTo(Centrodevacunacion, {
  foreignKey: "idCentroDeVacunacion",
});

Loteinterno.belongsToMany(Centrodevacunacion, {
  through: Traslado,
  foreignKey: "numeroDeSerie",
});

Centrodevacunacion.belongsToMany(Loteinterno, {
  through: Traslado,
  foreignKey: "idCentroDeVacunacion",
});

Persona.hasMany(Telefono, {
  foreignKey: "DNI",
});

Persona.hasMany(Patologiabase, {
  foreignKey: "DNI",
});

Telefono.belongsTo(Persona, {
  foreignKey: "DNI",
});

Patologiabase.belongsTo(Persona, {
  foreignKey: "DNI",
});

Persona.hasOne(Agentedesalud, {
  foreignKey: "DNI",
});

Agentedesalud.belongsTo(Persona, {
  foreignKey: "DNI",
});

Persona.hasMany(Aplicacion, {
  foreignKey: "DNIPaciente",
});

Agentedesalud.hasMany(Aplicacion, {
  foreignKey: "DNIAgente",
});

Loteinterno.hasMany(Aplicacion, {
  foreignKey: "numeroDeSerie",
});

Aplicacion.belongsTo(Persona, {
  foreignKey: "DNIPaciente",
});

Aplicacion.belongsTo(Agentedesalud, {
  foreignKey: "DNIAgente",
});

Aplicacion.belongsTo(Loteinterno, {
  foreignKey: "numeroDeSerie",
});

Loteinterno.hasMany(Descarte, {
  foreignKey: "numeroDeSerie",
});

Agentedesalud.hasMany(Descarte, {
  foreignKey: "DNIAgente",
});

Descarte.hasMany(Loteinterno, {
  foreignKey: "numeroDeSerie",
});

Descarte.belongsTo(Agentedesalud, {
  foreignKey: "DNIAgente",
});

async function sincronizarModelos() {
  try {
    await sequelize.sync({
      force: false,
    }); // La opción force: true creará las tablas borrando los datos existentes
    console.log("Modelos sincronizados con la base de datos.");
  } catch (error) {
    console.error(
      "Error al sincronizar los modelos con la base de datos:",
      error
    );
  }
}

// Llamar a la función para sincronizar los modelos al iniciar la aplicación
sincronizarModelos();

module.exports = {
  Agentedesalud,
  Aplicacion,
  Centrodevacunacion,
  Depositonacional,
  Depositoprovincial,
  Descarte,
  Laboratorio,
  Loteinterno,
  Loteproveedor,
  Patologiabase,
  Persona,
  Telefono,
  Traslado,
};
