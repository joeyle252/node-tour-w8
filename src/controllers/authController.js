const User = require("../models/user");
const jwt = require("jsonwebtoken");
// const ObjectId = require('mongoose').Types.ObjectId;


exports.auth = async (req, res, next) => {
  // make sure we get the token
  if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer"))
    return res.status(401).json({ status: "fail", message: "Unauthorized" });

  // verify token  
  const token = req.headers.authorization.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.secret);
    // find User with token 
    const user = await User.findOne({ _id: decoded.id, tokens: token });
    if (!user) throw new Error("Unauthorized");

    // attach user object to req object
    req.user = user;
  } catch (err) {
    return res.status(401).json({ status: "fail", message: err.message });
  };
  next();
};


exports.login = async function (req, res) {
  try {
    const { email, password } = req.body;
    if (!email && !password) throw new Error("Email and password are required");

    const user = await User.loginWithEmail(email, password);
    const token = await user.generateToken();

    console.log(token)
    res.status(200).json({ status: "success", data: { user, token: token } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  };
};

exports.logout = async function (req, res) {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    req.user.tokens = req.user.tokens.filter(el => el !== token);
    await req.user.save();
    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(401).json({ status: "fail", message: err.message });
  };
}

exports.logoutAll = async function (req, res) {
  try {
    req.user.tokens = []
    await req.user.save();
    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(401).json({ status: "fail", message: err.message });
  }
}