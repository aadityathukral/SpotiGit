// TODO LATEST: Maybe don't need to make this an API
// endpoint.

// TODO: Make this an API endpoint (OR DO YOU?)
// That way you can send back the access_token
// as json.
// Call this endpoint from callback
// You will need to call if access token expires
// before any Spotify Web API Call

import express, { Request, Response, Router } from "express";
import { TOKEN_URI } from "../../config/spotifyOptions";

import dotenv from "dotenv";
dotenv.config();
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const routerRefresh = express.Router();

routerRefresh.route("/").get(async (req: Request, res: Response) => {
  const headers: Headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append(
    "Authorization",
    "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64")
  );

  // TODO: Write this better
  if (!(req.session as any).refreshToken) {
    console.error("What the haell");
    return;
  }
  const body: URLSearchParams = new URLSearchParams();
  body.append("grant_type", "refresh_token");
  body.append("refresh_token", (req.session as any).refreshToken);
  const response = await fetch(TOKEN_URI, {
    method: "POST",
    headers: headers,
    body: body,
  });
  const data: any = await response.json();

  // Update the access token and expiry time
  (req.session as any).accessToken = data.access_token;
  (req.session as any).expiresAt =
    new Date().getTime() + 1000 * data.expires_in;
  console.log(data);
});

export default routerRefresh;
