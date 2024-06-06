import { UserControllers } from './user.controller';
import { StudentValidations } from '../students/student.validation';
import validateRequest from '../../middlwares/validateRequest';
import express from 'express';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(StudentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
