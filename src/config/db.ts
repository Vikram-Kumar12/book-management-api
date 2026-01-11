import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("DataBase connected successfully!");
  } catch (error) {
    console.error("DataBase connection failed!");
    process.exit(1);
  }
};

export default connectDB;
