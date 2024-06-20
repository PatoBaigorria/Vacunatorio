"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

class Depositoprovincial extends Model {}
const depositoprovincial = Depositoprovincial.init(
	{
		idDepositoProvincial: {
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
		modelName: "Depositoprovincial",
		tableName: "depositoprovincial",
	}
);
module.exports = depositoprovincial;
