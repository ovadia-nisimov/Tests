"use strict";
// src/models/gradeModel.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeSchema = void 0;
const mongoose_1 = require("mongoose");
exports.GradeSchema = new mongoose_1.Schema({
    subject: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    grade: { type: Number, required: true },
});
