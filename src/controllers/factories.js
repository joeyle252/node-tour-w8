const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.deleteOne = Model => catchAsync(async (req, res, next) => {
  let id;
  switch (Model.modelName) {
    case "Tour":
      id = req.params.id
      break;
    case "Review":
      id = req.params.id
      break;
    default:
      id = req.params.id
  }
  await Model.findOneAndDelete({ _id: id })
  res.status(204).end()
})

// try/catch
exports.updateOne = Model => catchAsync(async (req, res, next) => {
  //  next(new AppError(404,"something wrong"))

  let allows = [] // ["title", "description", "guides"] ["review", "rating"]
  let id
  switch (Model.modelName) {
    case "Tour":
      allows = ["title", "description", "guides"]
      id = req.params.id
      break;
    case "Review":
      allows = ["review", "rating"]
      id = req.params.id
      break;
    case "User":
      allows = ["password"]
      id = req.user._id
      break;
    default:
      allows = [];
      id = req.params.id
  }

  Object.keys(req.body).forEach(el => {
    if (!allows.includes(el))  // if el does not exist in allows[], delete el field
      delete req.body[el]
  });

  const newItem = await Model.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  )
  // const newItem = await Model.findById()
  // newItem.password = req.body.password;
  // newItem.save();

  res.status(200).json({ status: "ok", data: newItem });
})
