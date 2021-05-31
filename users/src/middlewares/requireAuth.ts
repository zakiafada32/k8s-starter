import { Request, Response, NextFunction } from 'express';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.currentUser) {
      throw new Error('Not authorized');
    }

    next();
  } catch (err) {
    res.status(401).send({
      status: 'Unsuccessful',
      message: err.message,
    });
  }
};
