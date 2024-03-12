const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String },
    body: { type: String },
    timestamp: { type: Date , default: Date.now,},
    is_published: { type: Boolean },
    author: { type: Schema.Types.ObjectId, ref:"Author", }
});

module.exports = mongoose.model("Post", PostSchema)