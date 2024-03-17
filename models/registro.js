"use strict";
const {
    Model,
    DataTypes
} = require("sequelize");
const usuario = require("./usuario");
const sequelize = require("../database/db");

class Registro extends Model { }
const registro = Registro.init({
    idRegistro: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: usuario,
            key: "idUsuario",
        },
    },
    idFila: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombreDeTabla: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipoDeAccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    modelName: "Registro",
    tableName: "registro",
});
module.exports = registro;