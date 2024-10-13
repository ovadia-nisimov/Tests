import { Request, Response } from "express";
import { loginService } from "../services/authService";

export const login = async (req: Request, res: Response) => {
    const { name, password } = req.body; 
    try {
        const { token, user, role } = await loginService(name, password);
        
        // שמירת הטוקן בקוקיז
        res.cookie('token', token, { httpOnly: true, secure: true }); 
        
        res.status(200).json({ message: "Login successful", role });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};





  
