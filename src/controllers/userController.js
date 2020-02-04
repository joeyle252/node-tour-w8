const User = require("../models/user");

exports.readUsers = async function (req, res) {
	const users = await User.find({}).select("-createdAt -updatedAt -tokens");
	res.json({ status: "success", data: users });
};

exports.readUser = async function (req, res) {
	res.send("ok")
};

exports.updateUser = async function (req, res) {
	res.send("ok")
};


exports.readProfile = async function (req, res) {
	res.send("ok")
};

exports.createUser = async function (req, res) {
	const { name, email, password, passwordConfirm } = req.body;
	if (!name && !email && !password) {
		return res.status(400).json({
			status: "fail",
			message: "Name, email and password are required!"
		});
	};

	try {
		if (password !== passwordConfirm) {
			throw new Error("password and password confirm don't match")
		}
		const user = User.create({ name, password, email });
		res.json({ status: "success", data: user });
	} catch (err) {
		res.status(400).json({ status: "fail", message: err.message });
	};
};
