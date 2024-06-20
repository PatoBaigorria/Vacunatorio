// middleware/errorHandler.js
const createError = require("http-errors");

const errorHandler = (err, req, res, next) => {
	console.error(err.stack);
	res.status(err.status || 500).render("error", { error: err });
};

module.exports = errorHandler;
