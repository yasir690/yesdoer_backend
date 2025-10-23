const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({

  email: {
    type: String,
    required: false,
    match: [
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    ],
  },
  password: {
    type: String,
    required: true,
  },

  userVerified: {
    type: Boolean,
    default: false,
  },

  deviceType: {
    type: String,
    enum: ["ANDROID", "IOS"],
  },
  deviceToken: {
    type: String,
  },

  notificationOnAndOff: {
    type: Boolean,
    default: true,
  },

  expireAt: { type: Date, default: Date.now, expires: 300 },
});

const authModel = mongoose.model("auth", authSchema);

module.exports = authModel;
