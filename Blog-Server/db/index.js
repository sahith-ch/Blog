"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMENTS = exports.POSTS = exports.USERS = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
    Articles_published: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Articles_published' }],
});
var postSchema = new mongoose_1.default.Schema({
    Title: String,
    description: String,
    author: { type: mongoose_1.default.Schema.Types.ObjectId },
    comments: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Likes' }],
});
var commentSchema = new mongoose_1.default.Schema({
    content: String,
    author: { type: mongoose_1.default.Schema.Types.ObjectId },
    post: { type: mongoose_1.default.Schema.Types.ObjectId },
});
exports.USERS = mongoose_1.default.model("Users", userSchema);
exports.POSTS = mongoose_1.default.model("Posts", postSchema);
exports.COMMENTS = mongoose_1.default.model("Comments", commentSchema);
