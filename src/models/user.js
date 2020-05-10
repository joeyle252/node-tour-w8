const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "User must have a name"],
		trim: true,
		minLength: 3
	},
	email: {
		type: String,
		required: [true, "User must have an email"],
		trim: true,
		unique: true,
		lowercase: true,
		validate(val) {
			if (!validator.isEmail(val)) {
				throw new Error("Invalid email address");
			}
		}
	},
	password: {
		type: String,
		required: [true, "User must have a password"]
	},
	tokens: [{ type: String }] // array of tokens
}, {
	timestamps: true,
	toJSON: { virtuals: true },
	toObject: { virtuals: true }  // is virtuals included in the obj when do doc.toObject()
});

userSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();
	delete userObject.password;
	delete userObject.__v;
	return userObject;
};



userSchema.pre("save", async function (next) { // this here = doc
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, saltRounds);
	next();
});

userSchema.pre("findOneAndUpdate", async function (next) { // this here is not a doc. this here = query
	if (!this._update.password) return next();
	this._update.password = await bcrypt.hash(this._update.password, saltRounds);
	next();
});

userSchema.methods.generateToken = async function () {
	const user = this;
	const token = jwt.sign({ id: user._id }, process.env.secret, { expiresIn: '7d' });
	user.tokens.push(token);
	await user.save();
	return token;
};

userSchema.statics.loginWithEmail = async (email, password) => {
	const user = await User.findOne({ email: email });
	if (!user) throw new Error("Unable to login");
	const match = await bcrypt.compare(password, user.password);
	if (!match) throw new Error("Unable to login");
	return user;
};


const User = mongoose.model("User", userSchema);

module.exports = User;
