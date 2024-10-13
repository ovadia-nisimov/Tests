import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// פונקציה לבדיקת טוקן עבור מורים
export const verifyTeacherJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Authorization token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role: string, userId: string };

    if (decoded.role !== 'TEACHER') {
      return res.status(403).json({ error: 'Access denied: not a teacher' });
    }

    req.body.teacherId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// פונקציה לבדיקת טוקן עבור תלמידים
export const verifyStudentJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Authorization token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role: string, userId: string };

    if (decoded.role !== 'STUDENT') {
      return res.status(403).json({ error: 'Access denied: not a student' });
    }

    req.body.statusId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
