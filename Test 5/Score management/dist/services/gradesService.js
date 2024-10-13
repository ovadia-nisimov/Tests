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
exports.getClassGradesService = exports.getStudentGradesForSelfService = exports.getStudentGradesForTeacherService = exports.getClassAverageService = exports.changeGradeService = exports.addGradeService = void 0;
const classModel_1 = require("../models/classModel");
const studentModel_1 = require("../models/studentModel");
const mongoose_1 = require("mongoose");
const addGradeService = (teacherId, studentId, subject, grade) => __awaiter(void 0, void 0, void 0, function* () {
    const classInfo = yield classModel_1.Class.findOne({ teacher: teacherId });
    if (!classInfo) {
        throw new Error("Class not found for this teacher");
    }
    if (!classInfo.students.includes(studentId)) {
        throw new Error("Student not found in this class");
    }
    const student = yield studentModel_1.Student.findByIdAndUpdate(studentId, { $push: { grades: { subject, grade } } }, { new: true });
    if (!student) {
        throw new Error("Failed to update student's grades");
    }
    return student;
});
exports.addGradeService = addGradeService;
const changeGradeService = (teacherId, studentId, subject, newGrade) => __awaiter(void 0, void 0, void 0, function* () {
    const classInfo = yield classModel_1.Class.findOne({ teacher: teacherId });
    if (!classInfo) {
        throw new Error("Class not found for this teacher");
    }
    const studentObjectId = new mongoose_1.Types.ObjectId(studentId);
    if (!classInfo.students.includes(studentObjectId)) {
        throw new Error("Student not found in this class");
    }
    const student = yield studentModel_1.Student.findOneAndUpdate({ _id: studentObjectId, 'grades.subject': subject }, { $set: { 'grades.$.grade': newGrade } }, { new: true });
    if (!student) {
        throw new Error("Failed to update grade or subject not found");
    }
    return student;
});
exports.changeGradeService = changeGradeService;
const getClassAverageService = (teacherId) => __awaiter(void 0, void 0, void 0, function* () {
    const classInfo = yield classModel_1.Class.findOne({ teacher: teacherId });
    if (!classInfo) {
        throw new Error("Class not found for this teacher");
    }
    const students = yield studentModel_1.Student.find({ class: classInfo._id });
    if (!students.length) {
        throw new Error("No students found in this class");
    }
    let totalGrades = 0;
    let totalGradesCount = 0;
    students.forEach(student => {
        student.grades.forEach(grade => {
            totalGrades += grade.grade;
            totalGradesCount++;
        });
    });
    if (totalGradesCount === 0) {
        throw new Error("No grades available for this class");
    }
    return totalGrades / totalGradesCount;
});
exports.getClassAverageService = getClassAverageService;
const getStudentGradesForTeacherService = (teacherId, studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const studentObjectId = new mongoose_1.Types.ObjectId(studentId);
    // מציאת הכיתה של המורה
    const classInfo = yield classModel_1.Class.findOne({ teacher: teacherId });
    if (!classInfo) {
        throw new Error("Class not found for this teacher");
    }
    // בדיקה אם התלמיד שייך לכיתה של המורה
    if (!classInfo.students.includes(studentObjectId)) {
        throw new Error("Student not found in this class");
    }
    // שליפת התלמיד והציונים
    const student = yield studentModel_1.Student.findById(studentObjectId).populate('grades');
    if (!student) {
        throw new Error("Student not found");
    }
    return student;
});
exports.getStudentGradesForTeacherService = getStudentGradesForTeacherService;
const getStudentGradesForSelfService = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield studentModel_1.Student.findById(studentId).populate('grades').exec();
    if (!student) {
        throw new Error("Student not found");
    }
    return student;
});
exports.getStudentGradesForSelfService = getStudentGradesForSelfService;
const getClassGradesService = (classId) => __awaiter(void 0, void 0, void 0, function* () {
    const classInfo = yield classModel_1.Class.findById(classId);
    if (!classInfo) {
        throw new Error("Class not found");
    }
    // Fetch all students in the class and populate their grades
    const students = yield studentModel_1.Student.find({ class: classInfo._id }).populate('grades');
    if (!students.length) {
        throw new Error("No students found in this class");
    }
    return students; // Return the list of students with their grades
});
exports.getClassGradesService = getClassGradesService;
