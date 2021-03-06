import employeeModel from '../entity/employee';
import mongoose from 'mongoose';

// All DB calls for authentication
const isEmailAvailableRepo = async (email: string) => {
  return await employeeModel.find({ email });
};

const isEmpnameAvailableRepo = async (empUserName: string) => {
  return await employeeModel.find({ empUserName });
};

const insertEmployeeRepo = async (empUserName: string, email: string, hash: string) => {
  await new employeeModel({
    _id: new mongoose.Types.ObjectId(),
    empUserName: empUserName,
    email: email,
    password: hash,
  }).save();
};

const getEmployeeRepo = async (empid: any) => {
  return await employeeModel.findOne({ _id: empid });
};

const updatePasswordRepo = async (email: string, password: string) => {
  return await employeeModel.findOneAndUpdate({ email }, { password });
};

export {
  isEmailAvailableRepo,
  isEmpnameAvailableRepo,
  insertEmployeeRepo,
  getEmployeeRepo,
  updatePasswordRepo,
};
