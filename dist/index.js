"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./config/database"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
dotenv_1.default.config();
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "https://user-authentication-kappa.vercel.app",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", req.header("Origin") || "*");
//   res.removeHeader("x-powered-by");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });
// routes
app.use("/api/authentication", authRoute_1.default);
app.use("/api/user", userRoute_1.default);
(0, database_1.default)();
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
