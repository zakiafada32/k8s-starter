import { Request, Response } from 'express';
import UserModel from '../models/user';

interface Body {
  name: string;
}

interface CustomRequest<T> extends Request {
  body: T;
}

export const user = async (req: CustomRequest<Body>, res: Response) => {
  try {
    const userId = req.currentUser.id;
    if (!userId) {
      throw new Error('Not authorized');
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    res.status(200).send({
      status: 'success',
      message: 'User updated',
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
