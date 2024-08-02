import express, { Request, Response, Router } from "express";
import querystring from "querystring";
import { Buffer } from "node:buffer";
import { STATE, TOKEN_URI } from "../../config/spotifyOptions";
import dotenv from "dotenv";
dotenv.config();

const routerCallback: Router = express.Router();
const redirect_uri = process.env.REDIRECT_URI;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

routerCallback.route("/").get(async (req: Request, res: Response) => {
  //   console.log(res, req);
  if (!redirect_uri) {
    console.error("Redirect URI not working, fix dotenv");
    return;
  }

  const code: string | null = (req.query.code as string) || null;
  const queryState: string | null = (req.query.state as string) || null;

  if (queryState === null) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
    return;
  }

  if (queryState !== STATE) {
    return res.sendStatus(403);
  }

  // TODO: Update this accordingly
  // Check the Spotify Web API specifications
  if (!code) {
    return res.sendStatus(400);
  }

  try {
    const authHeader: Headers = new Headers();
    authHeader.append("Content-Type", "application/x-www-form-urlencoded");
    authHeader.append(
      "Authorization",
      "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64")
    );

    const urlencodedBody: URLSearchParams = new URLSearchParams();
    urlencodedBody.append("grant_type", "authorization_code");
    urlencodedBody.append("code", code);
    urlencodedBody.append("redirect_uri", redirect_uri);

    // Making a post request to get access/refresh token
    const response = await fetch(TOKEN_URI, {
      method: "POST",
      headers: authHeader,
      body: urlencodedBody,
    });

    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
});

export default routerCallback;
