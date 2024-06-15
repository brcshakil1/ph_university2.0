import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentsControllers } from './academicDepartment.controller';

const router = express.Router();

router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentsControllers.createAcademicDepartment,
);

router.get('/', AcademicDepartmentsControllers.getAllAcademicDepartment);

router.get(
  '/:departmentId',
  AcademicDepartmentsControllers.getSingleAcademicDepartment,
);

router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentsControllers.updateSingleAcademicDepartment,
);

export const AcademicDepartmentRouter = router;
