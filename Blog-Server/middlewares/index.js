"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorize = exports.generatetoken = exports.SECRET = void 0;
exports.SECRET = 'SECr3t';
var jsonwebtoken_1 = require("jsonwebtoken");
var generatetoken = function (user) {
    return jsonwebtoken_1.default.sign({ userid: user.id }, exports.SECRET, { expiresIn: "1h" });
};
exports.generatetoken = generatetoken;
var Authorize = function (req, res, next) {
    var authHeader = req.headers.authorization;
    if (authHeader) {
        var token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, exports.SECRET, function (err, data) {
            if (err) {
                return res.sendStatus(403);
            }
            if (!data) {
                return res.sendStatus(403);
            }
            else {
                if (typeof data === "string") {
                    return res.sendStatus(403);
                }
                else {
                    req.headers.userid = data.userid;
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
