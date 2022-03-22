import express from 'express';
import bcrypt from 'bcrypt';
import validationMiddleware from '../middlerware/validation/login';
import jwt from 'jsonwebtoken';
import validate from '../helper/validateErrors';
import { isEmpnameAvailableRepo } from '../repository/auth-repo';

const router = express.Router();

router.post('/login', validationMiddleware(), async (req: express.Request, res: express.Response) => {
  try {
    if (validate(req, res)) {
      return;
    }

    const { empUserName, password }: { empUserName: string; password: string } = req.body;
    const isEmpnameAvailable = await isEmpnameAvailableRepo(empUserName);

    if (isEmpnameAvailable.length == 0) {
      res.status(400).json({ error: true, data: { message: [`'${empUserName}' employee does not exists`] } });
      return;
    }

    bcrypt.compare(password, isEmpnameAvailable[0].password, (err, hash) => {
      if (err || hash === false) {
        res.status(400).json({ error: true, data: { message: [`Incorrect Password, Try Again!`] } });
        return;
      }

      const token: string = jwt.sign({ empid: isEmpnameAvailable[0]._id }, process.env.JWT_TOKEN!, {
        expiresIn: '24h',
      });

      res.status(201).json({ error: false, data: { token } });
      return;
    });
  } catch (err) {
    res.status(400).json({ error: true, data: { message: [err.message] } });
  }
});

export { router as login };
