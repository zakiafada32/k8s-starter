import { Request, Response } from 'express';
import UserModel from '../models/user';

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findById(userId);
    console.log(user);
    if (!user) {
      throw new Error('User not found');
    }

    await user.delete();

    res.status(200).send({
      status: 'success',
      message: 'User deleted',
      data: {
        userId,
      },
    });
  } catch (err) {
    res.status(400).send({
      status: 'Unsuccessful',
      message: err.message,
    });
  }
};