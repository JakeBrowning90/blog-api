const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    body: { type: String, required: true  },
    timestamp: { type: Date , default: Date.now,},
    is_published: { type: Boolean },
    author: { type: Schema.Types.ObjectId, ref:"Author", required: true  }
}, {toJSON: { virtuals: true }});

PostSchema.virtual("url").get(function () {
    return`/posts/${this._id}`;
});

module.exports = mongoose.model("Post", PostSchema)