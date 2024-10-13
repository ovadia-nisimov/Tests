import  { Class, IClass } from "../models/classModel";
import  {Teacher, ITeacher } from "../models/teacherModel";

export const registerTeacherService = async (name: string, email: string, password: string, className: string): Promise<ITeacher> => {
  const existingClass = await Class.findOne({ name: className });
  if (existingClass) {
    throw new Error("Class already exists");
  }

  const newClass: IClass = await Class.create({
    name: className,
  });

  const newTeacher: ITeacher = await Teacher.create({
    name,
    email,
    password,
    class: newClass._id,
  });

  await Class.findByIdAndUpdate(newClass._id, { $set: { teachers: newTeacher._id } });
  return newTeacher;
};

