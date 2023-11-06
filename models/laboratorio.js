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
    nombreLaboratorio: DataTypes.STRING,
    pais: DataTypes.STRING,
    email: DataTypes.STRING,
    telefono: DataTypes.STRING,
    longitud: DataTypes.DOUBLE,
    latitud: DataTypes.DOUBLE,
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
