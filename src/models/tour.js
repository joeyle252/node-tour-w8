const mongoose = require("mongoose");
const User = require("./user");
const ObjectId = require('mongoose').Types.ObjectId;
const Review = require("./review");


const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "Tour must have a title"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Tour must have a description"],
    trim: true,
    minLength: 10
  },
  organizer: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Tour must have an organizer"]
  },
  guides: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Tour must have at least a guide"]
    }
  ],

  // images: [String],
  // imageCover: {
  //   type: String,
  //   required: [true, "Tour must have a cover image"]
  // },
  // groupSize: { 
  //   type: Number,
  //   required : [true, "Tour must have a group size"]
  // },
  // startDates: [Date],
  // startLocation: { 
  //     // geoJSON object 
  //     type: { 
  //       type: String,
  //       default: "Point",
  //       enum: ["Point"]
  //     },
  //     coordinates: [Number], // lng, lat  (google: lat, lng)
  //     address: String,
  //     description: String
  // },
  // locations: [
  //   {
  //     type: {
  //       type: String,
  //       default: "Point",
  //       enum: ["Point"]
  //     },
  //     coordinates: [Number], // lng, lat (google: lat)
  //     address: String,
  //     description: String,
  //     day: Number
  //   }
  // ]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

tourSchema.pre("save", async function (next) {
  if (!this.isModified("guides")) return next();

  const found = await User.find({ "_id": { $in: this.guides } }).select("_id");
  if (found.length !== this.guides.length)
    throw new Error("guide(s) doesn't exist");
  next();
});

tourSchema.pre(/^find/, function (next) {
  this
    .populate("organizer", "-password -__v -tokens -createdAt -updatedAt")
    .populate("guides", "_id name");
  next();
});


tourSchema.post(/^findOneAndDelete/, async function () {
  const id = this._conditions._id
  await Review.deleteMany({ tour: id })
})

tourSchema.methods.toJSON = function () {
  const object = this.toObject();
  delete object.__v;
  return object;
};


const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
