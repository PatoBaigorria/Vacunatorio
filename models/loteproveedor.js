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
      allowNull: false,
    },
    tipoDeVacuna: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombreComercial: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cantidadDeLotesInternos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fechaDeFabricacion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fechaDeCompra: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fechaDeVencimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
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
