"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

class Persona extends Model { }

const persona = Persona.init(
  {
    DNI: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaDeNacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    ocupacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longitud: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    latitud: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    modelName: "Persona",
    tableName: "persona",
  }
);
module.exports = persona;
