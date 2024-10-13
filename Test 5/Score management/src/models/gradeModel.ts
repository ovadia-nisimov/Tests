// src/models/gradeModel.ts

import mongoose, { Schema, Document, Types, Model } from "mongoose";

export interface IGrade {
  subject: string;
  date: Date;
  grade: number;
}

export const GradeSchema = new Schema<IGrade>({
  subject: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  grade: { type: Number, required: true },
});