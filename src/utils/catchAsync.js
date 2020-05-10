const AppError = require("../utils/AppError");

module.exports = func => (req, res, next) => func(req, res, next).catch(er=>next(er))
