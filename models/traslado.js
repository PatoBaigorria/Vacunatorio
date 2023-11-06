"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

class Traslado extends Model { }

const traslado = Traslado.init(
  {
    idTraslado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numeroDeSerie: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    idCentroDeVacunacion: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    fechaDeSalida: {
      type: DataTypes.DATEONLY,
    },
    fechaDeLlegada: {
      type: DataTypes.DATEONLY,
    },
  },

  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    modelName: "Traslado",
    tableName: "traslado",
  }
);
module.exports = traslado;
