import mongoose from 'mongoose';
import log from '../helper/log';

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI!, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  log.info('Database connection established');
};

export default connectDB;
