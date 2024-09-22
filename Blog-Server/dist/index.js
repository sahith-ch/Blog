"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const comments_1 = __importDefault(require("./routes/comments"));
const mongoose_1 = __importDefault(require("mongoose"));
const articles_1 = __importDefault(require("./routes/articles"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)({ origin: 'http://localhost:3000', methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
app.use(body_parser_1.default.json());
app.use("/users", users_1.default);
app.use("/articles", articles_1.default);
app.use("/comments", comments_1.default);
app.listen(port, () => {
    console.log(`listening`);
});
mongoose_1.default.connect(process.env.MONGODB_URI ? process.env.MONGODB_URI : "")
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
