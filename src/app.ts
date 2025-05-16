import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
const app = express();
import cors from "cors";
import verifyJWT from "./middleware/verifyJWT";
import cookieParser from "cookie-parser";
import { credentials } from "./middleware/credentials";
import { corsOptions } from "./config/corsOptions";
import { tasksRout } from "./routes/tasks";
import { rootRout } from "./routes/root";
import path from "path";
import mongoose from "mongoose";
import connectDB from "./config/dbConn";
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

//Cross Origin Recourse Sharing
app.use(cors(corsOptions));

// middleware for cookies
app.use(cookieParser());

//built-in middleware to handle urlencoded from data
app.use(express.urlencoded({ extended: false }));

//built-in middleware for json
app.use(express.json());

//serves static files
app.use("/", express.static(path.join(__dirname, "/public")));

// routes
app.use("/api/v1/tasks", tasksRout);

mongoose.connection.once("open", () => {
  console.log("Connect to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
