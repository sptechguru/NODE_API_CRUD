const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    // minlength: 3,
  },

  password: {
    type: String,
    required: true,
    // minlength: 3,
  },
});

userSchema.plugin(passportLocalMongoose);

const modelData = new mongoose.model("User", userSchema);

module.exports = modelData;
