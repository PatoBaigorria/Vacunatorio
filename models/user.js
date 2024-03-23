"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

class Usuario extends Model {}

const usuario = Usuario.init(
  {
    idUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
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
