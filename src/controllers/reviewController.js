const Review = require("../models/review");
const ObjectId = require('mongoose').Types.ObjectId;


exports.createReview = async function (req, res) {
  try {

    // create review or update existing review
    const review = await Review.findOneAndUpdate(
      { user: req.user._id, tour: req.body.tour },
      { ...req.body, user: req.user._id },
      { upsert: true, new: true, setDefaultsOnInsert: true });

    res.status(201).json({ status: "success", data: review })
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

exports.readReviews = async function (req, res) {
  try {
    const reviews = await Review.find({ tour: req.body.tour });
    res.json({ status: "success", data: reviews });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  };
};

exports.readReview = async function (req, res) {
  try {
    const review = await Review.findById(req.params.id).exec();
    res.json({ status: "success", data: review });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  };
};

exports.updateReview = async function (req, res) {
  try {

  } catch (error) {

  }
};


exports.deleteReview = async function (req, res) {
  try {

  } catch (error) {

  }
};

