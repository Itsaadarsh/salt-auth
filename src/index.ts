import express from 'express';
import cors from 'cors';
import log from './helper/log';
import connectDB from './config/db';
import { json } from 'body-parser';
import { login } from './controller/auth-login';
import { register } from './controller/auth-register';
import { getEmployee } from './controller/auth-getemp';
import { forgotpassword } from './controller/auth-forgotpass';

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(json());
app.use(cors());
app.use('/api/v1/', login);
app.use('/api/v1/', register);
app.use('/api/v1/', getEmployee);
app.use('/api/v1/', forgotpassword);

app.listen(PORT, async () => {
  await connectDB();
  log.info(`Salt Auth Server Running @ -  ${process.env.HOST}api/v1`);
});
