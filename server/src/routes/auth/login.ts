import express, { Request, Response, Router } from "express";
import dotenv from "dotenv";
import querystring from "querystring";
import { SCOPE, STATE } from "../../config/spotifyOptions";

dotenv.config();
const routerLogin: Router = express.Router();

routerLogin.route("/").get((_req: Request, res: Response) => {
  const client_id = process.env.CLIENT_ID as string;
  const redirect_uri = process.env.REDIRECT_URI as string;

  // Redirect to authorization page
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: SCOPE,
        redirect_uri: redirect_uri,
        state: STATE,
        prompt: "consent",
      })
  );
});

export default routerLogin;
