import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('users express skaffold');
});

app.listen('4000', () => {
  console.log('users');
});
