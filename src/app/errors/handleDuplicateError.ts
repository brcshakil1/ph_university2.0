/* eslint-disable @typescript-eslint/no-explicit-any */
import { TGenericResponse } from '../interfaces/error.interface';

const handleDuplicateError = (err: any): TGenericResponse => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]+)"/);

  const extractedMessage = match && match[1];

  const errorSources = [
    {
      path: '',
      message: extractedMessage,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid Id',
    errorSources,
  };
};

export default handleDuplicateError;
