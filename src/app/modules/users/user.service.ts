/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import AcademicSemester from '../academicSemester/academicSemester.model';
// import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { TStudent } from '../students/student.interface';
import Student from '../students/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateFacultyId, generateStudentId } from './user.utils';
import httpStatus from 'http-status';
import { TFaculty } from '../faculty/faculty.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import Faculty from './../faculty/faculty.model';
import AppError from './../../errors/AppError';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // manually generated id
    if (!admissionSemester) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Admission Semester is null');
    }
    userData.id = await generateStudentId(admissionSemester);
    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // built-in static method

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create new user');
    }

    // create a student (transaction-1\2)
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // reference _id

    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create new student',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, err);
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password not given then use default password
  userData.password = password || (config.default_password as string);

  // set faculty role
  userData.role = 'faculty';

  // find if academic department is exist
  const academicDepartment = await AcademicDepartment.findById(
    payload?.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic department is required field. Please provide it and then create faculty',
    );
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // set generate id
    userData.id = await generateFacultyId();
    console.log(userData?.id, 'iddddddddddddddd');

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create a user while creating faculty.',
      );
    }

    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // reference id

    // create a faculty transaction-2
    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, 'errrrrror');
  }
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
};
