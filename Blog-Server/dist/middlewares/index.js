"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorize = exports.generatetoken = exports.SECRET = void 0;
exports.SECRET = 'SECr3t';
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generatetoken = (user) => {
    return jsonwebtoken_1.default.sign({ userid: user }, exports.SECRET, { expiresIn: "1h" });
};
exports.generatetoken = generatetoken;
const Authorize = (req, res, next) => {
    var _a;
    const authHeader = (_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split('; ').find(row => row.startsWith('authToken='));
    console.log("user = =  =", authHeader);
    if (authHeader) {
        const token = authHeader.split("authToken=")[1];
        jsonwebtoken_1.default.verify(token, exports.SECRET, (err, data) => {
            if (err) {
                console.log(err);
                return res.sendStatus(403);
            }
            if (!data) {
                console.log(data);
                return res.sendStatus(403);
            }
            else {
                if (typeof data === "string") {
                    console.log(data);
                    return res.sendStatus(403);
                }
                else {
                    console.log(data);
                    req.headers.userid = data.userid._id;
                    next();
                }
            }
        });
    }
    else {
        res.sendStatus(403);
    }
};
exports.Authorize = Authorize;
