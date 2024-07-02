const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    // first_name: { type: String, maxLength: 20 },
    // last_name: { type: String, maxLength: 20 },
    username: { type: String, maxLength: 30, required: true },
    email: { type: String, maxLength: 30, required: true },
    password: { type: String, required: true },
    isAuthor: { type: Boolean, required: true },
  },
  { toJSON: { virtuals: true } }
);

// UserSchema.virtual("full_name").get(function () {
//     let full_name = `${this.first_name} ${this.last_name}`;
//     return full_name;
// });

module.exports = mongoose.model("User", UserSchema);
