import express from 'express';
import { getEmployeeRepo } from '../repository/auth-repo';
import auth from '../middlerware/auth';

const router = express.Router();

router.get('/employee', auth, async (req: express.Request, res: express.Response) => {
  const employee = await getEmployeeRepo(req.emp!.empid);
  res.status(201).json({
    error: false,
    data: { _id: employee?._id, empUserName: employee?.empUserName, email: employee?.email },
  });
});

export { router as getEmployee };
