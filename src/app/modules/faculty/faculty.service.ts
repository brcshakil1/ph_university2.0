import mongoose from 'mongoose';
import { TFaculty } from './faculty.interface';
import Faculty from './faculty.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../users/user.model';

const getAllFacultiesFromDB = async () => {
  const result = await Faculty.find().populate('academicDepartment');
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id).populate('academicDepartment');
  return result;
};

const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = { ...remainingData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findByIdAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );

    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete faculty.');
    }

    const userId = deletedFaculty.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }
  } catch (err) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete faculty.');
  }
};

export const FacultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
  deleteFacultyFromDB,
};
