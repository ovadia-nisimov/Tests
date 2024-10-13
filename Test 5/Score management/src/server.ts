import express, { Express } from "express";
import dotenv from "dotenv";
import postRouter from "./routes/authRoutes";
import userRouter from "./routes/gradesRoutes";
import { connectDB } from "./config/db";
import cookieParser from 'cookie-parser';
import { verifyJWT } from "./middleware/authMiddleware";
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './config/swagger'; 


dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());


connectDB();


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Routes
app.use("/api/auth", authRouter);
app.use("/api/grades", gradesRouter);
app.use("/api/student", studentRouter);
app.use("/api/teacher", teacherRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
