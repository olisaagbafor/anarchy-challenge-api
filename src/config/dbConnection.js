import mongoose from "mongoose";

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI);

  mongoose.set("strictQuery", false);

  console.log(`MongoDB Connected: ${conn.connection.host}`.green.bold);
};

export default connectDB;
