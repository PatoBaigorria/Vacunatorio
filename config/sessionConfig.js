// sessionConfig.js

const session = require('express-session');

// Configuración de express-session
const sessionConfig = {
    secret: 'mysecret', // Clave secreta para firmar las cookies de sesión
    resave: false, // Evita que la sesión se guarde si no hay cambios
    saveUninitialized: true // Guarda sesiones aunque no estén inicializadas
};

module.exports = sessionConfig;
