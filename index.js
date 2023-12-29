// Reading dotenv file
import dotenv from "dotenv";
dotenv.config();

//importing dependencies
import express from "express";
import logger from "./src/config/logger.js";
import startup from "./src/config/startup.js";
import routes from "./src/config/routes.js";
import connectDB from "./src/config/dbConnection.js";

//initializing express
const app = express();

// Call the Logger Function
logger(app);

// Call the Startup Function
startup(app);

// Call the Routes Function
routes(app);

// Connect to Database
connectDB();

//app port
const PORT = process.env.PORT;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
