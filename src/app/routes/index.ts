import express from 'express';
import { StudentRoutes } from '../modules/students/student.route';
import { UserRoutes } from '../modules/users/user.route';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRouter } from './../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.route';
import { FacultyRouter } from '../modules/faculty/faculty.route';
import { AdminRouter } from '../modules/admin/admin.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRouter,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRouter,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRouter,
  },
  {
    path: '/faculties',
    route: FacultyRouter,
  },
  {
    path: '/admins',
    route: AdminRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
