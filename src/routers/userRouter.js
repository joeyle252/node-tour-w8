const router = require("express").Router();
const { auth } = require("../controllers/authController");


const {
  readUsers,
  readUser,
  updateUser,
  createUser,
  readProfile } = require("../controllers/userController");

// users 
router
  .route("/me")
  .get(auth, readProfile)
  .patch(auth, updateUser)

router.route("/:id").get(readUser)
router
  .route("/")
  .get(readUsers)
  .post(createUser);


module.exports = router;