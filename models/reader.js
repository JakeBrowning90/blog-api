const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReaderSchema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    password: { type: String },
    is_admin: { type: Boolean }
});

module.exports = mongoose.model("Reader", ReaderSchema)