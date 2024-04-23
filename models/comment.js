const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    body: { type: String, maxlength: 500 },
    timestamp: { type: Date, default: Date.now, required: true },
    user: { type: Schema.Types.ObjectId, ref:"User", required: true },
    post: { type: Schema.Types.ObjectId, ref:"Post" },
});

module.exports = mongoose.model("Comment", CommentSchema)