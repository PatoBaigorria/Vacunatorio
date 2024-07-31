"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

class Usuario extends Model { }

const usuario = Usuario.init(
	{
		idUsuario: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		rol: {
			type: DataTypes.STRING,
			allowNull: false,
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
		password: {
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
		modelName: "Usuario",
		tableName: "usuario",
	}
);

module.exports = usuario;
