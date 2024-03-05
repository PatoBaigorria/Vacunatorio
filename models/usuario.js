"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

class Usuario extends Model { }

const usuario = Usuario.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombreUsuario: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },

    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        modelName: "Usuario",
        tableName: "usuario",
    }
);

module.exports = usuario;