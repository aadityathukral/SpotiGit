import querystring from "querystring";

import express, { Request, Response, Router } from "express";
import dotenv from "dotenv";
import { AUTH_URI, SCOPE, STATE } from "../../config/spotifyOptions";
dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;

const routerSpotify: Router = express.Router();

routerSpotify.route("/").get((req: Request, res: Response) => {
  res.redirect(
    `${AUTH_URI}?` +
      querystring.stringify({
        response_type: "code",
        client_id: CLIENT_ID,
        scope: SCOPE,
        redirect_uri: REDIRECT_URI,
        state: STATE,
      })
  );
});

export default routerSpotify;
