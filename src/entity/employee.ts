import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    empUserName: { type: mongoose.Schema.Types.String, required: true, unique: true },
    email: { type: mongoose.Schema.Types.String, required: true, unique: true },
    password: { type: mongoose.Schema.Types.String, required: true },
  },
  { timestamps: true }
);

export interface EMPLOYEE extends mongoose.Document {
  _id: string;
  empUserName: string;
  email: string;
  password: string;
}

const employeeModel = mongoose.model<EMPLOYEE>('employee', employeeSchema);

export default module.exports = employeeModel;
