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




// import routers
const tourRouter = require("./routers/tourRouter");
const reviewRouter = require("./routers/reviewRouter");
const userRouter = require("./routers/userRouter");





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

// tour Router
router.use("/tours", tourRouter);
router.use("/tours/:tid/reviews", reviewRouter);
router.use("/users", userRouter)


router.post("/auth/login", login);
router.get("/auth/logout/all", auth, logoutAll);
router.get("/auth/logout", auth, logout);





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