const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, {toJSON: { virtuals: true }});

AuthorSchema.virtual("full_name").get(function () {
    let full_name = `${this.first_name} ${this.last_name}`;
    return full_name;
});

module.exports = mongoose.model("Author", AuthorSchema) 