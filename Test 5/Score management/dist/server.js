"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const gradesRoutes_1 = __importDefault(require("./routes/gradesRoutes"));
const studentRoutes_1 = __importDefault(require("./routes/studentRoutes"));
const teacherRoutes_1 = __importDefault(require("./routes/teacherRoutes"));
const db_1 = require("./config/db");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./config/swagger"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
// Middleware
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
(0, db_1.connectDB)();
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
// Routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/grades", gradesRoutes_1.default);
app.use("/api/student", studentRoutes_1.default);
app.use("/api/teacher", teacherRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
