import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { IGrade, GradeSchema } from './gradeModel'; 


export interface IStudent extends Document {
    name: string;
    email: string;
    password: string;
    classId: Types.ObjectId; 
    className: string;
    grades: IGrade[];        
}


const StudentSchema: Schema<IStudent> = new Schema<IStudent>({
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    email: { type: String, required: true, unique: true, validate: [validator.isEmail, 'invalid email'] },
    password: { type: String, required: true, minlength: 6 },
    classId: { type: Schema.Types.ObjectId, ref: 'Class' }, 
    className: { type: String, required: true },
    grades: [GradeSchema] 
});


// הצפנת הסיסמה
StudentSchema.pre<IStudent>('save', async function (next) {
    if (!this.isModified('password')) return next(); 
    const salt = await bcrypt.genSalt(10); 
    this.password = await bcrypt.hash(this.password, salt); 
    next();
});

export const Student: Model<IStudent> = mongoose.model<IStudent>('Student', StudentSchema);
