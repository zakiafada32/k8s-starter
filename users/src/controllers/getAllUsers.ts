import { Request, Response } from 'express';
import UserModel from '../models/user';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({});

    res.status(200).send({
      status: 'success',
      message: 'List of users',
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).send({
      status: 'Unsuccessful',
      message: err.message,
    });
  }
};
