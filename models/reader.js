const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReaderSchema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    password: { type: String },
    // is_admin: { type: Boolean }
}, {toJSON: { virtuals: true }});

ReaderSchema.virtual("full_name").get(function () {
    let full_name = `${this.first_name} ${this.last_name}`;
    return full_name;
});

module.exports = mongoose.model("Reader", ReaderSchema)