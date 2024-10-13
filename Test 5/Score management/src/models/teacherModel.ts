import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';


export interface ITeacher extends Document {
    name: string;
    email: string;
    password: string;
    className: string; 
    classId?: Types.ObjectId;
}


const TeacherSchema: Schema<ITeacher> = new Schema<ITeacher>({
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    email: { type: String, required: true, unique: true, validate: [validator.isEmail, 'invalid email'] },
    password: { type: String, required: true, minlength: 6 },
    className: { type: String, required: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class' } 
});


// הצפנת הסיסמה
TeacherSchema.pre<ITeacher>('save', async function (next) {
    if (!this.isModified('password')) return next(); 
    const salt = await bcrypt.genSalt(10); 
    this.password = await bcrypt.hash(this.password, salt); 
    next();
});


export const Teacher: Model<ITeacher> = mongoose.model<ITeacher>('Teacher', TeacherSchema);
