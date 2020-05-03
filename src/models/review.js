const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "Review needs a body"],
    minLength: 5
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Review must belong to a user"]
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Review must belong to a tour"],
    ref: "Tour"
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


reviewSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
}


reviewSchema.pre(/^find/, function (next) {
  this
    .populate("user", "-__v -tokens -password -createdAt -updatedAt")
    // .populate("tour", "-guides -organizer -description -createdAt -__v")

  next();
})

module.exports = mongoose.model("Review", reviewSchema);
