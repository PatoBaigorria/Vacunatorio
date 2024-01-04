"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

class Patologiabase extends Model { }
const patologiabase = Patologiabase.init(
  {
    DNI: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
    patologiaBase: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    modelName: "Patologiabase",
    tableName: "patologiabase",
  }
);
module.exports = patologiabase;
