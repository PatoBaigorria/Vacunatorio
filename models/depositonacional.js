"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");
class Depositonacional extends Model { }

const depositonacional = Depositonacional.init(
  {
    idDepositoNacional: {
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
    modelName: "Depositonacional",
    tableName: "depositonacional",
  }
);
module.exports = depositonacional;
