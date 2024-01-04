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
      allowNull: false,
    },
    numeroDeSerie: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      allowNull: false,
    },
    empresaDescartante: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    motivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cantidadDeVacunas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fechaDeDescarte: {
      type: DataTypes.DATEONLY,
      allowNull: false,
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
