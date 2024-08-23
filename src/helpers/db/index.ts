import mongoose from 'mongoose';
import config from '../../config';

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
