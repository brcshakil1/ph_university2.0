import { UserControllers } from './user.controller';
import { StudentValidations } from '../students/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import express from 'express';
import { AdminValidations } from '../admin/admin.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(StudentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post('/create-faculties', UserControllers.createFaculty);

router.post(
  '/create-admins',
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);

export const UserRoutes = router;
