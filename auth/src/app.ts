import express from 'express';
import dotenv from 'dotenv';
import { getToken, refreshToken } from './controllers';
import { checkEnv, connectDB } from './config';

dotenv.config();

const app = express();

checkEnv();
connectDB();

app.use(express.json());

app.use('/token/refresh', refreshToken);
app.use('/token', getToken);

app.listen('3000', () => {
  console.log('auth: listening to port 3000');
});
