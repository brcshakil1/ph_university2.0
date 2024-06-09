import mongoose from 'mongoose';
import { Admin } from './admin.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../users/user.model';
import { TAdmin } from './admin.interface';

const getAllAdminFromDB = async () => {
  const result = await Admin.find();
  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id);
  return result;
};

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = { ...remainingData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete faculty.');
    }

    // get user _id from deletedAdmin
    const userId = deletedAdmin.user;

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

export const AdminServices = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
};
