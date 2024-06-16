import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../users/user.model';
import { TLoginUser } from './auth.interface';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exists
  // const isUserExists = await User.findOne({ id: payload?.id });
  const user = await User.isUserExistByCustomId(payload?.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user not found!');
  }

  // // checking if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'The user is deleted!');
  }

  // // checking if the user is already blocked
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'The user is blocked!');
  }

  // // checking if the password is correct
  if (!(await User.isPasswordMatch(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password not match');
  }
  // // Access Granted: send AccessToken and RefreshToken
  // console.log(isPasswordMatch);

  return {};
};

export const AuthServices = {
  loginUser,
};
