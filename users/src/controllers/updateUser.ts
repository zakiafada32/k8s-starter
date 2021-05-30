import { Request, Response } from 'express';
import { Roles } from '../models/roles';
import UserModel from '../models/user';

interface Body {
  name: string;
}

interface CustomRequest<T> extends Request {
  body: T;
}

export const updateUser = async (req: CustomRequest<Body>, res: Response) => {
  try {
    const userId = req.params.userId;
    const { name } = req.body;

    if (name.length === 0) {
      throw new Error('Filed name must not be empty');
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.name = name;
    await user.save();

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
