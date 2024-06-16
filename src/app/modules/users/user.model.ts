import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser, UserModel>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: true },
    role: { type: String, enum: ['admin', 'student', 'faculty'] },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// pre save middleware/ hooks: will work in create(), save()
userSchema.pre('save', async function (next) {
  // const user = this;
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_routes),
  );
  next();
});

// post save middleware/ hooks
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// find the user
userSchema.statics.isUserExistByCustomId = async function (id: string) {
  return await User.findOne({ id });
};

// this static method is for checking if the given password is match with user password
userSchema.statics.isPasswordMatch = async function (
  plainTextPassword,
  hashPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
