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
      foreignKey: true,
      allowNull: false,
    },
    pais: {
      type: DataTypes.STRING,
      foreignKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      foreignKey: true,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      foreignKey: true,
      allowNull: false,
    },
    longitud: {
      type: DataTypes.DOUBLE,
      foreignKey: true,
      allowNull: false,
    },
    latitud: {
      type: DataTypes.DOUBLE,
      foreignKey: true,
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
