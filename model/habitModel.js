const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({

  habitTitle: {
    type: String,
    required: true,
  },
  habitDescription: {
    type: String,
    required: false,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "habitCategory",
    required: true,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
    required: true,
  }

});

const habitModel = mongoose.model("habit", habitSchema);

module.exports = habitModel;