const Tour = require("../models/tour.js");


module.exports = async (req, res, next) => {
  if (!req.body.tour || !await Tour.exists({ _id: req.body.tour }))
    return res.status(404).json({ status: "fail", message: "Tour not found" });
  next();
};