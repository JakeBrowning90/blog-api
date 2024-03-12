const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    body: { type: String },
    timestamp: { type: Date, default: Date.now },
    visitor: { type: Schema.Types.ObjectId, ref:"Visitor" },
    post: { type: Schema.Types.ObjectId, ref:"Post" },
});

module.exports = mongoose.model("Comment", CommentSchema)