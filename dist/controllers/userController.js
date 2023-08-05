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
exports.deleteUserAccount = exports.updateUserProfile = exports.getUserProfile = void 0;
const validator_1 = __importDefault(require("validator"));
const userModel_1 = __importDefault(require("../models/userModel"));
// get user profile
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findById(req.userData._id);
        if (!user) {
            return res.status(404).json({ message: "User do not exists" });
        }
        res.status(200).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
        });
    }
    catch (error) {
        error instanceof Error
            ? res.status(401).json({ message: error.message })
            : console.log("Unexpected error", error);
    }
});
exports.getUserProfile = getUserProfile;
// update user profile
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findById(req.userData._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user) {
            user.fullName = req.body.fullName || user.fullName;
            user.username = req.body.username || user.username;
            if (req.body.password) {
                if (!validator_1.default.isStrongPassword(req.body.password)) {
                    return res
                        .status(400)
                        .json({ message: "Password is not strong enough" });
                }
                user.password = req.body.password;
            }
            // updated user
            const updatedUser = yield user.save();
            res.status(200).json({
                _id: updatedUser._id,
                username: updatedUser.username,
                fullName: updatedUser.fullName,
            });
        }
    }
    catch (error) {
        error instanceof Error
            ? res.status(400).json({ message: error.message })
            : console.log("Unexpected error", error);
    }
});
exports.updateUserProfile = updateUserProfile;
// delete user account
const deleteUserAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findById(req.userData._id);
        yield (user === null || user === void 0 ? void 0 : user.deleteOne());
        res.clearCookie("jwt");
        res.status(200).json({ message: "Account deleted" });
    }
    catch (error) {
        error instanceof Error
            ? res.status(400).json({ message: error.message })
            : console.log("Unexpected error", error);
    }
});
exports.deleteUserAccount = deleteUserAccount;
