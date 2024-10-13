"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeSchema = void 0;
const mongoose_1 = require("mongoose");
exports.GradeSchema = new mongoose_1.Schema({
    gradeValue: { type: Number, required: true },
    subject: { type: String, required: true },
    date: { type: Date, default: Date.now }
});
