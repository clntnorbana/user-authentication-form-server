"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const database_1 = __importDefault(require("./config/database"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
dotenv_1.default.config();
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    const allowedOrigins = [
        "http://localhost:5173",
        "https://user-authentication-server.onrender.com",
        // here
    ];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});
// routes
app.use("/api/authentication", authRoute_1.default);
app.use("/api/user", userRoute_1.default);
(0, database_1.default)();
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
