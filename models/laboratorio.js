"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

class Laboratorio extends Model { }
const laboratorio = Laboratorio.init(
	{
		idLaboratorio: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		nombreLaboratorio: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		pais: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		telefono: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		longitud: {
			type: DataTypes.DOUBLE,
			allowNull: false,
		},
		latitud: {
			type: DataTypes.DOUBLE,
			allowNull: false,
		},
	},
	{
		sequelize,
		freezeTableName: true,
		timestamps: false,
		modelName: "Laboratorio",
		tableName: "laboratorio",
	}
);
module.exports = laboratorio;
