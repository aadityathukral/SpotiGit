import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";

import { connectDB } from "./config/dbConn";
import routerCallback from "./routes/auth/callback";
import routerLogin from "./routes/auth/login";
import credentials from "./middleware/credentials";
import corsOptions from "./config/corsOptions";
import routerUserInfo from "./routes/api/getUserInfo";
import { logger } from "./middleware/visitLogger";

// Access env secrets
dotenv.config();

// Configuring and starting HTTP server
const port: number = Number(process.env.PORT) || 8080;
const app: Express = express();

// Listen only if connnected to server
// Connect to MongoDB
connectDB().then(() => {
  console.log("Connected to MongoDB database");
  app.listen(port, () => console.log(`Listening on port ${port}`));
});

// Middleware

// CORS Issue: (Will come in use later)
app.use(credentials);
app.use(cors(corsOptions));

// Body-parser
// Will come in use when making POST or PUT requests
app.use(bodyParser.json());

// Express-Session Middleware
// TODO: Fix Redis Issue
app.use(
  session({
    // store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.CURR_MODE === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // Session lasts for 1 day
    },
  })
);

// TODO: Make a sign-in logger, which will track the time
// of visiting the site as well as location

// Handle all API requests to server from ./src/api/routes.ts

app.use("/login", routerLogin);

app.use(logger);

// Callback after authentication complete
// Receives access token and refresh token
app.use("/callback", routerCallback);

// Gets the userInfo
app.use("/getUserInfo", routerUserInfo);
