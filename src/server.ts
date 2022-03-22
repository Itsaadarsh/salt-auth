import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { login } from './controller/auth-login';
import { register } from './controller/auth-register';
import { getEmployee } from './controller/auth-getemp';
import { forgotpassword } from './controller/auth-forgotpass';

// Loading ENV variables
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(json());
app.use(cors());

// Routes

app.get('/', (_, res) => {
  res.json({ message: 'Welcome to Salt.pe backend!' });
});

app.use('/api/v1/', login);
app.use('/api/v1/', register);
app.use('/api/v1/', getEmployee);
app.use('/api/v1/', forgotpassword);

export { app };
