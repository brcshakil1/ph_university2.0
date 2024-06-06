import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  Months,
  academicSemesterCode,
  academicSemesterName,
} from './academicSemester.constant';
import AppError from '../../errors/AppError';

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: { type: String, required: true, enum: academicSemesterName },
  code: { type: String, enum: academicSemesterCode, required: true },
  year: { type: String, required: true },
  startMonth: { type: String, enum: Months },
  endMonth: { type: String, enum: Months },
});

// check korte hobe, ei boshor same namee r kunu semester create kora hoyeche kina.
// Autumn 01
// Summer 02
// Fall 03
academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExist = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });

  if (isSemesterExist) {
    throw new AppError(403, 'Semester is already exist');
  }
  next();
});

const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);

export default AcademicSemester;
