import { Types } from 'mongoose';
import { TUserName } from '../../interfaces/userName.interface';

export interface TFaculty {
  id: string; // Assuming 'id(generated)' is a string. Adjust if it's another type.
  user: Types.ObjectId;
  name: TUserName;
  gender: 'male' | 'female' | 'other'; // Assuming Gender is a limited set of strings. Adjust if necessary.
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage: string; // Assuming this is a URL or file path as a string.

  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
}
