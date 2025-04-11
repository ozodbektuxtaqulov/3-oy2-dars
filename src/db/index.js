import mongoose from "mongoose";
import { config } from "../config/index.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("MongoDB-ga ulandi");
  } catch (error) {
    console.error("MongoDB ulanish xatosi:", error);
    process.exit(1);
  }
};
