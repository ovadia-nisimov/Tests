import {Class} from "../models/classModel";
import  {Student, IStudent } from "../models/studentModel";
import {Teacher, ITeacher} from "../models/teacherModel";
import { Types } from "mongoose";
import { IGrade } from "../models/gradeModel";

const addGradeService = async (teacherId: string, studentId: Types.ObjectId, subject: string, grade: number): Promise<IStudent> => {
    const classInfo = await Class.findOne({ teacher: teacherId });
    if (!classInfo) {
      throw new Error("Class not found for this teacher");
    }

    if (!classInfo.students.includes(studentId)) {
      throw new Error("Student not found in this class");
    }

    const student = await Student.findByIdAndUpdate(
      studentId,
      { $push: { grades: { subject, grade } } },
      { new: true } 
    );

    if (!student) {
      throw new Error("Failed to update student's grades");
    }

    return student;
};

const changeGradeService = async (teacherId: string, studentId: string, subject: string, newGrade: number): Promise<IStudent | null> => {
    
    const classInfo = await Class.findOne({ teacher: teacherId });
    if (!classInfo) {
        throw new Error("Class not found for this teacher");
    }
    
    const studentObjectId = new Types.ObjectId(studentId);
    if (!classInfo.students.includes(studentObjectId)) {
        throw new Error("Student not found in this class");
    }

    const student = await Student.findOneAndUpdate(
        { _id: studentObjectId, 'grades.subject': subject },
        { $set: { 'grades.$.grade': newGrade } },
        { new: true }
    );

    if (!student) {
        throw new Error("Failed to update grade or subject not found");
    }

    return student;
};

const getClassAverageService = async (teacherId: string): Promise<number> => {
    const classInfo = await Class.findOne({ teacher: teacherId });
    if (!classInfo) {
        throw new Error("Class not found for this teacher");
    }

    const students = await Student.find({ class: classInfo._id });

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
};

const getStudentGradesForTeacherService = async (teacherId: string, studentId: string): Promise<IStudent | null> => {
    const studentObjectId = new Types.ObjectId(studentId);

    const classInfo = await Class.findOne({ teacher: teacherId });
    if (!classInfo) {
        throw new Error("Class not found for this teacher");
    }

    // בדיקה אם התלמיד שייך לכיתה של המורה
    if (!classInfo.students.includes(studentObjectId)) {
        throw new Error("Student not found in this class");
    }

    // שליפת התלמיד והציונים
    const student = await Student.findById(studentObjectId).populate('grades');
    if (!student) {
        throw new Error("Student not found");
    }

    return student;
};

const getStudentGradesForSelfService = async (studentId: string): Promise<IStudent | null> => {
    const student = await Student.findById(studentId).populate('grades').exec();
    if (!student) {
        throw new Error("Student not found");
    }

    return student;
};




const getClassGradesService = async (classId: string): Promise<IStudent[]> => {
    const classInfo = await Class.findById(classId);
    if (!classInfo) {
        throw new Error("Class not found");
    }

    const students = await Student.find({ class: classInfo._id }).populate('grades');
    if (!students.length) {
        throw new Error("No students found in this class");
    }

    return students; 
};


export { addGradeService, changeGradeService, getClassAverageService, getStudentGradesForTeacherService, getStudentGradesForSelfService, getClassGradesService };