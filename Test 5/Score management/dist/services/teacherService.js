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
exports.registerTeacherService = void 0;
const classModel_1 = require("../models/classModel");
const teacherModel_1 = require("../models/teacherModel");
const registerTeacherService = (name, email, password, className) => __awaiter(void 0, void 0, void 0, function* () {
    const existingClass = yield classModel_1.Class.findOne({ name: className });
    if (existingClass) {
        throw new Error("Class already exists");
    }
    const newClass = yield classModel_1.Class.create({
        name: className,
    });
    const newTeacher = yield teacherModel_1.Teacher.create({
        name,
        email,
        password,
        class: newClass._id,
    });
    yield classModel_1.Class.findByIdAndUpdate(newClass._id, { $set: { teachers: newTeacher._id } });
    return newTeacher;
});
exports.registerTeacherService = registerTeacherService;
