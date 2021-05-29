import express, { Request, Response } from 'express';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('auth express skaffold');
});

app.listen('3000', () => {
  console.log('auth');
});
