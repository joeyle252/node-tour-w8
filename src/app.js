const express = require('express');
const app = express();
const router = new express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const errorHandler = require("./utils/errorHandler");
const AppError = require("./utils/appError");
require("dotenv").config({ path: ".env" });


const tourRouter = require("./routers/tourRouter");
const reviewRouter = require("./routers/reviewRouter");
const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");

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


// tourRouter
router.use("/tours", tourRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/tours/:tid/reviews", reviewRouter);


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
function notFound(req, res, next) {
	next(new AppError(404, "api not found"))
}

router.route("*").all(notFound)


// create a error handler that will capture all errors:
app.use(errorHandler) // last middleware

module.exports = app;