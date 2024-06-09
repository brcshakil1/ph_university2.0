import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacultyServices } from './faculty.service';
import { RequestHandler } from 'express';

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultiesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties are retrieved successfully!',
    data: result,
  });
});

const getSingleFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await FacultyServices.getSingleFacultyFromDB(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty info got successfully',
    data: result,
  });
});

const updateFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const { faculty } = req.body;

  const result = await FacultyServices.updateFacultyIntoDB(facultyId, faculty);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty has updated successfully.',
    data: result,
  });
});

const deleteSingleFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await FacultyServices.deleteFacultyFromDB(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: false,
    message: 'Faculty has deleted successfully',
    data: result,
  });
});

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteSingleFaculty,
};
