import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import RefreshTokenModel from '../models/token';
import UserModel from '../models/user';

interface UserPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}
interface Body {
  token: string;
}
interface CustomRequest<T> extends Request {
  body: T;
}

export const refreshToken = async (req: CustomRequest<Body>, res: Response) => {
  try {
    const { token } = req.body;
    const refreshToken = await RefreshTokenModel.findOne({
      refreshToken: token,
    });
    if (!refreshToken) {
      throw new Error('Not Authorized');
    }

    const payload = jwt.verify(
      token,
      process.env.JWT_REFRESH_KEY!
    ) as UserPayload;
    const user = await UserModel.findById(payload.id);
    if (!user) {
      throw new Error('Not Authorized');
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_KEY!,
      { expiresIn: '5m' }
    );

    res.status(200).send({
      status: 'success',
      message: 'access token created',
      data: {
        accessToken,
      },
    });
  } catch (err) {
    res.status(400).send({
      status: 'Unsuccessful',
      message: err.message,
    });
  }
};
