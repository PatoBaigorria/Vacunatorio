"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const loteproveedor = require("./loteproveedor");
const laboratorio = require("./laboratorio");

class Loteinterno extends Model { }

const loteinterno = Loteinterno.init(
  {
    numeroDeSerie: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numeroDeLote: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: loteproveedor,
        key: "numeroDeLote",
      },
    },
    idLaboratorio: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: laboratorio,
        key: "idLaboratorio",
      },
    },
    cantidadDeVacunas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fechaDeLlegadaDepositoNacional: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    idDepositoNacional: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      allowNull: true,
    },
    fechaDeSalidaDepositoNacional: {
      allowNull: true,
      type: DataTypes.DATEONLY,
    },
    fechaDeLlegadaDepositoProvincial: {
      allowNull: true,
      type: DataTypes.DATEONLY,
    },
    idDepositoProvincial: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      allowNull: true,
    },
    fechaDeSalidaDepositoProvincial: {
      allowNull: true,
      type: DataTypes.DATEONLY,
    },
    fechaDeLlegadaCentroDeVacunacion: {
      allowNull: true,
      type: DataTypes.DATEONLY,
    },
    idCentroDeVacunacion: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      allowNull: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    modelName: "Loteinterno",
    tableName: "loteinterno",
  }
);

module.exports = loteinterno;
