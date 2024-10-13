import { Teacher } from "../models/teacherModel";
import { Student } from "../models/studentModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginService = async (name: string, password: string) => {
    let user: any;
    let role: string;

    user = await Teacher.findOne({ name });
    if (user) {
        role = "TEACHER";
    } else {
        user = await Student.findOne({ name });
        if (user) {
            role = "STUDENT";
        } else {
            throw new Error("Invalid credentials");
        }
    }
    

    // בדיקת הסיסמה
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    // יצירת JWT
    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET as string, {
        expiresIn: '1h'
    });

    return { token, user, role };
};
