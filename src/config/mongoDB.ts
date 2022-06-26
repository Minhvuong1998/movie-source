/* eslint-disable no-console */
import mongoose from 'mongoose';
import { initialize } from '../domain/model';

const URI = process.env.MONGODB_URI;

mongoose.connect(URI!, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

mongoose.connection.on('error', (err) => {
  console.log(`MongoDb error ${err}`);
});

mongoose.connection.on('conntected', () => {
  console.log(`MongoDb conntected...`);
  process.exit(1);
});

export type DB = ReturnType<typeof initialize>;

export default initialize(mongoose);
