const mongoose = require("mongoose");

const habitCategorySchema = new mongoose.Schema({
  habitCategory: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
    required: true,
  }
});

const habitCategoryModel = mongoose.model("habitCategory", habitCategorySchema);

module.exports = habitCategoryModel;
