import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlwares/validateRequest';
import { StudentValidations } from './student.validation';

const router = express.Router();

// will call the controller
// router.post('/create-student', StudentControllers.createStudent);

router.get('/', StudentControllers.getAllStudent);

router.get('/:studentId', StudentControllers.getSingleStudent);

router.patch(
  '/:studentId',
  //   validateRequest(StudentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete('/:studentId', StudentControllers.deleteSingleStudent);

export const StudentRoutes = router;
