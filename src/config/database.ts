import mongoose, { ConnectOptions } from 'mongoose';

mongoose.connect(`${process.env.START_MONGODB}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.END_MONGODB}`, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  } as ConnectOptions, () => {
      console.log("Connected to mongoose successfully")
  });