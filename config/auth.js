const jwt = require("jsonwebtoken");

const secretKey = "your_secret_key";

// Generar un token JWT
function generateToken(user) {
  return jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });
}

// Verificar un token JWT
function verifyToken(token) {
  return jwt.verify(token, secretKey);
}

// Uso:
const token = generateToken(user);
const decoded = verifyToken(token);
