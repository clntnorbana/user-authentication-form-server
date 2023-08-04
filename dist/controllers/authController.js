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
exports.logout = exports.login = exports.register = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validator_1 = __importDefault(require("validator"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
// register user
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, username, password } = req.body;
        if (!fullName || !username || !password) {
            return res.status(400).json({ message: "Field is required" });
        }
        if (!validator_1.default.isStrongPassword(password)) {
            return res.status(400).json({ message: "Password is not strong enough" });
        }
        const userExists = yield userModel_1.default.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: "Username already exists" });
        }
        // create user account
        const createdUser = yield userModel_1.default.create({
            fullName,
            username,
            password,
        });
        res.status(200).json({
            _id: createdUser._id,
            fullName: createdUser.fullName,
            username: createdUser.username,
        });
    }
    catch (error) {
        error instanceof Error
            ? res.status(400).json({ message: error.message })
            : console.log("Unexpected error", error);
    }
});
exports.register = register;
// login user
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Field is required" });
        }
        const user = yield userModel_1.default.findOne({ username });
        if (!(user && (yield bcryptjs_1.default.compare(password, user.password)))) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        // authentication passed? generate token
        // here
        (0, generateToken_1.default)(res, user._id);
        res.status(200).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
        });
    }
    catch (error) {
        error instanceof Error
            ? res.status(400).json({ message: error.message })
            : console.log("Unexpected error", error);
    }
});
exports.login = login;
// logout user
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0),
        });
        res.status(200).json({ message: "logged out" });
    }
    catch (error) {
        error instanceof Error
            ? res.status(400).json({ message: error.message })
            : console.log("Unexpected error", error);
    }
});
exports.logout = logout;
