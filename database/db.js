const { Sequelize } = require("sequelize");

// Conexión a la base de datos MySQL
const sequelizeInstance = new Sequelize("vacunatorio2", "root", "", {
	host: "localhost",
	dialect: "mysql",
	timezone: "-03:00",
});

/*
sequelize
	.authenticate()
	.then(() => {})
	.catch((error) => {});
*/

// Exportar instancia de Sequelize
module.exports = sequelizeInstance;
