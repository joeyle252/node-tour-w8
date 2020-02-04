const express = require('express');
const app = express();
const router = new express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require("dotenv").config({ path: ".env" });

const { 
	login, 
	auth, 
	logout, 
	logoutAll } = require("./controllers/authController");
const { 
	readUsers, 
	readUser, 
	updateUser, 
	createUser, 
	readProfile } = require("./controllers/userController");
const { 
	readTours, 
	readTour, 
	createTour, 
	updateTour, 
	deleteTour } = require("./controllers/tourController");
const { 
	readReviews, 
	readReview, 
	updateReview, 
	deleteReview, 
	createReview } = require("./controllers/reviewController");


mongoose.connect(process.env.DB, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

router.route("/").get((req, res) => { res.send("OK") });

router
	.route("/tours")
	.get(readTours)
	.post(auth, createTour)

router
	.route("/tours/:id")
	.get(auth, readTour)
	.patch(auth, updateTour)
	.delete(auth, deleteTour);



// reviews
const checkTour = require("./middlewares/checkTour");

router
	.route("/reviews")
	.get(checkTour, readReviews)
	.post(auth, checkTour, createReview)

router
	.route("/reviews/:id")
	.get(readReview)
	.patch(auth, updateReview)
	.delete(auth, deleteReview)


// users 
router
	.route("/users/me")
	.get(auth, readProfile)
	.patch(auth, updateUser)

router.post("/login", login);
router.get("/logout", auth, logout);
router.get("/logout/all", auth, logoutAll);


router
	.route("/users")
	.get(readUsers)
	.post(createUser);

router.route("/users/:id").get(readUser)


// const Cate = require("./models/category.js");
// router.get("/creategenres", async (req, res) => {
// 	const genres = ["Vietnam", "Asia", "Europe", "USA", "SEA", "China", "Japan", "Singapore", "Taiwan"]
// 	const promises = genres.map(el => {
// 		Cate.create({ genre: el })
// 	});
// 	const done = await Promise.all(promises)
// 	res.send("ok")
// });


// 404 handler
function notFound(req, res) {
	res.status(404).send()
}
router.route("*")
	.get(notFound)
	.post(notFound)
	.patch(notFound)
	.put(notFound)
	.delete(notFound)

app.listen(process.env.PORT, () => {
	console.log("server listening on port " + process.env.PORT);
});