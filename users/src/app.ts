import express from 'express';
import dotenv from 'dotenv';
import { checkEnv, connectDB } from './config';
import { currentUser } from './middlewares';
import { createUser } from './controllers';

dotenv.config();

const app = express();

checkEnv();
connectDB();

app.use(express.json());

app.use(currentUser);

// app.get('/all', () => {
//   // admin
// });

// app.get('/:userId', () => {
//   // admin
// });

app.post('/create', createUser);

// app.delete('/delete/:userId', () => {
//   // admin
// });

// app.patch('/update/:userId', () => {
//   // admin
// });

app.get('/', () => {
  // user and admin
});

app.listen('4000', () => {
  console.log('users listening port 4000');
});
