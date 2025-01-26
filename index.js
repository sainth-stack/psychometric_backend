import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/UserRoutes.js";
import { PORT } from "./const/const.js";
import connectDB from "./config/db/ConnectDb.js";

import cors from "cors"
// Load environment variables
dotenv.config();

const app = express();
app.use(cors());



// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);


// Start server
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`);
    process.exit(1); // Exit the process if the database connection fails
  }
});
