import express from 'express';
import dotenv from 'dotenv';
import { login, refreshToken } from './controllers';
import { checkEnv, connectDB } from './config';

dotenv.config();

const app = express();

checkEnv();
connectDB();

app.use(express.json());

app.post('/login', login);
app.post('/refresh', refreshToken);

app.listen('3000', () => {
  console.log('auth: listening to port 3000');
});
