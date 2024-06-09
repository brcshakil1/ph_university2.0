import express from 'express';
import { FacultyControllers } from './faculty.controller';

const router = express.Router();

router.get('/', FacultyControllers.getAllFaculties);

router.get('/:facultyId', FacultyControllers.getSingleFaculty);

router.patch('/:facultyId', FacultyControllers.updateFaculty);

router.delete('/:facultyId', FacultyControllers.deleteSingleFaculty);

export const FacultyRouter = router;
