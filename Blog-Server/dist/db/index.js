"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMENTS = exports.POSTS = exports.USERS = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
    Articles_published: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Posts' }],
});
const postSchema = new mongoose_1.default.Schema({
    Title: String,
    content: String,
    description: String,
    Image: String,
    author: { type: mongoose_1.default.Schema.Types.ObjectId },
    comments: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }],
});
const commentSchema = new mongoose_1.default.Schema({
    content: String,
    author: { type: mongoose_1.default.Schema.Types.ObjectId },
    post: { type: mongoose_1.default.Schema.Types.ObjectId },
});
exports.USERS = mongoose_1.default.model("Users", userSchema);
exports.POSTS = mongoose_1.default.model("Posts", postSchema);
exports.COMMENTS = mongoose_1.default.model("Comments", commentSchema);
