import express from 'express';
import validateRequest from '../../middlwares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultiesController } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultiesController.createAcademicFaculty,
);

router.get('/', AcademicFacultiesController.getAllAcademicFaculty);
router.get('/:facultyId', AcademicFacultiesController.getSingleAcademicFaculty);
router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultiesController.updateSingleAcademicFaculty,
);

export const AcademicFacultyRouter = router;
