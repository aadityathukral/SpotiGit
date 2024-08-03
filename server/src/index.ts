import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import { connectDB } from "./config/dbConn";
import routerCallback from "./routes/auth/callback";

// Access env secrets
dotenv.config();

// Configuring and starting HTTP server
const port: number = Number(process.env.PORT) || 8080;
const app: Express = express();

// Middleware
// TODO: Make a sign-in logger, which will track the time
// of visiting the site as well as location

// Body-parser
// Will come in use when making POST or PUT requests
app.use(bodyParser.json());

// Handle all API requests to server from ./src/api/routes.ts

// Callback after authentication complete
// Receives access token and refresh token
app.use("/callback", routerCallback);

// Listen only if connnected to server
// Connect to MongoDB
connectDB().then(() => {
  console.log("Connected to MongoDB database");
  app.listen(port, () => console.log(`Listening on port ${port}`));
});
