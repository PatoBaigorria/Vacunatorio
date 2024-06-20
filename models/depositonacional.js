"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");
class Depositonacional extends Model {}

const depositonacional = Depositonacional.init(
	{
		idDepositoNacional: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		direccion: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		provincia: {
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
		activo: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
	},
	{
		sequelize,
		freezeTableName: true,
		timestamps: false,
		modelName: "Depositonacional",
		tableName: "depositonacional",
	}
);
module.exports = depositonacional;
