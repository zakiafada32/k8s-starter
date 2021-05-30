import { Request, Response } from 'express';
import UserModel from '../models/user';

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    res.status(200).send({
      status: 'success',
      message: 'Get user by Id',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).send({
      status: 'Unsuccessful',
      message: err.message,
    });
  }
};
