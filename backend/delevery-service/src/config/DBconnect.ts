import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
  try {
    const connectionOptions: mongoose.ConnectOptions = {
      // Removed useNewUrlParser and useUnifiedTopology as they are no longer necessary in Mongoose 6.x+
    };

    // Use MONGO_URI from the .env file to connect
    await mongoose.connect(process.env.MONGO_URI as string, connectionOptions);

    console.log('MongoDB connected');
  } catch (err) {
    // TypeScript error handling: Type the error
    if (err instanceof Error) {
      console.error(`Error: ${err.message}`);
    } else {
      console.error('Unknown error occurred during MongoDB connection');
    }
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
