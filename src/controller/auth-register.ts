import express from 'express';
import validationMiddleware from '../middlerware/validation/register';
import validate from '../helper/validateErrors';
import bcrypt from 'bcrypt';
import { insertEmployeeRepo, isEmailAvailableRepo, isEmpnameAvailableRepo } from '../repository/auth-repo';

const router = express.Router();

router.post('/register', validationMiddleware(), async (req: express.Request, res: express.Response) => {
  try {
    if (validate(req, res)) {
      return;
    }

    const { empUserName, email, password }: { empUserName: string; email: string; password: string } =
      req.body;

    const isEmailAvailable = await isEmailAvailableRepo(email);
    const isEmpnameAvailable = await isEmpnameAvailableRepo(empUserName);

    if (isEmailAvailable.length || isEmpnameAvailable.length != 0) {
      res.status(400).json({ error: true, data: { message: [`This employee is already registered`] } });
      return;
    }

    bcrypt.hash(password, 11, async (err, hash) => {
      if (!err) {
        await insertEmployeeRepo(empUserName, email, hash);
        res.status(201).json({
          error: false,
          data: { message: ['Employee successfully registered!'] },
        });
        return;
      }
    });
  } catch (err) {
    res.status(400).json({ error: true, data: { message: [err.message] } });
  }
});

export { router as register };
