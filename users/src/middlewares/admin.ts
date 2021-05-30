import { Request, Response, NextFunction } from 'express';

export const admin = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.currentUser.role !== 'admin') {
      throw new Error('Not authorized');
    }

    next();
  } catch (err) {
    res.status(400).send({
      status: 'Unsuccessful',
      message: err.message,
    });
  }
};
