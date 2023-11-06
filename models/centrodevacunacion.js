"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

class Centrodevacunacion extends Model { }

const centrodevacunacion = Centrodevacunacion.init(
  {
    idCentroDeVacunacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    longitud: DataTypes.DOUBLE,
    latitud: DataTypes.DOUBLE,
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
