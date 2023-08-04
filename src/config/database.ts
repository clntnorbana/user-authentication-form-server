import mongoose from "mongoose";

const connectMongoDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      process.exit(1);
    } else {
      console.log("Unexpected error", error);
    }
  }
};

export default connectMongoDb;
