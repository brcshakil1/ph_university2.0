import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

// year + semester code + 4 digit number
export const generateStudentId = async (payload: TAcademicSemester) => {
  //first time 0000
  let currentId = (0).toString();

  const lastStudentSemesterId = await findLastStudentId();
  const lastStudentSemesterCode = lastStudentSemesterId?.substring(4, 6);
  const lastStudentSemesterYear = lastStudentSemesterId?.substring(0, 4);

  const currentYear = payload?.year;
  const currentCode = payload?.code;

  if (
    lastStudentSemesterId &&
    lastStudentSemesterCode === currentCode &&
    lastStudentSemesterYear === currentYear
  ) {
    currentId = lastStudentSemesterId?.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
