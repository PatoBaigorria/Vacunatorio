"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

class Centrodevacunacion extends Model {}

const centrodevacunacion = Centrodevacunacion.init(
	{
		idCentroDeVacunacion: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		direccion: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		localidad: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		provincia: {
			type: DataTypes.STRING,
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
		modelName: "CentroDeVacunacion",
		tableName: "centrodevacunacion",
	}
);
module.exports = centrodevacunacion;
