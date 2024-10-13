import { Request, Response } from "express";
import { addGradeService, changeGradeService, getClassAverageService, getStudentGradesForTeacherService, getStudentGradesForSelfService, getClassGradesService } from "../services/gradesService";

const addGrade = async (req: Request, res: Response) => {
    try {
        const { studentId, subject, grade } = req.body;
        const teacherId = req.body.user.id;
        const newGrade = await addGradeService(teacherId, studentId, subject, grade);
        res.status(201).json({ message: "Grade added successfully", grade: newGrade });
    } catch (error) {
        res.status(500).json({ message: "Add grade error", error });
    }
};

const changeGrade = async (req: Request, res: Response) => {
    try {
        const { studentId, subject, grade } = req.body;
        const teacherId = req.body.user.id;
        const updatedStudent = await changeGradeService(teacherId, studentId, subject, grade);
        res.status(200).json({ message: "Grade updated successfully", student: updatedStudent });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

const getClassAverage = async (req: Request, res: Response) => {
    try {
        const teacherId = req.body.user.id;

        const average = await getClassAverageService(teacherId);

        res.status(200).json({ message: "Class average calculated successfully", average });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

const getStudentGradeForTeacher = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;
        const teacherId = req.body.user.id;

        const student = await getStudentGradesForTeacherService(teacherId, studentId);

        res.status(200).json({ student });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

const getStudentGradeForSelf = async (req: Request, res: Response) => {
    try {
        const studentId = req.body.user.id; 

        const student = await getStudentGradesForSelfService(studentId);

        res.status(200).json({ student });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};



const getClassGrades = async (req: Request, res: Response) => {
    try {
        const { classId } = req.params; 

        const grades = await getClassGradesService(classId);

        res.status(200).json({ message: "Grades retrieved successfully", grades });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export { addGrade, changeGrade, getClassAverage, getStudentGradeForTeacher, getStudentGradeForSelf, getClassGrades };