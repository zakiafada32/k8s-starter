import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../models/user';
import { Roles } from '../models/roles';
import { emailValidation } from '../utils';

interface Body {
  email: string;
  password: string;
  name: string;
  role: Roles;
}

interface CustomRequest<T> extends Request {
  body: T;
}

export const createUser = async (req: CustomRequest<Body>, res: Response) => {
  try {
    const { email, password, name, role } = req.body;

    const emailCheck = emailValidation(email);
    if (!emailCheck) {
      throw new Error('Email not valid');
    }
    const passwordLength = password.length;
    if (passwordLength < 6 || passwordLength > 12) {
      throw new Error('Password must be between 6 and 12 character');
    }
    if (name.length === 0) {
      throw new Error('Name not valid');
    }
    const roleCheck = Object.values(Roles).includes(role);
    if (!roleCheck) {
      throw new Error('Role not valid');
    }

    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      throw new Error('Email in use');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      email,
      password: hashPassword,
      role,
      name,
    });
    await user.save();

    res.status(201).send({
      status: 'Success',
      message: 'new user created',
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
