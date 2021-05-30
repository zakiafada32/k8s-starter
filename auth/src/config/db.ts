import mongoose from 'mongoose';

export const connectDB = () => {
  const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });

      console.log('mongodb connected');
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
