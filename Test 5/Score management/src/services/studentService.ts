import { Types } from "mongoose";
import  { IClass, Class } from "../models/classModel";
import  { IStudent, Student } from "../models/studentModel";

const registerStudent = async (name: string, email: string, password: string, className: string): Promise<IStudent> => {
  const theClass = await Class.findOne({ name: className });
  if (!theClass) {
    throw new Error("Class does not exist");
  }

  const newStudent: IStudent = await Student.create({
    name,
    email,
    password,
    class: theClass._id,
  });

  await Class.findByIdAndUpdate(theClass._id, { $push: { students: newStudent._id } });

  return newStudent;
};

const getStudentInfoService = async (teacherId: string, studentId: string): Promise<IStudent> => {
    const classInfo = await Class.findOne({ teacher: teacherId });
    const studentObjectId = new Types.ObjectId(studentId);
    if (!classInfo) {
      throw new Error("Class not found for this teacher");
    }

    if (!classInfo.students.includes(studentObjectId)) {
      throw new Error("Student not found in this class");
    }

    const student = await Student.findById(studentId).populate('class').populate('grades').exec();
    
    if (!student) {
      throw new Error("Student not found");
    }

    return student;
};
export { registerStudent, getStudentInfoService};