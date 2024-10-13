import { Router } from "express";
import { addGrade, changeGrade, getClassAverage, getStudentGradeForSelf, getStudentGradeForTeacher, getClassGrades } from "../controllers/gradesController";
import { verifyStudentJWT, verifyTeacherJWT } from "../middleware/authMiddleware";


const router = Router();

router.post("/add", addGrade);

router.put("/update/:gradeId", changeGrade);

router.get("/student-access/student/:studentId", getStudentGradeForSelf);

router.get("/teacher-access/student/:studentId", getStudentGradeForTeacher);

router.get("/class/:classId", getClassGrades);

router.get("/class/:classId/average", getClassAverage);

export default router;
