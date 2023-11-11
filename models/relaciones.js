/*const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("vacunatorio2", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
*/

const sequelize = require("../database/db");
const AgenteDeSalud = require("./agentedesalud");
const Aplicacion = require("./aplicacion");
const CentroDeVacunacion = require("./centrodevacunacion");
const DepositoNacional = require("./depositonacional");
const DepositoProvincial = require("./depositoprovincial");
const Descarte = require("./descarte");
const Laboratorio = require("./laboratorio");
const LoteInterno = require("./loteinterno");
const LoteProveedor = require("./loteproveedor");
const PatologiaBase = require("./patologiabase");
const Persona = require("./persona");
const Telefono = require("./telefono");
const Traslado = require("./traslado");

// Relaciones entre los modelos
Laboratorio.hasMany(LoteProveedor, {
  foreignKey: 'idLaboratorio'
});

LoteProveedor.belongsTo(Laboratorio, {
  foreignKey: 'idLaboratorio'
});

LoteProveedor.hasMany(LoteInterno, {
  foreignKey: 'idLaboratorio'
});

LoteInterno.belongsTo(LoteProveedor, {
  foreignKey: 'numeroDeLote'
});

LoteInterno.belongsTo(LoteProveedor, {
  foreignKey: 'idLaboratorio'
});

DepositoNacional.hasMany(LoteInterno, {
  foreignKey: 'idDepositoNacional'
});

DepositoProvincial.hasMany(LoteInterno, {
  foreignKey: 'idDepositoProvincial'
});

CentroDeVacunacion.hasMany(LoteInterno, {
  foreignKey: 'idCentroDeVacunacion',
});

LoteInterno.belongsTo(DepositoNacional, {
  foreignKey: 'idDepositoNacional',
});

LoteInterno.belongsTo(DepositoProvincial, {
  foreignKey: 'idDepositoProvincial',
});

LoteInterno.belongsTo(CentroDeVacunacion, {
  foreignKey: 'idCentroDeVacunacion',
});

LoteInterno.belongsToMany(CentroDeVacunacion, {
  through: Traslado,
  foreignKey: 'numeroDeSerie'
});

CentroDeVacunacion.belongsToMany(LoteInterno, {
  through: Traslado,
  foreignKey: 'idCentroDeVacunacion'
});

Persona.hasOne(Telefono, {
  foreignKey: 'DNI'
});

Persona.hasMany(PatologiaBase, {
  foreignKey: 'DNI'
});

Telefono.belongsTo(Persona, {
  foreignKey: 'DNI'
});

PatologiaBase.belongsTo(Persona, {
  foreignKey: 'DNI'
});

Persona.hasOne(AgenteDeSalud, {
  foreignKey: 'DNI',
});

AgenteDeSalud.belongsTo(Persona, {
  foreignKey: 'DNI',
});

Persona.hasMany(Aplicacion, {
  foreignKey: 'DNIPaciente'
});

AgenteDeSalud.hasMany(Aplicacion, {
  foreignKey: 'DNIAgente'
});

LoteInterno.hasMany(Aplicacion, {
  foreignKey: 'numeroDeSerie',
});

Aplicacion.belongsTo(Persona, {
  foreignKey: 'DNIPaciente'
});

Aplicacion.belongsTo(AgenteDeSalud, {
  foreignKey: 'DNIAgente'
});

Aplicacion.belongsTo(LoteInterno, {
  foreignKey: 'numeroDeSerie'
});

LoteInterno.hasMany(Descarte, {
  foreignKey: 'numeroDeSerie'
});

AgenteDeSalud.hasMany(Descarte, {
  foreignKey: 'DNIAgente'
});

/*Descarte.hasMany(LoteInterno, {
  foreignKey: 'numeroDeSerie'
});

Descarte.belongsTo(AgenteDeSalud, {
  foreignKey: 'DNIAgente'
});*/

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
  AgenteDeSalud,
  Aplicacion,
  CentroDeVacunacion,
  DepositoNacional,
  DepositoProvincial,
  Descarte,
  Laboratorio,
  LoteInterno,
  LoteProveedor,
  PatologiaBase,
  Persona,
  Telefono,
  Traslado,
};
