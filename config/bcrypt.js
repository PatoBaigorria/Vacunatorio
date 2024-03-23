const bcrypt = require("bcrypt");

const saltRounds = 10;

// Función para encriptar una contraseña
function hashPassword(password) {
  return bcrypt.hashSync(password, saltRounds);
}

// Comparar una contraseña con su hash
function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

// Uso:
const hashedPassword = hashPassword("password");
const isMatch = comparePassword("password", hashedPassword);