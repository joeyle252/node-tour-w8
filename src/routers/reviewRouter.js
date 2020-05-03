const router = require("express").Router({ mergeParams: true });
const { auth } = require("../controllers/authController");
const checkTour = require("../middlewares/checkTour");



const {
  readReviews,
  readReview,
  updateReview,
  deleteReview,
  createReview } = require("../controllers/reviewController");



// reviews
router
  .route("/")
  .get(checkTour, readReviews)
  .post(auth, checkTour, createReview)

router
  .route("/:id")
  .get(readReview)
  .patch(auth, updateReview)
  .delete(auth, deleteReview)


module.exports = router;