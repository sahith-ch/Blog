"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const db_1 = require("../db");
const router = express_1.default.Router();
router.post("/:id", middlewares_1.Authorize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postid = req.params.id;
    const user = yield db_1.USERS.findById(req.headers.userid);
    const post = yield db_1.POSTS.findById(postid);
    const comment = {
        content: req.body.content,
        author: user,
        post: post,
    };
    if (user) {
        if (post) {
            const newcomment = new db_1.COMMENTS(comment);
            yield newcomment.save();
            post.comments.push(newcomment._id);
            yield post.save();
            res.json({ message: "commented succesfully" });
        }
        else {
            res.sendStatus(403).json({ message: "post unavailable" });
        }
    }
    else {
        res.sendStatus(403);
    }
}));
router.put("/:commentid", middlewares_1.Authorize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentid = req.params.commentid;
    const newcomment = yield db_1.COMMENTS.findByIdAndUpdate(commentid, req.body, { new: true });
    if (newcomment) {
        res.json({ message: "comment updated succesfully" });
    }
    else {
        res.sendStatus(403);
    }
}));
router.delete("/:commentid", middlewares_1.Authorize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentid = req.params.commentid;
    const newcomment = yield db_1.COMMENTS.findByIdAndDelete(commentid);
    if (newcomment) {
        res.json({ message: "deleted" });
    }
    else {
        res.sendStatus(403);
    }
}));
exports.default = router;
