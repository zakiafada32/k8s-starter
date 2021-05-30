export const checkEnv = () => {
  if (!process.env.MONGO_URI) {
    throw new Error('ENV MONGO_URI not found');
  }

  if (!process.env.JWT_KEY) {
    throw new Error('ENV JWT_KEY not found');
  }

  if (!process.env.JWT_REFRESH_KEY) {
    throw new Error('ENV JWT_REFRESH_KEY not found');
  }
};
