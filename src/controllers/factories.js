


exports.deleteOne = Model => async function (req, res) {
  try {
    let id
    if (Model.modelName = "Review") {
      id = req.params.id
    } else if (Model.modelName = "Tour") {
      id = req.params.tid
    };
    await Model.findOneAndDelete({ _id: id });

    res.status(204).end();
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  };
};


exports.updateOne = Model => async function (req, res) {
  try {
    let allows = [];
    let id;
    switch (Model.modelName) {
      case "Tour":
        allows = ["title", "description", "guides"]
        id = req.params.id
        break;
      case "Review":
        allows = ["rating", "review"]
        id = req.params.id
        break
      case "User":
        id = req.user._id
        allows = ["password"]
        break
      default:
        allows = []
    };
    Object.keys(req.body).forEach(el => {
      if (!allows.includes(el))
        delete req.body[el]
    })
    const item = await Model.findOneAndUpdate({ _id: id }, req.body, { new: true })
    console.log(item)
    res.status(200).json({ status: "ok", data: item })
  } catch (e) {
    res.status(400).json({ status: "fail", message: e.message })
  }
}