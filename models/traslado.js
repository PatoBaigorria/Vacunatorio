"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

class Traslado extends Model {}

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
      unique: false,
      allowNull: false,
    },
    idCentroDeVacunacion: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      unique: false,
      allowNull: false,
    },
    fechaDeSalida: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fechaDeLlegada: {
      type: DataTypes.DATEONLY,
      allowNull: true,
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
    modelName: "Traslado",
    tableName: "traslado",
  }
);
module.exports = traslado;
