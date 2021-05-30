import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface User {
  id: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers['authorization'];
  if (!authorization) {
    return next();
  }

  const [prefix, token] = authorization.split(' ');
  if (prefix !== 'Bearer') {
    return next();
  }

  const user = jwt.verify(token, process.env.JWT_KEY!) as User;
  req.user = user;

  next();
};
