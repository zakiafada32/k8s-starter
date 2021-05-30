import { Request, Response } from 'express';

export const getToken = async (req: Request, res: Response) => {
  try {
    console.log('req.body: ', req.body);
    res.status(200).send({ data: 'get token' });
  } catch (err) {
    res.status(400).send({
      status: 'get token not success',
    });
  }
};
