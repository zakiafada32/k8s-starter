import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bycript from 'bcrypt';
import UserModel from '../models/user';
import RefreshTokenModel, { RefreshToken } from '../models/token';

interface Body {
  email: string;
  password: string;
}
interface CustomRequest<T> extends Request {
  body: T;
}

export const getToken = async (req: CustomRequest<Body>, res: Response) => {
  try {
    console.log('req.body: ', req.body);
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error('Invalid User');
    }

    const passwordMatch = await bycript.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid Password');
    }

    const payload = {
      id: user.id as string,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    console.log('payload: ', payload);

    const accessToken = jwt.sign(payload, process.env.JWT_KEY!, {
      expiresIn: '5m',
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY!);
    const refresh: RefreshToken = new RefreshTokenModel({
      refreshToken,
      userId: user._id,
    });
    await refresh.save();

    res.status(200).send({
      status: 'success',
      message: 'new refresh token created',
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(400).send({
      status: 'Unsuccessful',
      message: err.message,
    });
  }
};
