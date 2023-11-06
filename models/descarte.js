"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

class Descarte extends Model { }
const descarte = Descarte.init(
  {
    idDescarte: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    DNIAgente: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    numeroDeSerie: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    empresaDescartante: DataTypes.STRING,
    motivo: DataTypes.STRING,
    cantidadDeVacunas: DataTypes.INTEGER,
    fechaDeDescarte: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    modelName: "Descarte",
    tableName: "descarte",
  }
);
module.exports = descarte;
