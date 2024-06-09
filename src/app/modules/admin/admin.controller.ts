import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';
import { RequestHandler } from 'express';

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins are retrieved successfully!',
    data: result,
  });
});

const getSingleAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.getSingleAdminFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin info got successfully',
    data: result,
  });
});

const updateAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;

  const result = await AdminServices.updateAdminIntoDB(id, admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin has updated successfully.',
    data: result,
  });
});

const deleteSingleAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.deleteAdminFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: false,
    message: 'Admin has deleted successfully',
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteSingleAdmin,
};
