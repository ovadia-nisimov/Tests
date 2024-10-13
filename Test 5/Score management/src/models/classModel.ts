import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IClass extends Document {
    name: string; 
    teacherId: Types.ObjectId; 
    students: Types.ObjectId[]; 
}


const ClassSchema: Schema<IClass> = new Schema<IClass>({
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true }, 
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }] 
});


export const Class: Model<IClass> = mongoose.model<IClass>('Class', ClassSchema);
