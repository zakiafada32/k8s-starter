import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { checkEnv } from './env';
import dotenv from 'dotenv';

dotenv.config();
checkEnv();

const app = express();

app.use(express.json());

app.get('/all', (req: Request, res: Response) => {
  res.send('get all users'); // admin
});

app.get('/:userId', (req: Request, res: Response) => {
  res.send('get user'); // admin and users
});

app.post('/create', (req: Request, res: Response) => {
  res.send('create user'); // admin
});

app.delete('/delete/:userId', (req: Request, res: Response) => {
  res.send('delete user'); // admin
});

app.patch('/update/:userId', (req: Request, res: Response) => {
  res.send('update user'); // admin
});

mongoose
  .connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('mongodb connected'))
  .catch((error) => console.error('mongodb not connected'));

app.listen('4000', () => {
  console.log('users listening port 4000');
});
