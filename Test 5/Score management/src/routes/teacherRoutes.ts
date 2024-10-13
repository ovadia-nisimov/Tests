import { Router } from "express";
import { registerTeacher } from "../controllers/teacherController";


const router = Router();


router.post("/register", registerTeacher);


export default router;
