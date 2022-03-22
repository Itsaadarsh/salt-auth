import jwt from 'jsonwebtoken';
import express from 'express';

declare global {
  namespace Express {
    interface Request {
      emp: any;
    }
  }
}

// Authentication Middleware
const auth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const headerToken: string = req.headers.authorization?.split(' ')[1]!;
    const verifiedToken = await jwt.verify(headerToken, process.env.JWT_TOKEN!);
    req.emp = verifiedToken;
    next();
  } catch (err) {
    res.status(400).json({ error: true, data: { message: [`Authenticated route`] } });
  }
};

export default module.exports = auth;
