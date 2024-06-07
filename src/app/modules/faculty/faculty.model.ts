import { Schema, model } from 'mongoose';
import { TFaculty } from './faculty.interface';

const userNameSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const facultySchema = new Schema<TFaculty>({
  id: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: userNameSchema, required: true },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not valid.',
    },
    required: true,
  },
  dateOfBirth: { type: Date, required: true },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  profileImage: { type: String, required: true },

  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicFaculty',
    required: true,
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
    required: true,
  },
  isDeleted: { type: Boolean, default: false },
});

const Faculty = model<TFaculty>('Faculty', facultySchema);

export default Faculty;
