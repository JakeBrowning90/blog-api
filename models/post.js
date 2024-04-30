const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    body: { type: String, required: true },
    is_published: { type: Boolean },
    user: { type: Schema.Types.ObjectId, ref:"User", required: true }
}, {timestamps: true, toJSON: { virtuals: true }});

PostSchema.virtual("url").get(function () {
    return`/posts/${this._id}`;
});

module.exports = mongoose.model("Post", PostSchema)