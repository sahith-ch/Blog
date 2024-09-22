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
exports.SECRET = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const middlewares_1 = require("../middlewares");
exports.SECRET = 'SECr3t';
const router = express_1.default.Router();
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db_1.USERS.findOne({ username, password });
    if (user) {
        const token = (0, middlewares_1.generatetoken)(user);
        res.cookie('authToken', token, {
            httpOnly: true,
            path: '/',
            secure: true,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ message: "loggedin" });
    }
    else {
        res.json({ message: "user not found" });
    }
}));
router.get("/me", middlewares_1.Authorize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield db_1.USERS.findById(req.headers.userid).populate('Articles_published');
        if (data) {
            res.json({ data: data });
        }
        else {
            console.log(data);
        }
    }
    catch (e) {
        console.log(e);
        res.status(403);
    }
}));
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db_1.USERS.findOne({ username: username, password: password });
    if (user) {
        res.json({ message: "user exists" });
    }
    else {
        const newuser = new db_1.USERS({ username, password });
        yield newuser.save();
        const token = (0, middlewares_1.generatetoken)(user);
        console.log(token);
        res.cookie('authToken', token, {
            httpOnly: true,
            path: '/',
            secure: false,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ message: token });
    }
}));
router.post('/logout', (req, res) => {
    console.log("called");
    res.clearCookie('authToken', {
        path: '/', // Ensure the path matches how the cookie was set
        httpOnly: true,
        secure: false, // Keep this as false for local development, change to true for production
        sameSite: 'lax',
    });
    res.status(200).json({ message: 'Logout successful' });
});
exports.default = router;
