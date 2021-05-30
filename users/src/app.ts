import express from 'express';
import dotenv from 'dotenv';
import { checkEnv, connectDB } from './config';
import { currentUser } from './middlewares';
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

app.get('/all', getAllUsers);
app.get('/:userId', getUser);
app.post('/create', createUser);
app.delete('/delete/:userId', deleteUser);
app.patch('/update/:userId', updateUser);
app.get('/', user);

app.listen('4000', () => {
  console.log('users listening port 4000');
});
