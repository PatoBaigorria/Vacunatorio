"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

class Loteproveedor extends Model { }

const loteproveedor = Loteproveedor.init(
  {
    numeroDeLote: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idLaboratorio: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      //unique: true,
    },
    tipoDeVacuna: DataTypes.STRING,
    nombreComercial: DataTypes.STRING,
    cantidadDeLotesInternos: DataTypes.INTEGER,
    fechaDeFabricacion: {
      type: DataTypes.DATEONLY,
    },
    fechaDeVencimiento: {
      type: DataTypes.DATEONLY,
    },
    fechaDeCompra: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    modelName: "Loteproveedor",
    tableName: "loteproveedor",
  }
);

module.exports = loteproveedor;
