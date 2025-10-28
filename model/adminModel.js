const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    match: [
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    ],
  },
  password: {
    type: String,
    required: true,
  },

});

const adminModel = mongoose.model("admin", adminSchema);

module.exports = adminModel;
