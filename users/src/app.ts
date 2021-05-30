import express from 'express';
import dotenv from 'dotenv';
import { checkEnv, connectDB } from './config';
import { currentUser, requireAuth, admin } from './middlewares';
import {
  createUser,
  deleteUser,
  updateUser,
  getAllUsers,
  getUser,
  user,
} from './controllers';

dotenv.config();

const app = express();

checkEnv();
connectDB();

app.use(express.json());

app.use(currentUser);

app.post('/create', admin, createUser);
app.delete('/delete/:userId', admin, deleteUser);
app.patch('/update/:userId', admin, updateUser);
app.get('/all', admin, getAllUsers);
app.get('/:userId', admin, getUser);
app.get('/', requireAuth, user);

app.listen('4000', () => {
  console.log('users listening port 4000');
});
