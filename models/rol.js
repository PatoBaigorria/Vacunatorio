"use strict";
const {
    Model,
    DataTypes
} = require("sequelize");
const sequelize = require("../database/db");

class Rol extends Model { }
const rol = Rol.init({
    idRol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    modelName: "Rol",
    tableName: "rol",
});
module.exports = rol;