"use strict";
const {
	Model,
	DataTypes
} = require("sequelize");
const sequelize = require("../database/db");

class Centrodevacunacion extends Model { }

const centrodevacunacion = Centrodevacunacion.init({
	idCentroDeVacunacion: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	longitud: {
		type: DataTypes.DOUBLE,
		allowNull: false,
	},
	latitud: {
		type: DataTypes.DOUBLE,
		allowNull: false,
	},
	activo: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	},
}, {
	sequelize,
	freezeTableName: true,
	timestamps: false,
	modelName: "CentroDeVacunacion",
	tableName: "centrodevacunacion",
});
module.exports = centrodevacunacion;