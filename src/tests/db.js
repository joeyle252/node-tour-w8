const mongoose = require("mongoose");
// const User = require("../models/user");
const jwt = require("jsonwebtoken");


const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Khoa",
  email: "khoa2@gmail.com",
  password: "12345",
  age: 10,
  tokens: [jwt.sign({ id: userOneId }, process.env.secret)]
}



module.exports = { userOneId, userOne }