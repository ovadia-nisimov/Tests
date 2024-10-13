import mongoose, { Schema, Document } from 'mongoose';


export interface IGrade {
    gradeValue: number; 
    subject: string;    
    date: Date;        
}


export const GradeSchema: Schema<IGrade> = new Schema<IGrade>({
    gradeValue: { type: Number, required: true },
    subject: { type: String, required: true },
    date: { type: Date, default: Date.now }
});
