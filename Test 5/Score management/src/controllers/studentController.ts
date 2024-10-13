import { Request, Response } from "express";
import { registerStudent, getStudentInfoService } from "../services/studentService";

export const register = async (req: Request, res: Response) => {
  const { name, email, password, className } = req.body;
  try {
    const newStudent = await registerStudent(name, email, password, className);
    res.status(201).json({message: "Student registered and class created successfully",student: newStudent,});
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getStudentInfo = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;
        const teacherId = req.body.user.id;
        const student = await getStudentInfoService(teacherId, studentId);

        res.status(200).json({ student });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
}
};