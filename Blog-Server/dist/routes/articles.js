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
const index_1 = require("./../db/index");
const index_2 = require("./../middlewares/index");
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const router = express_1.default.Router();
router.get("/me", index_2.Authorize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.USERS.findById(req.headers._id);
    if (user) {
        res.json({ message: user.Articles_published });
    }
    else {
        res.sendStatus(403);
    }
}));
router.post("/", index_2.Authorize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imagePath = req.file ? req.file.path : null;
    console.log("image", req.body);
    const { Title, Content, description, Image } = req.body;
    const post = {
        author: req.headers.userid,
        Title: Title,
        content: Content,
        description: description,
        Image: Image,
        likes: []
    };
    const newpost = new index_1.POSTS(post);
    const user = yield db_1.USERS.findById(req.headers.userid);
    if (user) {
        user.Articles_published.push(newpost._id);
        yield user.save();
        yield newpost.save();
        try {
            res.json({ message: "Post created" });
        }
        catch (err) {
            console.log(err);
        }
    }
    else {
        res.sendStatus(200);
    }
}));
router.get("/", index_2.Authorize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.userid) {
        console.log(req.headers.userid);
        try {
            const posts = yield index_1.POSTS.find({});
            console.log(posts);
            res.json({ posts });
        }
        catch (e) {
            res.status(401).send(e);
        }
    }
}));
router.get("/:id", index_2.Authorize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.userid) {
        console.log(req.headers.userid);
        try {
            const post = yield index_1.POSTS.findById(req.params.id);
            console.log(post);
            res.json({ post });
        }
        catch (e) {
            res.status(401).send(e);
        }
    }
}));
router.put("/likes", index_2.Authorize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postid = req.headers.postid;
    console.log(req.headers.userid);
    try {
        const post = yield index_1.POSTS.findByIdAndUpdate(postid, { $addToSet: { likes: req.headers.userid } }, { new: true });
        console.log("post1", post);
        if (post) {
            res.json({ message: "liked" });
        }
        else {
            console.log("post", post);
        }
    }
    catch (e) {
        res.send(e);
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newuser } = req.body;
    const postid = req.params.id;
    const post = yield index_1.POSTS.findByIdAndUpdate(postid, newuser, { new: true });
    if (post) {
        res.json({ post });
    }
    else {
        res.sendStatus(403);
    }
}));
exports.default = router;
