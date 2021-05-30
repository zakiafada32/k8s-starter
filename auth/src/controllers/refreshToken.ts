import { Request, Response } from 'express';

export const refreshToken = async (req: Request, res: Response) => {
  try {
    console.log('req.body: ', req.body);
    res.status(200).send({ data: 'refresh token' });
  } catch (err) {
    res.status(400).send({
      status: 'refresh token not success',
    });
  }
};
