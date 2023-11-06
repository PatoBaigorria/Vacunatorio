"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

class Aplicacion extends Model { }

const aplicacion = Aplicacion.init(
  {
    idAplicacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    DNIPaciente: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      allowNull: false,
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
    fechaDeAplicacion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    modelName: "Aplicacion",
    tableName: "aplicacion",
  }
);

module.exports = aplicacion;
