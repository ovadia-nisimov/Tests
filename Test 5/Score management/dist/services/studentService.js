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
exports.getStudentInfoService = exports.registerStudent = void 0;
const mongoose_1 = require("mongoose");
const classModel_1 = require("../models/classModel");
const studentModel_1 = require("../models/studentModel");
const registerStudent = (name, email, password, className) => __awaiter(void 0, void 0, void 0, function* () {
    const theClass = yield classModel_1.Class.findOne({ name: className });
    if (!theClass) {
        throw new Error("Class does not exist");
    }
    const newStudent = yield studentModel_1.Student.create({
        name,
        email,
        password,
        class: theClass._id,
    });
    yield classModel_1.Class.findByIdAndUpdate(theClass._id, { $push: { students: newStudent._id } });
    return newStudent;
});
exports.registerStudent = registerStudent;
const getStudentInfoService = (teacherId, studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const classInfo = yield classModel_1.Class.findOne({ teacher: teacherId });
    const studentObjectId = new mongoose_1.Types.ObjectId(studentId);
    if (!classInfo) {
        throw new Error("Class not found for this teacher");
    }
    if (!classInfo.students.includes(studentObjectId)) {
        throw new Error("Student not found in this class");
    }
    const student = yield studentModel_1.Student.findById(studentId).populate('class').populate('grades').exec();
    if (!student) {
        throw new Error("Student not found");
    }
    return student;
});
exports.getStudentInfoService = getStudentInfoService;
