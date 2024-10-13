"use strict";
// src/cotrollers/studentController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentInfo = exports.register = void 0;
const studentService_1 = require("../services/studentService");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, className } = req.body;
    try {
        const newStudent = yield (0, studentService_1.registerStudent)(name, email, password, className);
        res.status(201).json({ message: "Student registered and class created successfully", student: newStudent, });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.register = register;
const getStudentInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const teacherId = req.body.user.id;
        const student = yield (0, studentService_1.getStudentInfoService)(teacherId, studentId);
        res.status(200).json({ student });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getStudentInfo = getStudentInfo;
