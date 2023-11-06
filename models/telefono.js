"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

class Telefono extends Model { }

const telefono = Telefono.init(
  {
    DNI: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      //foreignKey: true,
    },
    celular1: DataTypes.STRING,
    celular2: DataTypes.STRING,
  },

  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    modelName: "Telefono",
    tableName: "telefono",
  }
);
module.exports = telefono;
