import express, { Express } from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes";
import gradesRouter from "./routes/gradesRoutes";
import studentRouter from "./routes/studentRoutes";
import teacherRouter from "./routes/teacherRoutes";
import { connectDB } from "./config/db";
import cookieParser from 'cookie-parser';


dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());


connectDB();


// Routes
app.use("/api/auth", authRouter);
app.use("/api/grades", gradesRouter);
app.use("/api/student", studentRouter);
app.use("/api/teacher", teacherRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
