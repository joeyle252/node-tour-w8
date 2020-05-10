const router = require("express").Router();

const {
  login,
  auth,
  logout,
  logoutAll } = require("../controllers/authController");







router.post("/login", login);
router.get("/logout", auth, logout);
router.get("/logout/all", auth, logoutAll);

module.exports = router;