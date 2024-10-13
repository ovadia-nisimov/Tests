import { Request, Response } from "express";
import { registerTeacherService } from "../services/teacherService";

export const registerTeacher = async (req: Request, res: Response) => {
    const { name, email, password, className } = req.body;
    try {
        const teacher = await registerTeacherService(name, email, password, className);
        res.status(201).json({ message: "Teacher registered successfully", teacher });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};
