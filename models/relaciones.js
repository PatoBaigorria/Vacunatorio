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
const Registro = require('./registro');
const Usuario = require("./usuario");

// Relaciones entre los modelos
Laboratorio.hasMany(LoteProveedor, {
	foreignKey: 'idLaboratorio',
	//onDelete: 'RESTRICT'
});

LoteProveedor.belongsTo(Laboratorio, {
	foreignKey: 'idLaboratorio'
});

LoteProveedor.hasMany(LoteInterno, {
	foreignKey: 'idLaboratorio',
	//onDelete: 'RESTRICT'
});

LoteInterno.belongsTo(LoteProveedor, {
	foreignKey: 'numeroDeLote'
});

LoteInterno.belongsTo(Laboratorio, {
	foreignKey: 'idLaboratorio'
});

DepositoNacional.hasMany(LoteInterno, {
	foreignKey: 'idDepositoNacional',
	//onDelete: 'RESTRICT'
});

DepositoProvincial.hasMany(LoteInterno, {
	foreignKey: 'idDepositoProvincial',
	//onDelete: 'RESTRICT'
});

CentroDeVacunacion.hasMany(LoteInterno, {
	foreignKey: 'idCentroDeVacunacion',
	//onDelete: 'RESTRICT'
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
	foreignKey: 'numeroDeSerie',
	//onDelete: 'RESTRICT'
});

CentroDeVacunacion.belongsToMany(LoteInterno, {
	through: Traslado,
	foreignKey: 'idCentroDeVacunacion',
	//onDelete: 'RESTRICT'
});

Persona.hasOne(Telefono, {
	foreignKey: 'DNI',
	//onDelete: 'RESTRICT'
});

Persona.hasOne(PatologiaBase, {
	foreignKey: 'DNI',
	//onDelete: 'RESTRICT'
});

Telefono.belongsTo(Persona, {
	foreignKey: 'DNI'
});

PatologiaBase.belongsTo(Persona, {
	foreignKey: 'DNI'
});

Persona.hasOne(AgenteDeSalud, {
	foreignKey: 'DNI',
	//onDelete: 'RESTRICT'
});

AgenteDeSalud.belongsTo(Persona, {
	foreignKey: 'DNI',
});

Persona.hasMany(Aplicacion, {
	foreignKey: 'DNIPaciente',
	//onDelete: 'RESTRICT'
});

AgenteDeSalud.hasMany(Aplicacion, {
	foreignKey: 'DNIAgente',
	//onDelete: 'RESTRICT'
});

LoteInterno.hasMany(Aplicacion, {
	foreignKey: 'numeroDeSerie',
	//onDelete: 'RESTRICT'
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
	foreignKey: 'numeroDeSerie',
	//onDelete: 'RESTRICT'
});

AgenteDeSalud.hasMany(Descarte, {
	foreignKey: 'DNIAgente',
	//onDelete: 'RESTRICT'
});

Descarte.belongsTo(LoteInterno, {
	foreignKey: 'numeroDeSerie'
});

Descarte.belongsTo(AgenteDeSalud, {
	foreignKey: 'DNIAgente'
});

async function sincronizarModelos() {
	try {
		await sequelize.sync({
			//force: true,
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
	Registro,
	Usuario,
};
