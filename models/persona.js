"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

class Persona extends Model {}

const persona = Persona.init(
	{
		DNI: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		nombre: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		apellido: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		fechaDeNacimiento: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		ocupacion: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		genero: {
			type: DataTypes.STRING,
			allowNull: false,
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
		modelName: "Persona",
		tableName: "persona",
	}
);
module.exports = persona;
