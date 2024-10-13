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
exports.loginService = void 0;
const teacherModel_1 = require("../models/teacherModel");
const studentModel_1 = require("../models/studentModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginService = (name, password) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    let role;
    // חיפוש משתמש לפי שם עבור מורה
    user = yield teacherModel_1.Teacher.findOne({ name });
    if (user) {
        role = "TEACHER";
    }
    else {
        // אם לא נמצא מורה, חיפוש סטודנט
        user = yield studentModel_1.Student.findOne({ name });
        if (user) {
            role = "STUDENT";
        }
        else {
            throw new Error("Invalid credentials");
        }
    }
    // בדיקת הסיסמה
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch)
        throw new Error("Invalid credentials");
    // יצירת JWT
    const token = jsonwebtoken_1.default.sign({ id: user._id, role }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
    return { token, user, role };
});
exports.loginService = loginService;
