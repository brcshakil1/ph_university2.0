import mongoose from 'mongoose';
import { TErrorSources, TGenericResponse } from '../interfaces/error.interface';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericResponse => {
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value?.path,
        message: value?.message,
      };
    },
  );

  const statusCode = 400;

  return {
    statusCode,
    message: 'validation error.',
    errorSources,
  };
};

export default handleValidationError;
