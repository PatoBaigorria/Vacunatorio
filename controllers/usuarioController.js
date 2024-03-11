const { Usuario } = require("../models/relaciones");
const {
    createRegistro
} = require('./registroController');
const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.render("usuario/login", {
            usuarios: usuarios,
        });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios." });
    }
};

module.exports = {
    listarUsuarios
}