const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, maxLength: 30, required: true },
    email: { type: String, maxLength: 30, required: true },
    password: { type: String, required: true },
    isAuthor: { type: Boolean, required: true },
  },
  { toJSON: { virtuals: true } }
);

module.exports = mongoose.model("User", UserSchema);
