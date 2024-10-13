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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTeacher = void 0;
const teacherService_1 = require("../services/teacherService");
const registerTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, className } = req.body;
    try {
        const teacher = yield (0, teacherService_1.registerTeacherService)(name, email, password, className);
        res.status(201).json({ message: "Teacher registered successfully", teacher });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.registerTeacher = registerTeacher;
