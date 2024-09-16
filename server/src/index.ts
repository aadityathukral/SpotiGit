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
import routerSessionClear from "./routes/auth/clearSession";
import { createClient } from "redis";
import RedisStore from "connect-redis";
import routerUserPlaylists from "./routes/api/getUserPlaylists";

// Access env secrets
dotenv.config();

// TODO: Fix Redis Issue

// // @ts-ignore
// const redisStore = new RedisStore({ client: redisClient });

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
    // store: redisStore,
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

app.use("/sessionClear", routerSessionClear);

app.use("/login", routerLogin);

// Callback after authentication complete
// Receives access token and refresh token
app.use("/callback", routerCallback);

// Middleware tracking logins from users
app.use(logger);

// Gets the userInfo
app.use("/getUserInfo", routerUserInfo);

app.use("/getUserPlaylists", routerUserPlaylists);
