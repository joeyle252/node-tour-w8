const Tour = require("../models/tour");
const { deleteOne, updateOne } = require("./factories");
const catchAsync = require("../utils/catchAsync")


exports.readTours = async function (req, res) {
	try {
		const tours = await Tour.find({}).lean();
		res.json({ status: "success", data: tours });
	} catch (error) {
		res.status(400).json({ status: "fail", message: error.message });
	}
};


exports.readTour = async (req, res) => {
	try {
		const tour = await Tour.findById(req.params.id).lean();
		if (!tour) return res.status(404).json({ status: "fail", message: "Tour not found" })
		res.json({ status: "success", data: tour });
	} catch (err) {
		res.status(400).json({ status: "fail", message: err.message });
	};
};

exports.createTour = catchAsync(async function (req, res, next) {
	const tour = await Tour.create({ ...req.body, organizer: req.user._id });
	res.status(201).json({ status: "success", data: tour });
});

exports.updateTour = updateOne(Tour)

exports.deleteTour = deleteOne(Tour)

