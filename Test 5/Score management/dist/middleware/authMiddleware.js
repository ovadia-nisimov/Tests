"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyStudentJWT = exports.verifyTeacherJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// פונקציה לבדיקת טוקן עבור מורים
const verifyTeacherJWT = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'Authorization token is missing' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // בדיקה אם ה-role הוא TEACHER
        if (decoded.role !== 'TEACHER') {
            return res.status(403).json({ error: 'Access denied: not a teacher' });
        }
        // שמירת ה-userId בבקשה (לשימוש עתידי)
        req.body.teacherId = decoded.userId;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};
exports.verifyTeacherJWT = verifyTeacherJWT;
// פונקציה לבדיקת טוקן עבור תלמידים
const verifyStudentJWT = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'Authorization token is missing' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // בדיקה אם ה-role הוא STUDENT
        if (decoded.role !== 'STUDENT') {
            return res.status(403).json({ error: 'Access denied: not a student' });
        }
        // שמירת ה-userId בבקשה (לשימוש עתידי)
        req.body.statusId = decoded.userId;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};
exports.verifyStudentJWT = verifyStudentJWT;
