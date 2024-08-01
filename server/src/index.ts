import express, { Express, Request, Response } from "express";
import { connectDB } from "./config/dbConn";
import dotenv from "dotenv";

dotenv.config();
// Configuring and starting HTTP server

const port: number = Number(process.env.PORT) || 8080;
const app: Express = express();

// Handle all API requests to server from ./src/api/routes.ts

// Listen only if connnected to server
// Connect to MongoDB
connectDB().then(() => {
  console.log("Connected to MongoDB database");
  app.listen(port, () => console.log(`Listening on port ${port}`));
});
