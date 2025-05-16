import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/task-manager");
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
