import mongoose from "mongoose";
import { vars } from "../configs/index.js";

// INFO: Connect to mongodb server using mongoose
async function InitiateMongoServer() {
  try {
    await mongoose.connect(vars.connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected!");
  } catch (error) {
    console.log('Database error:', error);
    // throw error;
  }
}

export default InitiateMongoServer;
