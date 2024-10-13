import { Router } from "express";
import { addGrade, updateGrade, getStudentGrades, getClassGrades, getClassAverage } from "../controllers/gradesController";

const router = Router();

router.post("/add", addGrade);

router.put("/update/:gradeId", updateGrade);

router.get("/student/:studentId", getStudentGrades);

router.get("/class/:classId", getClassGrades);

router.get("/class/:classId/average", getClassAverage);

export default router;
