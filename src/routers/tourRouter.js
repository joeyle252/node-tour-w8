const router = require("express").Router();
const {
  readTours,
  readTour,
  createTour,
  updateTour,
  deleteTour } = require("../controllers/tourController");

const { auth } = require("../controllers/authController");

router
  .route("/")
  .get(readTours)
  .post(auth, createTour)

router
  .route("/:id")
  .get(auth, readTour)
  .patch(auth, updateTour)
  .delete(auth, deleteTour);

module.exports = router;