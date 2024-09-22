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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)({ origin: 'http://localhost:3000', methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
app.use(body_parser_1.default.json());
app.use("/users", users_1.default);
app.use("/articles", articles_1.default);
app.use("/comments", comments_1.default);
console.log(process.env.MONGODB_URI);
const mongoUri = process.env.MONGODB_URI;
mongoose_1.default.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
app.listen(port, () => {
    console.log(`listening`);
});
