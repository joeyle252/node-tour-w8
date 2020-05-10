const Tour = require("../models/tour.js");


module.exports = async (req, res, next) => {
  if (!req.params.tid || !await Tour.exists({ _id: req.params.tid }))
    return res.status(404).json({ status: "fail", message: "Tour not found" });
  next();
};