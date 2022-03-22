import sendEmail from '../helper/sendEmail';
import express from 'express';
import jwt from 'jsonwebtoken';
import validationMiddleware from '../middlerware/validation/forgotpassword';
import validate from '../helper/validateErrors';
import { isEmailAvailableRepo } from '../repository/auth-repo';

const router = express.Router();

router.post(
  '/forgotpassword',
  validationMiddleware(),
  async (req: express.Request, res: express.Response) => {
    try {
      if (validate(req, res)) {
        return;
      }

      const { email }: { email: string } = req.body;

      const isEmailAvailable = await isEmailAvailableRepo(email);

      if (isEmailAvailable.length == 0) {
        res.status(400).json({ error: true, data: { message: [`Something went wrong!`] } });
        return;
      }

      const token: string = jwt.sign({ email: isEmailAvailable[0].email }, process.env.JWT_TOKEN!, {
        expiresIn: '300s',
      });

      const resetURL: string = `${process.env.DEV_HOST}${process.env.PORT}/api/v1/forgotpassword/${token}`;
      const isEmailSent = await sendEmail(isEmailAvailable[0].email, 'Reset Password - Salt', resetURL);
      if (isEmailSent) {
        res.status(201).json({ error: false, data: { message: ['Reset link sent to your email'] } });
        return;
      }
      res.status(400).json({ error: true, data: { message: ['Something went wrong'] } });
    } catch (err) {
      res.status(400).json({ error: true, data: { message: [err.message] } });
    }
  }
);

export { router as forgotpassword };
