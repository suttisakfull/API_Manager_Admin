const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
   
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    roles: {
      type: String,
      default: "USER",    //"ADMIN"
    },
    date: {
      type: Date,
      default: Date.now,
    },
    verified: {
      type: Boolean,
      default: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
